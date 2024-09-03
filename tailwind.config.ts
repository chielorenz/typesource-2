import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				shark: {
					'50': '#f5f5f6',
					'100': '#e6e6e7',
					'200': '#cfd0d2',
					'300': '#adaeb3',
					'400': '#84858c',
					'500': '#696a71',
					'600': '#5a5b60',
					'700': '#4c4d52',
					'800': '#434347',
					'900': '#3b3b3e',
					'950': '#1e1e20'
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
