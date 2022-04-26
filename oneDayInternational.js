const india = require('./teamLists.js').india;
const australia = require('./teamLists.js').australia;

const randomInt = function (number) {
  return Math.round(Math.random() * number);
};

let teams = { 'india': india, 'australia': australia };

const scoreCard = function (teamName, players) {
  let scores = {};
  for (let index = 0; index < players.length; index++) {
    scores[players[index]] = { runs: 0, balls: 0, strikeRate: 0 };
  }
  let teamScore = {
    'team': teamName,
    'total': 0,
    'balls': 0,
    'wickets': 0,
    'scores': scores
  };
  return teamScore;
};

const isInningsContinue = function (balls, scoreCard) {
  return balls > 0 && scoreCard['wickets'] < 11;
};

const isInningsOver = function (totalBalls, scoreCard) {
  return scoreCard['balls'] >= totalBalls || scoreCard['wickets'] >= 11;
};

const updateRunInTheBall = function (runInTheBall) {
  const zeroRun = [7, 8, 9, 10, 11, 12, 13, 14];
  const oneRun = [1, 3, 5];
  if (oneRun.includes(runInTheBall)) {
    runInTheBall = 1;
  }
  if (zeroRun.includes(runInTheBall)) {
    runInTheBall = 0;
  }
  return runInTheBall;
}

const updateScoreCard = function (scoreCard, batsman, runInTheBall) {
  runInTheBall = updateRunInTheBall(runInTheBall);
  let batsmanRecords = scoreCard['scores'][batsman];
  batsmanRecords['balls'] += 1;
  scoreCard['balls'] += 1;
  if (runInTheBall > 14) {
    scoreCard['wickets'] += 1;
  } else {
    batsmanRecords['runs'] += runInTheBall;
    scoreCard['total'] += runInTheBall;
  }
  batsmanRecords['strikeRate'] = Math.round(100 *
    batsmanRecords['runs'] / batsmanRecords['balls']);
  return scoreCard;
};

const firstInnings = function (scoreCard, totalBalls, players, startingIndex) {
  let ballsToBowl = totalBalls;
  let index = startingIndex;
  while (isInningsContinue(ballsToBowl, scoreCard)) {
    let batsman = players[index];
    let runInTheBall = randomInt(15);
    updateScoreCard(scoreCard, batsman, runInTheBall);
    if (runInTheBall > 14) {
      index += 1;
    }
    ballsToBowl--;
  }
  return scoreCard;
};

const secondInnings = function (scoreCard, totalBalls, players, target) {
  while (scoreCard['total'] < target) {
    let index = scoreCard['wickets'];
    scoreCard = firstInnings(scoreCard, 1, players, index);
    if (isInningsOver(totalBalls, scoreCard)) {
      break;
    }
  }
  return scoreCard;
};

const decideResult = function (scoreCardOfFirst, scoreCardOfSecond) {
  let result = scoreCardOfFirst['team'] + ' won !';
  if (scoreCardOfFirst['total'] < scoreCardOfSecond['total']) {
    result = scoreCardOfSecond['team'] + ' won !';
  }
  if (scoreCardOfFirst['total'] === scoreCardOfSecond['total']) {
    result = 'Match Draw';
  }
  return result;
};

const matchStat = function (scoreCardOfFirst, scoreCardOfSecond, result) {
  console.log('First Innings', scoreCardOfFirst);
  console.log('Second Innings', scoreCardOfSecond);
  console.log('Match Result', result);
};

const match = function (team1, team2, totalBalls) {
  const coinsFace = ['head', 'tail'];

  const choiceOfTeam = coinsFace[randomInt(1)];
  const faceOfCoin = coinsFace[randomInt(1)];

  const firstBattingTeam = choiceOfTeam === faceOfCoin ? team1 : team2;
  const secBattingTeam = choiceOfTeam === faceOfCoin ? team2 : team1;

  let scoreCardOfFirst = scoreCard(firstBattingTeam, teams[firstBattingTeam]);
  let scoreCardOfSecond = scoreCard(secBattingTeam, teams[secBattingTeam]);

  firstInnings(scoreCardOfFirst, totalBalls, teams[firstBattingTeam], 0);
  const target = scoreCardOfFirst['total'] + 1;
  secondInnings(scoreCardOfSecond, totalBalls, teams[secBattingTeam], target);

  let result = decideResult(scoreCardOfFirst, scoreCardOfSecond);

  matchStat(scoreCardOfFirst, scoreCardOfSecond, result);
};

const totalBalls = 300;

match('india', 'australia', totalBalls);
