<template>
	<section class="flex flex-col gap-1">
		<UModal v-model:open="isAddNewNoteModalOpen">
			<UButton
				class="justify-center mb-1 w-1/6 text-black dark:text-black"
				color="primary"
				variant="solid"
			>
				Create New Note
			</UButton>
			<template #content>
				<div class="flex flex-col gap-1 p-3">
					<span class="font-bold text-xl">Create New Note</span>
					<span>Title</span>
					<UInput v-model="newNote.title" />
					<span>Description</span>
					<UTextarea v-model="newNote.description" />
					<UButton
						class="justify-center mt-3 w-1/5 text-black dark:text-black"
						color="primary"
						variant="solid"
						@click="createNote"
					>
						Create Note
					</UButton>
				</div>
			</template>
		</UModal>

		<section class="flex flex-col gap-1 bg-">
			<div
				:class="divNoteTextClass(i)"
				v-for="(note, index, i) in useNoteStore().notes"
				:key="index"
			>
				<div class>
					<span class="inline-block mb-2 text-base">{{ note.title }}</span>
					<p class="text-xs">{{ note.description }}</p>
				</div>
				<UButton color="red" variant="solid" @click="deleteNote(note)">
					X
				</UButton>
			</div>
		</section>
	</section>
</template>

<script setup>
import * as dbNote from '@/data/database/dbNote';
import { useNoteStore } from '@/stores/noteStore';

const isAddNewNoteModalOpen = ref(false);
let newNote = ref({ ...dbNote.note });

const createNote = () => {
	useNoteStore().upsert(newNote.value);

	// reset newNote
	newNote = ref({ ...dbNote.note });
	isAddNewNoteModalOpen.value = false;
};

const deleteNote = (note) => {
	if (
		confirm(
			'Are you sure you want to delete this note? "' +
				note.title +
				', ' +
				note.description +
				'"'
		)
	) {
		useNoteStore().deleteNote(note.id);
	}
};

const divNoteTextClass = (i) => {
	let defaultClass =
		'border-gray-700 border rounded-md flex flex-row justify-between items-center p-3';

	if (i % 2 == 1) {
		return defaultClass + ' bg-teal-100 text-black';
	}
	return defaultClass;
};

onBeforeMount(() => {
	useNoteStore().init();
});
</script>
