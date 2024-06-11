import { MAX_STAMINA, SECONDS_PER_STAMINA } from '~/libraries/constants';
import { useStaminaRepo } from '~/composables/useStaminaRepo';

const { staminaRepo } = useStaminaRepo();

export const useStaminaStore = defineStore('stamina', () => {
	const maxStamina = ref(MAX_STAMINA);
	const secondsPerStamina = ref(SECONDS_PER_STAMINA);
	const stamina = ref(0);
	const staminaUpdatedAt = ref(0);
	const fullStaminaAt = ref(0);

	function initStaminaData() {
		this.stamina = staminaRepo().value.stamina;
		this.staminaUpdatedAt = staminaRepo().value.staminaUpdatedAt;
		this.updateFullStaminaAt();
	}
	function updateFullStaminaAt() {
		const diffStamina = this.maxStamina - this.stamina;
		this.fullStaminaAt =
			Date.now() + diffStamina * this.secondsPerStamina * 1000;
	}
	function updateStaminaOverflow(additionalStamina) {
		this.updateStamina(additionalStamina, true);
	}
	function updateStamina(additionalStamina, allowOverflow = false) {
		if (!process.client) return;

		// validation
		if (!allowOverflow) {
			if (this.stamina >= this.maxStamina) return;
		}

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
	}

	return {
		maxStamina,
		secondsPerStamina,
		stamina,
		staminaUpdatedAt,
		fullStaminaAt,
		initStaminaData,
		updateFullStaminaAt,
		updateStaminaOverflow,
		updateStamina,
	};
});
