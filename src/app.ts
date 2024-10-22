import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { PORT } from './utils/env';
import { rateLimitMiddleware } from './middlewares/rateLimit.middleware';
import rootRouter from './routes/rootRouter';
import { errorHandlerMiddleware } from './middlewares/errors.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS MIDDLEWARE
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// LOGGING MIDDLEWARE
app.use(morgan('dev'));

// HIDDEN SENSITIVE HEADER INFO
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api', [rateLimitMiddleware(5, 5000)], rootRouter);

app.use(errorHandlerMiddleware);

// EXit on uncaughtException and unhandledRejection
process.on('uncaughtException', (error) => {
  console.log('uncaughtException', error);

  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('unhandledRejection: ', reason);

  process.exit(1);
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
