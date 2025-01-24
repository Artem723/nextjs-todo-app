import winston from 'winston'

const { format } = winston;

const logger = winston.createLogger({
    level: 'http',
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.align(),
        format.metadata(),
        format.errors({ stack: true }),
        format.json()
    ),
    transports: [
        new winston.transports.Console(),
        // new winston.transports.File({ filename: '../logs/logs.log' })
    ]
});

export default logger;