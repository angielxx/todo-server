import express from 'express';

import { logout, refresh, signin, signup } from '../controllers/auth';

const authRouter = express.Router();

authRouter.post('/signup', signup);

authRouter.post('/signin', signin);

authRouter.post('/refreshToken', refresh);

authRouter.delete('/refreshToken', refresh);

authRouter.post('/logout', logout);

export default authRouter;
