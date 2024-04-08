/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
module.exports = {
	tabWidth: 4,
	arrowParens: 'always',
	useTabs: true,
	bracketSpacing: true,
	jsxBracketSameLine: false,
	singleQuote: true,
	trailingComma: 'all',
	semi: true,
	importOrder: ['^components/(.*)$', '^[./]'],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	plugins: [
		'@trivago/prettier-plugin-sort-imports',
		'prettier-plugin-tailwindcss',
	],
};
