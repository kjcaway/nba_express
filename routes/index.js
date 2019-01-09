const express = require('express');

const router = express.Router();
router.get('/', (req, res) => res.send('Hello, this is api index page.'));

module.exports = router