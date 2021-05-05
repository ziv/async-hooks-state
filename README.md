# async-hooks-state
A (very) simple AsyncLocalStorage wrapper with no module execution!


### Install
```shell
npm i async-hooks-state
```


### Usage
`expressjs` example:
```typescript
import {hooked, getStorage, getRequest} from 'async-hooks-state';
import {NextFunction, Request, Response} from 'express';

const app = express();

const optionalContext = { foo: 'bar' };
app.use(hooked(optionalContext));

// later, in any async context
const route = (req: Request, res: Response, next: NextFunction) => {
    const r = getRequest();
    assert(r === req);
    assert(getStorage.getStore().get('foo') === 'bar');
}
```

### API
`hooked(defaultContext: Record<string | number | symbol, unknown> = {})`

`getStorage()`

`getRequest()`

`getResponse()`
