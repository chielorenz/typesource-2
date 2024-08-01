import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				shark: {
					'50': '#f4f6f7',
					'100': '#e3e8ea',
					'200': '#cad3d7',
					'300': '#a5b4bb',
					'400': '#788d98',
					'500': '#5d717d',
					'600': '#505f6a',
					'700': '#455159',
					'800': '#3e464c',
					'900': '#373d42',
					'950': '#24292e'
				},
				mauve: {
					'50': '#faf5ff',
					'100': '#f4e9fe',
					'200': '#ead7fd',
					'300': '#d2a8fa',
					'400': '#c389f7',
					'500': '#ac5cf0',
					'600': '#973be2',
					'700': '#8129c7',
					'800': '#6d27a2',
					'900': '#592182',
					'950': '#3d0b60'
				}
			}
		}
	},

	plugins: []
} as Config;
