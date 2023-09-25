import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRouter from './routes/authRouter';
import { sequelize } from './models';

const app = express();

dotenv.config();

const corOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err: Error) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(cors(corOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  res.status(500).send({
    message: 'Server Error',
    error: err,
  });
});

app.use('/auth', authRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}!`);
});
