const router = require('express').Router();
const fs = require('fs');
const path = require('path');

// function to get database data
function getDbData() {
    return fs.promises.readFile(path.join(__dirname, '../db/db.json'), 'utf8')
        .then(data => JSON.parse(data));
}

router.get('/notes', (req, res) => {
    getDbData()
        .then(data => {
            res.json(data);
        })
        .catch(err => console.log(err));
})

module.exports = router;