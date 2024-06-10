<template>
	<UModal v-model="isOpen">
		<UCard>
			<template #header>Add Transaction </template>

			<UForm :state="state" :schema="schema" ref="form">
				<UFormGroup
					:required="true"
					label="Transaction Type"
					name="type"
					class="mb-4"
				>
					<USelect
						placeholder="Select the transaction type"
						:options="types"
						v-model="state.type"
					/>
				</UFormGroup>

				<UFormGroup :required="true" label="Amount" name="amount" class="mb-4">
					<UInput
						type="number"
						placeholder="Amount"
						v-model.number="state.amount"
					/>
				</UFormGroup>

				<UFormGroup
					:required="true"
					label="Transaction date"
					name="created_at"
					class="mb-4"
				>
					<UInput
						type="date"
						icon="i-heroicons-calendar-days-20-solid"
						v-model="state.created_at"
					/>
				</UFormGroup>

				<UFormGroup
					hint="Optional"
					label="Description"
					name="description"
					class="mb-4"
				>
					<UInput placeholder="Description" v-model="state.description" />
				</UFormGroup>

				<UFormGroup
					:required="true"
					label="Category"
					name="category"
					class="mb-4"
					v-if="state.type === 'Expense'"
				>
					<USelect
						placeholder="Category"
						:options="categories"
						v-model="state.category"
					/>
				</UFormGroup>

				<UButton
					type="button"
					color="black"
					variant="solid"
					label="Save"
					:loading="isLoading"
					@click="save"
				/>
			</UForm>
		</UCard>
	</UModal>
</template>

<script setup>
import { categories, types } from '~/libraries/constants';
import { z } from 'zod';

const props = defineProps({
	modelValue: Boolean,
});
const emit = defineEmits(['update:modelValue', 'saved']);

const defaultSchema = z.object({
	created_at: z.string(),
	description: z.string().optional(),
	amount: z.number().positive('Amount needs to be more than 0'),
});

const incomeSchema = z.object({
	type: z.literal('Income'),
});

const expenseSchema = z.object({
	type: z.literal('Expense'),
	category: z.enum(categories),
});

const investmentSchema = z.object({
	type: z.literal('Investment'),
});

const savingSchema = z.object({
	type: z.literal('Saving'),
});

const schema = z.intersection(
	z.discriminatedUnion('type', [
		incomeSchema,
		expenseSchema,
		investmentSchema,
		savingSchema,
	]),
	defaultSchema
);

const form = ref();
const isLoading = ref(false);
const toast = useToast();

const save = async () => {
	if (form.value.errors.length) return;
	isLoading.value = true;
	try {
		// here is the code to save the data to db
		await new Promise((resolve) => setTimeout(resolve, 500));
		toast.add({
			title: 'Transaction saved',
			icon: 'i-heroicons-check-circle',
		});
		isOpen.value = false;
		emit('saved');
		console.log('transaction saved');
		return;
	} catch (e) {
		toast.add({
			title: 'Transaction not saved',
			description: e.message,
			icon: 'i-heroicons-exclamation-circle',
			color: 'red',
		});
	} finally {
		isLoading.value = false;
	}
};

const initialState = {
	type: undefined,
	amount: 0,
	created_at: undefined,
	description: undefined,
	category: undefined,
};

const state = ref({
	...initialState,
});

const resetForm = () => {
	Object.assign(state.value, initialState);
	form.value.clear();
};

const isOpen = computed({
	get: () => props.modelValue,
	set: (value) => {
		if (!value) resetForm();
		emit('update:modelValue', value);
	},
});
</script>
