const india = require('./teamLists.js').india;
const australia = require('./teamLists.js').australia;

const randomInt = function (number) {
  return Math.round(Math.random() * number);
};

let teams = {
  'india': india,
  'australia': australia,
};

const scoreCard = function (teamName, players) {
  let teamScore = {
    'team': teamName,
    'total': 0,
    'balls': 0,
    'wickets': 0
  };
  let runs = {};
  for (let index = 0; index < players.length; index++) {
    runs[players[index]] = { run: 0, ball: 0 };
  }
  teamScore['runs'] = runs;
  return teamScore;
};

const isInningsContinue = function (balls, wickets) {
  return balls > 0 && wickets < 11;
};

const isInningsOver = function (currentBall, totalBalls, wickets) {
  return currentBall >= totalBalls || wickets >= 11;
};

const firstInnings = function (scoreCard, totalBalls, players, startingIndex) {
  let ballsToBowl = totalBalls;
  let index = startingIndex;
  while (isInningsContinue(ballsToBowl, scoreCard['wickets'])) {
    let batsman = players[index];
    let runInTheBall = randomInt(8);
    if (runInTheBall === 5) {
      runInTheBall = 1;
    }
    scoreCard['runs'][batsman]['ball'] += 1;
    scoreCard['balls'] += 1;
    if (runInTheBall > 6) {
      scoreCard['wickets'] += 1;
      index += 1;
    } else {
      scoreCard['runs'][batsman]['run'] += runInTheBall;
      scoreCard['total'] += runInTheBall;
    }
    ballsToBowl--;
  }
  return scoreCard;
};

const secondInnings = function (scoreCardOfSecond, totalBalls, players, target) {
  while (scoreCardOfSecond['total'] < target) {
    let index = scoreCardOfSecond['wickets'];
    scoreCardOfSecond = firstInnings(scoreCardOfSecond, 1, players, index);
    if (isInningsOver(scoreCardOfSecond['balls'], totalBalls, scoreCardOfSecond['wickets'])) {
      break;
    }
  }
  return scoreCardOfSecond;
};

const decideResult = function (scoreCardOfFirst, scoreCardOfSecond) {
  const firstTeamScore = scoreCardOfFirst['total'];
  const secondTeamScore = scoreCardOfSecond['total'];

  const firstTeamName = scoreCardOfFirst['team'];
  const secondTeamName = scoreCardOfSecond['team'];

  let result = firstTeamName + ' won !';
  if (firstTeamScore < secondTeamScore) {
    result = secondTeamName + ' won !';
  }
  if (firstTeamScore === secondTeamScore) {
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
  const secondBattingTeam = choiceOfTeam === faceOfCoin ? team2 : team1;

  let scoreCardOfFirst = {};
  let scoreCardOfSecond = {};

  scoreCardOfFirst = scoreCard(firstBattingTeam, teams[firstBattingTeam]);
  scoreCardOfSecond = scoreCard(secondBattingTeam, teams[secondBattingTeam]);

  scoreCardOfFirst = firstInnings(scoreCardOfFirst, totalBalls, teams[firstBattingTeam], 0);

  const target = scoreCardOfFirst['total'] + 1;

  scoreCardOfSecond = secondInnings(scoreCardOfSecond, totalBalls, teams[secondBattingTeam], target);

  let result = decideResult(scoreCardOfFirst, scoreCardOfSecond);

  matchStat(scoreCardOfFirst, scoreCardOfSecond, result);
};

const totalBalls = 120;

match('india', 'australia', totalBalls);
