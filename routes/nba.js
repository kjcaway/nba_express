const express = require('express');
const nba = require('nba');
const Schema = require('validate');
const NbaParser = require('../parser/NbaParser')

const router = express.Router();

const reqBodySchema = new Schema({
    "name": {
        type :String,
        required : true,
        length:{min:3, max:32}
    }
})

router.post('/player', (req, res) => {
    const validError = reqBodySchema.validate(req.body)
    if(validError.length > 0){
        return res.status(400).json({'error': 1, 'message' :validError[0].message})
    }

    const player = nba.findPlayer(req.body.name);

    if(player == null) {
        console.log("No matching player!")
        return res.status(204).json({'data' : null})
    }

    // player id 로 추가 정보 조회 
    nba.stats.playerInfo({ 'PlayerID': player.playerId })
        .then((data) => {
            console.log("Find player! name == "+ data.commonPlayerInfo[0].displayFirstLast)
            return res.json({'data': NbaParser.getPlayerInfo(data)})
        })
        .catch(function (err) {
            console.log(err);
            return res.status(500).json({'error' : 1, 'message' : 'Error, playerInfo'})
        });
})

module.exports = router