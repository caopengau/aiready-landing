/**
 * Estimate token count for text (rough approximation)
 * ~1 token ≈ 4 characters for code
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}
