import { Dispatch, SetStateAction } from "react";
import loginIllus from "./img/login_illustration.svg";
import { login, register } from "../../api";
import registerIllus from "./img/welcome_illustration.svg";
import { Button, Form, Input, message, Drawer } from "antd";
import { useDispatch } from "react-redux";

type AuthDrawerType = {
	open: boolean;
	type: "login" | "register";
	setOpen: Dispatch<SetStateAction<boolean>>;
	setType: Dispatch<SetStateAction<"login" | "register">>;
};

const AuthDrawer = ({ open, type, setOpen, setType }: AuthDrawerType) => {
	const [messageApi, contextHolder] = message.useMessage();
	const dispatch = useDispatch();
	
	const onClose = () => {
		setOpen(false);
	};

	const onFinish = async (values: {
		username: string;
		password: string;
		name?: string;
	}) => {
		if (type === "login") {
			const isCompleted = await login(dispatch, {
				username: values.username,
				password: values.password,
			});
			if (isCompleted) {
				setOpen(false);
				loginSuccess();
			} else loginFailed();
		} else {
			if (!values.name) return;

			const isCompleted = await register({
				username: values.username,
				password: values.password,
				name: values.name,
			});

			if (isCompleted) {
				setType("login");
				registerComplete();
			} else {
				registerFailed();
			}
		}
	};
	// Message
	const loginSuccess = () => {
		messageApi.open({
			type: "success",
			content: "Đăng nhập thành công",
		});
	};

	const loginFailed = () => {
		messageApi.open({
			type: "error",
			content: "Đăng nhập không thành công, vui lòng kiểm tra lại thông tin",
		});
	};

	const registerComplete = () => {
		messageApi.open({
			type: "success",
			content: "Đăng ký tài khoản thành công",
		});
	};

	const registerFailed = () => {
		messageApi.open({
			type: "error",
			content: "Đăng ký thất bại, tên tài khoản đã tồn tại",
		});
	};

	// Login Form
	const onFinishFailed = () => {
		messageApi.open({
			type: "error",
			content: "Vui lòng điền đầy đủ thông tin",
		});
	};
	return (
		<>
			{contextHolder}
			<Drawer
				title={type === "login" ? "Đăng nhập" : "Đăng ký"}
				placement="right"
				onClose={onClose}
				open={open}
			>
				<div className="w-full mb-8">
					<img src={type === "login" ? loginIllus : registerIllus} />
				</div>
				{type === "login" ? (
					<Form
						name="login"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						key="login"
					>
						<Form.Item
							label="Username"
							name="username"
							rules={[
								{
									required: true,
									pattern: /[a-z][a-z0-9]{4,19}/,
									message: "Username không hợp lệ!",
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[
								{
									required: true,
									message: "Vui lòng điền mật khẩu!",
								},
							]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item wrapperCol={{ span: 24 }}>
							<div className="grid items-center md:pl-8">
								<Button type="primary" htmlType="submit">
									Đăng nhập
								</Button>
								<Button type="link" onClick={() => setType("register")}>
									Chưa có tài khoản?
								</Button>
							</div>
						</Form.Item>
					</Form>
				) : (
					<Form
						name="register"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						key="register"
					>
						<Form.Item
							label="Tên của bạn"
							name="name"
							rules={[
								{
									required: true,
									max: 50,
									message: "Vui lòng nhập tên của bạn! (tối đa 50 ký tự)",
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="Tên tài khoản"
							name="username"
							rules={[
								{
									required: true,
									pattern: /[a-z][a-z0-9]{4,19}/,
									message:
										"Tên tài khoản phải bắt đầu bằng chữ, là chữ in thường hoặc số và tối thiểu 5, tối đa 20 ký tự",
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Mật khẩu"
							name="password"
							rules={[
								{
									required: true,
									pattern: /[a-zA-Z0-9!@#$%&*]{6,30}/,
									message:
										"Mật khẩu có thể là các ký tự chữ cái in hoa/thường, chữ số, và các ký tự !@#$%^&*. Tối thiểu 6 và tối đa 20 ký tự.",
								},
							]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item wrapperCol={{ span: 24 }}>
							<div className="grid items-center md:pl-8">
								<Button type="primary" htmlType="submit">
									Đăng ký
								</Button>
								<Button type="link" onClick={() => setType("login")}>
									Đã có tài khoản?
								</Button>
							</div>
						</Form.Item>
					</Form>
				)}
			</Drawer>
		</>
	);
};

export default AuthDrawer;
