// function for fetching all the currently saved notes
const getNotes = () => {
    return fetch('/api/notes/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
};

// function for fetching currently active note
const getActiveNote = (noteID) => {
    return fetch(`/api/notes/${noteID}`, {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        } else {
            return response.json(); 
        }
    })
}

// function to render the notes page based on the fetched notes
const renderSavedNotes = () => {
    getNotes().then(notes => {
        console.log(notes);
        if (notes.length <= 0) {
            document.getElementById('noteList').innerHTML = `
                <li type='none' class='rounded border p-2 my-1 d-flex justify-content-between align-items-center'>
                    <p class='p-0 m-2'>You have no Notes</p>
                    <a href='/addNote'><button class='btn btn-primary m-2'>Start Writing</button></a>
                </li>
            `;
        } else {
            document.getElementById('noteList').innerHTML = '';
            notes.forEach(note => {
                document.getElementById('noteList').innerHTML += `
                    <li type='none' class='rounded border border-1 p-2 my-1 d-flex justify-content-between align-items-center' 
                        onClick='renderActiveNote(event)' data=${note.id}>
                        <p class='p-0 m-2'>${note.title}</p>
                        <i class='fa-solid fa-trash' data-hash-key='${note.id}' onclick='deleteNote(event)'></i>
                    </li>
                `;
            })
        }
    });
}

// rendering the currently active note
let currentActiveNote;
const renderActiveNote = (event) => {
    currentActiveNote = event.target.getAttribute('data');
    getActiveNote(currentActiveNote).then((note) => {
        document.getElementById('activeNote').innerHTML = `
        <div class='border rounded p-4 mx-4 w-100 bg-light'>
            <h2>${note[0].title}</h2>
            <p>${note[0].description}</p>
        </div>
        `;
    })
}

const deleteNote = async (event) => {
    // getting the id of note to be deleted
    const id = event.target.getAttribute('data-hash-key');
    
    // removing the active note
    document.getElementById('activeNote').innerHTML = '';

    // sending the api request to delete the note
    try {
        await fetch(`/api/notes/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        
        // again fetching the notes from server and rendering them
        renderSavedNotes();
    } catch (err) {
        console.error(err);
    }
}

renderSavedNotes();