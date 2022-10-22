import Queue from 'yocto-queue';

export default function cacheAsyncIterator(asyncIterator, cacheSize) {
	if (!((Number.isInteger(cacheSize) && cacheSize > 0) || cacheSize === Number.POSITIVE_INFINITY)) {
		throw new TypeError('Expected `cacheSize` to be a positive integer');
	}

	return {
		[Symbol.asyncIterator]() {
			const valueQueue = new Queue();
			let isCacheUpdating = true;
			let isDone = false;

			async function updateCache() {
				isCacheUpdating = true;

				while (valueQueue.size < cacheSize && !isDone) {
					const promise = asyncIterator.next();

					valueQueue.enqueue(promise);

					const {done} = await promise; // eslint-disable-line no-await-in-loop

					isDone ||= done;
				}

				isCacheUpdating = false;
			}

			updateCache();

			return {
				async next() {
					if (valueQueue.size > 0) {
						const promise = valueQueue.dequeue();

						if (!isCacheUpdating) {
							updateCache();
						}

						return promise;
					}

					const {done, value} = await asyncIterator.next();

					isDone ||= done;

					return {done, value};
				},
			};
		},
	};
}
