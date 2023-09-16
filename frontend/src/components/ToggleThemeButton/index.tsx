import useDarkMode from "../../hooks/useDarkMode";
import { HiSun } from "react-icons/hi";
import { RiMoonClearFill } from "react-icons/ri";

const ToggleThemeButton = () => {
	const [isDarkMode, toggleDarkMode] = useDarkMode();
	return (
		<div className="flex items-center">
			<button
				onClick={() => toggleDarkMode()}
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
					<HiSun fontSize={28} className="text-yellow animate-spinSlow" />
				)}
			</button>
		</div>
	);
};

export default ToggleThemeButton;
