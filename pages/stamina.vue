<template>
	<section class="flex items-center justify-between mb-10">
		<h1 class="text-4xl font-extrabold">Stamina Tracker</h1>
	</section>

	<section
		class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
	>
		<StaminaBox
			color="green"
			title="Track your stamina"
			:current-stamina="stamina"
			:max-stamina="maxStamina"
			:loading="false"
			@stamina-updated="getCurrentStamina()"
		/>
		<div class="flex items-center justify-between">
			<div class="font-bold">Duration per stamina</div>
			<div class="text-2xl font-extrabold text-black dark:text-white mb-2">
				<USkeleton class="h-8 w-full" v-if="loading" />
				<div v-else>{{ durationInSecondsPerStamina }} seconds</div>
			</div>
		</div>
		<div class="flex items-center justify-between">
			<div class="font-bold">Your Stamina will be full at</div>
			<div class="text-2xl font-extrabold text-black dark:text-white mb-2">
				<USkeleton class="h-8 w-full" v-if="loading" />
				<div v-else @stamina-updated="getMaxStaminaAt()">
					<!-- {{ computedMaxStaminaAt }} -->
				</div>
			</div>
		</div>
		<div class="text-2xl font-extrabold text-black dark:text-white mb-2">
			<UButton
				color="white"
				variant="solid"
				label="-40"
				@click="updateStamina(-40)"
			/>
			<UButton
				color="white"
				variant="solid"
				label="-60"
				@click="updateStamina(-60)"
			/>
			<UButton
				color="white"
				variant="solid"
				label="+60"
				@click="updateStamina(60)"
			/>
		</div>
	</section>
</template>

<script setup>
import { useStorage } from '@vueuse/core';

// const emit = defineEmits(['stamina-updated']);
// const loading = ref(false);
// const currentStamina = ref(0);
const maxStamina = ref(240);
const durationInSecondsPerStamina = ref(8 * 60);
// const maxStaminaAt = ref('00:00:00');
// const durationInSecondsPerStamina = ref(8 * 60);

// TODO
// move all logic js to composable
// all time sensitive process will be outputted from 1 function to save codes
// related to the updating element

const {
	stamina,
	staminaUpdatedAt,
	pending,
	getStamina,
	updateStamina,
	refresh,
} = useUpdateStamina();
await refresh();

onMounted(() => {
	setInterval(() => {
		if (stamina.value >= maxStamina.value) return;
		if (!process.client) return;
		// console.log('check ticking 1s');
		updateStamina(1);
	}, 1000);
});

// const {
// 		stamina,
// 		staminaUpdatedAt,
// 		pending,
// 		getStamina,
// 		refresh: refreshPrevious,
// } = useStamina(0);
// await refresh();

// await refresh();

// onMounted(() => {
// 	setInterval(() => {
// if (currentStamina.value >= maxStamina.value) return;
// if (!process.client) return;
// // current unix time
// let currentTime = Math.floor(Date.now() / 1000);
// // get last updated time
// let lastUpdatedTime = Number(
// 	JSON.parse(localStorage.getItem('stamina')).updated_at
// );
// console.log('currentTime: ' + currentTime);
// console.log('lastUpdatedTime: ' + lastUpdatedTime);
// // calculate the difference
// let diff = currentTime - lastUpdatedTime;
// console.log('diff: ' + diff);
// calculate the stamina
// let stamina = Math.floor(diff / durationInSecondsPerStamina.value);
// console.log('stamina: ' + stamina);
// if (stamina <= 0) return;
// updateStamina(stamina);
// // count maxStaminaAt
// let maxStaminaAtTime =
// 	currentTime +
// 	(maxStamina.value - currentStamina.value) *
// 		durationInSecondsPerStamina.value;
// let maxStaminaAtDate = new Date(maxStaminaAtTime * 1000);
// maxStaminaAt.value = maxStaminaAtDate.toLocaleTimeString();
// 	}, 60000);
// });
</script>
