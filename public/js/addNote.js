const addNote = (note) => {
    fetch('/api/notes', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note)
    })
}

document.getElementById('noteForm').addEventListener('submit', function (event) {
    // preventing pafe reload
    event.preventDefault();
    
    // creating new note object
    const newNote = {
        title: document.getElementById('noteTitle').value,
        description: document.getElementById('noteContent').value
    }
    
    // sending the object to the server
    addNote(newNote);

    // deleting the current values of form
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    
    // redireting to the notes page
    window.location.href = '/notes';
});