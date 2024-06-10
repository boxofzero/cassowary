import { MAX_STAMINA, SECONDS_PER_STAMINA } from '~/libraries/constants';
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
			const diffStamina = this.maxStamina - this.stamina;
			this.fullStaminaAt =
				Date.now() + diffStamina * this.secondsPerStamina * 1000;
		},
		updateStaminaOverflow(additionalStamina) {
			this.updateStamina(additionalStamina, true);
		},
		updateStamina(additionalStamina, allowOverflow = false) {
			if (!process.client) return;

			// validation
			if (!allowOverflow && this.stamina >= this.maxStamina) return;
			if (this.stamina <= 0) return;

			// update stamina and staminaUpdatedAt
			this.stamina += additionalStamina;
			this.staminaUpdatedAt = Date.now();

			// update fullStaminaAt
			this.updateFullStaminaAt();

			// update into staminaRepo
			// this is a bit direct usage of API
			// but i don't want to over engineer
			// should be more agnostic similar to interface but nah
			staminaRepo().value = {
				stamina: this.stamina,
				staminaUpdatedAt: this.staminaUpdatedAt,
			};
		},
	},
});
