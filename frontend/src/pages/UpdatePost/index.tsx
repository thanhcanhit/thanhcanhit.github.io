import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/authSlice";
import Forbidden from "../../components/Forbidden";
import { getPost, updatePost } from "../../api/postRequest";
import { createAxiosJWT } from "../../api";
import PostEditor from "../../components/PostEditor";
import { Post } from "../../interface/Post";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../components/NotFound";

const UpdatePost = () => {
	const [messageApi, contextHolder] = message.useMessage();

	const { postId } = useParams();
	const user = useSelector(userSelector);
	const dispatch = useDispatch();
	const [post, setPost] = useState<Post>();

	useEffect(() => {
		const getCurrentPost = async () => {
			const response = await getPost(postId || "");

			if (response) setPost(response.data.post);
		};

		getCurrentPost();
	}, [postId]);

	// Conditional rendering
	if (!post) return <NotFound />;
	if (!user || !user.isAdmin) return <Forbidden />;

	const axiosJWT = createAxiosJWT(user, dispatch);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onFinish = async (values: any, content: string, tags: string[]) => {
		const newPost = {
			_id: postId,
			...values,
			content,
			tags,
			user_id: user._id,
		};

		// Remove empty fields
		Object.keys(newPost).forEach((key) => {
			if (!newPost[key]) {
				delete newPost[key];
			}
		});

		// Try create new post
		try {
			const isCompleted = await updatePost(newPost, user.accessToken, axiosJWT);
			if (isCompleted) {
				messageApi.success("Cập nhật bài viết thành công");
			} else {
				messageApi.error("Cập nhật bài viết thất bại");
			}
		} catch (err) {
			messageApi.success("Có lỗi xảy ra");
		}
	};

	return (
		<>
			{contextHolder}
			<PostEditor onFinish={onFinish} post={post} />
		</>
	);
};

export default UpdatePost;
