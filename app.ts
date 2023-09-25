import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import authRouter from './routes/authRouter';
import { sequelize } from './models';
import todoRouter from './routes/todoRouter';

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
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  res.status(500).send({
    message: 'Server Error',
    error: err,
  });
});

app.use('/auth', authRouter);

app.use(passport.authenticate('jwt', { session: false }));

app.use('/todos', todoRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}!`);
});
