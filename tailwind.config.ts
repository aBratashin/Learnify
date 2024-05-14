import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./ui/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				black: '#3B434E',
				gray: '#B3C0D9',
				'gray-light': '#EBEBEB',
				'gray-dark': '#6c7077',
				white: '#fff',
				primary: '#7351f5',
				'primary-hover': '#6344df',
				red: '#DE0000',
				'red-light': '#FC836D',
				green: '#007b48',
				'green-light': '#C8F8E4'
			}
		}
	},
	plugins: []
}
export default config
