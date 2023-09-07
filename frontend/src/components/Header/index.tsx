import { Drawer, Dropdown } from "antd";
import Logo from "../Logo";
import ToggleThemeButton from "../ToggleThemeButton";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import loginIllus from "./img/login_illustration.svg";
import registerIllus from "./img/welcome_illustration.svg";
import { login, register } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/userSlice";
import Account from "./Account";
import { HiMenu } from "react-icons/hi";

const Header = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const [open, setOpen] = useState<boolean>(false);
	const [type, setType] = useState<"login" | "register">("login");
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const user = useSelector(userSelector);
	const dispatch = useDispatch();

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

	// Drawer
	const onClose = () => {
		setOpen(false);
	};

	// Login Form
	const onFinishFailed = () => {
		messageApi.open({
			type: "error",
			content: "Vui lòng điền đầy đủ thông tin",
		});
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

	return (
		<>
			{contextHolder}
			<nav className="bg-white border-0 border-b border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-900 ">
				<div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
					<div className="flex gap-2">
						<Logo />
						<ToggleThemeButton />
					</div>

					{/* Mobile menu */}
					<div className=" lg:hidden">
						<button
							className="m-0 button-normal"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<HiMenu />
						</button>
					</div>

					{/* Right */}
					<div
						className={
							"hidden w-full lg:block lg:w-auto [&.active]:block" +
							(isMenuOpen && " active")
						}
					>
						<ul className="flex flex-col gap-2 p-4 mt-4 font-medium border border-gray-100 rounded-lg lg:gap-0 lg:p-0 bg-gray-50 lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
							<li className="self-center">
								{user.user ? (
									<Account />
								) : (
									<>
										<button
											type="button"
											className="button-normal"
											onClick={() => {
												setOpen(true);
												setType("login");
											}}
										>
											Login
										</button>
										<button
											type="button"
											className="button-normal"
											onClick={() => {
												setOpen(true);
												setType("register");
											}}
										>
											Register
										</button>
									</>
								)}
							</li>
						</ul>
					</div>
				</div>
			</nav>

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
						name="basic"
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
						name="basic"
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

export default Header;
