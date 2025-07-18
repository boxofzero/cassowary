export function capitalize(string) {
	return string
		? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
		: '';
}

export function startCase(str) {
	return str
		.replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase → camel Case
		.replace(/[_\-]+/g, ' ') // snake_case / kebab-case → space
		.replace(/\s+/g, ' ') // multiple spaces → single
		.trim() // remove leading/trailing space
		.toLowerCase() // normalize case
		.replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize each word
}
