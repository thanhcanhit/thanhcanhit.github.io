import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/authSlice";
import Forbidden from "../../components/Forbidden";
import { Post } from "../../interface/Post";
import { deletePost, getPostsOfUser } from "../../api/postRequest";
import { Button, Empty, Popconfirm, Space, Table } from "antd";
import TagList from "../../components/TagList";
import { getAllTags } from "../../api/tagRequest";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { createAxiosJWT } from "../../api";
import useMessage from "antd/es/message/useMessage";

const tags: string[] = (await getAllTags()).data;

const tagsFilters = tags.map((item) => {
	return {
		text: item,
		value: item,
	};
});

const columns: ColumnsType<Post> = [
	{
		title: "Tiêu đề",
		dataIndex: "title",
		key: "title",
		defaultSortOrder: "descend",
		sorter: (a: Post, b: Post) => a.title.localeCompare(b.title),
	},
	{
		title: "Thời gian tạo",
		dataIndex: "createdAt",
		key: "createdAt",
		render: (dateString: string) => (
			<span>{new Date(dateString).toLocaleDateString()}</span>
		),
		sorter: (a: Post, b: Post) =>
			new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
	},
	{
		title: "Mô tả",
		dataIndex: "shortDesc",
		key: "shortDesc",
	},
	{
		title: "Gắn thẻ",
		dataIndex: "tags",
		key: "tags",
		filters: tagsFilters,
		onFilter: (value: string | number | boolean, record) =>
			record.tags.includes(value.toString()),
		render: (tags: string[]) => <TagList tags={tags} />,
	},
];

const PostManager = () => {
	const user = useSelector(userSelector);
	const [posts, setPosts] = useState<Post[]>([]);
	const dispatch = useDispatch();
	const [messageApi, contextHolder] = useMessage();
	const [triggerRender, setTriggerRender] = useState<boolean>(false);

	const rerender = () => {
		setTriggerRender(!triggerRender);
	};

	useEffect(() => {
		if (!user?._id) return;
		const getPosts = async () => {
			const axiosJWT = createAxiosJWT(user, dispatch);
			const response = await getPostsOfUser(
				user._id,
				user.accessToken,
				axiosJWT
			);
			if (response.data) setPosts(response.data);
		};

		getPosts();
	}, [dispatch, user, triggerRender]);

	if (!user)
		return <Forbidden message="Vui lòng đăng nhập để sử dụng tính năng này" />;

	const axiosJWT = createAxiosJWT(user, dispatch);

	const onDelete = async (post_id: string) => {
		const isCompleted = await deletePost(post_id, user.accessToken, axiosJWT);
		if (isCompleted) {
			messageApi.success(`Đã xóa bài viết ${post_id}`);
			rerender();
		} else messageApi.error("Xóa bài viết thất bại");
	};

	if (posts?.length == 0)
		return (
			<div className="flex justify-center pt-8">
				<div className="p-4 bg-white rounded-md shadow-md mx-autotext-center w-fit">
					<h1>Bạn chưa đăng bài viết nào</h1>
					<Empty />
				</div>
			</div>
		);

	return (
		<div className="container py-4 rounded-md w-fit">
			{contextHolder}
			<h1 className="mb-4 text-xl font-semibold text-center text-normal">
				Danh sách các bài viết mà bạn đã đăng tải ({posts?.length})
			</h1>
			<div className="overflow-scroll bg-white ">
				<Table
					dataSource={posts}
					columns={[
						...columns,
						{
							title: "Hành động",
							dataIndex: "actions",
							key: "actions",
							render: (_m, record: Post) => {
								return (
									<Space size="middle">
										<Link to={`/me/post/${record._id}`}>
											<Button>Sửa</Button>
										</Link>
										<Popconfirm
											title="Delete the task"
											description="Are you sure to delete this task?"
											okText="Yes"
											cancelText="No"
											onConfirm={() => {
												onDelete(record._id);
											}}
										>
											<Button danger>Delete</Button>
										</Popconfirm>
									</Space>
								);
							},
						},
					]}
					tableLayout="auto"
				/>
			</div>
		</div>
	);
};

export default PostManager;
