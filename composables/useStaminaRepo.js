import { useStorage } from '@vueuse/core';

export const useStaminaRepo = () => {
	const getDefaultSettings = () => ({
		stamina: 0,
		staminaUpdatedAt: Math.floor(Date.now() / 1000),
	});

	// this is object that provide data while should also be able to update the data
	const staminaData = () => {
		return useStorage('stamina', getDefaultSettings());
	};

	return {
		getDefaultSettings,
		staminaData,
	};
};
