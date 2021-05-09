# async-hooks-state
A (very) simple AsyncLocalStorage wrapper & `expressjs` middleware.

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
    assert(getStorage().getStore().get('foo') === 'bar');
}
```




### Type aliases

- [Context](README.md#context)
- [ContextKey](README.md#contextkey)

### Variables

- [RequestSymbol](README.md#requestsymbol)
- [ResponseSymbol](README.md#responsesymbol)

### Functions

- [getRequest](README.md#getrequest)
- [getResponse](README.md#getresponse)
- [getStorage](README.md#getstorage)
- [getStore](README.md#getstore)
- [hooked](README.md#hooked)

## Type aliases

### Context

Ƭ **Context**: *Map*<[*ContextKey*](README.md#contextkey), any\>

Defined in: [lib/async-hooks-state.ts:5](https://github.com/ziv/async-hooks-state/blob/d3fdba2/lib/async-hooks-state.ts#L5)

___

### ContextKey

Ƭ **ContextKey**: *number* \| *string* \| *symbol*

Defined in: [lib/async-hooks-state.ts:4](https://github.com/ziv/async-hooks-state/blob/d3fdba2/lib/async-hooks-state.ts#L4)

## Variables

### RequestSymbol

• `Const` **RequestSymbol**: *typeof* [*RequestSymbol*](README.md#requestsymbol)

Defined in: [lib/async-hooks-state.ts:9](https://github.com/ziv/async-hooks-state/blob/d3fdba2/lib/async-hooks-state.ts#L9)

___

### ResponseSymbol

• `Const` **ResponseSymbol**: *typeof* [*ResponseSymbol*](README.md#responsesymbol)

Defined in: [lib/async-hooks-state.ts:10](https://github.com/ziv/async-hooks-state/blob/d3fdba2/lib/async-hooks-state.ts#L10)

## Functions

### getRequest

▸ `Const` **getRequest**(): *Request*<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>

**Returns:** *Request*<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>

Defined in: [lib/async-hooks-state.ts:23](https://github.com/ziv/async-hooks-state/blob/d3fdba2/lib/async-hooks-state.ts#L23)

___

### getResponse

▸ `Const` **getResponse**(): *Response*<any, Record<string, any\>\>

**Returns:** *Response*<any, Record<string, any\>\>

Defined in: [lib/async-hooks-state.ts:25](https://github.com/ziv/async-hooks-state/blob/d3fdba2/lib/async-hooks-state.ts#L25)

___

### getStorage

▸ `Const` **getStorage**(): *AsyncLocalStorage*<[*Context*](README.md#context)\>

**Returns:** *AsyncLocalStorage*<[*Context*](README.md#context)\>

Defined in: [lib/async-hooks-state.ts:13](https://github.com/ziv/async-hooks-state/blob/d3fdba2/lib/async-hooks-state.ts#L13)

___

### getStore

▸ `Const` **getStore**(): [*Context*](README.md#context)

**Returns:** [*Context*](README.md#context)

Defined in: [lib/async-hooks-state.ts:15](https://github.com/ziv/async-hooks-state/blob/d3fdba2/lib/async-hooks-state.ts#L15)

___

### hooked

▸ `Const` **hooked**(`defaultContext?`: *Record*<string \| number \| symbol, unknown\>): *function*

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `defaultContext` | *Record*<string \| number \| symbol, unknown\> | {} |

**Returns:** (`req`: *Request*<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>, `res`: *Response*<any, Record<string, any\>\>, `next`: NextFunction) => *void*

Defined in: [lib/async-hooks-state.ts:27](https://github.com/ziv/async-hooks-state/blob/d3fdba2/lib/async-hooks-state.ts#L27)
