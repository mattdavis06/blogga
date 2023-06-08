/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		container: {
			center: true,
		},
		extend: {
			colors: {
				primaryBlue: '#232E52',
				lightBlue: '#EBF2FE',
				pastelGreen: '#8CEEAD',
				yellow: '#F7DF61',
				white: '#FFF',
			},
			keyframes: {
				shake: {
					'0%, 100%': {
						transform: 'translateX(-1.5px)',
						animationTimingFunction: 'ease-in-out',
					},
					'50%': {
						transform: 'translateX(1.5px)',
						animationTimingFunction: 'ease-in-out',
					},
				},
			},
			animation: {
				shake: 'shake 0.1s 4',
			},
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
}
