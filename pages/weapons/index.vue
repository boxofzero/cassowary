<template>
	<section class="flex justify-between items-center mb-5">
		<h1 class="font-extrabold text-4xl">Weapons</h1>
	</section>
	<section>
		<div class="flex flex-wrap items-center gap-5">
			<h2>WEAPON NAME</h2>
			<UInputMenu
				v-model="weaponName"
				:avatar="weaponName?.avatar"
				:items="weaponList"
				:filter-fields="['title']"
				size="xl"
				class="w-3/4"
				:ui="{ item: 'p-4' }"
			>
				<template #item-label="{ item }">
					<span
						v-if="item.rarity == 3"
						class="text-blue-600 dark:text-blue-300"
						>{{ item.title }}</span
					>
					<span
						v-if="item.rarity == 4"
						class="text-purple-600 dark:text-purple-300"
						>{{ item.title }}</span
					>
					<span
						v-if="item.rarity == 5"
						class="text-yellow-600 dark:text-yellow-300"
						>{{ item.title }}</span
					>
				</template>
			</UInputMenu>
		</div>
		<section v-show="isWeaponNameSet">
			<USeparator label="LEVEL" />
			<div class="">
				<div class="items-center gap-5 grid grid-cols-4">
					<span>Current Level</span>
					<USelect
						:items="levelItems"
						v-model="weapon['weap_current_level']"
						:model-value="weapon['weap_current_level'] || 1"
						@change="upsertPlannedWeapon(weaponName)"
					/>
					<span>Target Level</span>
					<USelect
						:items="levelItems"
						v-model="weapon['weap_target_level']"
						:model-value="weapon['weap_target_level'] || 1"
						@change="upsertPlannedWeapon(weaponName)"
					/>
				</div>
			</div>
			<USeparator label="MATERIAL NEEDED" />
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
import { weapons } from '~/data/game/gameWeapon';
import * as dbPlannedWeapon from '@/data/database/dbPlannedWeapon';
import { levelItems } from '@/data/form/weapons/formWeaponsNew';
import { usePlannedWeaponStore } from '@/stores/plannedWeaponStore';
import * as weaponService from '@/services/weaponService';
import * as inventoryService from '@/services/inventoryService';
import * as plannerService from '@/services/plannerService';
import * as util from '@/viewScriptUtils/pagesWeaponsIndex';

const weaponList = util.weaponList();

const weaponName = ref('');
const isWeaponNameSet = computed(() => {
	return !!weaponName.value;
});

watch(weaponName, async () => {
	console.log(
		'weaponName watcher: changed: ' + JSON.stringify(weaponName.value)
	);

	// redirect if url hash is not set
	let urlHash = route.hash.slice(1);
	console.log('urlHash changed: ' + urlHash);
	if (
		urlHash !== undefined &&
		urlHash !== weaponName.value.id &&
		useHas(weapons, weaponName.value.id)
	) {
		getOrInitPlannedWeapon(weaponName.value.id);
		console.log('redirecting...');
		await navigateTo({ hash: '#' + weaponName.value.id });
	}
});

let weaponOption = ref({});

const weapon = ref({ ...dbPlannedWeapon.weapon });
const materials = ref({});
const isMaterialsExist = computed(() => {
	return Object.keys(materials.value).length > 0;
});

const doEmit = (a) => {
	console.log('emit received: ' + a);
	getOrInitPlannedWeapon(weaponName.value.id);
};

const toast = useToast();

const upsertPlannedWeapon = (weaponName) => {
	useDebounceFn(() => {
		if (!weaponName || !weapon.value['name']) {
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
				weapons[weaponName.id].display_name +
				' updated to LocalStorage',
			icon: 'i-heroicons-check-badge',
			duration: 2000,
		});
		materials.value = util.getNeededMaterials(weaponName.id);
	});
};

const setDone = () => {
	useDebounceFn(() => {
		plannerService.setWeaponDone(weapon.value, materials.value);
	}, 100)().then(() => {
		getOrInitPlannedWeapon(weaponName.value.id);
	});
};

const route = useRoute();

function initWeaponFromHash() {
	// get character name from url hash
	let urlHash = route.hash.slice(1);

	if (urlHash !== undefined && useHas(weapons, urlHash)) {
		weaponName.value = useFind(weaponList, ['value', urlHash]);
		getOrInitPlannedWeapon(weaponName.value.id);
	}
}

function getOrInitPlannedWeapon(weaponName) {
	weapon.value = usePlannedWeaponStore().getOrInitEntry(weaponName);
	weapon.value['name'] = weaponName;

	materials.value = util.getNeededMaterials(weaponName);
}

onBeforeMount(() => {
	// init store
	usePlannedWeaponStore().init();

	// init char if url has hash
	initWeaponFromHash();
});

// watch(
// 	() => route.hash,
// 	() => {
// 		let urlHash = route.hash.slice(1);

// 		if (urlHash !== undefined && useHas(weapons, urlHash)) {
// 			weaponOption = useFind(weaponList, ['value', urlHash]);
// 			weaponName.value = urlHash;
// 			getOrInitPlannedWeapon(weaponName.value);
// 		} else {
// 			weaponOption = {};
// 			weaponName.value = '';
// 		}
// 	}
// );
</script>
