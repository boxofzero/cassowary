<template>
	<header class="flex justify-between items-center mt-10">
		<nav class="font-mono">
			<ul class="flex space-x-4">
				<li>
					<NuxtLink to="/">Main</NuxtLink>
				</li>
				<li>
					<NuxtLink to="/stamina">Stamina Tracker</NuxtLink>
				</li>
				<li>
					<NuxtLink to="/inventories">Inventories</NuxtLink>
				</li>
				<li>
					<NuxtLink to="/characters">Characters</NuxtLink>
				</li>
				<li>
					<NuxtLink to="/characters/new">New Characters</NuxtLink>
				</li>
			</ul>
		</nav>
		<NuxtLink to="/" class="text-xl font-bold"> Finance Tracker </NuxtLink>
		<div>
			<UAvatar src="https://placehold.co/100/png" alt="Avatar" />
		</div>
	</header>
</template>
