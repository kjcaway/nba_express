const express = require('express');
const nba = require('./nba');

const router = express.Router();

router.get('/', (req, res) => res.send('Hello, this is api index page.'));
router.use('/nba', nba);

module.exports = router