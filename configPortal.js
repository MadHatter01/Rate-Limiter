import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import redisClient from './config/redisClient.js'

dotenv.config()

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', './views');

const defaultConfig = {
    bucketSize: 10,
    refillRate: 1,
}

app.get('/', async(req, res)=>{
    const data = await redisClient.hGetAll('rateLimiterConfig');
    console.log(data);
    if (Object.keys(data).length > 0){
        return res.render('dashboard', {config: {
            bucketSize: parseInt(data.bucketSize),
            refillRate: parseInt(data.refillRate)
        }})
    }
    return res.render('dashboard', {
        config:defaultConfig
    })
})

app.post('/config', async(req, res)=>{
    const {bucketSize, refillRate} = req.body;
    console.log(bucketSize, refillRate)
    if (bucketSize && refillRate){
        await redisClient.hSet('rateLimiterConfig', 'bucketSize', bucketSize);
        await redisClient.hSet('rateLimiterConfig', 'refillRate', refillRate);
        return res.status(200).redirect('/');
    }
    res.status(400).send('Invalid Data')
})
app.listen(port, ()=>{
    console.log('Config portal running on 3001');
})