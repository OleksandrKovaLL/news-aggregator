import type { EnhancedArticle, NewsArticle, Topic } from '@/types'

const keywordsCache = new Map<string, string[]>()

const getLowercaseKeywords = (topic: Topic): string[] => {
  if (!keywordsCache.has(topic._id)) {
    keywordsCache.set(
      topic._id,
      topic.keywords.map((k) => k.toLowerCase())
    )
  }
  return keywordsCache.get(topic._id)!
}

export const matchTopicToArticle = (
  article: NewsArticle,
  topics: Topic[]
): Topic | undefined => {
  const titleLower = article.title.toLowerCase()

  for (const topic of topics) {
    const lowercaseKeywords = getLowercaseKeywords(topic)
    if (lowercaseKeywords.some((keyword) => titleLower.includes(keyword))) {
      return topic
    }
  }

  return undefined
}

export const enhanceArticlesWithTopics = (
  articles: NewsArticle[],
  topics: Topic[]
): EnhancedArticle[] => {
  return articles.map((article) => ({
    ...article,
    topic: matchTopicToArticle(article, topics),
  }))
}
