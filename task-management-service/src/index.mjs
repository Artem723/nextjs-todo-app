import express from 'express'
import { requestErrorHandler } from './middlewares.mjs';
import cookieParser from 'cookie-parser';
import tasksRouter from './routes/tasks.mjs';
import logger from './logger/index.mjs';
const PORT = 80;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/tasks', tasksRouter);

app.use(requestErrorHandler)

app.listen(PORT, () => {
    logger.info(`Service has been started. Listening on port ${PORT}`)
})
