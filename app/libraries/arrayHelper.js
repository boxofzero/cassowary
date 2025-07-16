export function orderBy(array, keys, orders) {
	return [...array].sort((a, b) => {
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const order = (orders?.[i] || 'asc').toLowerCase();
			const valA = a[key];
			const valB = b[key];

			if (valA === valB) continue;

			const compare = valA > valB ? 1 : -1;
			return order === 'desc' ? -compare : compare;
		}
		return 0;
	});
}
