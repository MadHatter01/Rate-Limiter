import redisClient from "./config/redisClient.js"
const rateLimiter = async(req, res, next) =>{
    const ip = req.ip || 'all'
    const bucketSize = 5;
    const refillRate = 1;
    const currentTime = Math.floor(Date.now()/ 1000);

    const tokenData = await redisClient.hGetAll(ip);
    let tokens = parseFloat(tokenData.tokens) || bucketSize;
    let lastFill = parseInt(tokenData.lastRefill) || currentTime;

    const elapsed = currentTime - lastFill;
    tokens = Math.min(bucketSize, tokens + elapsed* refillRate);

    if (tokens < 1){
        return res.status(429).json({error: 'Rate limit exceeded!'})
    }
    tokens -=1;

    await redisClient.hSet(ip, 'tokens', tokens.toString());
    await redisClient.hSet(ip, 'lastRefill', currentTime.toString());
    next();
}

export default rateLimiter;