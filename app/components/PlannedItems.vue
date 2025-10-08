<template>
	<section>
		<div
			class="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
		>
			<div v-for="(item, index) in displayList()" :key="item.value" class="">
				<NuxtLink :to="item.link">
					<UCard
						:ui="{
							header: 'p-1 sm:p-1',
							body: 'p-1 sm:p-1',
							footer: 'p-1 sm:p-1',
						}"
					>
						<img
							class=""
							:src="(item && item.icon) || ''"
							:alt="(item && item.title) || ''"
							width="256"
							height="256"
						/>
						<!-- <UAvatar
							:src="(item && item.icon) || ''"
							:alt="(item && item.title) || ''"
							size="3xl"
						/> -->

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
