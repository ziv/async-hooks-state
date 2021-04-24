import {AsyncStorage} from './async-storage-static';

export type Context = Map<any, any>;

/**
 * Run a function within provided context
 *
 * @param ctx
 * @param func
 */
export const startContext = (ctx: Context, func: (...a: any[]) => any) =>
    AsyncStorage.getInstance().run(ctx, func);

/**
 * Get current context
 */
export const getContext = (): Map<any, any> =>
    AsyncStorage.getInstance().getStore();
