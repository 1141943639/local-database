import { IRouter, IRouterHandler } from 'express';

export interface CreateRouterOption {
  prefix?: string;
}

export interface MyRouter extends IRouter {
  option?: CreateRouterOption;
}
