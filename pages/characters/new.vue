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
			<FormKit
				type="select"
				label="Current Level"
				name="current_level"
				:options="levelItems"
			/>
			<FormKit
				type="select"
				label="Target Level"
				name="target_level"
				:options="levelItems"
			/>
		</div>
	</div>

	<UDivider label="SKILLS" />
	<div class="grid grid-cols-2 gap-2">
		<div>
			<h2>ACTIVE SKILLS</h2>
			<h3>Basic Attack</h3>
			<div class="grid grid-cols-2 gap-2">
				<FormKit
					type="number"
					name="current_level"
					number="integer"
					label="Current Level"
					min="0"
					value="0"
					@input=""
				/>

				<FormKit
					type="number"
					name="target_level"
					number="integer"
					label="Target Level"
					min="0"
					value="0"
					@input=""
				/>
			</div>
			<h3>Resonance Skill</h3>
			<div class="grid grid-cols-2 gap-2">
				<FormKit
					type="number"
					name="current_level"
					number="integer"
					label="Current Level"
					min="0"
					value="0"
					@input=""
				/>
				<FormKit
					type="number"
					name="target_level"
					number="integer"
					label="Target Level"
					min="0"
					value="0"
					@input=""
				/>
			</div>
			<h3>Forte Circuit</h3>
			<div class="grid grid-cols-2 gap-2">
				<FormKit
					type="number"
					name="current_level"
					number="integer"
					label="Current Level"
					min="0"
					value="0"
					@input=""
				/>
				<FormKit
					type="number"
					name="target_level"
					number="integer"
					label="Target Level"
					min="0"
					value="0"
					@input=""
				/>
			</div>
			<h3>Resonance Liberation</h3>
			<div class="grid grid-cols-2 gap-2">
				<FormKit
					type="number"
					name="current_level"
					number="integer"
					label="Current Level"
					min="0"
					value="0"
					@input=""
				/>
				<FormKit
					type="number"
					name="target_level"
					number="integer"
					label="Target Level"
					min="0"
					value="0"
					@input=""
				/>
			</div>
			<h3>Intro Skill</h3>
			<div class="grid grid-cols-2 gap-2">
				<FormKit
					type="number"
					name="current_level"
					number="integer"
					label="Current Level"
					min="0"
					value="0"
					@input=""
				/>
				<FormKit
					type="number"
					name="target_level"
					number="integer"
					label="Target Level"
					min="0"
					value="0"
					@input=""
				/>
			</div>
		</div>

		<div>
			<div>
				<FormKit
					v-model="value"
					type="checkbox"
					label="PASSIVE SKILLS"
					:options="passiveSkills"
				/>
			</div>

			<div>
				<h2>BONUS STATS</h2>
				<FormKit
					v-model="value"
					type="checkbox"
					label="Tier 1"
					:options="bonusSkills"
				/>
				<FormKit
					v-model="value"
					type="checkbox"
					label="Tier 2"
					:options="bonusSkills"
				/>
			</div>
		</div>
	</div>

	<UDivider label="MATERIAL NEEDED" />
	<!-- show the material needed -->
	<UChip inset text="3" size="2xl">
		<div class="box-border h-16 w-16 mx-1">
			<img src="https://placehold.co/64/png" alt="Material" />
			<FormKit
				type="number"
				name="item_count"
				number="integer"
				min="0"
				value="0"
				@input=""
			/>
		</div>
	</UChip>
	<UChip inset text="3" size="2xl">
		<div class="box-border h-16 w-16 mx-1">
			<img src="https://placehold.co/64/png" alt="Material" />
			<FormKit
				type="number"
				name="item_count"
				number="integer"
				min="0"
				value="0"
				@input=""
			/>
		</div>
	</UChip>
	<UChip inset text="3" size="2xl">
		<div class="box-border h-16 w-16 mx-1">
			<img src="https://placehold.co/64/png" alt="Material" />
			<FormKit
				type="number"
				name="item_count"
				number="integer"
				min="0"
				value="0"
				@input=""
			/>
		</div>
	</UChip>
</template>

<script setup>
const value = ref(null);
const passiveSkills = [
	{
		value: 'passive1',
		label: 'Passive Skill 1',
	},
	{
		value: 'passive2',
		label: 'Passive Skill 2',
	},
];

const bonusSkills = [
	{
		value: 'bonus1',
		label: 'Bonus Stat 1',
	},
	{
		value: 'bonus2',
		label: 'Bonus Stat 2',
	},
	{
		value: 'bonus3',
		label: 'Bonus Stat 3',
	},
	{
		value: 'bonus4',
		label: 'Bonus Stat 4',
	},
];

const levelItems = [
	{
		value: '1',
		label: '1',
	},
	{
		value: '50',
		label: '50',
	},
	{
		value: '50_ascended',
		label: '50 Ascended',
	},
	{
		value: '60',
		label: '60',
	},
	{
		value: '60_ascended',
		label: '60 Ascended',
	},
	{
		value: '70',
		label: '70',
	},
	{
		value: '70_ascended',
		label: '70 Ascended',
	},
	{
		value: '80',
		label: '80',
	},
	{
		value: '80_ascended',
		label: '80 Ascended',
	},
	{
		value: '90',
		label: '90',
	},
];
</script>
