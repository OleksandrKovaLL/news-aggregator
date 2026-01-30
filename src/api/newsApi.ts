import axios from 'axios'
import type { NewsResponse } from '@/types'

const isDevelopment = import.meta.env.DEV

// Mock data for production
const mockNewsData: NewsResponse = {
  status: 'ok',
  totalResults: 20,
  articles: [
    {
      source: { id: 'techcrunch', name: 'TechCrunch' },
      author: 'Sarah Perez',
      title:
        'AI startup raises $100M in series B funding for enterprise software',
      description:
        'The company plans to use the funding to expand its AI-powered enterprise solutions.',
      url: 'https://techcrunch.com/2024/01/example',
      urlToImage:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      publishedAt: '2024-01-28T10:00:00Z',
      content: 'Full article content here...',
    },
    {
      source: { id: 'bbc-news', name: 'BBC News' },
      author: 'BBC News',
      title: 'Government announces new digital transformation policy',
      description:
        'The policy aims to modernize public services through technology.',
      url: 'https://bbc.com/news/example',
      urlToImage:
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
      publishedAt: '2024-01-28T09:30:00Z',
      content: 'Government officials announced...',
    },
    {
      source: { id: 'the-verge', name: 'The Verge' },
      author: 'Tom Warren',
      title: 'New tech gadget promises to revolutionize smart homes',
      description:
        'The device integrates AI and IoT for seamless home automation.',
      url: 'https://theverge.com/example',
      urlToImage:
        'https://images.unsplash.com/photo-1558002038-1055907df827?w=800',
      publishedAt: '2024-01-27T18:45:00Z',
      content: 'The latest smart home device...',
    },
    {
      source: { id: 'techcrunch', name: 'TechCrunch' },
      author: 'Alex Wilhelm',
      title: 'Software development trends shaping 2024',
      description:
        'Industry experts weigh in on the technologies that will dominate this year.',
      url: 'https://techcrunch.com/2024/trends',
      urlToImage:
        'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800',
      publishedAt: '2024-01-27T15:20:00Z',
      content: 'As we progress through 2024...',
    },
    {
      source: { id: 'cnn', name: 'CNN' },
      author: 'CNN Business',
      title: 'Stock market reaches new highs amid economic recovery',
      description:
        'Markets rally as investors show confidence in economic indicators.',
      url: 'https://cnn.com/business/example',
      urlToImage:
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
      publishedAt: '2024-01-27T14:00:00Z',
      content: 'Major stock indices reached...',
    },
    {
      source: { id: 'bbc-news', name: 'BBC News' },
      author: 'BBC Science',
      title: 'Scientists make breakthrough in renewable energy research',
      description: 'New discovery could lead to more efficient solar panels.',
      url: 'https://bbc.com/science/example',
      urlToImage:
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
      publishedAt: '2024-01-26T12:30:00Z',
      content: 'Researchers at leading universities...',
    },
    {
      source: { id: 'the-verge', name: 'The Verge' },
      author: 'Dieter Bohn',
      title: 'Tech giant unveils new digital product lineup',
      description:
        'The company announced several new devices at its annual conference.',
      url: 'https://theverge.com/products',
      urlToImage:
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
      publishedAt: '2024-01-26T10:00:00Z',
      content: 'At a packed keynote event...',
    },
    {
      source: { id: 'techcrunch', name: 'TechCrunch' },
      author: 'Mary Ann Azevedo',
      title: 'Startup ecosystem shows resilience despite economic headwinds',
      description:
        'Venture capital funding remains strong in key tech sectors.',
      url: 'https://techcrunch.com/startups',
      urlToImage:
        'https://images.unsplash.com/photo-1559526324-593bc073d938?w=800',
      publishedAt: '2024-01-25T16:45:00Z',
      content: 'Despite challenging economic conditions...',
    },
  ],
}

const newsApiClient = axios.create({
  baseURL: import.meta.env.VITE_NEWS_API_BASE_URL,
  params: {
    apiKey: import.meta.env.VITE_NEWS_API_KEY,
  },
})

export const newsApi = {
  getAll: async (params?: {
    sources?: string
    q?: string
    sortBy?: 'publishedAt' | 'relevancy' | 'popularity'
    pageSize?: number
  }): Promise<NewsResponse> => {
    // For production use mock data
    if (!isDevelopment) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockNewsData
    }
    const { data } = await newsApiClient.get('/everything', {
      params: {
        ...params,
        language: 'en',
      },
    })
    return data
  },
}
