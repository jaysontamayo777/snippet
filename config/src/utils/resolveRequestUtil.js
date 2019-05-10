/**
 * Fake request with mockData using Promise
 * Only used for development testing
 *
 * @param {any} mockData
 * @returns Promise
 */
export default function resolveRequest(mockData, delay = 2000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Object.assign({}, mockData));
    }, delay);
  });
}
