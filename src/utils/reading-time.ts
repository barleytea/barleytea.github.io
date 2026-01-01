const WORDS_PER_MINUTE = 200

/**
 * Calculate estimated reading time for given content
 * @param content - The text content to analyze
 * @returns Reading time in minutes (minimum 1 minute)
 */
export function calculateReadingTime(content: string): number {
  if (!content || typeof content !== 'string') {
    return 1
  }

  // Remove HTML tags if present
  const textOnly = content.replace(/<[^>]*>/g, '')
  
  // Count words (split by whitespace and filter empty strings)
  const words = textOnly.trim().split(/\s+/).filter((word) => word.length > 0)
  const wordCount = words.length

  // Calculate reading time
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE)

  // Return at least 1 minute
  return Math.max(1, minutes)
}

/**
 * Format reading time for display
 * @param minutes - Reading time in minutes
 * @returns Formatted string like "5 min read"
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`
}
