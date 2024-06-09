export const useUpdateStamina = () => {
	const stamina = ref(0);
	const staminaUpdatedAt = ref(0);
	const pending = ref(false);

	const getStamina = async () => {
		pending.value = true;
		try {
			// TODO fetch from localstorage , now just dummy
			return 200;
		} finally {
			pending.value = false;
		}
	};

	const updateStamina = async (additionalStamina) => {
		pending.value = true;
		try {
			stamina.value += additionalStamina;
			// TODO store value to localStorage
		} finally {
			pending.value = false;
		}
	};

	const refresh = async () => (stamina.value = await getStamina());

	watch(stamina, async () => await refresh());

	return {
		stamina,
		staminaUpdatedAt,
		pending,
		getStamina,
		updateStamina,
		refresh,
	};
};
