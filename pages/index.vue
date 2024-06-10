<template>
	<section class="flex items-center justify-between mb-10">
		<h1 class="text-4xl font-extrabold">Summary</h1>
		<div>
			<USelectMenu :options="transactionViewOptions" v-model="selectedView" />
		</div>
	</section>

	<section
		class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
	>
		<Trend
			color="green"
			title="Income"
			:amount="incomeTotal"
			:last-amount="4100"
			:loading="isLoading"
		/>
		<Trend
			color="red"
			title="Expense"
			:amount="expenseTotal"
			:last-amount="3000"
			:loading="isLoading"
		/>
		<Trend
			color="green"
			title="Investments"
			:amount="4000"
			:last-amount="3000"
			:loading="isLoading"
		/>
		<Trend
			color="red"
			title="Saving"
			:amount="4000"
			:last-amount="4100"
			:loading="isLoading"
		/>
	</section>

	<section class="flex justify-between mb-10">
		<div>
			<h2 class="text-2xl font-extrabold">Transactions</h2>
			<div class="text-gray-500 dark:text-gray-400">
				You have {{ incomeCount }} incomes and {{ expenseCount }} expenses this
				period
			</div>
		</div>
		<div>
			<TransactionModal v-model="isOpen" @saved="refreshTransactions()" />
			<UButton
				icon="i-heroicons-plus-circle"
				color="white"
				variant="solid"
				label="Add"
				@click="isOpen = true"
			/>
		</div>
	</section>

	<section v-if="!isLoading">
		<div
			v-for="(transactionsOnDay, date) in transactionsGroupedByDate"
			:key="date"
			class="mb-10"
		>
			<DailyTransactionSummary :date="date" :transactions="transactionsOnDay" />
			<Transaction
				v-for="transaction in transactionsOnDay"
				:key="transaction.id"
				:transaction="transaction"
				@deleted="refreshTransactions()"
			/>
		</div>
	</section>
</template>

<script setup>
import { transactionViewOptions } from '~/libraries/constants';
const selectedView = ref(transactionViewOptions[1]);
const transactions = ref([]);
const isLoading = ref(false);
const isOpen = ref(false);

const income = computed(() =>
	transactions.value.filter((t) => t.category === 'Income')
);

const expense = computed(() =>
	transactions.value.filter((t) => t.category === 'Expense')
);

const incomeCount = computed(() => income.value.length);
const expenseCount = computed(() => expense.value.length);

const incomeTotal = computed(() =>
	income.value.reduce((sum, transaction) => sum + transaction.amount, 0)
);
const expenseTotal = computed(() =>
	expense.value.reduce((sum, transaction) => sum + transaction.amount, 0)
);

// dummy transactions data
const transactionsData = [
	{
		id: 1,
		description: 'Salary',
		amount: 4000,
		category: 'Income',
		created_at: new Date(
			Date.now() - Math.floor(Math.random() * 10000000000)
		).toISOString(),
	},
	{
		id: 2,
		description: 'Rent',
		amount: 1000,
		category: 'Expense',
		created_at: new Date(
			Date.now() - Math.floor(Math.random() * 10000000000)
		).toISOString(),
	},
	{
		id: 3,
		description: 'Investment',
		amount: 2000,
		category: 'Investment',
		created_at: new Date(
			Date.now() - Math.floor(Math.random() * 10000000000)
		).toISOString(),
	},
	{
		id: 4,
		description: 'Savings',
		amount: 300,
		category: 'Saving',
		created_at: new Date(
			Date.now() - Math.floor(Math.random() * 10000000000)
		).toISOString(),
	},
];

const fetchTransactions = async () => {
	// console.log('fetching transactions');
	isLoading.value = true;
	try {
		const { data } = await useAsyncData('transactions', async () => {
			// here is the code to fetch from data source (db, soon to be LocalStorage)
			// for now, we will use the dummy data
			return transactionsData;
		});
		return data.value;
	} finally {
		isLoading.value = false;
	}
};

const refreshTransactions = async () => {
	transactions.value = await fetchTransactions();
};

await refreshTransactions();

const transactionsGroupedByDate = computed(() => {
	let grouped = {};

	for (const transaction of transactions.value) {
		const date = new Date(transaction.created_at).toISOString().split('T')[0];

		if (!grouped[date]) {
			grouped[date] = [];
		}

		grouped[date].push(transaction);
	}

	return grouped;
});

// console.log(transactionsGroupedByDate.value);
</script>
