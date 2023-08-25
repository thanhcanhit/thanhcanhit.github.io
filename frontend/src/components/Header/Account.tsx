const Account = () => {
	return (
		<>
			<button
				id="dropdownNavbarLink"
				data-dropdown-toggle="dropdownNavbar"
				className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
			>
				Thanh Canh{" "}
				<svg
					className="w-2.5 h-2.5 ml-2.5"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 10 6"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="m1 1 4 4 4-4"
					/>
				</svg>
			</button>
			{/* Dropdown menu */}
			<div
				id="dropdownNavbar"
				className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
			>
				<ul
					className="py-2 text-sm text-gray-700 dark:text-gray-400"
					aria-labelledby="dropdownLargeButton"
				>
					<li>
						<a
							href="#"
							className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Dashboard
						</a>
					</li>
					<li>
						<a
							href="#"
							className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Settings
						</a>
					</li>
					<li>
						<a
							href="#"
							className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Earnings
						</a>
					</li>
				</ul>
				<div className="py-1">
					<a
						href="#"
						className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
					>
						Sign out
					</a>
				</div>
			</div>
		</>
	);
};

export default Account;
