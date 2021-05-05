import {NextFunction, Request, Response} from 'express';
import {AsyncLocalStorage as ALC} from 'async_hooks';

export type ContextKey = string | Symbol;
export type Context = Map<ContextKey, any>;

let storage: ALC<Context>;
export const RequestSymbol = Symbol('request');
export const ResponseSymbol = Symbol('response');


export const getStorage = (): ALC<Context> => storage ? storage : storage = new ALC<Context>();
export const getRequest = (): Request => getStorage().getStore().get(RequestSymbol);
export const getResponse = (): Response => getStorage().getStore().get(ResponseSymbol);

export const hooked = (defaultContext: Record<string, unknown> = {}) =>
    (req: Request, res: Response, next: NextFunction) => getStorage().run(
        new Map<ContextKey, unknown>([
            [RequestSymbol, req],
            [ResponseSymbol, res],
            ...Object.entries(defaultContext)
        ]),
        next
    );


