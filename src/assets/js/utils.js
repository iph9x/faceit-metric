export const secToDate = (secs) => {
  const startTime = new Date(null); 
  startTime.setTime(secs);

  const outString = `${startTime.getDate() < 10 ? `0${startTime.getDate()}` : startTime.getDate()}.${startTime.getMonth() + 1 < 10 ? `0${startTime.getMonth() + 1}` : startTime.getMonth() + 1} - ${startTime.getHours() < 10 ? `0${startTime.getHours()}` : startTime.getHours()}:${startTime.getMinutes() < 10 ? `0${startTime.getMinutes()}` : startTime.getMinutes()}`;

  return outString;
}

const summer = (a, b) => {
  return a + Number.parseFloat(b);
};

const findStartElo = (matches) => {
  for (let i = matches.length - 1; i >= 0; i -= 1) {
    if (matches[i].elo !== undefined) {
      return matches[i].elo;
    }
  }
}

const findCurrentElo = (matches) => {
  for (let i = 0; i < matches.length; i += 1) {
    if (matches[i].elo !== undefined) {
      return matches[i].elo;
    } else {
      continue;
    }
  }
}

const calcDifElo = (elo1, elo2) => {
  const def = Number.parseInt(elo1) - Number.parseInt(elo2);

  if (def < 0) {
    return def;
  } else {
    return `+${def}`;
  }
}   

export const calcStatsForNGames = (matches) => {
  let sumStats = {
    kd: 0,
    kr: 0,
    hs: 0,
    avgFrags: 0,
    frags: 0,
    assists: 0,
    winrate: 0,
    trip: 0,
    quad: 0,
    penta: 0,
    mvps: 0,
    eloDif: 0
  };    

  const newObject = matches.reduce((accObj, curObj) => {
    return {
      kd: summer(accObj.kd, curObj.c2),
      kr: summer(accObj.kr, curObj.c3),
      frags: summer(accObj.frags, curObj.i6),
      assists: summer(accObj.assists, curObj.i7),
      hs: summer(accObj.hs, curObj.c4),
      winrate: summer(accObj.winrate, curObj.i10),
      trip: summer(accObj.trip, curObj.i14),
      quad: summer(accObj.quad, curObj.i15),
      penta: summer(accObj.penta, curObj.i16),
      mvps: summer(accObj.mvps, curObj.i9),
    }
  }, sumStats); 

  const size = matches.length;

  let avgStats = {
    kd: (newObject.kd / size).toFixed(2),
    kr: (newObject.kr / size).toFixed(2),
    hs: Math.floor(newObject.hs / size),
    avgFrags: Math.floor(newObject.frags / size),
    assists: newObject.assists,
    frags: newObject.frags,
    winrate: Math.floor(newObject.winrate / size * 100),
    trip: newObject.trip,
    quad: newObject.quad,
    penta: newObject.penta,
    mvps: newObject.mvps,
    eloDif: calcDifElo(findCurrentElo(matches), findStartElo(matches))
  }
  
  return avgStats;
}

export const getMaxElo = (matches) => {
  let maxEloArr = [];

  for (let i = 0; i < matches.length; i += 1) {
    maxEloArr[i] = Number.parseInt(matches[i].elo);
  }

  const maxEloReturn = maxEloArr.filter(item => !(Number.isNaN(item)));

  return Math.max(...maxEloReturn);
}

export const getSlicedMatchList = (matches, listSize) => {
  if (matches.length < listSize) {
    return matches;
  } else {    
    const newArrFull = [...matches];
    
    return newArrFull.slice(0, listSize);
  }
}