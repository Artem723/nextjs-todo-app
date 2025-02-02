import express from 'express'
import logger from './logger/index.mjs';
import { placeUserData } from './middlewares.mjs';
import cookieParser from 'cookie-parser';


const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/tasks/add', placeUserData, (req, res) => {

})

app.get('/tasks/:id', placeUserData, (req, res) => {
    
})