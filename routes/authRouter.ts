import express from 'express';
import crypto from 'crypto';

import Users from '../models/users';

const SECRET_KEY = process.env.SECRET_KEY;

const authRouter = express.Router();

authRouter.post('/signup', async (req, res, next) => {
  const { email, password } = req.body;

  const hasSameEamil = await Users.findOne({
    where: { email },
  });

  if (hasSameEamil) {
    res.status(409).send({
      message: '동일한 이메일이 이미 사용 중입니다.',
    });
    res.end();
    return;
  }

  if (!hasSameEamil) {
    const newUser = await Users.create({
      email,
      password: crypto
        .createHash('sha512')
        .update(password + SECRET_KEY)
        .digest('hex'),
    });

    res.send(200).send();
    res.end();
    return;
  }
});

authRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const existUser = await Users.findOne({ where: { email } });

  if (!existUser) {
    res.status(400).send({
      message: '존재하지 않는 계정입니다.',
    });
    return;
  }

  const { password: savedPassword } = existUser;

  const hashedPassword = crypto
    .createHash('sha512')
    .update(password + SECRET_KEY)
    .digest('hex');

  if (hashedPassword !== savedPassword) {
    res.status(400).send({
      message: '비밀번호가 틀렸습니다.',
    });
    return;
  } else {
    res.status(200).send();
    return;
  }
});

export default authRouter;
