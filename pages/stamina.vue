<template>
	<section class="flex items-center justify-between mb-10">
		<h1 class="text-4xl font-extrabold">Stamina Tracker</h1>
	</section>

	<section
		class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
	>
		<div>
			<div class="font-bold">Track Your Stamina</div>

			<div class="text-2xl font-extrabold text-white mb-2">
				<USkeleton class="h-8 w-full" v-if="loading" />
				<div v-else>
					{{ staminaStore.stamina }} / {{ staminaStore.maxStamina }}
				</div>
			</div>
		</div>
		<div class="flex items-center justify-between">
			<div class="font-bold">The stamina regen rate:</div>
			<div class="text-2xl font-extrabold text-white mb-2">
				<USkeleton class="h-8 w-full" v-if="loading" />
				<!-- <div v-else>{{ staminaStore.secondsPerStamina }} seconds / stamina</div> -->
				<div v-else>{{ staminaRate }} minutes / stamina</div>
			</div>
		</div>
		<div class="flex items-center justify-between">
			<div class="font-bold">Your Stamina will be full at</div>
			<div class="text-2xl font-extrabold text-white mb-2">
				<div>
					{{ moment(staminaStore.fullStaminaAt).format('YYYY-MM-DD HH:mm:ss') }}
				</div>
			</div>
		</div>
		<div class="text-2xl font-extrabold text-white mb-2">
			<UButton
				color="white"
				variant="solid"
				label="-1"
				@click="staminaStore.updateStaminaOverflow(-1)"
			/>
			<UButton
				color="white"
				variant="solid"
				label="+1"
				@click="staminaStore.updateStaminaOverflow(+1)"
			/>
			<UButton
				color="white"
				variant="solid"
				label="-40"
				@click="staminaStore.updateStaminaOverflow(-40)"
			/>
			<UButton
				color="white"
				variant="solid"
				label="-60"
				@click="staminaStore.updateStaminaOverflow(-60)"
			/>
			<UButton
				color="white"
				variant="solid"
				label="+60"
				@click="staminaStore.updateStaminaOverflow(60)"
			/>
		</div>
	</section>
</template>

<script setup>
import { useStaminaStore } from '~/stores/staminaStore';
import moment from 'moment';

const loading = false;

const staminaStore = useStaminaStore();
const staminaRate = computed(() => {
	if (staminaStore.secondsPerStamina < 60) {
		return (staminaStore.secondsPerStamina / 60).toPrecision(3);
	}
	return staminaStore.secondsPerStamina / 60;
});

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
