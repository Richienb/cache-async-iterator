import test from 'ava';
import createDeferredAsyncIterator from 'deferred-async-iterator';
import cacheAsyncIterator from './index.js';

// An iterator that produces numbers starting at 1
async function * numbersIterator(end = Number.POSITIVE_INFINITY) {
	for (let number = 1; number <= end; number++) {
		yield number;
	}
}

async function asyncIteratorToArray(asyncIterator) {
	const result = [];

	for await (const value of asyncIterator) {
		result.push(value);
	}

	return result;
}

test('main', async t => {
	const iterator = numbersIterator();
	const cachedIterator = cacheAsyncIterator(iterator, 2)[Symbol.asyncIterator]();

	t.deepEqual(await cachedIterator.next(), {
		value: 1,
		done: false,
	});
});

test('caching every value', async t => {
	const iterator = numbersIterator(3);
	const cachedIterator = cacheAsyncIterator(iterator, Number.POSITIVE_INFINITY);

	t.deepEqual(await asyncIteratorToArray(cachedIterator), [
		1,
		2,
		3,
	]);
});

test('resolving even when the cache is empty', async t => {
	const {next, iterator} = createDeferredAsyncIterator();
	const cachedIterator = cacheAsyncIterator(iterator, Number.POSITIVE_INFINITY)[Symbol.asyncIterator]();

	let count = 1;

	next(count++);

	t.deepEqual(await cachedIterator.next(), {
		value: 1,
		done: false,
	});

	const promise = cachedIterator.next();

	next(count++);

	t.deepEqual(await promise, {
		value: 2,
		done: false,
	});
});
