import {getStorage, hooked} from './async-hooks-state';
import {AsyncLocalStorage} from 'async_hooks';

describe('async-hooks-state', () => {
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
