const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const db_path = path.join(__dirname, '../db/db.json');

// function to get database data
function getDbData() {
    return fs.promises.readFile(db_path, 'utf8')
        .then(data => JSON.parse(data));
}

router.get('/notes', (req, res) => {
    getDbData()
        .then(data => {
            res.json(data);
        })
        .catch(err => console.log(err));
})

router.post('/notes', (req, res) => {
    getDbData()
        .then(note_data => {
            const new_note = req.body;

            //set id to next ID number
            const ref_id = note_data.length ? note_data[note_data.length - 1].id : 0;
            new_note.id = ref_id + 1;

            //add to array
            note_data.push(new_note);
            console.log(note_data);

            //write DB file adding note
            fs.promises.writeFile(db_path, JSON.stringify(note_data, null, 2))
                .then(() => res.json(note_data))
                .catch(err => console.log(err));
        })
})

router.delete('/notes', (req, res) => {
    getDbData()
        .then(note => {
            const id = req.body.id;
            //console.log(note.id);
            const obj = note.find(note => note.id === id);
            const index = note.indexOf(obj);

            note.splice(index, 1)

            fs.promises.writeFile(db_path, JSON.stringify(note, null, 2))
                .then(() => {
                    console.log('Notes updated successfully');
                    res.json(note)
                })
                .catch(err => console.log(err));
        })
})

module.exports = router;