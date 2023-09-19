import Logo from "../Logo";
import ToggleThemeButton from "../ToggleThemeButton";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/authSlice";
import Account from "./Account";
import { HiMenu } from "react-icons/hi";
import AuthDrawer from "../AuthDrawer";

const Header = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [type, setType] = useState<"login" | "register">("login");
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const user = useSelector(userSelector);

	return (
		<>
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
						<ul className="flex flex-col gap-2 p-4 mt-4 font-medium list-none border border-gray-100 rounded-lg lg:gap-0 lg:p-0 bg-gray-50 lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
							<li className="self-center">
								{user ? (
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
			<AuthDrawer open={open} type={type} setOpen={setOpen} setType={setType} />
		</>
	);
};

export default Header;
