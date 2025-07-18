export const transactionViewOptions = ['Yearly', 'Monthly', 'Daily'];
export const categories = ['Food', 'Housing', 'Car', 'Entertainment'];
export const types = ['Income', 'Expense', 'Saving', 'Invesment'];

export const MAX_STAMINA = 240;
// export const getSecondsPerStamina = 6 * 60;
export const getSecondsPerStamina = () => {
	if (import.meta.dev || import.meta?.env?.TEST?.toLowerCase?.() === 'true') {
		return 5;
	}
	return 6 * 60;
};
