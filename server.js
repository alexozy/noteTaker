//Require 
const express = require('express');

const path = require('path');
const fs = require("fs");
const uuid = require('uuid');

//require notes
const notes = require('./db/db.json');

//Make the server listen 
const PORT = process.env.PORT || 3001;
//  a port = think coordinates. it gives an exact location

//START express.js; later you can chain methods to this variable easily
const app = express();

// parses incoming JSON data
app.use(express.json());
// parses incoming string/array data
app.use(express.urlencoded({ extended: true }));
// middleware instructs to make the files static
app.use(express.static('public'));

// app.get() needs 2 args: 1 -> route 2 -> callback function executed every time

// GET  API Routes / route to index.html page
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

// route to notes.html page
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname,'/public/notes.html'))
});

// we need a GET request for the notes
app.get('api/notes', (req, res) => {
    // Send json to the client 
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(JSON.parse(data));
        }
    })
});

// POST request for notes
app.post ('api/notes', (req,res) => {
    console.info(`${req.method} note received`);
    const newNote = req.body
    // assign random ID
    newNote.id = uuid()
    db.push(newNote)

    // update json file with new
    fs.writeFileSync('.db/db.json', JSON.stringify(notes))
    res.json(notes)
})

// DELETE request for notes



// How it listens to the connection:

app.listen(PORT, () => {
    console.log(`Current Port : ${PORT}`)
})













// how to install express.js
// npm init -y
//  the '-y' skips questionairre and uses default answers