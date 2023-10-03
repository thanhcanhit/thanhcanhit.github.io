import { Button, Form, Input, Modal, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, userSelector } from "../../redux/authSlice";
import UserAvatar from "../UserAvatar";
import { createAxiosJWT } from "../../api";
import { updateUser } from "../../api/userRequest";
import { User } from "../../interface/User";

const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 18 },
};

type UserEditorType = {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserEditor = ({ isOpen, setIsOpen }: UserEditorType) => {
	const user = useSelector(userSelector);
	const [messageApi, contextHolder] = message.useMessage();
	const dispatch = useDispatch();
	const [selectImg, setSelectImg] = useState<string>(
		user?.avatar_path || "whale"
	);

	// Early return when is user not available
	if (!user) return <></>;
	// Image select list
	const imgList = ["whale", "cat", "frog", "hen", "koala", "turtle"];

	const imgOptions = imgList.map((img) => (
		<div
			key={img}
			onClick={() => setSelectImg(img)}
			className={
				" grid items-center cursor-pointer transition-all bg-slate-50 px-2 border-2 hover:border-primary rounded-md [&.active]:border-primary " +
				(!img.localeCompare(selectImg) ? " active" : " ")
			}
		>
			<UserAvatar key={img} size={50} source={img} />
		</div>
	));

	// Handle fisnish
	const axiosJWT = createAxiosJWT(user, dispatch);
	const handleUpdate = async (data: Partial<User>) => {
		const res = await updateUser(user.username, data, user.accessToken, axiosJWT);
		if (res) {
			messageApi.success("Đã cập nhật thông tin thành công");
			console.log(res.data)
			if (res.data) dispatch(loginSuccess({...user, ...res.data}));
		} else messageApi.error("Cập nhật thất bại, có lỗi xảy ra");
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onFinish = (values: any) => {
		values.user.avatar_path = selectImg;
		const newData = values.user;
		handleUpdate(newData);
		setIsOpen(false);
	};
	return (
		<>
			<Modal
				title="Cập nhật thông tin tài khoản"
				open={isOpen}
				footer={<></>}
				onCancel={() => setIsOpen(false)}
			>
				<Form
					{...layout}
					name="nest-messages"
					onFinish={onFinish}
					style={{ maxWidth: 600, paddingTop: 24 }}
				>
					<Form.Item
						name={["user", "name"]}
						label="Tên của bạn"
						initialValue={user.name}
						rules={[{ required: true }]}
					>
						<Input />
					</Form.Item>
					<Form.Item name={["user", "bio"]} label="Bio" initialValue={user.bio}>
						<Input />
					</Form.Item>
					<Form.Item name={["user", "avatar_path"]} label="Ảnh đại diện">
						<div className="flex gap-2">{imgOptions}</div>
					</Form.Item>
					<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
						<Button className="mr-4" onClick={() => setIsOpen(false)}>
							Hủy
						</Button>
						<Button type="primary" htmlType="submit">
							Cập nhật
						</Button>
					</Form.Item>
				</Form>
			</Modal>

			{contextHolder}
		</>
	);
};

export default UserEditor;
