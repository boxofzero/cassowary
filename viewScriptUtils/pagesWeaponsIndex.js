import { weapons } from '~/data/game/gameWeapon';
import * as dbPlannedWeapon from '@/data/database/dbPlannedWeapon';
import { levelItems } from '@/data/form/weapons/formWeaponsNew';
import { usePlannedWeaponStore } from '@/stores/plannedWeaponStore';
import * as weaponService from '@/services/weaponService';
import * as inventoryService from '@/services/inventoryService';
import * as plannerService from '@/services/plannerService';

export function weaponList() {
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
}

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
			duration: 2000,
		});
		materials.value = getNeededMaterials(weaponName.value);
	});
};

export function getNeededMaterials(weaponName) {
	const neededMaterials = weaponService.getWeaponNeededMaterials(weaponName);
	const ownedNeededMaterialsResponseData =
		inventoryService.getOwnedNeededMaterialsResponseData(neededMaterials);
	return ownedNeededMaterialsResponseData;
}

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
