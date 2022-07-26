// import express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3333;

// import path
const path = require('path');

// share browser files
app.use(express.static(path.join(__dirname, 'public')));

// allow json data
app.use(express.json());

// load routes
//app.use('/public')

// start server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})