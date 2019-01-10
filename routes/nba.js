const express = require('express');
const nba = require('nba');

const router = express.Router();

router.post('/player', (req, res) => {
    const player = nba.findPlayer(req.body.name);
    nba.stats.playerInfo({ 'PlayerID': player.playerId }).then(console.log)
    
    res.send(player)
})

module.exports = router