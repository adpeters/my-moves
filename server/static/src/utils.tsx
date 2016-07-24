//utils.tsx

//returns duration in form H:m:s from milliseconds integer
export function getTimeString(time: number) {
    var durationStr = Math.floor(time/1000/60/60) + ":";
    durationStr += Math.floor(time/1000/60 % 60) + ":";
    durationStr += Math.floor(time/1000 % 60);
    return durationStr;
}