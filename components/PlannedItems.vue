<template>
	<section class="flex items-center justify-between mb-10">
		<h1 class="text-4xl font-extrabold">Planned Characters & Weapons</h1>
	</section>

	<section>
		<div class="grid grid-cols-8 gap-1">
			<div v-for="(item, index) in displayList()" :key="item.value">
				<NuxtLink :to="item.link">
					<UCard>
						<!-- <template #header>
							<Placeholder class="h-8" />
							<div class="h-8"></div>
						</template> -->

						<!-- <Placeholder class="h-32" /> -->
						<img class="h-32" :src="(item && item.icon) || ''" />

						<template #footer>
							<!-- <Placeholder class="h-8" /> -->
							<span class="h-8">
								{{ (item && item.title) || '' }}
							</span>
						</template>
					</UCard>
				</NuxtLink>
			</div>
		</div>
	</section>
</template>

<script setup>
import { usePlannedCharacterStore } from '@/stores/plannedCharacterStore';
import { usePlannedWeaponStore } from '@/stores/plannedWeaponStore';
import * as gameCharacter from '@/data/game/gameCharacter';
import * as gameWeapon from '@/data/game/gameWeapon';

const characters = ref({});
const weapons = ref({});

const displayList = () => {
	return useConcat(characterList(), weaponList());
};

const characterList = () => {
	let list = [];
	useForEach(characters.value, (character, characterName) => {
		const charData = gameCharacter.characters[characterName];
		const subtitle = charData.rarity + '⭐';
		list = useConcat(list, {
			value: characterName,
			title: charData.display_name,
			subtitle: subtitle,
			icon: charData.icon,
			link: '/characters#' + characterName,
		});
	});
	return list;
};

const weaponList = () => {
	let list = [];
	useForEach(weapons.value, (weapon, weaponName) => {
		const weapData = gameWeapon.weapons[weaponName];
		const subtitle = weapData.rarity + '⭐';
		list = useConcat(list, {
			value: weaponName,
			title: weapData.display_name,
			subtitle: subtitle,
			icon: weapData.icon,
			link: '/weapons#' + weaponName,
		});
	});
	return list;
};

onBeforeMount(() => {
	usePlannedCharacterStore().init();
	usePlannedWeaponStore().init();
});

onMounted(() => {
	characters.value = usePlannedCharacterStore().plannedCharacters;
	weapons.value = usePlannedWeaponStore().plannedWeapons;
});
</script>
