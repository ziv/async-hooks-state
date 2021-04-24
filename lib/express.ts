import {NextFunction, Request} from 'express';
import {getContext, startContext} from './func';

export const REQ = Symbol('request');
export const RES = Symbol('response');


export const hooked = (defaultContext: Record<any, any> = {}) =>
    (req: Request, res: Response, next: NextFunction) => startContext(
        new Map<any, any>([[REQ, req], [RES, res], ...Object.entries(defaultContext)]),
        next
    );

export const getRequest = (): Request => getContext().get(REQ);
export const getResponse = (): Request => getContext().get(RES);
