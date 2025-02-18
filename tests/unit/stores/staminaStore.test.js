import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useStaminaStore } from '~/stores/staminaStore';
import { MAX_STAMINA, getSecondsPerStamina } from '~/libraries/constants';

let initialStamina = 37;

// Mocking useStorage
vi.mock('@vueuse/core', () => ({
	useStorage: vi.fn(() => ({
		value: {
			stamina: initialStamina,
			staminaUpdatedAt: Date.now(),
		},
	})),
}));

describe('staminaStore', () => {
	let staminaStore;

	beforeEach(() => {
		vi.useFakeTimers();

		// Create a fresh Pinia instance for each test
		setActivePinia(createPinia());
		staminaStore = useStaminaStore();
		staminaStore.initStaminaData();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('initializes with default values', () => {
		expect(staminaStore.maxStamina).toBe(MAX_STAMINA);
		expect(staminaStore.secondsPerStamina).toBe(getSecondsPerStamina());
		expect(staminaStore.stamina).toBe(initialStamina);
		expect(staminaStore.staminaUpdatedAt).toBeTypeOf('number');
		expect(staminaStore.fullStaminaAt).toBeTypeOf('number');
	});

	it('syncStaminaData calculates additional stamina', () => {
		vi.advanceTimersByTime(getSecondsPerStamina() * 1000);

		staminaStore.syncStaminaData();
		expect(staminaStore.stamina).toBe(initialStamina + 1);
	});

	it('updateStaminaOverflow updates stamina', () => {
		let overflow = 10;
		staminaStore.updateStaminaOverflow(overflow);
		expect(staminaStore.stamina).toBe(initialStamina + overflow);
	});
});
