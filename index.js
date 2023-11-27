// Imports and declarations
const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;
const db = './data/db.json';

app.use(express.json());

// Handleing the API request


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