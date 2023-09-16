import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/authSlice";
import Forbidden from "../../components/Forbidden";
import { Post } from "../../interface/Post";
import {
	forceDeletePost,
	getDeletedPostsOfUser,
	restorePost,
} from "../../api/postRequest";
import { Button, Popconfirm, Space } from "antd";
import { ColumnType } from "antd/es/table";
import { createAxiosJWT } from "../../api";
import useMessage from "antd/es/message/useMessage";
import PostManager from "../../components/PostManager";

const DeletedPostManager = () => {
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
		const getPosts = async () => {
			const axiosJWT = createAxiosJWT(user, dispatch);
			const response = await getDeletedPostsOfUser(
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

	const handleDelete = async (post_id: string) => {
		const isCompleted = await forceDeletePost(
			post_id,
			user.accessToken,
			axiosJWT
		);
		if (isCompleted) {
			messageApi.success(`Đã xóa vĩnh viễn ${post_id}`);
			rerender();
		} else messageApi.error("Xóa bài viết thất bại");
	};

	const handleRestore = async (post_id: string) => {
		const isCompleted = await restorePost(post_id, user.accessToken, axiosJWT);
		console.log(isCompleted);
		if (isCompleted) {
			messageApi.success(`Đã xóa khôi phục bài viết ${post_id}`);
			rerender();
		} else messageApi.error("Khôi phục bài viết thất bại");
	};

	const actions: ColumnType<Post> = {
		title: "Hành động",
		dataIndex: "actions",
		key: "actions",
		render: (_m, record: Post) => {
			return (
				<Space size="middle">
					<Button type="primary" onClick={() => handleRestore(record._id)}>
						Khôi phục
					</Button>
					<Popconfirm
						title="Xóa bài viết"
						description="Bạn có muốn xóa bài viết này? (Xóa vĩnh viễn)"
						okText="Xóa"
						cancelText="Không"
						onConfirm={() => {
							handleDelete(record._id);
						}}
					>
						<Button danger>Xóa vĩnh viễn</Button>
					</Popconfirm>
				</Space>
			);
		},
	};

	return (
		<>
			{contextHolder}
			<PostManager
				title="Danh sách bài viết bạn đã xóa"
				posts={posts}
				actions={actions}
			/>
		</>
	);
};

export default DeletedPostManager;
