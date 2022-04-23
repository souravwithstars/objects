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
  let teamScore = {};
  teamScore['name'] = teamName;
  let runs = {};
  for (let index = 0; index < players.length; index++) {
    runs[players[index]] = { run: 0, ball: 0 };
  }
  teamScore['runs'] = runs;
  teamScore['total'] = 0;
  teamScore['balls'] = 0;
  teamScore['wickets'] = 0;
  return teamScore;
};

const isInningsContinue = function (balls, wickets) {
  return balls > 0 && wickets < 11;
};

const firstInnings = function (scoreCardOfFirst, totalBalls, players) {
  // let ballsToBowl = totalBalls;
  let ballsToBowl = 10;
  let index = 0;
  while (isInningsContinue(ballsToBowl, scoreCardOfFirst['wickets'])) {
    let batsman = players[index];
    let runInTheBall = randomInt(8);
    if (runInTheBall === 5) {
      runInTheBall = 1;
    }
    scoreCardOfFirst['runs'][batsman]['ball'] += 1;
    scoreCardOfFirst['balls'] += 1;
    if (runInTheBall > 6) {
      scoreCardOfFirst['wickets'] += 1;
      index += 1;
    } else {
      scoreCardOfFirst['runs'][batsman]['run'] += runInTheBall;
      scoreCardOfFirst['total'] += runInTheBall;
    }
    ballsToBowl--;
  }
  console.log(scoreCardOfFirst);
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

  scoreCardOfFirst = firstInnings(scoreCardOfFirst, totalBalls, teams[firstBattingTeam]);
  // console.log('first team', scoreCardOfFirst);
  // console.log('second team', scoreCardOfSecond);

  // console.log(team1, 'choose', choiceOfFirstTeam);
  // console.log('Face of coin is', faceOfCoinCame);
};

const totalBalls = 120;

match('india', 'australia', totalBalls);
