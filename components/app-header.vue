<template>
	<header class="flex justify-between items-center mt-10">
		<nav class="font-mono">
			<ul class="flex space-x-4">
				<li>
					<NuxtLink to="/">Main</NuxtLink>
				</li>
				<li>
					<NuxtLink to="/stamina">Stamina</NuxtLink>
				</li>
				<li>
					<NuxtLink to="/inventoryItems">Inventory</NuxtLink>
				</li>
				<li>
					<NuxtLink to="/characters">Characters</NuxtLink>
				</li>
				<!-- <li>
					<NuxtLink to="/characters/new">Characters</NuxtLink>
				</li> -->
			</ul>
		</nav>
		<NuxtLink to="/" class="text-xl font-bold">
			PRE-ALPHA WUWA TODO APP
		</NuxtLink>
		<div>
			<UAvatar src="https://placehold.co/100/png" alt="Avatar" />
		</div>
	</header>
</template>
