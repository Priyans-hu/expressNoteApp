const getNotes = () => {
    return fetch('/api/notes/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // This returns another Promise
        });
};

const renderSavedNotes = () => {
    getNotes().then(notes => {
        console.log(notes);
        // Now 'notes' is an array of objects
        if (notes.length <= 0) {
            document.getElementById('noteList').innerHTML = `
                <li type="none" class="rounded border p-2 my-1 d-flex justify-content-between align-items-center">
                    <p class="p-0 m-2">You have no Notes</p>
                    <a href="/addNote"><button class="btn btn-primary m-2">Start Writing</button></a>
                </li>
            `;
        } else {
            document.getElementById('noteList').innerHTML = '';
            notes.forEach(note => {
                document.getElementById('noteList').innerHTML += `
                    <li type='none' class='rounded border border-1 p-2 my-1 d-flex justify-content-between align-items-center' 
                        onClick="renderActiveNote(${JSON.stringify(note)})">
                        <p class="p-0 m-2">${note.title}</p>
                        <i class="fa-solid fa-trash" data-hash-key="${note.id}" onclick="deleteNote(event)"></i>
                    </li>
                `;
            })
        }
    });
}

const renderActiveNote = (noteString) => {
    const note = JSON.parse(noteString);
    console.log(note);
    document.getElementById('activeNote').innerHTML = `
    <div>
        <h2>${note.title}</h2>
        <p>${note.description}</p>
    </div>
    `;
}

const deleteNote = (event) => {
    const id = event.target.getAttribute('data-hash-key');
    console.log(`deleting note ${id}`);
    fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    renderSavedNotes();
}

renderSavedNotes();