import { useState, useEffect } from "react";

export default function useDarkMode() {
	const [isDarkMode, setDarkMode] = useState(() => {
		const localData = localStorage.getItem("TC_DARK_MODE");
		const prevIsDarkMode = JSON.parse(localData);

		return (
			prevIsDarkMode ||
			(!("TC_DARK_MODE" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches) ||
			false
		);
	});

	const handleToggleDarkMode = () => {
		setDarkMode(!isDarkMode);
		localStorage.setItem("TC_DARK_MODE", !isDarkMode);
	};

	useEffect(() => {
		document.documentElement.classList.toggle("dark", isDarkMode);
	}, [isDarkMode]);

	return [isDarkMode, handleToggleDarkMode];
}
