import { NextFunction, Request, Response } from 'express';
import { Middleware } from 'types/express_type';

class UserController {
  register: Middleware = (req, res) => {
    res.json('124');
  };
}

export default new UserController();
