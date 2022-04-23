const ktk = {
  matches: 14,
  runs: 1901
};

const rpsg = {
  matches: 30,
  runs: 4533
};

const gl = {
  matches: 30,
  runs: 4856
};

const pwi = {
  matches: 46,
  runs: 6358
};

const dch = {
  matches: 75,
  runs: 11463
};

const srh = {
  matches: 131,
  runs: 20405
};

const rr = {
  matches: 168,
  runs: 25572
};

const csk = {
  matches: 186,
  runs: 29678
};

const kkr = {
  matches: 199,
  runs: 30493
};

const dc = {
  matches: 202,
  runs: 30662
};

const rcb = {
  matches: 203,
  runs: 31144
};

const pbks = {
  matches: 198,
  runs: 31259
};

const mi = {
  matches: 210,
  runs: 33406
};

const teams = [ktk, rpsg, gl, pwi, dch, srh, rr, csk, kkr, dc, rcb, pbks, mi];

const totalMatchesInIpl = function (teams) {
  return (teams.reduce(function (totalMatches, team) {
    totalMatches += team['matches'];
    return totalMatches;
  }, 0)) / 2;
};

const totalRunsInIpl = function (teams) {
  return teams.reduce(function (totalRuns, team) {
    totalRuns += team['runs'];
    return totalRuns;
  }, 0);
};

const averageRunsPerMatch = function (teams) {
  return Math.round(totalRunsInIpl(teams) / totalMatchesInIpl(teams));
}

console.log('Total Matches In IPL', totalMatchesInIpl(teams));
console.log('Total Runs In IPL', totalRunsInIpl(teams));
console.log('Average Runs Per Match In IPL', averageRunsPerMatch(teams));
