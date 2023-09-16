import { Button, Form, Input, Popover } from "antd";
import TagSelect from "./TagSelect";
import TextEditor from "./TextEditor";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/authSlice";
import React, { useState } from "react";
import Forbidden from "../Forbidden";
import { Post } from "../../interface/Post";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onFinishFailed = (errorInfo: any) => {
	console.log("Failed:", errorInfo);
};

type PostEditorType = {
	onFinish: // eslint-disable-next-line @typescript-eslint/no-explicit-any
	(values: any, content: string, tags: string[]) => void;
	post?: Post;
};

type FieldType = {
	title: string;
	shortDesc: string;
	img_path: string;
	sourceLink: string;
	procLink: string;
	tags: string[];
	content: string;
};

const PostEditor = ({ onFinish, post }: PostEditorType) => {
	const user = useSelector(userSelector);
	const [tags, setTags] = useState<string[]>(post?.tags || []);
	const [content, setContent] = useState<string>(post?.content || "");
	const [imgPath, setImgPath] = useState<string>("");

	if (!user || !user.isAdmin) return <Forbidden />;

	return (
		<div className="container zpy-4 text-normal">
			<h1 className="mb-4 text-3xl font-semibold text-center">
				Tạo bài viết mới
			</h1>
			<div className="p-8 bg-white rounded-lg w-[min(1000px,100%)] mx-auto border-normal">
				<Form
					key={"newpost"}
					name="basic"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 18 }}
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					onFinish={(values: any) => {
						onFinish(values, content, tags);
					}}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					initialValues={post}
				>
					<Form.Item<FieldType>
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

					<Form.Item<FieldType>
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

					<Popover
						title="Preview"
						content={
							<img
								width={300}
								src={imgPath}
								className="object-contain"
								onError={({ currentTarget }) => {
									currentTarget.onerror = null; // prevents looping
									currentTarget.src = "/assets/imgs/image_null.png";
								}}
							/>
						}
					>
						<Form.Item<FieldType> label="Ảnh đại diện" name="img_path">
							<Input
								placeholder="Địa chỉ hình ảnh đại diện cho bài viết"
								onChange={(e: React.FormEvent<HTMLInputElement>) =>
									setImgPath(e.currentTarget.value)
								}
							/>
						</Form.Item>
					</Popover>

					<Form.Item<FieldType> label="Sản phẩm" name="procLink">
						<Input placeholder="Địa chỉ tới sản phẩm" />
					</Form.Item>

					<Form.Item<FieldType> label="Mã nguồn" name="sourceLink">
						<Input placeholder="Địa chỉ tới source code" />
					</Form.Item>

					<Form.Item<FieldType> label="Gắn thẻ bài viết" name="tags">
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

export default PostEditor;
