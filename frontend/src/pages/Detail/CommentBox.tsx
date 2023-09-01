import { Input, Popconfirm, Rate } from "antd";
import {  BsSendFill } from "react-icons/bs";
import { useState } from "react";

type CommentBoxType = {
	onSubmit: (
		name: string | null,
		content: string,
		rating: number
	) => Promise<void>;
};

const CommentBox = ({ onSubmit }: CommentBoxType) => {
	const [name, setName] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [rating, setRating] = useState<number>(5);

	const handleSubmit = async () => {
		onSubmit(name ? name : null, content, rating);
		setName("");
		setContent("");
		setRating(5);
	};

	return (
		<div className="flex flex-col gap-1 py-4">
			<p className="text-sm">Nhập bình luận của bạn:</p>
			<Rate
				allowHalf
				defaultValue={5}
				value={rating}
				onChange={(value) => setRating(value)}
			/>
			<Input
				showCount
				value={name}
				maxLength={50}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setName(e.target.value)
				}
				placeholder="Tên hiển thị (optional)"
			/>

			<Input.TextArea
				value={content}
				maxLength={300}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
					setContent(e.target.value)
				}
				placeholder="Nội dung bình luận"
			/>
			<Popconfirm
				title="Xác nhận bình luận"
				description="Mọi người đều sẽ thấy bình luận của bạn"
				onConfirm={handleSubmit}
				icon={null}
				color="#6EE7B7"
				okText="Bình luận"
			>
				<button className="gap-2 px-8 w-fit button-primary ">
					<BsSendFill />
				</button>
			</Popconfirm>
		</div>
	);
};

export default CommentBox;
