import { User } from "../../interface/User";
import { Avatar, Popover } from "antd";

type UserDisplayType = {
	user: User;
};

const UserDisplay = ({ user }: UserDisplayType) => {
	return (
		<Popover
			title={<h3 className="text-center">{user.name}</h3>}
			content={
				<div className="flex flex-col items-center">
					<Avatar size={80} src={user.avatar_path}></Avatar>
					<h3 className="font-semibold">{user.username}</h3>
					<span className="italic">{user.bio}</span>

					<span>Số bài đã đăng: {user.numPost}</span>
					<span>
						Ngày tạo tài khoản:
						{new Date(user.createdAt).toLocaleDateString("vi-VN")}
					</span>
					{}
				</div>
			}
		>
			<div className="flex items-center gap-2 text-sm w-fit">
				<Avatar src={user.avatar_path}></Avatar>
				{user.name}
			</div>
		</Popover>
	);
};

export default UserDisplay;
