import { useState, useEffect } from "react";

export default function useDarkMode() {
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

	const handleToggleDarkMode: () => void = () => {
		const newValue = !isDarkMode;
		setDarkMode(newValue);
		localStorage.setItem(LOCAL_KEY, JSON.stringify(newValue));
	};

	useEffect(() => {
		document.documentElement.classList.toggle("dark", isDarkMode);
	}, [isDarkMode]);

	const control: [boolean, () => void] = [isDarkMode, handleToggleDarkMode];

	return control;
}
