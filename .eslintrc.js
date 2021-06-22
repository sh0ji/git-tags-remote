module.exports = {
	extends: [
		'airbnb-base',
	],
	parserOptions: {
		project: './tsconfig.json',
	},
	rules: {
		indent: ['error', 'tab'],
		'no-tabs': 0,
	},
	overrides: [
		{
			files: ['*.ts'],
			extends: [
				'plugin:import/typescript',
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
			],
			rules: {
				indent: 'off',
				'no-tabs': 'off',
				'@typescript-eslint/indent': ['error', 'tab'],
				'@typescript-eslint/no-empty-interface': 'off',
				'import/no-extraneous-dependencies': ['error', { packageDir: ['.'] }],
			},
			settings: {
				'import/resolver': {
					node: {
						extensions: ['.js', '.ts', '.json'],
					},
				},
				'import/extensions': ['.js', '.ts', '.mjs'],
			},
		},
	],
};
