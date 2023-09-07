/* eslint-disable no-mixed-spaces-and-tabs */
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/userSlice";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { logout } from "../../api";
import UserAvatar from "../UserAvatar";

const adminItems: MenuProps["items"] = [
	{
		key: "1",
		label: <Link to="/new-post">Tạo bài viết mới</Link>,
	},
	{
		key: "2",
		label: <Link to="/me/posts">Quản lí bài viết</Link>,
	},
];

const Account = () => {
	const user = useSelector(userSelector);
	const userData = user.user;
	const dispatch = useDispatch();

	if (!userData) return <></>;

	const handleLogoutClick = async () => {
		await logout(dispatch);
	};

	const logoutButton = {
		key: "logout",
		label: (
			<Button className="w-full" onClick={handleLogoutClick}>
				Đăng xuất
			</Button>
		),
	};

	const menuItems = userData.isAdmin
		? {
				items: [...adminItems, logoutButton],
		  }
		: {
				items: [logoutButton],
		  };
	return (
		<>
			<Dropdown menu={menuItems} placement="bottom" trigger={["click"]}>
				<button className="flex items-center gap-2 button-normal">
					<UserAvatar source={userData.avatar_path} size={30} />
					<p className="text-normal">{userData.name}</p>
				</button>
			</Dropdown>
		</>
	);
};

export default Account;
