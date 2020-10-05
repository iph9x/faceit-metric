export const secToDate = (secs) => {
    const startTime = new Date(null); 
    startTime.setTime(secs);
    const outString = `${startTime.getDate() < 10 ? `0${startTime.getDate()}` : startTime.getDate()}.${startTime.getMonth() + 1 < 10 ? `0${startTime.getMonth() + 1}` : startTime.getMonth() + 1} - ${startTime.getHours() < 10 ? `0${startTime.getHours()}` : startTime.getHours()}:${startTime.getMinutes() < 10 ? `0${startTime.getMinutes()}` : startTime.getMinutes()}`;
    return outString;
}

export const calcStatsForNGames = (matches) => {
    let sumStats = {
        kd: 0,
        kr: 0,
        hs: 0,
        frags: 0,
        winrate: 0,
    };

    const summer = (a, b) => {
        return a + Number.parseFloat(b);
    };

    const newObject = matches.reduce((accObj, curObj) => {
        return {
            kd: summer(accObj.kd, curObj.c2),
            kr: summer(accObj.kr, curObj.c3),
            frags: summer(accObj.frags, curObj.i6),
            hs: summer(accObj.hs, curObj.c4),
            winrate: summer(accObj.winrate, curObj.i10),
        }
    }, sumStats); 

    const size = matches.length;

    let avgStats = {
        kd: (newObject.kd / size).toFixed(2),
        kr: (newObject.kr / size).toFixed(2),
        hs: Math.floor(newObject.hs / size),
        frags: Math.floor(newObject.frags / size),
        winrate: Math.floor(newObject.winrate / size * 100) ,
    }
   
    return avgStats;
}

export const getMaxElo = (matches) => {
    let maxEloArr = [];

    for (let i = 0; i < matches.length; i += 1) {
        maxEloArr[i] = Number.parseInt(matches[i].elo);
    }
    const maxEloReturn = maxEloArr.filter(item => !(Number.isNaN(item)) );
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