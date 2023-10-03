import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/authSlice";
import Forbidden from "../../components/Forbidden";
import { Post } from "../../interface/Post";
import { deletePost, getPostsOfUser } from "../../api/postRequest";
import { Button, Popconfirm, Space } from "antd";
import { ColumnType } from "antd/es/table";
import { Link } from "react-router-dom";
import { createAxiosJWT } from "../../api";
import useMessage from "antd/es/message/useMessage";
import PostManager from "../../components/PostManager";

const PostManagerPage = () => {
	const user = useSelector(userSelector);
	const dispatch = useDispatch();
	const [messageApi, contextHolder] = useMessage();

	const [posts, setPosts] = useState<Post[]>([]);
	const [triggerRender, setTriggerRender] = useState<boolean>(false);

	const rerender = () => {
		setTriggerRender(!triggerRender);
	};

	useEffect(() => {
		if (!user?._id) return;
		const axiosJWT = createAxiosJWT(user, dispatch);
		const getPosts = async () => {
			const response = await getPostsOfUser(
				user._id,
				user.accessToken,
				axiosJWT
			);
			if (response?.data) setPosts(response.data);
			else console.log("response error: " + response);
		};

		getPosts();
	}, [dispatch, user, triggerRender]);

	if (!user)
		return <Forbidden message="Vui lòng đăng nhập để sử dụng tính năng này" />;

	const axiosJWT = createAxiosJWT(user, dispatch);

	const onDelete = async (post_id: string) => {
		const isCompleted = await deletePost(post_id, user.accessToken, axiosJWT);
		if (isCompleted) {
			messageApi.success(`Đã đưa bài viết ${post_id} vào thùng rác.`);
			rerender();
		} else messageApi.error("Xóa bài viết thất bại");
	};

	const actions: ColumnType<Post> = {
		title: "Hành động",
		dataIndex: "actions",
		key: "actions",
		render: (_m, record: Post) => {
			return (
				<Space size="middle">
					<Link to={`/me/post/${record._id}`}>
						<Button type="primary">Sửa</Button>
					</Link>
					<Popconfirm
						title="Xóa bài viết"
						description="Bạn có muốn xóa bài viết này (Có thể khôi phục)"
						okText="Xóa"
						cancelText="Không"
						onConfirm={() => {
							onDelete(record._id);
						}}
					>
						<Button danger>Delete</Button>
					</Popconfirm>
				</Space>
			);
		},
	};
	return (
		<div className="container">
			{contextHolder}
			<PostManager posts={posts} actions={actions} />
		</div>
	);
};

export default PostManagerPage;
