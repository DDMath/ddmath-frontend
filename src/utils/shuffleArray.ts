export default function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const targetIndex = Math.floor(Math.random() * (i + 1));

    [array[i], array[targetIndex]] = [array[targetIndex], array[i]];
  }

  return array;
}
