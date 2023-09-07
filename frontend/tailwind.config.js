/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: "#6fc183",
				"light-grey-1": "#EFF0F3",
				"light-grey-2": "#E4E5E9",
				grey: "#C0C0C0",
				"dark-grey": "#9A9494",
				white: "#FFFFFE",
				black: "#2B2C34",
				yellow: "#FEC260",
				"dark-black": "#191919",
			},
			animation: {
				wiggle: "wiggle 1s ease-in-out infinite",
				spinSlow: "spin 5s linear infinite",
				flyUp: "flyUp .4s ease-in-out",
				flyDown: "flyDown .4s ease-in-out",
				float: "float 6s ease-in-out infinite",
			},
			keyframes: {
				wiggle: {
					"0%, 100%": { transform: "rotate(-3deg)" },
					"50%": { transform: "rotate(3deg)" },
				},
				flyUp: {
					"0%": { transform: "translate(0, 16px)", opacity: 0 },
					"100%": { transform: "translate(0, 0)", opacity: 1 },
				},
				flyDown: {
					"0%": { transform: "translate(0, -16px)", opacity: 0 },
					"100%": { transform: "translate(0, 0)", opacity: 1 },
				},
				float: {
					"0%": {
						transform: "translatey(0px)",
					},
					"50%": {
						transform: "translatey(-20px)",
					},
					"100%": {
						transform: "translatey(0px)",
					},
				},
			},
		},
	},
};
