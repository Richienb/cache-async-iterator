import Queue from 'yocto-queue';

export default function cacheAsyncIterator(asyncIterator, cacheSize) {
	if (!Number.isInteger(cacheSize) || cacheSize <= 0) {
		throw new TypeError('Expected `cacheSize` to be a positive integer');
	}

	return {
		[Symbol.asyncIterator]() {
			const valueQueue = new Queue();

			while (valueQueue.size < cacheSize) {
				valueQueue.enqueue(asyncIterator.next());
			}

			return {
				async next() {
					valueQueue.enqueue(asyncIterator.next());

					return valueQueue.dequeue();
				},
			};
		},
	};
}
