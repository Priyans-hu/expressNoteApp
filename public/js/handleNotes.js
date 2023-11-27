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
                <li type="none" class="rounded border border-1 p-2 my-1 d-flex justify-content-between align-items-center">
                    <p class="p-0 m-2">You have no Notes</p>
                </li>
                <a href="/addNote"><button class="btn btn-primary my-2">Add note</button></a>
            `;
        } else {
            document.getElementById('noteList').innerHTML = '';
            notes.forEach(note => {
                document.getElementById('noteList').innerHTML += `
                    <li type='none' class='rounded border border-1 p-2 my-1 d-flex justify-content-between align-items-center'>
                        <p class="p-0 m-2">${note.title}</p>
                        <i class="fa-solid fa-trash" data-hash-key="${note.id}" onclick="deleteNote(event)"></i>
                    </li>
                `;
            })
        }
    });
}

const deleteNote = (event) => {
    const id = event.target.getAttribute('data-hash-key');
    console.log(`deleting note ${id}`);
    fetch (`/api/notes/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    renderSavedNotes();
}

renderSavedNotes();