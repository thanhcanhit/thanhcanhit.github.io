import { useState, useEffect } from "react";

export default function useDarkMode(): [boolean, () => void] {
	const LOCAL_KEY = "theme";
	const [isDarkMode, setDarkMode] = useState<boolean>(() => {
		const localData = localStorage.getItem(LOCAL_KEY) || "false";
		const prevIsDarkMode = Boolean(JSON.parse(localData));

		return (
			prevIsDarkMode ||
			(!(LOCAL_KEY in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches) ||
			false
		);
	});

	function handleToggleDarkMode() {
		const newValue = !isDarkMode;

		setDarkMode(newValue);
		localStorage.setItem(LOCAL_KEY, JSON.stringify(newValue));
	}

	useEffect(() => {
		document.documentElement.classList.toggle("dark", isDarkMode);
	}, [isDarkMode]);

	return [isDarkMode, handleToggleDarkMode];
}
