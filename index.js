// Imports and declarations
const { randomUUID } = require('crypto');
const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;
const { v4: uuidv4 } = require('uuid');
const db = require('./data/db.json');
const dbPath = './data/db.json';

app.use(express.static('public'));
app.use(express.json());

// Handleing the API request
// Fetch notes from database
app.get('/api/notes/', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (data) {
            res.send(JSON.parse(data)).statusCode = 200;
            console.log(JSON.parse(data));
        } else {
            console.log(err);
            res.send(err).statusCode = 500;
        }
    })
})

// Add notes to database
app.post('/api/notes/', (req, res) => {
    // Getting the request body to set as the notes object
    const newNote = req.body;

    // setting an unique id to each note
    newNote.id = uuidv4();

    // Reading the current database and then adding new note
    db.push(newNote);

    // Updating/Writting into database
    fs.writeFileSync(dbPath, JSON.stringify(db));

    res.send("Added new note").statusCode = 200;
})

// Deleting notes from database
app.delete('/api/notes/:id', (req, res) => {
    const noteID = req.params.id;

    // Find the index of the note with the given ID
    const noteIndex = db.findIndex(note => note.id.toString() === noteID);

    // Check if the note with the given ID exists
    if (noteIndex === -1) {
        return res.status(404).send('Note not found');
    }

    // Remove the note from the array
    db.splice(noteIndex, 1);

    // Save the updated db to the file
    fs.writeFileSync(dbPath, JSON.stringify(db));

    // Send a response indicating success
    res.status(200).send('Note removed successfully');
});

// Handleling paging of html files
app.get('/', (req, res) => {
    const page = fs.readFileSync('./public/pages/index.html', 'utf8');
    console.log('Currently on the index page');
    res.send(page.toString());
});

app.get('/notes', (req, res) => {
    const page = fs.readFileSync('./public/pages/notes.html', 'utf8');
    console.log('Currently on the notes page');
    res.send(page.toString());
});

app.get('/addNote', (req, res) => {
    const page = fs.readFileSync('./public/pages/addNote.html', 'utf8');
    console.log('Currently on the add note page');
    res.send(page.toString());
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});