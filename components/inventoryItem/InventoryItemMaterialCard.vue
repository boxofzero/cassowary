<template>
	<v-card class="w-full">
		<v-img :src="(item && item.icon) || ''" cover></v-img>
		<v-card-text class="h-16 pa-0 content-center text-center">{{
			index
		}}</v-card-text>
		<v-card-text class="pa-0">
			<div class="grid grid-cols-1">
				<v-chip
					density="compact"
					class=""
					color="indigo"
					prepend-icon="mdi-account-circle"
				>
					{{ (item && item.needed) || 0 }}
				</v-chip>
				<v-chip
					density="compact"
					class=""
					color="orange"
					prepend-icon="mdi-star"
				>
					0
				</v-chip>
			</div>
		</v-card-text>
		<v-text-field
			label="material owned count"
			:model-value="(item && item.owned && item.owned.count) || 0"
		></v-text-field>
	</v-card>
</template>

<script setup>
const props = defineProps({
	index: String,
	item: Object,
});
</script>
