/**
 * Calculates the estimated reading time for a given text content.
 *
 * @param content - The text content for which the reading time is to be calculated.
 *                  It is expected to be a string containing the text.
 * @returns The estimated reading time in minutes, rounded up to the nearest whole number.
 *
 * @example
 * ```typescript
 * const readingTime = calculateReadingTime("This is a sample text.");
 * console.log(readingTime); // Output: 1
 * ```
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time;
}
