import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res)=>{
    res.send('Server running');
})


app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})