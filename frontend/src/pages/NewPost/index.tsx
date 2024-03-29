import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/authSlice";
import Forbidden from "../../components/Forbidden";
import { createPost } from "../../api/postRequest";
import { createAxiosJWT } from "../../api";
import PostEditor from "../../components/PostEditor";

const NewPost = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const user = useSelector(userSelector);
	const dispatch = useDispatch();

	if (!user || !user.isAdmin) return <Forbidden />;

	const axiosJWT = createAxiosJWT(user, dispatch);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onFinish = async (values: any, content: string, tags: string[]) => {
		const newPost = {
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
			const isCompleted = await createPost(newPost, user.accessToken, axiosJWT);
			if (isCompleted) {
				messageApi.success("Đăng tải bài viết thành công");
			} else {
				messageApi.error("Đăng tải bài viết thất bại");
			}
		} catch (err) {
			messageApi.success("Có lỗi xảy ra");
		}
	};

	return (
		<>
			{contextHolder}
			<PostEditor onFinish={onFinish} />
		</>
	);
};

export default NewPost;
