import type { NewsArticle, Topic, EnhancedArticle } from '@/types'

export const matchTopicToArticle = (
  article: NewsArticle,
  topics: Topic[]
): Topic | undefined => {
  const titleLower = article.title.toLowerCase()

  for (const topic of topics) {
    const hasKeyword = topic.keywords.some(keyword =>
      titleLower.includes(keyword.toLowerCase())
    )
    if (hasKeyword) {
      return topic
    }
  }

  return undefined
}

export const enhanceArticlesWithTopics = (
  articles: NewsArticle[],
  topics: Topic[]
): EnhancedArticle[] => {
  return articles.map(article => ({
    ...article,
    topic: matchTopicToArticle(article, topics),
  }))
}