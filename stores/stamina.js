import { useStorage } from '@vueuse/core';
import { MAX_STAMINA, SECONDS_PER_STAMINA } from '~/constants';

const getDefaultSettings = () => ({
	value: {
		stamina: 0,
		staminaUpdatedAt: Math.floor(Date.now() / 1000),
	},
});

const getSettings = () => {
	if (!process.client) return getDefaultSettings();
	return useStorage('stamina', {
		stamina: 0,
		staminaUpdatedAt: Math.floor(Date.now() / 1000),
	});
};

export const useStaminaStore = defineStore('stamina', {
	state: () => ({
		stamina: getSettings().value.stamina,
		maxStamina: MAX_STAMINA,
		secondsPerStamina: SECONDS_PER_STAMINA,
		staminaUpdatedAt: getSettings().value.staminaUpdatedAt,
		fullStaminaAt: new Date(Date.now()),
	}),
	getters: {
		getStamina() {
			return this.stamina;
		},
		getStaminaUpdatedAt() {
			return this.staminaUpdatedAt;
		},
		getFullStaminaAt() {
			return this.fullStaminaAt;
		},
	},
	actions: {
		updateStamina(additionalStamina) {
			if (!process.client) return;
			// update stamina and staminaUpdatedAt
			this.stamina += additionalStamina;
			this.staminaUpdatedAt = Math.floor(Date.now() / 1000);

			// store to storage
			useStorage('stamina', {
				stamina: this.stamina,
				staminaUpdatedAt: this.staminaUpdatedAt,
			});

			// update fullStaminaAt
			const diffStamina = this.maxStamina - this.stamina;
			this.fullStaminaAt = new Date(
				Date.now() + diffStamina * this.secondsPerStamina * 1000
			);
		},
	},
});
