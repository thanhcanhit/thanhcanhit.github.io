import { Input, Popconfirm, Rate } from "antd";
import { BsSendFill } from "react-icons/bs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/authSlice";

type CommentBoxType = {
	onSubmit: (
		name: string | null,
		user_id: string | null,
		content: string,
		rating: number
	) => Promise<void>;
};

const CommentBox = ({ onSubmit }: CommentBoxType) => {
	const [name, setName] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [rating, setRating] = useState<number>(5);
	const user = useSelector(userSelector);

	const handleSubmit = async () => {
		let nameSubmit: string | null;
		if (user) nameSubmit = user.name;
		else nameSubmit = name ? name : null;

		onSubmit(nameSubmit, user?._id || null, content, rating);
		setName("");
		setContent("");
		setRating(5);
	};

	const nameInput = !user && (
		<Input
			showCount
			value={name}
			maxLength={50}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				setName(e.target.value)
			}
			placeholder="Tên hiển thị (optional)"
		/>
	);

	return (
		<div className="flex flex-col gap-1 py-4">
			<p className="text-sm">Nhập bình luận của bạn:</p>
			<Rate
				allowHalf
				defaultValue={5}
				value={rating}
				onChange={(value) => setRating(value)}
			/>

			{nameInput}

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
				okText="Bình luận"
				cancelText="Để sau"
			>
				<button className="gap-2 px-8 w-fit button-primary ">
					<BsSendFill />
				</button>
			</Popconfirm>
		</div>
	);
};

export default CommentBox;
