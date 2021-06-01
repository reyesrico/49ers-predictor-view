const schedule2021 = [
  { week: 1, team: 10, isLocal: 0 },
  { week: 2, team: 24, isLocal: 0 },
  { week: 3, team: 11, isLocal: 1 },
  { week: 4, team: 28, isLocal: 1 },
  { week: 5, team: 25, isLocal: 0 },
  { week: 7, team: 13, isLocal: 1 },
  { week: 8, team: 5, isLocal: 0 },
  { week: 9, team: 25, isLocal: 1 },
  { week: 10, team: 16, isLocal: 1 },
  { week: 11, team: 14, isLocal: 0 },
  { week: 12, team: 18, isLocal: 1 },
  { week: 13, team: 28, isLocal: 0 },
  { week: 14, team: 6, isLocal: 0 },
  { week: 15, team: 1, isLocal: 1 },
  { week: 16, team: 30, isLocal: 0 },
  { week: 17, team: 12, isLocal: 1 },
  { week: 18, team: 16, isLocal: 0 }
];

const schedule2020 = [
  { week: 1, team: 25, isLocal: 1, teamWin: 0 },
  { week: 2, team: 22, isLocal: 0, teamWin: 1 },
  { week: 3, team: 21, isLocal: 0, teamWin: 1 },
  { week: 4, team: 24, isLocal: 1, teamWin: 0 },
  { week: 5, team: 17, isLocal: 1, teamWin: 0 },
  { week: 6, team: 16, isLocal: 1, teamWin: 1 },
  { week: 7, team: 19, isLocal: 0, teamWin: 1 },
  { week: 8, team: 28, isLocal: 0, teamWin: 0 },
  { week: 9, team: 11, isLocal: 1, teamWin: 0 },
  { week: 10, team: 20, isLocal: 0, teamWin: 0 },
  { week: 12, team: 16, isLocal: 0, teamWin: 1 },
  { week: 13, team: 3, isLocal: 1, teamWin: 0 },
  { week: 14, team: 31, isLocal: 1, teamWin: 0 },
  { week: 15, team: 8, isLocal: 0, teamWin: 0 },
  { week: 16, team: 25, isLocal: 0, teamWin: 1 },
  { week: 17, team: 28, isLocal: 1, teamWin: 0 }
];

const getSchedules = year => {
  console.log({ year });
  switch(year) {
    case 2021:
      return schedule2021;
    case 2020: 
      return schedule2020;
    default:
      return schedule2021;
  }
};

export default getSchedules;
