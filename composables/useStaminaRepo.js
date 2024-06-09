import { useStorage } from '@vueuse/core';

export const useStaminaRepo = () => {
	const getDefaultStaminaRepo = () => ({
		stamina: 0,
		staminaUpdatedAt: Math.floor(Date.now() / 1000),
	});

	// this is localstorage adapter object
	const staminaRepo = () => {
		return useStorage('stamina', getDefaultStaminaRepo());
	};

	return {
		getDefaultStaminaRepo,
		staminaRepo,
	};
};
