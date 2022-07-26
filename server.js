// import express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3333;

// import path
const path = require('path');

// import route
const router = require('./routes/api_routes');

// share browser files
app.use(express.static(path.join(__dirname, 'public')));

// allow json data
app.use(express.json());

// load routes
app.use('/api', router);

//send html pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

// start server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})