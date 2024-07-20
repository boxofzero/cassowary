<template>
	<section class="">
		<div>
			<h2 class="text-2xl font-bold leading-7 text-gray-900 dark:text-white">
				Resonator Ascension Boss Material
			</h2>
			<!-- outer div of each item -->
			<div class="grid grid-cols-3 gap-3">
				<div
					v-for="(stuff, index) in inventoryItemStore.inventoryItems
						.boss_ascension_material"
					:key="stuff.name"
					class=""
				>
					<!-- div for per stuff -->
					<div class="">
						<USkeleton class="h-8 w-full" v-if="loading" />
						<div v-else>
							<FormKit
								type="number"
								:label="index"
								number="integer"
								:name="index"
								min="0"
								:value="stuff.count"
								@input="
									inventoryItemStore.updateInventory(
										'boss_ascension_material',
										index,
										$event
									)
								"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
const props = defineProps({
	loading: Boolean,
	inventoryItemStore: Object,
});
</script>
