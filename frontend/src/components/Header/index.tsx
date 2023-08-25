import Account from "./Account";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ToggleThemeButton from "./ToggleThemeButton";

const Header = () => {
	return (
		<nav className="fixed inset-0 bottom-auto bg-white border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700">
			<div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
				<Logo />

				{/* Mobile menu */}
				<button
					data-collapse-toggle="navbar-dropdown"
					type="button"
					className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
					className="hidden w-full md:block md:w-auto"
					id="navbar-dropdown"
				>
					<ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						<li className="self-center">
							<ToggleThemeButton />
						</li>
						<li>
							<SearchBar />
						</li>
						<li className="self-center ">
							<Account />
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Header;
