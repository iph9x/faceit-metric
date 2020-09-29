export const secToDate = (secs) => {
    const startTime = new Date(null); 
    startTime.setTime(secs);
    const outString = `
        ${startTime.getDate() < 10 ? `0${startTime.getDate()}` : startTime.getDate()}.${startTime.getMonth() < 10 ? `0${startTime.getMonth() + 1}` : startTime.getMonth() + 1} - ${startTime.getHours() < 10 ? `0${startTime.getHours()}` : startTime.getHours()}:${startTime.getMinutes() < 10 ? `0${startTime.getMinutes()}` : startTime.getMinutes()}`;
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

    const size = matches.length;

    for (let i = 0; i < size; i += 1) {
        sumStats.kd += Number.parseFloat(matches[i].c2);
        sumStats.kr += Number.parseFloat(matches[i].c3);
        sumStats.frags += Number.parseFloat(matches[i].i6);
        sumStats.hs += Number.parseFloat(matches[i].c4);
        sumStats.winrate += Number.parseFloat(matches[i].i10);
    }
    let avgStats = {
        kd: Number.parseFloat((sumStats.kd / size).toFixed(2)),
        kr: Number.parseFloat((sumStats.kr / size).toFixed(2)),
        hs: Math.floor(sumStats.hs / size),
        frags: Math.floor(sumStats.frags / size),
        winrate: Math.floor(sumStats.winrate / size * 100) ,
    }
    return avgStats;
}