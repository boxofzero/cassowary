// composables/useLogArgs.js
export default function useLogArgs(argsObj) {
	if (process.env.NODE_ENV === 'production') return;

	for (const [key, value] of Object.entries(argsObj)) {
		const serialized =
			typeof value === 'object' && value !== null
				? JSON.stringify(value)
				: String(value);
		console.log(`${key}: ${serialized}`);
	}
}
