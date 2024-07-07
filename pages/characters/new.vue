<template>
	<section class="">
		<h1 class="">Add New Character To Planner</h1>
	</section>
	<!--
	add character yinlin
	load character yinlin material requirement
	if user has planned character where yinlin, load the data
	if user doesnt have planned character yinlin, prepare new planned character
	-->
	<div>
		<h2>CHARACTER NAME: <a>Yinlin</a></h2>
	</div>
	<UDivider label="LEVEL" />
	<div>
		<div class="grid grid-cols-2 gap-2">
			<UFormGroup label="Current Level">
				<USelectMenu
					v-model="currentLevel"
					:options="levelItems"
					placeholder="Current level"
				/>
			</UFormGroup>
			<UFormGroup label="Target Level">
				<USelectMenu
					v-model="targetLevel"
					:options="levelItems"
					placeholder="Target level"
				/>
			</UFormGroup>
		</div>
	</div>

	<UDivider label="SKILLS" />
	<div class="grid grid-cols-2 gap-2">
		<div>
			<h2>ACTIVE SKILLS</h2>
			<div>
				<h3>Basic Attack</h3>
				<UFormGroup label="Current Level">
					<UInput type="number" />
				</UFormGroup>
				<UFormGroup label="Target Level">
					<UInput type="number" size="sm" />
				</UFormGroup>
			</div>
			<div>
				<h3>Resonance Skill</h3>
				<UFormGroup label="Current Level">
					<UInput type="number" size="sm" />
				</UFormGroup>
				<UFormGroup label="Target Level">
					<UInput type="number" size="sm" />
				</UFormGroup>
			</div>
			<div>
				<h3>Forte Circuit</h3>
				<UFormGroup label="Current Level">
					<UInput type="number" size="sm" />
				</UFormGroup>
				<UFormGroup label="Target Level">
					<UInput type="number" size="sm" />
				</UFormGroup>
			</div>
			<div>
				<h3>Resonance Liberation</h3>
				<UFormGroup label="Current Level">
					<UInput type="number" size="sm" />
				</UFormGroup>
				<UFormGroup label="Target Level">
					<UInput type="number" size="sm" />
				</UFormGroup>
			</div>
			<div>
				<h3>Intro Skill</h3>
				<UFormGroup label="Current Level">
					<UInput type="number" size="sm" />
				</UFormGroup>
				<UFormGroup label="Target Level">
					<UInput type="number" size="sm" />
				</UFormGroup>
			</div>
		</div>

		<div>
			<div>
				<h2>PASSIVE SKILLS</h2>
				<UFormGroup name="passive1">
					<UCheckbox v-model="passive1" label="Passive Skill 1" />
					<UCheckbox v-model="passive2" label="Passive Skill 2" />
				</UFormGroup>
			</div>

			<div>
				<h2>BONUS STATS</h2>
				<UFormGroup name="passive1" label="Tier 1">
					<UCheckbox v-model="passive1" label="Bonus Stat 1" />
					<UCheckbox v-model="passive2" label="Bonus Stat 2" />
					<UCheckbox v-model="passive2" label="Bonus Stat 3" />
					<UCheckbox v-model="passive2" label="Bonus Stat 4" />
				</UFormGroup>
				<UFormGroup name="passive1" label="Tier 2">
					<UCheckbox v-model="passive1" label="Bonus Stat 1" />
					<UCheckbox v-model="passive2" label="Bonus Stat 2" />
					<UCheckbox v-model="passive2" label="Bonus Stat 3" />
					<UCheckbox v-model="passive2" label="Bonus Stat 4" />
				</UFormGroup>
			</div>
		</div>
	</div>

	<UDivider label="MATERIAL NEEDED" />
	<!-- show the material needed -->
	<UChip inset text="3" size="2xl">
		<div class="box-border h-16 w-16 mx-1">
			<img src="https://placehold.co/64/png" alt="Material" />
			<UInput type="number" />
		</div>
	</UChip>
	<UChip inset text="3" size="2xl">
		<div class="box-border h-16 w-16 mx-1">
			<img src="https://placehold.co/64/png" alt="Material" />
			<UInput type="number" />
		</div>
	</UChip>
	<UChip inset text="3" size="2xl">
		<div class="box-border h-16 w-16 mx-1">
			<img src="https://placehold.co/64/png" alt="Material" />
			<UInput type="number" />
		</div>
	</UChip>
</template>

<script setup>
const levelItems = [
	{
		id: '1',
		label: '1',
	},
	{
		id: '50',
		label: '50',
	},
	{
		id: '50_ascended',
		label: '50 Ascended',
	},
	{
		id: '60',
		label: '60',
	},
	{
		id: '60_ascended',
		label: '60 Ascended',
	},
	{
		id: '70',
		label: '70',
	},
	{
		id: '70_ascended',
		label: '70 Ascended',
	},
	{
		id: '80',
		label: '80',
	},
	{
		id: '80_ascended',
		label: '80 Ascended',
	},
	{
		id: '90',
		label: '90',
	},
];

const currentLevel = ref([]);
const targetLevel = ref([]);
const passive1 = ref(false);
const passive2 = ref(false);
</script>
