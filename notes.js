const fs = require('fs');

const fetchNotes = () => {
	try {
		let notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	} catch (e) {
		return [];
	}
}

const saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {

	let notes = fetchNotes();
	let note = {
		title,
		body
	};
	var duplicateNotes = notes.filter((note) => note.title === title);

	if (duplicateNotes.length === 0) {
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};

var getAll = () => {
	return fetchNotes();
}

var getNote = (title) => {
	let notes = fetchNotes(); 
	let filteredNotes = notes.filter(note => note.title === title);
	return filteredNotes[0];
}

var removeNote = (title) => {
	let notes = fetchNotes();
	let filteredNotes = notes.filter((note) => note.title !== title);
	saveNotes(filteredNotes);
	return notes.length !== filteredNotes.length
}

const logNote = (note) => {
	debugger;
	console.log("---");
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
}

module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote, 
	logNote
};