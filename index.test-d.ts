import {expectType} from 'tsd';
import cacheAsyncIterator from './index.js';

declare const numbersIterator: AsyncIterator<number>;
const cachedNumbersIterator: AsyncIterator<number> = cacheAsyncIterator(numbersIterator, 2)[Symbol.asyncIterator]();

expectType<IteratorResult<number>>(await cachedNumbersIterator.next());
