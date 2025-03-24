<template>
	<section class="flex justify-between items-center mb-5">
		<h1 class="font-extrabold text-4xl">Weapons</h1>
	</section>
	<section>
		<div class="flex flex-wrap items-center gap-5">
			<h2>WEAPON NAME</h2>
			<UInputMenu
				searchable
				searchable-placeholder="Select weapon"
				class="w-3/4"
				placeholder="Select weapon"
				v-model="weaponOption"
				:options="weaponList()"
				option-attribute="title"
				:search-attributes="['title', 'subtitle']"
				@change="getOrInitWeaponName($event)"
				size="xl"
			>
				<template #leading>
					<UAvatar v-bind="weaponOption.avatar" size="xs" class="m" />
				</template>
				<template #option="{ option: weapon }">
					<UAvatar v-bind="weapon.avatar" size="md" class="mr-2" />
					<span
						v-if="weapon.rarity == 3"
						class="text-blue-600 dark:text-blue-300"
						>{{ weapon.title }}</span
					>
					<span
						v-if="weapon.rarity == 4"
						class="text-purple-600 dark:text-purple-300"
						>{{ weapon.title }}</span
					>
					<span
						v-if="weapon.rarity == 5"
						class="text-yellow-600 dark:text-yellow-300"
						>{{ weapon.title }}</span
					>
				</template>
			</UInputMenu>
		</div>
		<section v-show="isWeaponNameSet">
			<UDivider label="LEVEL" />
			<div class="">
				<div class="items-center gap-5 grid grid-cols-4">
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
					class="mr-3"
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
				<div class="gap-6 grid grid-cols-6">
					<div class="" v-for="(item, index) in materials" :key="item.key">
						<InventoryItemMaterialCard
							:index="index"
							:item="item"
							:key="item.key"
							@update-material-count="doEmit"
						>
						</InventoryItemMaterialCard>
					</div>
				</div>
			</section>
		</section>
	</section>
</template>

<script setup>
import * as dbPlannedWeapon from '@/data/database/dbPlannedWeapon';
import { levelItems } from '@/data/form/weapons/formWeaponsNew';
import * as inventoryService from '@/services/inventoryService';
import * as plannerService from '@/services/plannerService';
import * as weaponService from '@/services/weaponService';
import { usePlannedWeaponStore } from '@/stores/plannedWeaponStore';
import { weapons } from '~/data/game/gameWeapon';

const weaponList = () => {
	let list = [];
	useForEach(weapons, (weapon, weaponName) => {
		let subtitle =
			' (' + weapon.rarity + '⭐ ' + useCapitalize(weapon.weapon_type) + ')';
		list = useConcat(list, {
			id: weaponName,
			label: weapon.display_name,
			avatar: { src: weapon.icon },
			title: weapon.display_name + ' ' + subtitle,
			value: weaponName,
			type: weapon.weapon_type,
			rarity: weapon.rarity,
		});
	});
	list = useOrderBy(list, ['type', 'rarity', 'label'], ['asc', 'asc', 'asc']);
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
let weaponOption = ref({});

const weapon = ref({ ...dbPlannedWeapon.weapon });
const materials = ref({});
const isMaterialsExist = computed(() => {
	return Object.keys(materials.value).length > 0;
});

const doEmit = (a) => {
	console.log('emit received: ' + a);
	getOrInitPlannedWeapon(weaponName.value);
};

const getOrInitWeaponName = async (weaponOption) => {
	await navigateTo({ hash: '#' + weaponOption.value });
};

const getOrInitPlannedWeapon = (weaponName) => {
	weapon.value = usePlannedWeaponStore().getOrInitEntry(weaponName);
	weapon.value['name'] = weaponName;

	materials.value = getNeededMaterials(weaponName);
};

const toast = useToast();
let toastId = null;

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
		toast.remove('weapon-update');

		nextTick(() => {
			toastId = toast.add({
				id:'weapon-update',
				title:'Weapon ' + weapons[weaponName.value].display_name + ' updated to LocalStorage',
				icon: 'i-heroicons-check-badge',
				timeout: 2000,
			});
		materials.value = getNeededMaterials(weaponName.value);
        });
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
		weaponOption = useFind(weaponList(), ['value', urlHash]);
		weaponName.value = urlHash;
		getOrInitPlannedWeapon(weaponName.value);
	} else {
		weaponOption = {};
		weaponName.value = '';
	}
});

watch(
	() => route.hash,
	() => {
		let urlHash = route.hash.slice(1);

		if (urlHash !== undefined && useHas(weapons, urlHash)) {
			weaponOption = useFind(weaponList(), ['value', urlHash]);
			weaponName.value = urlHash;
			getOrInitPlannedWeapon(weaponName.value);
		} else {
			weaponOption = {};
			weaponName.value = '';
		}
	}
);
</script>
