/* eslint-disable @typescript-eslint/no-explicit-any */

import { IRouter, Router } from 'express';
import { last } from 'lodash';
import { isPromise } from 'util/types';

export const asyncMiddlewareHandle = <T extends (...rest: any) => any>(
  handleFunc: T,
  bindObj?: unknown
): ((...rest: any[]) => ReturnType<T>) => {
  /**
   * 重写app.use方法, 更好的处理异步错误
   */
  return function (...rest: any[]): ReturnType<T> {
    // 遍历所有的中间件
    rest = rest.map(function (handle): any {
      if (typeof handle !== 'function') return handle;

      // 判断是不是错误处理中间件
      const isErrorHandle = handle.length >= 4;
      // 包装一层中间件, 处理异步
      const wrapMiddle = (...rest: any[]) => {
        const nativeNext = last(rest);
        function next(...args: unknown[]) {
          // next只执行一次
          isExecutedNext = true;

          return nativeNext(...args);
        }

        // 替换next方法
        rest.splice(-1, 1, next);
        // 执行中间件
        let res = handle.call(bindObj, ...rest);
        // 判断next是否被执行
        let isExecutedNext = false;

        // 处理异步的错误
        if (isPromise(res)) {
          (async () => {
            try {
              await res;
            } catch (err) {
              !isExecutedNext && next(err);
            }
          })();
        }

        return res;
      };

      return isErrorHandle
        ? (err: unknown, req: unknown, res: unknown, next: unknown) =>
            wrapMiddle(err, req, res, next)
        : (req: unknown, res: unknown, next: unknown) =>
            wrapMiddle(req, res, next);
    });

    handleFunc = bindObj ? handleFunc.bind<any>(bindObj) : handleFunc;
    return handleFunc(...rest);
  };
};

export const asyncRouter: typeof Router = (
  ...rest: any
): ReturnType<typeof Router> => {
  Object.keys(Router).map((key) => {
    const fn = Router[key];
    let newValue = fn;

    if (typeof fn === 'function') {
      newValue = function (this: IRouter, ...arg: unknown[]) {
        return asyncMiddlewareHandle(fn, this)(...arg);
      };
    }

    Router[key] = newValue;
  });

  return Router(...rest);
};
