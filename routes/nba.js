const express = require('express');
const nba = require('nba');

const router = express.Router();

router.post('/player', (req, res) => {
    const player = nba.findPlayer(req.body.name);

    if(player == null) {
        return res.status(404).json({'error' : 1, 'message' : 'No match Player'})
    }

    nba.stats.playerInfo({ 'PlayerID': player.playerId })
        .then((data) => {
            return res.json({'error':0, 'data':data})
        })
        .catch(function (err) {
            console.log(err);
            return res.status(500).json({'error' : 1, 'message' : 'Error, playerInfo'})
        });
})

module.exports = router