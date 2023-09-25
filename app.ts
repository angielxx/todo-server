import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import authRouter from './routes/authRouter';
import { sequelize } from './models';
import todoRouter from './routes/todoRouter';
import passportConfig from './config/passport';

dotenv.config();
const app = express();
passportConfig();

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

app.use('/auth', authRouter);

app.use('/todos', passport.authenticate('jwt', { session: false }), todoRouter);

// app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
//   console.log('req', req.body);
//   res.status(500).send({
//     message: 'Server Error',
//     error: err,
//   });
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}!`);
});
