<template>
	<header class="my-5">
		<div class="flex justify-between">
			<!-- Desktop: Horizontal Menu -->
			<UNavigationMenu
				v-if="isMediumScreen"
				orientation="horizontal"
				:items="links"
			/>

			<!-- Mobile Popover Navigation -->
			<UDropdownMenu
				v-else
				:items="links"
				:ui="{
					content: 'w-48',
				}"
			>
				<UButton icon="i-lucide-menu" color="neutral" variant="outline" />
			</UDropdownMenu>
			<div class="flex items-center">
				<UBadge
					:avatar="{
						src: useRuntimeConfig().app.baseURL + 'favicon.ico',
					}"
					:trailing-icon="icon"
					@click="isDark = !isDark"
					variant="outline"
					size="lg"
					color="neutral"
				>
					Cassowary (Pre-alpha version)
				</UBadge>
			</div>
		</div>
	</header>
</template>

<script setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

// Responsive utility: show dropdown on small screens
const breakpoints = useBreakpoints(breakpointsTailwind);
// adjust breakpoint if needed
const isBigScreen = breakpoints.greater('xl');
const isMediumScreen = breakpoints.greater('md');
const isSmallScreen = breakpoints.smaller('lg');

// dark mode
const colorMode = useColorMode();
const isDark = computed({
	get() {
		return colorMode.value === 'dark';
	},
	set() {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
	},
});

const icon = computed(() =>
	isDark.value
		? 'material-symbols:dark-mode-outline-rounded'
		: 'material-symbols:light-mode-outline-rounded'
);

watch(isDark, (newValue) => {
	icon.value = newValue
		? 'material-symbols:dark-mode-outline-rounded'
		: 'material-symbols:light-mode-outline-rounded';
});

// link config
const links = ref([
	{
		label: 'Home',
		icon: 'material-symbols:house-with-shield',
		to: '/',
	},
	{
		label: 'Inventory',
		icon: 'material-symbols:checked-bag',
		to: '/inventoryItems',
	},
	{
		label: 'Characters',
		icon: 'material-symbols:emoji-people-rounded',
		to: '/characters',
	},
	{
		label: 'Weapons',
		icon: 'material-symbols:sword-rose',
		to: '/weapons',
	},
	{
		label: 'Settings',
		icon: 'material-symbols:settings',
		to: '/settings',
	},
	{
		label: 'About',
		icon: 'material-symbols:help',
		to: '/about',
	},
]);
</script>
