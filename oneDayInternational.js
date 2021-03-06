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
  return {
    'team': teamName,
    'total': 0,
    'balls': 0,
    'wickets': 0,
    'scores': scores
  };
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
    return 1;
  }
  if (zeroRun.includes(runInTheBall)) {
    return 0;
  }
  return runInTheBall;
};

const updateScoreCard = function (scoreCard, batsman, runInTheBall) {
  const currentHit = updateRunInTheBall(runInTheBall);
  let batsmanRecords = scoreCard['scores'][batsman];
  batsmanRecords['balls'] += 1;
  scoreCard['balls'] += 1;
  if (currentHit > 14) {
    scoreCard['wickets'] += 1;
  } else {
    batsmanRecords['runs'] += currentHit;
    scoreCard['total'] += currentHit;
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
      return scoreCard;
    }
  }
  return scoreCard;
};

const decideResult = function (scoreCardOfFirst, scoreCardOfSecond) {
  let result = scoreCardOfFirst['team'] + ' won !';
  if (scoreCardOfFirst['total'] < scoreCardOfSecond['total']) {
    return scoreCardOfSecond['team'] + ' won !';
  }
  if (scoreCardOfFirst['total'] === scoreCardOfSecond['total']) {
    return 'Match Draw';
  }
  return result;
};

const matchStat = function (scoreCardOfFirst, scoreCardOfSecond, result) {
  const keysOfCard = Object.keys(scoreCardOfFirst);
  console.log('First Innings : -');
  keysOfCard.map(function (key) {
    key === 'scores' ? console.table(scoreCardOfFirst[key])
      : console.log(key, ':', scoreCardOfFirst[key]);
  });
  console.log('Second Innings : -');
  keysOfCard.map(function (key) {
    key === 'scores' ? console.table(scoreCardOfSecond[key])
      : console.log(key, ':', scoreCardOfSecond[key]);
  });
  console.log('Match Result', result);
};

const match = function (team1, team2, totalBalls) {
  const coinsFace = ['head', 'tail'];

  const choiceOfTeam = coinsFace[randomInt(1)];
  const faceOfCoin = coinsFace[randomInt(1)];

  let firstBattingTeam = team1;
  let secBattingTeam = team2;

  if (choiceOfTeam !== faceOfCoin) {
    firstBattingTeam = team2;
    secBattingTeam = team1;
  }

  let scoreCardOfFirst = scoreCard(firstBattingTeam, teams[firstBattingTeam]);
  let scoreCardOfSecond = scoreCard(secBattingTeam, teams[secBattingTeam]);

  scoreCardOfFirst = firstInnings(scoreCardOfFirst, totalBalls, teams[firstBattingTeam], 0);
  const target = scoreCardOfFirst['total'] + 1;
  scoreCardOfSecond = secondInnings(scoreCardOfSecond, totalBalls, teams[secBattingTeam], target);

  let result = decideResult(scoreCardOfFirst, scoreCardOfSecond);

  matchStat(scoreCardOfFirst, scoreCardOfSecond, result);
};

const totalBalls = 300;

match('india', 'australia', totalBalls);
