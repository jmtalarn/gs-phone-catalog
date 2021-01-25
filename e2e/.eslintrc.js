module.exports = {
	env: {
		browser: true,
		es6: true,
		'cypress/globals': true,
	},
	extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:cypress/recommended'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	plugins: ['cypress'],
	rules: {
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-console': 'error',
	},
};
