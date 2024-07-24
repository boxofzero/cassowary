<template>
	<section class="">
		<h1 class="">Add New Weapon To Planner</h1>
	</section>
	<!--
	add weapon yinlin
	load weapon yinlin material requirement
	if user has planned weapon where yinlin, load the data
	if user doesnt have planned weapon yinlin, prepare new planned weapon
	-->
	<div>
		<h2>WEAPON NAME</h2>
		<v-autocomplete
			label="Select"
			:items="weaponList()"
			item-title="title"
			item-value="value"
			:menu-props="{ maxHeight: '200' }"
			:custom-filter="customFilter"
			v-model="weaponName"
			@update:modelValue="getOrInitPlannedWeapon($event)"
		>
			<template v-slot:item="{ props, item }">
				<v-list-item
					v-bind="props"
					:subtitle="item.raw.subtitle"
					:prepend-avatar="item.raw.icon"
				>
				</v-list-item>
			</template>
		</v-autocomplete>
	</div>
	<section v-show="isWeaponNameSet">
		<UDivider label="LEVEL" />
		<div>
			<div class="grid grid-cols-2 gap-2">
				<v-select
					label="Current Level"
					:items="levelItems"
					item-title="label"
					item-value="value"
					v-model="weapon['weap_current_level']"
					:model-value="weapon['weap_current_level'] || 1"
					@update:modelValue="upsertPlannedWeapon()"
				></v-select>
				<v-select
					label="Target Level"
					:items="levelItems"
					item-title="label"
					item-value="value"
					v-model="weapon['weap_target_level']"
					:model-value="weapon['weap_target_level'] || 1"
					@update:modelValue="upsertPlannedWeapon()"
				></v-select>
			</div>
		</div>
		<UDivider label="MATERIAL NEEDED" />
		<section>
			<div class="grid grid-cols-6 gap-6">
				<div class="" v-for="(item, index) in materials" :key="index">
					<InventoryItemMaterialCard
						:index="index"
						:item="item"
					></InventoryItemMaterialCard>
				</div>
			</div>
		</section>
	</section>
</template>

<script setup>
import { weapons } from '~/data/game/gameWeapon';
import * as dbPlannedWeapon from '@/data/database/dbPlannedWeapon';
import { levelItems } from '@/data/form/weapons/formWeaponsNew';
import { usePlannedWeaponStore } from '@/stores/plannedWeaponStore';
import * as weaponService from '@/services/weaponService';
import * as inventoryService from '@/services/inventoryService';

// FORM DATA
const weaponList = () => {
	let list = [];
	useForEach(weapons, (weapon, weaponName) => {
		const subtitle = weapon.rarity + '⭐ ' + weapon.weapon_type;
		list = useConcat(list, {
			value: weaponName,
			title: weapon.display_name,
			subtitle: subtitle,
			icon: weapon.icon,
		});
	});
	return list;
};

const customFilter = (itemTitle, queryText, item) => {
	const textOne = item.raw.title.toLowerCase();
	const textTwo = item.raw.subtitle.toLowerCase();
	const searchText = queryText.toLowerCase();

	return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1;
};

// STORE
const plannedWeaponStore = usePlannedWeaponStore();

const weaponName = ref('');
const isWeaponNameSet = computed(() => {
	return !!weaponName.value;
});
const weapon = ref({ ...dbPlannedWeapon.weapon });
const materials = ref({});

// METHODS
const getOrInitPlannedWeapon = (weaponName) => {
	weapon.value = plannedWeaponStore.getOrInitEntry(weaponName);
	weapon.value['name'] = weaponName;

	materials.value = getMaterialsNeeded(weaponName);
};

const upsertPlannedWeapon = () => {
	if (!weaponName.value) {
		return;
	}

	plannedWeaponStore
		.upsert(weapon.value['name'], useOmit(weapon.value, 'name'))
		.then(() => {
			materials.value = getMaterialsNeeded(weaponName.value);
		});
};

const getMaterialsNeeded = (weaponName) => {
	const neededMaterials = weaponService.getWeaponNeededMaterials(weaponName);
	const ownedNeededMaterialsResponseData =
		inventoryService.getOwnedNeededMaterialsResponseData(neededMaterials);
	return ownedNeededMaterialsResponseData;
};

// TODO set DONE (consume material
// and increase current and set done passive)

onBeforeMount(() => {
	plannedWeaponStore.init();
});
</script>
