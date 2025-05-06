<template>
	<header class="flex justify-between items-center my-5">
		<UNavigationMenu
			orientation="horizontal"
			:items="links"
			class="border-gray-800 border-b"
		/>
	</header>
</template>

<script setup>
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
const links = computed(() => [
	[
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
	],
	[
		{
			label: 'Cassowary (Pre-alpha version)',
			avatar: {
				src: useRuntimeConfig().app.baseURL + 'favicon.ico',
			},
		},
		{
			icon: icon.value,
			onClick: () => {
				isDark.value = !isDark.value;
			},
		},
	],
]);
</script>
