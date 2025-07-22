import { useStorage } from '@vueuse/core';
import { MAX_STAMINA, getSecondsPerStamina } from '~/libraries/constants';

const staminaRepo = () => {
	return useStorage('stamina', {
		stamina: 0,
		staminaUpdatedAt: Date.now(),
	});
};

export const useStaminaStore = defineStore('stamina', () => {
	const maxStamina = ref(MAX_STAMINA);
	const secondsPerStamina = ref(getSecondsPerStamina());
	const stamina = ref(0);
	const staminaUpdatedAt = ref(Date.now());
	const fullStaminaAt = ref(0);

	function initStaminaData() {
		stamina.value = staminaRepo().value.stamina;
		staminaUpdatedAt.value = staminaRepo().value.staminaUpdatedAt;
		updateFullStaminaAt();
	}

	function syncStaminaData() {
		// absolute calculation of stamina
		// calc additional stamina since staminaUpdatedAt
		const diffTime = Date.now() - staminaUpdatedAt.value;
		const additionalStamina = Math.floor(
			diffTime / (secondsPerStamina.value * 1000)
		);
		const alreadyPassedTime = diffTime % (secondsPerStamina.value * 1000);
		if (additionalStamina <= 0) {
			return;
		}

		if (stamina.value + additionalStamina > maxStamina.value) {
			stamina.value = maxStamina.value;
		} else {
			stamina.value += additionalStamina;
		}
		staminaUpdatedAt.value =
			staminaUpdatedAt.value +
			alreadyPassedTime +
			additionalStamina * secondsPerStamina.value * 1000;

		// update fullStaminaAt
		updateFullStaminaAt();

		// update into staminaRepo
		// this is a bit direct usage of API
		// but i don't want to over engineer
		// should be more agnostic similar to interface but nah
		staminaRepo().value = {
			stamina: stamina.value,
			staminaUpdatedAt: staminaUpdatedAt.value,
		};
	}

	function updateFullStaminaAt() {
		const diffStamina = maxStamina.value - stamina.value;
		fullStaminaAt.value =
			Date.now() + diffStamina * secondsPerStamina.value * 1000;
	}

	function updateStaminaOverflow(additionalStamina) {
		updateStamina(additionalStamina, true);
	}

	function updateStamina(additionalStamina, allowOverflow = false) {
		// validation
		if (!allowOverflow) {
			if (stamina.value >= maxStamina.value) return;
		}

		const staminaAddTest = (stamina.value + additionalStamina)

		// If button presses result in overflow, set the stamina to max or min to keep within bounds
		if (staminaAddTest > maxStamina.value) stamina.value = maxStamina.value
		else if (staminaAddTest < 0) stamina.value = 0;
		else stamina.value += additionalStamina;
		
		// update staminaUpdatedAt
		const updatedAt = Date.now();
		const alreadyRecoveringTime =
			(updatedAt - staminaUpdatedAt.value) % (secondsPerStamina.value * 1000);
		staminaUpdatedAt.value = updatedAt - alreadyRecoveringTime;

		// update fullStaminaAt
		updateFullStaminaAt();

		// update into staminaRepo
		// this is a bit direct usage of API
		// but i don't want to over engineer
		// should be more agnostic similar to interface but nah
		staminaRepo().value = {
			stamina: stamina.value,
			staminaUpdatedAt: staminaUpdatedAt.value,
		};
	}

	return {
		maxStamina,
		secondsPerStamina,
		stamina,
		staminaUpdatedAt,
		fullStaminaAt,
		initStaminaData,
		syncStaminaData,
		updateFullStaminaAt,
		updateStaminaOverflow,
		updateStamina,
	};
});
