module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: ['react'],
	rules: {
		'react-hooks/rules-of-hooks': 'warn',
		'react-hooks/exhaustive-deps': 0,
		'react/jsx-props-no-spreading': 'warn',
		'react/prop-types': 0,
		'react/react-in-jsx-scope': 'warn',
		'react/jsx-key': 'warn',
		'react/jsx-fragments': 'warn',
		'react/no-unused-prop-types': 0,
		'no-mixed-spaces-and-tabs': 0, // disable rule
		'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }]
	},
	settings: {
		react: {
			version: 'detect'
		}
	}
};
