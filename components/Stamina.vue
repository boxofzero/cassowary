<template>
	<section class="flex items-center justify-between mb-10">
		<h1 class="text-4xl font-extrabold">Stamina Tracker</h1>
	</section>

	<section
		class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
	>
		<div>
			<div class="font-bold">Track Your Stamina</div>
			<div class="text-2xl font-extrabold mb-2">
				<div>{{ staminaStore.stamina }} / {{ staminaStore.maxStamina }}</div>
			</div>
			<div class="font-bold">Stamina regen rate</div>
			<div class="text-xl mb-2">
				<div>{{ staminaRate }} minutes / stamina</div>
			</div>
		</div>
		<div class="">
			<div class="font-bold">Your Stamina will be</div>
			<div class="text-sm mb-2 columns-1">
				<!-- {{ moment(staminaStore.fullStaminaAt).format('YYYY-MM-DD HH:mm:ss') }} -->
				<div v-for="(item, index) in calculateFutureStaminaAt()" :key="index">
					{{ index }} at {{ moment(item).format('HH:mm:ss') }}
				</div>
			</div>
		</div>
		<div>
			<div class="font-bold">Adjust Stamina</div>
			<div class="grid grid-cols-3 gap-1 auto-rows-max auto-cols-auto">
				<div
					class=""
					v-for="(item, index) in ['-1', '-40', '-60', '+1', '+40', '+60']"
					:key="index"
				>
					<UButton
						:color="parseInt(item) < 0 ? 'yellow' : 'green'"
						variant="solid"
						@click="staminaStore.updateStaminaOverflow(parseInt(item))"
					>
						{{ item }}
					</UButton>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { useStaminaStore } from '~/stores/staminaStore';
import { MAX_STAMINA } from '~/libraries/constants';
import moment from 'moment';

const staminaStore = useStaminaStore();
const staminaRate = computed(() => {
	if (staminaStore.secondsPerStamina < 60) {
		return (staminaStore.secondsPerStamina / 60).toPrecision(3);
	}
	return staminaStore.secondsPerStamina / 60;
});

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
