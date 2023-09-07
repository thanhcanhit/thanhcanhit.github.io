import { CommentInterface } from "../../interface/Comments";
import Rating from "../../components/Rating";
import DateDisplay from "../../components/Date";
import { useState } from "react";
import { User } from "../../interface/User";
import { useEffect } from "react";
import { getUser } from "../../api";
import UserDisplay from "../../components/UserDisplay";

const animalsName = [
	"Sư tử",
	"Hổ",
	"Gấu",
	"Hươu",
	"Khỉ",
	"Chó",
	"Mèo",
	"Ngựa",
	"Bò",
	"Cá sấu",
	"Voi",
	"Gấu trắng",
	"Hải cẩu",
	"Hải mã",
	"Chim cánh cụt",
	"Gấu mèo",
	"Cáo",
	"Hươu cao cổ",
	"Hổ sữa",
	"Báo đốm",
	"Gà",
	"Vịt",
	"Cá",
	"Tê giác",
	"Ngựa vằn",
	"Ngựa địa cầu",
	"Sói",
	"Sóc",
	"Hổ mang chúa",
	"Bướm",
	"Bọ cánh cứng",
	"Gấu panda",
	"Khủng long",
	"Kangaroo",
	"Lạc đà",
	"Ngựa biển",
	"Gấu chó",
	"Hà mã",
	"Chó sói",
	"Gấu đen",
	"Cá heo",
];

const Comment = ({ comment }: { comment: CommentInterface }) => {
	const [user, setUser] = useState<User | null>();

	let name = user?.name || comment.displayName;
	if (name === "Ẩn danh")
		name = `${
			animalsName[Math.floor(Math.random() * animalsName.length)]
		} ẩn danh`;

	useEffect(() => {
		const getData = async () => {
			if (!comment.user_id) return;
			const res = await getUser(comment.user_id);
			setUser(res.data);
		};

		getData();
	}, [comment.user_id]);

	return (
		<div className="flex flex-col p-4 rounded-md border-normal">
			<div className="mb-2">
				{user ? <UserDisplay user={user} /> : <div>{name}</div>}
			</div>
			<div className="flex justify-between text-sm">
				<Rating rating={comment.rating} />
				<DateDisplay date={comment.createdAt} hasTime />
			</div>
			<hr className="my-2" />
			<div className="text-sm">{comment.content}</div>
		</div>
	);
};

export default Comment;
