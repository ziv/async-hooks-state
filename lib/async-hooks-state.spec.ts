import {getStorage, hooked} from './async-hooks-state';
import {AsyncLocalStorage} from 'async_hooks';

describe('async-hooks-state', () => {
    it('should return AsyncLocalStorage object', () => {
        expect(getStorage()).toBeInstanceOf(AsyncLocalStorage);
    });

    it('should return the same AsyncLocalStorage object', () => {
        expect(getStorage()).toBe(getStorage());
    });

    it('should create a function', () => {
        expect(hooked()).toBeInstanceOf(Function);
        expect(hooked().length).toBe(3);
    });
});
