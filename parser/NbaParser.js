const _ = require('lodash');

function getPlayerInfo(data){
  let result = {
    pId : '',
    pName : '',
    birthDate : '',
    school : '',
    country : '',
    lastAffiliation : '',
    seasonExp : '',
    jersey : '',
    position : '',
    rosterStatus : '',
    tId : '',
    tCity : '',
    tName : '',
    fromYear : '',
    toYear : '',
    dFlag :'',
    nbaFlag :'',
    draftYear : '',
    draftRound : '',
    draftNumber :'',
    timeFrame : '',
    pts : '',
    ast : '',
    reb : ''
  };


  try{
    const commonPlayerInfo = _.get(data, 'commonPlayerInfo', []);
    const playerHeadlineStats = _.get(data, 'playerHeadlineStats', []);

    if(commonPlayerInfo.length === 1){
      const temp = commonPlayerInfo[0];
  
      result.pId = temp.personId;
      result.pName = temp.displayFirstLast;
      result.birthDate = temp.birthdate;
      result.school = temp.school;
      result.country = temp.country;
      result.lastAffiliation = temp.lastAffiliation;
      result.seasonExp = temp.seasonExp;
      result.jersey = temp.jersey;
      result.position = temp.position;
      result.rosterStatus = temp.rosterstatus;
      result.tId = temp.teamId;
      result.tCity = temp.teamCity;
      result.tName = temp.teamName;
      result.fromYear = temp.fromYear;
      result.toYear = temp.toYear;
      result.dFlag = temp.dleagueFlag;
      result.nbaFlag = temp.nbaFlag;
      result.draftYear = temp.draftYear;
      result.draftRound = temp.draftRound;
      result.draftNumber = temp.draftNumber;
    }

    if(playerHeadlineStats.length === 1){
      const temp = playerHeadlineStats[0];

      result.timeFrame = temp.timeFrame;
      result.pts = temp.pts;
      result.ast = temp.ast;
      result.reb = temp.reb;
    }

    return result;
  }catch(e){
    return {error: 'Parse Error'}
  }
}

function getRank(data){
  let result = {};

  result.eastConfStandingsByDay = _.get(data,'eastConfStandingsByDay', []);
  result.westConfStandingsByDay = _.get(data,'westConfStandingsByDay', []);

  return result;
}

module.exports = {getPlayerInfo, getRank}