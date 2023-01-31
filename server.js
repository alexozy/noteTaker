// Require 
const express = require('express');
const path = require('path');
const fs = require("fs");

// This will tell node we are creating an 'express' server
// START express.js; later you can chain methods to this variable easily
const app = express();

// make the server listen 
const PORT = process.env.PORT || 3001;
//  a port = think coordinates. it gives an exact location


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// GET HTML ROUTES | app.get() needs 2 args: 1 -> route 2 -> callback function executed every time
// route to notes.html page
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname,'/public/notes.html'))
});

// GET  API Routes / route to index.html page
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});
// from class notes this returns JSON instead of strings
// app.get('/api', (req, res) => res.json(termData));

// app.get('/dennis', (req, res) => {
//     fs.readFile('./db/db.json', 'utf8', (err) => {
//         console.log(err)
//     })
// })

// How it listens to the connection:

app.listen(PORT, () => {
    console.log(`Current Port : ${PORT}`)
})




// how to install express.js
// npm init -y
//  the '-y' skips questionairre and uses default answers