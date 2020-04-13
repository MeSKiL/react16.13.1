const MAX_SIGNED_31_BIT_INT = 1073741823;
const UNIT_SIZE = 10;
const MAGIC_NUMBER_OFFSET = MAX_SIGNED_31_BIT_INT - 2;

let now = Date.now()
const currentTime = msToExpirationTime(now);
function msToExpirationTime(ms) {
    return MAGIC_NUMBER_OFFSET - ((ms / UNIT_SIZE) | 0);
}
function computeExpirationBucket(
    currentTime,
    expirationInMs,
    bucketSizeMs,
){
    return (
        MAGIC_NUMBER_OFFSET -
        ceiling(
            MAGIC_NUMBER_OFFSET - currentTime + expirationInMs / UNIT_SIZE,
            bucketSizeMs / UNIT_SIZE,
        )
    );
}

function ceiling(num, precision){
    return (((num / precision) | 0) + 1) * precision;
}

// 间隔150ms now=1000时的结果与now=1149时结果相同
console.log(computeExpirationBucket(currentTime,150,100))
console.log(1073741821 - ((( (now/10|0) + 15)/10 | 0)+1) * 10)

// 间隔250ms now=1000时的结果与now=1249时结果相同
console.log(computeExpirationBucket(currentTime,5000,250))
console.log(1073741821 - ((( (now/10|0) + 500)/25 | 0)+1) * 25)
