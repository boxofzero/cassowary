export const generateTimestamp = (datetime) => {
	return datetime
		.toLocaleString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		})
		.replace(/[^\d]/g, '')
		.replace(/^(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})(\d{2})/, '$3$1$2_$4$5$6');
};
