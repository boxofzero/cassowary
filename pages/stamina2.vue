<template>
	<section class="flex items-center justify-between mb-10">
		<h1 class="text-4xl font-extrabold">Stamina Tracker</h1>
	</section>

	<section
		class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
	>
		<div>
			<div class="font-bold">Track Your Stamina</div>

			<div class="text-2xl font-extrabold text-black dark:text-white mb-2">
				<USkeleton class="h-8 w-full" v-if="loading" />
				<div v-else>
					{{ staminaStore.stamina }} / {{ staminaStore.maxStamina }}
				</div>
			</div>
		</div>
		<div class="flex items-center justify-between">
			<div class="font-bold">The stamina regen rate:</div>
			<div class="text-2xl font-extrabold text-black dark:text-white mb-2">
				<USkeleton class="h-8 w-full" v-if="loading" />
				<div v-else>{{ staminaStore.secondsPerStamina }} seconds / stamina</div>
			</div>
		</div>
		<div class="flex items-center justify-between">
			<div class="font-bold">Your Stamina will be full at</div>
			<div class="text-2xl font-extrabold text-black dark:text-white mb-2">
				<USkeleton class="h-8 w-full" v-if="loading" />
				<!-- <div v-else @stamina-updated="getFullStaminaAt()"> -->
				<div v-else>
					{{ staminaStore.fullStaminaAt }}
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
import { storeToRefs } from 'pinia';
import { useStaminaStore } from '@/stores/stamina';
import { MAX_STAMINA, SECONDS_PER_STAMINA } from '~/constants';

const loading = false;

const { staminaData } = useStaminaRepo();

console.log('getStaminaData: ', staminaData());

const staminaStore = useStaminaStore();

onMounted(() => {
	if (!process.client) return;
	// init staminaStore values
	staminaStore.maxStamina = MAX_STAMINA;
	staminaStore.secondsPerStamina = SECONDS_PER_STAMINA;

	staminaStore.stamina = staminaData().value.stamina;
	// staminaStore.stamina = 2;

	// update fullStaminaAt
	const diffStamina = staminaStore.maxStamina - staminaStore.stamina;
	staminaStore.fullStaminaAt = new Date(
		Date.now() + diffStamina * staminaStore.secondsPerStamina * 1000
	);
	console.log('staminaStore.fullStaminaAt: ', staminaStore.fullStaminaAt);

	// update stamina every interval time
	setInterval(() => {
		staminaStore.updateStamina(1);
		console.log('1 s tick');
	}, staminaStore.secondsPerStamina * 1000);
	//
});
</script>
