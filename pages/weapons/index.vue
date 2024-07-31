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
		<UInputMenu
			searchable
			searchable-placeholder="Select weapon"
			class="w-full lg:w-48"
			placeholder="Select weapon"
			v-model="weaponOption"
			:options="weaponList()"
			option-attribute="title"
			value-attribue="value"
			:search-attributes="['title', 'subtitle']"
			@change="getOrInitNuxtUi($event)"
		>
			<template #leading>
				<UAvatar :src="weaponOption.icon" size="2xs" />
			</template>
		</UInputMenu>
	</div>
	<section v-show="isWeaponNameSet">
		<UDivider label="LEVEL" />
		<div>
			<div class="grid grid-cols-2 gap-2">
				<span>Current Level</span>
				<USelect
					:options="levelItems"
					option-attribute="label"
					value-attribue="value"
					v-model="weapon['weap_current_level']"
					:model-value="weapon['weap_current_level'] || 1"
					@change="upsertPlannedWeapon()"
				/>
				<span>Target Level</span>
				<USelect
					:options="levelItems"
					option-attribute="label"
					value-attribue="value"
					v-model="weapon['weap_target_level']"
					:model-value="weapon['weap_target_level'] || 1"
					@change="upsertPlannedWeapon()"
				/>
			</div>
		</div>
		<UDivider label="MATERIAL NEEDED" />
		<section class="p-3">
			<UButton
				color="primary"
				variant="solid"
				@click="setDone"
				:disabled="!isMaterialsExist"
			>
				Done
			</UButton>
			<span class="inline-block align-middle">
				Press "DONE" to set the current level/skill to the target value and
				adjust the inventory item count
			</span>
		</section>
		<section>
			<div class="grid grid-cols-6 gap-6">
				<div class="" v-for="(item, index) in materials" :key="item.key">
					<InventoryItemMaterialCard
						:index="index"
						:item="item"
						:key="item.key"
						@update-material-count="doEmit"
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
import * as plannerService from '@/services/plannerService';

const weaponList = () => {
	let list = [];
	useForEach(weapons, (weapon, weaponName) => {
		const subtitle = weapon.rarity + '⭐ ' + weapon.weapon_type;
		list = useConcat(list, {
			value: weaponName,
			title: weapon.display_name,
			subtitle: subtitle,
			icon: weapon.icon,
			type: weapon.weapon_type,
		});
	});
	list = useOrderBy(list, ['type', 'subtitle', 'title'], ['asc', 'asc', 'asc']);
	return list;
};

const customFilter = (itemTitle, queryText, item) => {
	const textOne = item.raw.title.toLowerCase();
	const textTwo = item.raw.subtitle.toLowerCase();
	const searchText = queryText.toLowerCase();

	return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1;
};

const weaponName = ref('');
const isWeaponNameSet = computed(() => {
	return !!weaponName.value;
});
const weaponOption = ref({});

const weapon = ref({ ...dbPlannedWeapon.weapon });
const materials = ref({});
const isMaterialsExist = computed(() => {
	return Object.keys(materials.value).length > 0;
});

const doEmit = (a) => {
	console.log('emit received: ' + a);
	getOrInitPlannedWeapon(weaponName.value);
};

const getOrInitNuxtUi = (weaponOption) => {
	console.log('weaponOption: ' + JSON.stringify(weaponOption));
	weaponName.value = weaponOption.value;
	getOrInitPlannedWeapon(weaponOption.value);
};

const getOrInitPlannedWeapon = (weaponName) => {
	weapon.value = usePlannedWeaponStore().getOrInitEntry(weaponName);
	weapon.value['name'] = weaponName;

	materials.value = getNeededMaterials(weaponName);
};

const toast = useToast();

const upsertPlannedWeapon = () => {
	useDebounceFn(() => {
		if (!weaponName.value) {
			return;
		}

		usePlannedWeaponStore().upsert(
			weapon.value['name'],
			useOmit(weapon.value, 'name')
		);
	}, 100)().then(() => {
		if (!weaponName.value) {
			return;
		}
		toast.add({
			title:
				'Weapon ' +
				weapons[weaponName.value].display_name +
				' updated to LocalStorage',
			icon: 'i-heroicons-check-badge',
			timeout: 2000,
		});
		materials.value = getNeededMaterials(weaponName.value);
	});
};

const getNeededMaterials = (weaponName) => {
	const neededMaterials = weaponService.getWeaponNeededMaterials(weaponName);
	const ownedNeededMaterialsResponseData =
		inventoryService.getOwnedNeededMaterialsResponseData(neededMaterials);
	return ownedNeededMaterialsResponseData;
};

const setDone = () => {
	useDebounceFn(() => {
		plannerService.setWeaponDone(weapon.value, materials.value);
	}, 100)().then(() => {
		getOrInitPlannedWeapon(weaponName.value);
	});
};

const route = useRoute();

onBeforeMount(() => {
	usePlannedWeaponStore().init();

	// get weapon name from url hash
	let urlHash = route.hash.slice(1);

	if (urlHash !== undefined && useHas(weapons, urlHash)) {
		weaponName.value = urlHash;
		getOrInitPlannedWeapon(weaponName.value);
	}
});
</script>
