# cache-async-iterator

> Cache future values in an async iterator by calling `.next()` early

## Install

```sh
npm install cache-async-iterator
```

## Usage

```js
import cacheAsyncIterator from 'cache-async-iterator';

for await (const value of cacheAsyncIterator(asyncIterator, 2)) {
	// The 2 values after the current value are already being collected while the code here runs.
}
```

## API

### cacheAsyncIterator(asyncIterator, cacheSize)

#### asyncIterator

Type: `AsyncIterator`

The async iterator to cache.

#### cacheSize

Type: `number | Infinity`

The amount of future values to cache.
