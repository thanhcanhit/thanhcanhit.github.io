import { Dispatch, SetStateAction } from "react";
import loginIllus from "./img/login_illustration.svg";
import registerIllus from "./img/welcome_illustration.svg";
import { Button, Form, Input, message, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../api/authRequest";
import { loginSelector, registerSelector } from "../../redux/authSlice";

type valuesType = {
	username: string;
	password: string;
	name?: string;
};

type AuthDrawerType = {
	open: boolean;
	type: "login" | "register";
	setOpen: Dispatch<SetStateAction<boolean>>;
	setType: Dispatch<SetStateAction<"login" | "register">>;
};

const AuthDrawer = ({ open, type, setOpen, setType }: AuthDrawerType) => {
	const [messageApi, contextHolder] = message.useMessage();
	const registerState = useSelector(registerSelector);
	const loginState = useSelector(loginSelector);
	const dispatch = useDispatch();

	const onClose = () => {
		setOpen(false);
	};

	// Message
	const showSuccessMessage = (message: string) => {
		messageApi.open({
			type: "success",
			content: message,
		});
	};

	const showFailedMessage = (message: string) => {
		messageApi.open({
			type: "error",
			content: message,
		});
	};

	const showLoadingMessage = (message: string) => {
		messageApi.open({
			type: "loading",
			content: message,
		});
	};

	const handleLogin = async (values: valuesType) => {
		if (loginState.isFetching) showLoadingMessage("Đang đăng nhập...");
		const isCompleted = await login(
			{
				username: values.username,
				password: values.password,
			},
			dispatch
		);

		// Show message
		if (isCompleted) {
			setOpen(false);
			showSuccessMessage("Chào mừng bạn đã trở lại");
		} else
			showFailedMessage("Đăng nhập thất bại vui lòng kiểm tra lại thông tin");
	};

	const handleRegister = async (values: valuesType) => {
		if (!values.name) return;

		if (registerState.isFetching) showLoadingMessage("Đang đăng đăng ký...");
		const isCompleted = await register(
			{
				username: values.username,
				password: values.password,
				name: values.name,
			},
			dispatch
		);

		if (isCompleted) {
			setType("login");
			showSuccessMessage("Đăng ký tài khoản thành công!");
		} else showFailedMessage("Có lỗi xảy ra: " + registerState.error);
	};

	// Login Form on submit
	const onFinish = (values: valuesType) => {
		if (type === "login") handleLogin(values);
		else handleRegister(values);
	};

	const onFinishFailed = () => {
		showFailedMessage("Vui lòng điền đầy đủ thông tin");
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
					<img src={type === "login" ? loginIllus : registerIllus} alt="illustrator"/>
				</div>
				{type === "login" ? (
					<Form
						name="login"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						onFinish={onFinish}
						onFinishFailed={() =>
							showFailedMessage("Vui lòng điền đầy đủ thông tin")
						}
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
