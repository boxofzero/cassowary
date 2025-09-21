<template>
	<section
		class="gap-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3"
	>
		<div>
			<h2 class="font-bold">Track Your Stamina</h2>
			<div class="mb-2 font-extrabold text-2xl">
				{{ staminaStore.stamina }} / {{ staminaStore.maxStamina }}
			</div>
			<h3 class="font-bold">Stamina regen rate</h3>
			<div class="mb-2 text-xl">{{ staminaRate }} / stamina</div>
		</div>

		<div
			class="gap-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2"
		>
			<div class="">
				<h3 class="font-bold">Your Stamina will be:</h3>
				<div class="columns-1 mb-2 text-sm">
					<div v-for="(item, index) in calculateFutureStaminaAt()" :key="index">
						{{ index }} at {{ datetimeFormat(item) }}
					</div>
				</div>
			</div>
			<div class="">
				<div class="font-bold">Adjust Stamina</div>
				<div
					class="gap-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-1"
				>
					<div class="gap-4 grid grid-cols-4 max-w-3xl">
						<div
							class="flex justify-center items-center w-10 h-8"
							v-for="(item, index) in staminaButtonList()"
							:key="index"
						>
							<UButton
								class="flex justify-center items-center w-10 h-8"
								:color="parseInt(item) < 0 ? 'warning' : 'success'"
								variant="solid"
								:padded="false"
								@click="staminaStore.updateStaminaOverflow(parseInt(item))"
							>
								<span class="justify-self-center text-black dark:text-black">
									{{ item }}
								</span>
							</UButton>
						</div>
					</div>
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
	if (staminaStore.secondsPerStamina % 60 !== 0) {
		return staminaStore.secondsPerStamina + ' seconds';
	}
	return staminaStore.secondsPerStamina / 60 + ' minutes';
});

const datetimeFormat = (datetime) => {
	return new Intl.DateTimeFormat('en-US', {
		timeStyle: 'medium',
		hourCycle: 'h23',
	}).format(datetime);
};

const staminaButtonList = () => {
	let list = [];
	for (let sign of ['-', '+']) {
		for (let number of ['1', '20', '40', '60']) {
			list.push(sign + number);
		}
	}
	return list;
};

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
