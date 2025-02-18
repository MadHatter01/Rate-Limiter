import redisClient from "./config/redisClient.js"
import express from 'express';
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.set('views', './views');

const defaultConfig = {
    bucketSize: 10,
    refillRate: 1
}
const rateLimiter = async(req, res, next) =>{
    const ip = req.ip || 'all'
    const data = await redisClient.hGetAll('rateLimiterConfig');
    const bucketSize = data.bucketSize || defaultConfig.bucketSize;
    const refillRate = data.refillRate || defaultConfig.refillRate;
    const currentTime = Math.floor(Date.now()/ 1000);
    const tokenData = await redisClient.hGetAll(ip);
    // console.log(bucketSize, refillRate, tokenData)

    let tokens = parseFloat(tokenData.tokens) || bucketSize;
    let lastFill = parseInt(tokenData.lastRefill) || currentTime;

    const elapsed = currentTime - lastFill;
    tokens = Math.min(bucketSize, tokens + elapsed* refillRate);

    if (tokens < 1){
        return res.status(429).render('limitExceeded', {message: 'Oi! Slow down. Rate Limit exceeded!'})
    }
    tokens -=1;

    await redisClient.hSet(ip, 'tokens', tokens.toString());
    await redisClient.hSet(ip, 'lastRefill', currentTime.toString());
    next();
}

export default rateLimiter;