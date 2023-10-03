/* eslint-disable no-mixed-spaces-and-tabs */
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/authSlice";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import { Link } from "react-router-dom";
import UserAvatar from "../UserAvatar";
import { logout } from "../../api/authRequest";
import { useState } from "react";
import UserEditor from "../UserEditor";

const adminItems: MenuProps["items"] = [
	{
		key: "1",
		label: (
			<Link to="/me/new-post">
				<Button className="w-full">Tạo bài viết mới</Button>
			</Link>
		),
	},
	{
		key: "2",
		label: (
			<Link to="/me/posts">
				<Button className="w-full">Quản lí bài viết</Button>
			</Link>
		),
	},
	{
		key: "3",
		label: (
			<Link className="hover:text-blue-500" to="/me/posts/deleted">
				<Button className="w-full">Bài viết đã xóa</Button>
			</Link>
		),
	},
];

const Account = () => {
	const user = useSelector(userSelector);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const dispatch = useDispatch();

	if (!user) return <></>;

	// Menu items
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

	const editButton = {
		key: "edit",
		label: (
			<Button onClick={() => setIsModalOpen(true)}>Cập nhật thông tin</Button>
		),
	};

	const menuItems = user.isAdmin
		? {
				items: [...adminItems, editButton, logoutButton],
		  }
		: {
				items: [editButton, logoutButton],
		  };

	return (
		<>
			<Dropdown menu={menuItems} placement="bottom" trigger={["click"]}>
				<button className="flex items-center gap-2 button-normal">
					<UserAvatar source={user.avatar_path} size={30} />
					<p className="text-normal">{user.name}</p>
				</button>
			</Dropdown>

			<UserEditor isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
		</>
	);
};

export default Account;
