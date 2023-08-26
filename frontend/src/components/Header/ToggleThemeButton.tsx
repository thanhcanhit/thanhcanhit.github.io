import useDarkMode from "../../hooks/useDarkMode";
import { HiSun } from "react-icons/hi";
import { RiMoonClearFill } from "react-icons/ri";

const ToggleThemeButton = () => {
	const [isDarkMode, toggleDarkMode] = useDarkMode();
	return (
		<div className="flex items-center">
			{/* <label className="relative inline-flex items-center ml-4 mr-5 cursor-pointer">
				<input
					type="checkbox"
					className="sr-only peer"
					checked={isDarkMode}
					onClick={toggleDarkMode}
				/>
				<div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600" />
			</label> */}
			<button
				onClick={toggleDarkMode}
				id="theme-toggle"
				type="button"
				className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
			>
				{isDarkMode ? (
					<RiMoonClearFill
						fontSize={22}
						className="text-yellow animate-wiggle"
					/>
				) : (
					<HiSun
						fontSize={28}
						className="text-yellow animate-spinSlow"
					/>
				)}
			</button>
		</div>
	);
};

export default ToggleThemeButton;
