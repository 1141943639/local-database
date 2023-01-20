import { IRouter } from 'express';

export interface CreateRouterOption {
  prefix?: string;
  authWhiteList?: string[];
}

export interface MyRouter extends IRouter {
  option?: CreateRouterOption;
}
