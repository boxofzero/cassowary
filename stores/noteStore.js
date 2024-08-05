import { useStorage } from '@vueuse/core';
import * as dbNote from '@/data/database/dbNote';

const notesRepo = () => {
	return useStorage('notes', {});
};

export const useNoteStore = defineStore('notes', () => {
	const notes = ref({});

	function init() {
		notes.value = notesRepo().value;
	}

	const storeToStorage = () => {
		console.log('storing notes to localStorage');
		notesRepo().value = notes.value;
	};

	function getOrInitEntry(id) {
		if (id && Object.prototype.hasOwnProperty.call(notes.value, id)) {
			return notes.value[id];
		}
		return { ...dbNote.note };
	}

	function getLastId() {
		return parseInt(useLast(useKeys(notes.value).toSorted())) || 0;
	}

	function upsert(note) {
		// if the id does not exist in the notes key, init it
		if (note.id === undefined) {
			let id = getLastId() + 1;
			console.log('new id: ' + id);
			note.id = id;
			notes.value[id] = note;
			notes.value[id]['created_at'] = new Date().toISOString();
		}
		let id = note.id;
		notes.value[id]['updated_at'] = new Date().toISOString();

		storeToStorage();
	}

	function deleteNote(id) {
		if (!Object.prototype.hasOwnProperty.call(notes.value, id)) {
			return;
		}
		delete notes.value[id];
		storeToStorage();
	}

	return {
		notes,
		init,
		getOrInitEntry,
		getLastId,
		upsert,
		deleteNote,
	};
});
