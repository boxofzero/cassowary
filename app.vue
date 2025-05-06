<template>
	<UApp>
		<NuxtPage />
	</UApp>
</template>

<script setup>
useHead({
	title: 'Cassowary : Wuthering Waves Planner',
	meta: [
		{
			name: 'description',
			content: 'Cassowary : Wuthering Waves Planner',
		},
	],

	link: [
		{
			rel: 'icon',
			type: 'image/x-icon',
			href: useRuntimeConfig().app.baseURL + 'favicon.ico',
		},
	],
});
</script>
