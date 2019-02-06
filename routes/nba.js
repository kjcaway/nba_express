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
    },
    "isRaw": {
        type : Boolean
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
    nba.stats.playerInfo({ PlayerID : player.playerId })
        .then((data) => {
            console.log("Find player! name == "+ data.commonPlayerInfo[0].displayFirstLast)

            if(req.body.isRaw){
                return res.json(data);
            } else{
                return res.json({'data': NbaParser.getPlayerInfo(data)})
            }
        })
        .catch(function (err) {
            console.log(err);
            return res.status(500).json({'error' : 1, 'message' : 'Error, playerInfo'})
        });
})

router.post('/team', (req, res) => {
    nba.stats.teamInfoCommon({
        TeamID : req.body.teamId,
        Season : req.body.season
    }).then((data) => {
        return res.json(data)
    })
})

router.post('/scoreboard', (req, res) => {
    nba.stats.scoreboard({
        gameDate : req.body.gameDate
    }).then((data) => {
        return res.json(data)
    })
})

router.post('/rank', (req, res) => {
    nba.stats.scoreboard({
        gameDate : req.body.gameDate
    }).then((data) => {
        
        return res.json({'data': NbaParser.getRank(data)})
    })
})

router.post('/playbyplay', (req, res) => {
    nba.stats.playByPlay({
        GameID : req.body.gameID
    }).then((data) => {
        return res.json(data)
    })
})

router.post('/playerprofile', (req, res) => {
    nba.stats.playerProfile({
        PlayerID : req.body.playerId,
        Season : req.body.season
    }).then((data) => {
        return res.json(data)
    })
})



module.exports = router