<template>
	<section>
		<div class="flex flex-wrap gap-2">
			<div v-for="(item, index) in displayList()" :key="item.value" class="">
				<NuxtLink :to="item.link">
					<UCard
						class="w-28"
						:ui="{
							body: {
								base: 'flex justify-center',
								padding: 'p-0 sm:p-0',
							},
							header: {
								base: '',
								padding: 'p-0 sm:p-0',
							},
						}"
					>
						<img class="size-24" :src="(item && item.icon) || ''" />

						<template #header>
							<div class="flex justify-center h-12">
								<span class="place-self-center text-sm text-center">{{
									(item && item.title) || ''
								}}</span>
							</div>
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
	return characterList().concat(weaponList());
};

const characterList = () => {
	let list = [];
	Object.entries(characters.value).forEach(function (
		[characterName, character],
		index
	) {
		const charData = gameCharacter.characters[characterName];
		const subtitle = charData.rarity + '⭐';
		list = list.concat({
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
	Object.entries(weapons.value).forEach(function ([weaponName, weapon], index) {
		const weapData = gameWeapon.weapons[weaponName];
		const subtitle = weapData.rarity + '⭐';
		list = list.concat({
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
	characters.value = usePlannedCharacterStore().getAllActivePlannedCharacters();
	weapons.value = usePlannedWeaponStore().getAllActivePlannedWeapons();
});
</script>
