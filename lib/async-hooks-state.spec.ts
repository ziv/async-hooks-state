import {Context, getStorage, getStore, hooked} from './async-hooks-state';
import {AsyncLocalStorage, executionAsyncId} from 'async_hooks';

describe('async-hooks-state', () => {
    describe('construction', () => {
        it('should return AsyncLocalStorage object', () => {
            expect(getStorage()).toBeInstanceOf(AsyncLocalStorage);
        });

        it('should return the same AsyncLocalStorage object', () => {
            expect(getStorage()).toBe(getStorage());
        });

        it('should create a function with 3 args (middleware)', () => {
            const func = hooked();
            expect(func).toBeInstanceOf(Function);
            expect(func.length).toBe(3);
        });
    });

    describe('async test', () => {
        const asyncFunc = () => Promise.resolve(true);

        it('should keep async data', done => {
            const c1: Context = new Map([['test', 1], ['inc', 0]]);
            const c2: Context = new Map([['test', 2], ['inc', 0]]);

            const sync = {executor: executionAsyncId()};

            const assertExecIdChanged = () => {
                const executor = executionAsyncId();
                expect(executor).not.toEqual(sync.executor);
                sync.executor = executor;
                return true;
            };

            const cb1 = () => Promise.resolve()
                .then(() => assertExecIdChanged())
                .then(() => {
                    expect(getStore().get('test')).toBe(1);
                    expect(getStore().get('inc')).toBe(0);
                    getStore().set('inc', 1);
                    return assertExecIdChanged();
                }).then(() => {
                    expect(getStore().get('test')).toBe(1);
                    expect(getStore().get('inc')).toBe(1);
                    return assertExecIdChanged();
                });

            const cb2 = () => Promise.resolve()
                .then(() => assertExecIdChanged())
                .then(() => {
                    expect(getStore().get('test')).toBe(2);
                    expect(getStore().get('inc')).toBe(0);
                    getStore().set('inc', 2)
                    return assertExecIdChanged();
                }).then(() => {
                    expect(getStore().get('test')).toBe(2);
                    expect(getStore().get('inc')).toBe(2);
                    return assertExecIdChanged();
                });

            Promise.all([
                getStorage().run(c1, cb1),
                getStorage().run(c2, cb2)
            ]).then(() => {
                done();
            })
        });
    });
});
