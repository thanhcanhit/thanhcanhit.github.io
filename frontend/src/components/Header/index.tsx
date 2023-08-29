import Logo from "../Logo";
import ToggleThemeButton from "../ToggleThemeButton";

const Header = () => {
	return (
		<nav className="bg-white border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700">
			<div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
				<div className="flex gap-2">
					<Logo />
					<ToggleThemeButton />
				</div>

				{/* Mobile menu */}
				<button
					data-collapse-toggle="navbar-dropdown"
					type="button"
					className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm rounded-lg text-slate-500 lg:hidden hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:text-slate-400 dark:hover:bg-slate-700 dark:focus:ring-slate-600"
					aria-controls="navbar-dropdown"
					aria-expanded="false"
				>
					<span className="sr-only">Open main menu</span>
					<svg
						className="w-5 h-5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 17 14"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M1 1h15M1 7h15M1 13h15"
						/>
					</svg>
				</button>

				{/* Right */}
				<div
					className="hidden w-full lg:block lg:w-auto"
					id="navbar-dropdown"
				>
					<ul className="flex flex-col gap-2 p-4 mt-4 font-medium border border-gray-100 rounded-lg lg:gap-0 lg:p-0 bg-gray-50 lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
						<li className="self-center">
							{/* <Account /> */}
							<button type="button" className="button-normal">
								Login
							</button>
							<button type="button" className="button-normal">
								Register
							</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Header;
