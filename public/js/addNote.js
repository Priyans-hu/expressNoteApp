const getNotes = () => {
    fetch ('/api/notes', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
}

document.getElementById('noteForm').addEventListener('submit', function (event) {
    event.preventDefault();
});