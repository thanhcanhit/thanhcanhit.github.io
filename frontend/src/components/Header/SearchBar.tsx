const SearchBar = () => {
	return (
		<form>
			<div className="flex">
				<label
					htmlFor="search-dropdown"
					className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
				>
					thanhcanh.dev@gmail.com
				</label>
				<button
					id="dropdown-button"
					data-dropdown-toggle="dropdown"
					className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
					type="button"
				>
					All categories{" "}
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
				<div
					id="dropdown"
					className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
				>
					<ul
						className="py-2 text-sm text-gray-700 dark:text-gray-200"
						aria-labelledby="dropdown-button"
					>
						<li>
							<button
								type="button"
								className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
							>
								Website
							</button>
						</li>
						<li>
							<button
								type="button"
								className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
							>
								Application
							</button>
						</li>
						<li>
							<button
								type="button"
								className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
							>
								Frontend
							</button>
						</li>
						<li>
							<button
								type="button"
								className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
							>
								Backend
							</button>
						</li>
					</ul>
				</div>
				<div className="relative w-full">
					<input
						type="search"
						id="search-dropdown"
						className="block p-2.5  w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-primary"
						placeholder="Search "
						required
					/>
					<button
						type="submit"
						className="absolute top-0 right-0 p-2.5 px-4 text-sm font-medium h-full text-white bg-dark-primary rounded-r-lg border border-dark-primary hover:brightness-75 focus:ring-4 focus:outline-none focus:ring-primary dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary"
					>
						<svg
							className="w-4 h-4"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 20"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
							/>
						</svg>
						<span className="sr-only">Search</span>
					</button>
				</div>
			</div>
		</form>
	);
};

export default SearchBar;
