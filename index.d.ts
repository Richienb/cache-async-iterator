/**
Cache future values in an async iterator by calling `.next()` early

@param asyncIterator - The async iterator to cache.
@param cacheSize - The amount of future values to cache.

@example
```
import cacheAsyncIterator from 'cache-async-iterator';

for await (const value of cacheAsyncIterator(asyncIterator, 2)) {
	// The 2 values after the current value are already being collected while the code here runs.
}
```
*/
export default function cacheAsyncIterator<IteratorValue>(asyncIterator: AsyncIterator<IteratorValue>, cacheSize: number): AsyncIterable<IteratorValue>;
