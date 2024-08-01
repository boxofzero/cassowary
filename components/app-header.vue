<template>
	<header class="flex justify-between items-center my-10">
		<UHorizontalNavigation
			:links="links"
			class="border-b dark:border-gray-800"
		/>
	</header>
</template>

<script setup>
const links = [
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
	],
];
</script>
