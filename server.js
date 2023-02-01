// Require 
const express = require('express');

const path = require('path');
const fs = require("fs");
const { v4: uuidv4} = require('uuid');

// require notes
const notes = require('./db/db.json');

// make the server listen 
const PORT = process.env.PORT || 3001;
//  a port = think coordinates. it gives an exact location

// START express.js; later you can chain methods to this variable easily
const app = express();

// parses incoming JSON data
app.use(express.json());
// parses incoming string/array data
app.use(express.urlencoded({ extended: true }));
// middleware instructs to make the files static
app.use(express.static('public'));

// app.get() needs 2 args: 1 -> route 2 -> callback function executed every time

// route to notes.html page
app.get('/notes', (req,res) => {
    // Send json to the client 
    res.sendFile(path.join(__dirname,'/public/notes.html'))
});


// GET  API Routes / route to index.html page
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});


// POST request for notes
app.post ('api/notes', (req,res) =>{
    console.log (`${req.method} requested to add a note`)
// create a variable for note information
    const {title, text} =req.body;
// if statements for notes
    if(title && text){
        const newNote = {
            title,
            text,
            id: uuidv4()
        }
        
    }
    
});

// DELETE request for notes



// How it listens to the connection:

app.listen(PORT, () => {
    console.log(`Current Port : ${PORT}`)
})













// how to install express.js
// npm init -y
//  the '-y' skips questionairre and uses default answers