import {AsyncLocalStorage} from 'async_hooks';

export class AsyncStorage {
    static storage: AsyncLocalStorage<any>;

    static getInstance(): AsyncLocalStorage<any> {
        if (!AsyncStorage.storage) {
            AsyncStorage.storage = new AsyncLocalStorage();
        }
        return AsyncStorage.storage;
    }
}
