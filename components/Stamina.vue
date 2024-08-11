<template>
	<section class="flex flex-wrap gap-5">
		<div>
			<div class="font-bold">Track Your Stamina</div>
			<div class="text-2xl font-extrabold mb-2">
				<div>{{ staminaStore.stamina }} / {{ staminaStore.maxStamina }}</div>
			</div>
			<div class="font-bold">Stamina regen rate</div>
			<div class="text-xl mb-2">
				<div>{{ staminaRate }} / stamina</div>
			</div>
		</div>
		<div class="">
			<div class="font-bold">Your Stamina will be:</div>
			<div class="text-sm mb-2 columns-1">
				<div v-for="(item, index) in calculateFutureStaminaAt()" :key="index">
					{{ index }} at {{ new Intl.DateTimeFormat('en-US', { timeStyle: 'medium', hourCycle: 'h23' }).format(item) }}
				</div>
			</div>
		</div>
		<div class="">
			<div class="font-bold">Adjust Stamina</div>
			<div class="grid grid-cols-4 gap-2">
				<div class="h-8 w-10 flex items-center justify-center" v-for="(item, index) in staminaButtonList()"
					:key="index">
					<UButton class="h-8 w-10 flex items-center justify-center" :color="parseInt(item) < 0 ? 'yellow' : 'green'"
						variant="solid" :padded="false" @click="staminaStore.updateStaminaOverflow(parseInt(item))">
						<span class="justify-self-center">
							{{ item }}
						</span>
					</UButton>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { useStaminaStore } from '~/stores/staminaStore';
import { MAX_STAMINA } from '~/libraries/constants';

const staminaStore = useStaminaStore();
const staminaRate = computed(() => {
	if ((staminaStore.secondsPerStamina % 60) !== 0) {
		return (staminaStore.secondsPerStamina) + ' seconds';
	}
	return (staminaStore.secondsPerStamina / 60) + ' minutes';
});

const staminaButtonList = () => {
	let list = []
	for (let sign of ['-', '+']) {
		for (let number of ['1', '20', '40', '60']) {
			list.push(sign + number);
		}
	}
	return list
}

const calculateFutureStaminaAt = () => {
	let startStamina = 60;

	const data = {};
	while (startStamina <= MAX_STAMINA) {
		if (startStamina >= staminaStore.stamina) {
			let diffStamina = startStamina - staminaStore.stamina;
			data[startStamina] =
				staminaStore.staminaUpdatedAt +
				diffStamina * staminaStore.secondsPerStamina * 1000;
		}
		startStamina += 60;
	}

	return data;
};

let updateStaminaInterval = () => {
	return setInterval(() => {
		staminaStore.syncStaminaData();
	}, 10 * 1000);
};

let intervalId;

onBeforeMount(() => {
	// init stamina state values
	staminaStore.initStaminaData();
	staminaStore.syncStaminaData();
});

onMounted(() => {
	// update stamina every interval time
	intervalId = updateStaminaInterval();
});

onUnmounted(() => {
	clearInterval(intervalId);
});
</script>
