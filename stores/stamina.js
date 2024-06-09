import { useStorage } from '@vueuse/core';
import { MAX_STAMINA, SECONDS_PER_STAMINA } from '~/constants';

import { useStaminaRepo } from '~/composables/useStaminaRepo';

const { staminaRepo } = useStaminaRepo();

export const useStaminaStore = defineStore('stamina', {
	state: () => ({
		maxStamina: MAX_STAMINA,
		secondsPerStamina: SECONDS_PER_STAMINA,
		stamina: 0,
		staminaUpdatedAt: Math.floor(Date.now() / 1000),
		fullStaminaAt: Math.floor(Date.now() / 1000),
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
		initStaminaData() {
			this.stamina = staminaRepo().value.stamina;
			this.staminaUpdatedAt = staminaRepo().value.staminaUpdatedAt;
			this.updateFullStaminaAt();
		},
		updateFullStaminaAt() {
			// update fullStaminaAt
			const diffStamina = this.maxStamina - this.stamina;
			this.fullStaminaAt = new Date(
				Date.now() + diffStamina * this.secondsPerStamina * 1000
			);
		},
		updateStamina(additionalStamina) {
			if (!process.client) return;
			// update stamina and staminaUpdatedAt
			this.stamina += additionalStamina;
			this.staminaUpdatedAt = Math.floor(Date.now() / 1000);

			staminaRepo().value = {
				stamina: this.stamina,
				staminaUpdatedAt: this.staminaUpdatedAt,
			};

			// update fullStaminaAt
			this.updateFullStaminaAt();
		},
	},
});
