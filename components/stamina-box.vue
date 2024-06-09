<template>
	<div>
		<div class="font-bold">{{ title }}</div>

		<div class="text-2xl font-extrabold text-black dark:text-white mb-2">
			<USkeleton class="h-8 w-full" v-if="loading" />
			<div v-else>{{ currentStamina }} / {{ maxStamina }}</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	title: String,
	currentStamina: Number,
	maxStamina: Number,
	loading: Boolean,
});
</script>

<style scoped>
.green {
	@apply text-green-600 dark:text-green-400;
}
.red {
	@apply text-red-600 dark:text-red-400;
}
</style>
