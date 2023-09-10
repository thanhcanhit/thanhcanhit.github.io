import { Button, Form, Input, message } from "antd";
import TagSelect from "./TagSelect";
import TextEditor from "./TextEditor";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, userSelector } from "../../redux/authSlice";
import Forbidden from "../../components/Forbidden";
import { createPost } from "../../api/postRequest";
import axios, { InternalAxiosRequestConfig } from "axios";
import jwtDecode from "jwt-decode";
import { refreshToken } from "../../api/authRequest";
import { User } from "../../interface/User";
import { API_URL } from "../../api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onFinishFailed = (errorInfo: any) => {
	console.log("Failed:", errorInfo);
};

const NewPost = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const user = useSelector(userSelector);
	const dispatch = useDispatch();

	const [content, setContent] = useState<string>("");
	const [tags, setTags] = useState<string[]>([]);

	if (!user || !user.isAdmin) return <Forbidden />;

	// Create axios instance with check token expired when send request
	const axiosJWT = axios.create({ baseURL: API_URL });
	axiosJWT.interceptors.request.use(
		async (config: InternalAxiosRequestConfig) => {
			const decodedToken: { exp: number } = jwtDecode(user.accessToken);

			if (decodedToken.exp < new Date().getTime() / 1000) {
				const response = await refreshToken();
				const newAccessToken = response.data.accessToken;
				const refreshUser: User = {
					...user,
					accessToken: newAccessToken,
				};

				// Update redux store & override headers
				dispatch(loginSuccess(refreshUser));
				config.headers["authorization"] = `Bearer ${newAccessToken}`;
			}
			return config;
		}
	);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onFinish = async (values: any) => {
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
		<div className="container py-4 text-normal">
			{contextHolder}
			<h1 className="mb-4 text-3xl font-semibold text-center">
				Tạo bài viết mới
			</h1>
			<div className="p-8 bg-white rounded-lg w-[min(1000px,100%)] mx-auto border-normal">
				<Form
					key={"newpost"}
					name="basic"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 18 }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="Tiêu đề"
						name="title"
						rules={[
							{
								required: true,
								message: "Vui lòng nhập tiêu đề bài viết!",
							},
						]}
					>
						<Input placeholder="Tiêu đề bài viết" />
					</Form.Item>

					<Form.Item
						label="Mô tả sơ lược"
						name="shortDesc"
						rules={[
							{
								required: true,
								message: "Vui lòng nhập mô tả sơ lược",
							},
						]}
					>
						<Input placeholder="Mô tả về bài viết này" />
					</Form.Item>

					<Form.Item label="Ảnh đại diện" name="img_path">
						<Input placeholder="Địa chỉ hình ảnh đại diện cho bài viết" />
					</Form.Item>

					<Form.Item label="Sản phẩm" name="procLink">
						<Input placeholder="Địa chỉ tới sản phẩm" />
					</Form.Item>

					<Form.Item label="Mã nguồn" name="sourceLink">
						<Input placeholder="Địa chỉ tới source code" />
					</Form.Item>

					<Form.Item label="Gắn thẻ bài viết" name="tags">
						<TagSelect value={tags} setValue={setTags} />
					</Form.Item>

					<TextEditor content={content} setContent={setContent} />

					<Form.Item wrapperCol={{ span: 24 }}>
						<Button type="primary" htmlType="submit" className="w-full mt-2">
							Hoàn tất và đăng tải
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default NewPost;
