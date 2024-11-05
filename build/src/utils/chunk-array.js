export default function chunkArray(array, chunkSize) {
  if (chunkSize <= 0) {
    throw new Error('Chunk size must be a positive integer');
  }
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}