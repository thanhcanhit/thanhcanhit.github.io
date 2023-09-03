import { Button, Form, Input } from "antd";
import TagSelect from "./TagSelect";
import TextEditor from "./TextEditor";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onFinishFailed = (errorInfo: any) => {
	console.log("Failed:", errorInfo);
};

const NewPost = () => {
	const [content, setContent] = useState<string>("");
	const [tags, setTags] = useState<string[]>([]);

	const navigate = useNavigate();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onFinish = async (values: any) => {
		const newPost = {
			...values,
			content,
			tags,
			user_id: "64ead7f05ad00ed80d21ca32",
		};
		Object.keys(newPost).forEach((key) => {
			if (!newPost[key]) {
				delete newPost[key];
			}
		});
		try {
			await createPost(newPost);
			navigate("/");
			console.log("Success:", newPost);
		} catch (err) {
			console.log("Can't create");
		}
	};

	return (
		<div className="container py-4 text-normal">
			<h1 className="mb-4 text-3xl font-semibold text-center">
				Tạo bài viết mới
			</h1>
			<div className="p-8 bg-white rounded-lg w-[min(1000px,100%)] mx-auto border-normal">
				<Form
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
						<Button
							type="primary"
							htmlType="submit"
							className="w-full mt-2"
						>
							Hoàn tất và đăng tải
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default NewPost;
