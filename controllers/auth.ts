import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import crypto from 'crypto';

import Users from '../models/users';
import refreshToken from '../models/refreshToken';
import { redisCli, redisClient } from '../app';

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
  }

  const ACCESS_KEY = process.env.ACCESS_SECRET as string;
  const REFRESH_KEY = process.env.REFRESH_SECRET as string;

  const access_token = jwt.sign(
    { type: 'JWT', id: user.userId, email },
    ACCESS_KEY,
    {
      expiresIn: '3s',
    }
  );

  const refresh_token = jwt.sign(
    { type: 'JWT', id: user.userId, email },
    REFRESH_KEY,
    {
      expiresIn: '14d',
    }
  );

  // const refreshTokenDoc = new refreshToken({
  //   token: refresh_token,
  //   userId: user.userId.toString(),
  //   expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000 * 14),
  // });
  console.log('here1', redisClient);
  await redisCli.set(user.userId.toString(), refresh_token);
  console.log('here2');

  res
    .cookie('refresh_token', refresh_token, {
      sameSite: 'none',
      httpOnly: true,
      secure: false,
    })
    .status(200)
    .send({ access_token, refresh_token });

  return;
};

const refresh: RequestHandler = async (req, res) => {
  // const refresh_token = req.cookies['refresh_token'];
  const { refresh_token } = req.body;
  console.log('refresh token', refresh_token);

  const REFRESH_KEY = process.env.REFRESH_SECRET as string;
  const ACCESS_KEY = process.env.ACCESS_SECRET as string;

  if (!refresh_token) {
    return res
      .status(401)
      .send({ message: '리프레시 토큰이 존재하지 않습니다.' });
  }

  let jwtPayload: JwtPayload;

  try {
    jwtPayload = jwt.verify(refresh_token, REFRESH_KEY) as JwtPayload;
  } catch (err) {
    return res
      .status(403)
      .send({ message: '유효하지 않은 리프레시 토큰입니다.' });
  }
  console.log('jwtPayload', jwtPayload.id);

  const token = await redisCli.get(jwtPayload.id);

  console.log('token!!!', token);

  if (!token || token !== refresh_token) {
    return res
      .status(403)
      .send({ message: '유효하지 않은 리프레시 토큰입니다.' });
  }

  const access_token = jwt.sign(
    { type: 'JWT', id: jwtPayload.id, email: jwtPayload.email },
    ACCESS_KEY,
    {
      expiresIn: '3s',
    }
  );

  const new_refresh_token = jwt.sign(
    { type: 'JWT', id: jwtPayload.id, email: jwtPayload.email },
    REFRESH_KEY,
    {
      expiresIn: '14d',
    }
  );

  await redisCli.set(jwtPayload.id.toString(), new_refresh_token);

  res.status(200).send({ access_token, refresh_token: new_refresh_token });

  return;
};

const logout: RequestHandler = async (req, res) => {
  const refresh_token = req.cookies['refresh_token'];

  if (refresh_token) {
    await refreshToken.deleteOne({ token: refresh_token });
  }

  res
    .clearCookie('refresh_token')
    .status(200)
    .send({ message: '로그아웃에 성공했습니다.' });
};

export { signup, signin, refresh, logout };
