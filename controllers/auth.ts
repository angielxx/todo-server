import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import Users from '../models/users';

const { SECRET_KEY, ACCESS_SECRET, REFRESH_SECRET } = process.env;

const signup: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  const hasSameEamil = await Users.findOne({
    where: { email },
  });

  if (hasSameEamil) {
    res.status(409).send({
      message: '동일한 이메일이 이미 사용 중입니다.',
    });

    return;
  }

  if (!hasSameEamil) {
    await Users.create({
      email,
      password: crypto
        .createHash('sha512')
        .update(password + SECRET_KEY)
        .digest('hex'),
    });

    res.send(200).send();

    return;
  }
};

const signin: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email } });

  if (!user) {
    res.status(400).send({
      message: '존재하지 않는 계정입니다.',
    });
    return;
  }

  const { password: savedPassword } = user;

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
    const ACCESS_KEY = process.env.ACCESS_SECRET as string;
    const REFRESH_KEY = process.env.REFRESH_SECRET as string;

    const access_token = jwt.sign(
      { type: 'JWT', id: user.userId, email },
      ACCESS_KEY,
      {
        expiresIn: '15m',
      }
    );
    const refresh_token = jwt.sign({ type: 'JWT', email }, REFRESH_KEY, {
      expiresIn: '1d',
    });

    res
      .cookie('refresh_token', refresh_token, {
        sameSite: 'none',
        httpOnly: true,
        secure: false,
      })
      .status(200)
      .send({ access_token });

    return;
  }
};

export { signup, signin };
