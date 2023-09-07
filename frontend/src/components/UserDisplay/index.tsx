import { User } from "../../interface/User";
import { Popover } from "antd";
import UserAvatar from "../UserAvatar";

type UserDisplayType = {
	user: User;
};

const UserDisplay = ({ user }: UserDisplayType) => {
	return (
		<Popover
			title={<h3 className="text-center">{user.name}</h3>}
			content={
				<div className="flex flex-col items-center">
					<UserAvatar size={90} source={user.avatar_path} />
					<h3 className="font-semibold">{user.username}</h3>
					<span className="italic">{user.bio || "Bio hiện đang trống"}</span>

					<span>Số bài đã đăng: {user.numPost}</span>
					<span>
						Ngày tạo tài khoản: 
						{" " + new Date(user.createdAt).toLocaleDateString("vi-VN")}
					</span>
					{}
				</div>
			}
		>
			<div className="flex items-center gap-2 text-sm w-fit">
				<UserAvatar size={30} source={user.avatar_path} />
				{user.name}
			</div>
		</Popover>
	);
};

export default UserDisplay;
