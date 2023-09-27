import User from '../models/user';

declare global {
  interface Error {
    status?: number;
  }

  namespace Express {
    interface Request {
      user: User;
    }
    // interface User extends _User {}
  }
}
