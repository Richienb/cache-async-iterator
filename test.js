import test from 'ava';
import cacheAsyncIterator from './index.js';

// An iterator that produces numbers starting at 1
async function * numbersIterator() {
	for (let number = 1; ; number++) {
		yield number;
	}
}

test('main', async t => {
	const iterator = numbersIterator();

	const cachedIterator = cacheAsyncIterator(iterator, 2)[Symbol.asyncIterator]();

	t.deepEqual(await iterator.next(), {
		value: 3,
		done: false,
	});

	t.deepEqual(await cachedIterator.next(), {
		value: 1,
		done: false,
	});

	t.deepEqual(await cachedIterator.next(), {
		value: 2,
		done: false,
	});

	t.deepEqual(await cachedIterator.next(), {
		value: 4,
		done: false,
	});

	t.deepEqual(await iterator.next(), {
		value: 7,
		done: false,
	});
});
