import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import rateLimiter from './rateLimiter.js';
dotenv.config();

const app = express();
app.use(rateLimiter);
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res)=>{
    res.render('landingPage')
})


app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})