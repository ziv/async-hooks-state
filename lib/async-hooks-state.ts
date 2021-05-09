import {NextFunction, Request, Response} from 'express';
import {AsyncLocalStorage as ALC} from 'async_hooks';

export type ContextKey = number | string | symbol;
export type Context = Map<ContextKey, any>;

let storage: ALC<Context>;

export const RequestSymbol = Symbol('request');
export const ResponseSymbol = Symbol('response');


export const getStorage = (): ALC<Context> => storage ? storage : storage = new ALC<Context>();

export const getStore = (): Context => {
    const store = getStorage().getStore();
    if (!store) {
        throw new Error('Store not set yet. Make sure to register the hooked middleware.');
    }
    return store;
}

export const getRequest = (): Request => getStore().get(RequestSymbol);

export const getResponse = (): Response => getStore().get(ResponseSymbol);

export const hooked = (defaultContext: Record<string | number | symbol, unknown> = {}) =>
    (req: Request, res: Response, next: NextFunction) => getStorage().run(
        new Map<ContextKey, unknown>([
            [RequestSymbol, req],
            [ResponseSymbol, res],
            ...Object.entries(defaultContext)
        ]),
        next
    );


