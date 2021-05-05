# async-hooks-state
(very) simple AsyncLocalStorage wrapper with no module execution


## Install
```shell
npm i async-hooks-state
```


## Usage
Simple `async` usage:
```typescript
import {startContext, getContext} from 'async-hooks-state';

const data = new Map();

startContext(data, async () => {
    const ctx = getContext();
    // data === ctx in any async context
})
```

## Express

```typescript
import {hooked, getContext, getRequest} from 'async-hooks-state';
import {NextFunction, Request, Response} from 'express';

const app = express();

app.use(hooked(/*optianl context*/));

// later, in any async context
const route = (req: Request, res: Response, next: NextFunction) => {
    const ctx = getContext();
    const r = getRequest();
    assert(r === req);
```
