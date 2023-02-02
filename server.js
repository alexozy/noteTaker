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


// we need a GET request for the notes
app.get('/api/notes', (req, res) => {
    // Send json to the client 
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(JSON.parse(data));
        }
    })
});

// POST request for notes (front-end sending something)
// req is the request that comes from front-end to back-end
// res is the response back end sending to front-end | only send one per route. can't run two at once.
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    // Destructures the contents of req.body
    const {title, text} = req.body;
    
    // If all required properties are present then...
    if (title && text){
        const genNote = {
            title,
            text,
            id: uuid.v4(),
        };
        const response = {
            status: 'success',
            body: genNote,
        };
        // Saving the actual note::
        // we need to readFile in order to get the old notes from the file; add genNote to old notes; writeFile the oldNote+genNotes to db ; res.json()
        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            const oldNotes = JSON.parse(data);
            // make an array of old & new notes using .push
            // big.thing(small) | you're pushing small to big
            oldNotes.push(genNote)

            // writeFile inside of readFile = readFile runs first, then writeFile runs after
        fs.writeFile('./db/db.json', JSON.stringify(oldNotes), (err,) =>{

            console.log(response);
            res.json(response);

        })
        })

    } else {
        res.json('cannot post note');
    }
});

// DELETE request for notes **bonus



// route to notes.html page
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname,'/public/notes.html'))
});

// GET  API Routes / route to index.html page
// '/' should go last
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});



// How it listens to the connection:

app.listen(PORT, () => {
    console.log(`Current Port : ${PORT}`)
})






// sending to heroku
// git remote -v (check to make sure you're connected toheroku)
// git add
// git commit 
// git push heroku master
// git push origin master






// how to install express.js
// npm init -y
//  the '-y' skips questionairre and uses default answers