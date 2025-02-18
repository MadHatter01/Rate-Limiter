import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

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
    res.render('dashboard', {
        config:{
           bucketSize: defaultConfig.bucketSize,
           refillRate: defaultConfig.refillRate, 
        }
    })
})


app.listen(port, ()=>{
    console.log('Config portal running on 3001');
})