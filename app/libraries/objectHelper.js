export function has(obj, key) {
	var keyParts = key.split('.');

	return (
		!!obj &&
		(keyParts.length > 1
			? has(obj[key.split('.')[0]], keyParts.slice(1).join('.'))
			: hasOwnProperty.call(obj, key))
	);
}

export function mergeWithSum(...sources) {
	const result = {};

	for (const source of sources) {
		for (const [key, value] of Object.entries(source)) {
			result[key] = (result[key] || 0) + (value || 0);
		}
	}

	return result;
}

export function pickBy(object) {
	const obj = {};
	for (const key in object) {
		if (object[key]) {
			obj[key] = object[key];
		}
	}
	return obj;
}

export function omit(obj, ...keysToOmit) {
	const result = {};

	for (const [key, value] of Object.entries(obj)) {
		if (!keysToOmit.includes(key)) {
			result[key] = value;
		}
	}

	return result;
}
