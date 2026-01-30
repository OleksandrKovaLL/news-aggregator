import axios from 'axios'
import type { NewsResponse } from '@/types'

const isDevelopment = import.meta.env.DEV

// Mock дані для production (більше статей для кращої демонстрації)
const mockNewsData: NewsResponse = {
  status: 'ok',
  totalResults: 20,
  articles: [
    // TechCrunch articles
    {
      source: { id: 'techcrunch', name: 'TechCrunch' },
      author: 'Sarah Perez',
      title:
        'AI startup raises $100M in series B funding for enterprise software solutions',
      description:
        'The company plans to use the funding to expand its AI-powered enterprise solutions.',
      url: 'https://techcrunch.com/2024/01/ai-funding',
      urlToImage:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      publishedAt: '2024-01-29T10:00:00Z',
      content:
        'The AI startup announced today that it has raised $100 million in Series B funding...',
    },
    {
      source: { id: 'techcrunch', name: 'TechCrunch' },
      author: 'Alex Wilhelm',
      title: 'Software development trends shaping 2024 and the future of tech',
      description:
        'Industry experts weigh in on technologies that will dominate this year.',
      url: 'https://techcrunch.com/2024/software-trends',
      urlToImage:
        'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
      publishedAt: '2024-01-28T15:20:00Z',
      content:
        'As we progress through 2024, several key trends are emerging in software development...',
    },
    {
      source: { id: 'techcrunch', name: 'TechCrunch' },
      author: 'Mary Ann Azevedo',
      title:
        'Startup ecosystem shows resilience with strong tech sector performance',
      description:
        'Venture capital funding remains strong despite economic challenges.',
      url: 'https://techcrunch.com/startups-2024',
      urlToImage:
        'https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&q=80',
      publishedAt: '2024-01-27T16:45:00Z',
      content:
        'Despite challenging economic conditions, the startup ecosystem continues to thrive...',
    },

    // BBC News articles
    {
      source: { id: 'bbc-news', name: 'BBC News' },
      author: 'BBC Technology',
      title:
        'Government announces digital transformation policy for public services',
      description: 'New policy aims to modernize services through technology.',
      url: 'https://bbc.com/news/technology-policy',
      urlToImage:
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
      publishedAt: '2024-01-29T09:30:00Z',
      content:
        'Government officials unveiled a comprehensive digital transformation strategy...',
    },
    {
      source: { id: 'bbc-news', name: 'BBC News' },
      author: 'BBC Science',
      title: 'Scientists make breakthrough in renewable energy research',
      description:
        'Discovery could lead to more efficient solar panel technology.',
      url: 'https://bbc.com/science/renewable',
      urlToImage:
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
      publishedAt: '2024-01-28T12:30:00Z',
      content:
        'Researchers announced a major breakthrough in solar panel efficiency...',
    },
    {
      source: { id: 'bbc-news', name: 'BBC News' },
      author: 'BBC News',
      title:
        'Election campaign intensifies as president announces new policy initiatives',
      description:
        'Major policy announcements made ahead of upcoming election.',
      url: 'https://bbc.com/politics/election',
      urlToImage:
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80',
      publishedAt: '2024-01-27T11:00:00Z',
      content:
        'The president unveiled several new policy initiatives during a campaign rally...',
    },

    // The Verge articles
    {
      source: { id: 'the-verge', name: 'The Verge' },
      author: 'Tom Warren',
      title: 'New smart home device promises to revolutionize digital living',
      description: 'Device integrates AI and IoT for seamless automation.',
      url: 'https://theverge.com/tech/smart-home',
      urlToImage:
        'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
      publishedAt: '2024-01-29T18:45:00Z',
      content:
        'The latest smart home device integrates cutting-edge AI technology...',
    },
    {
      source: { id: 'the-verge', name: 'The Verge' },
      author: 'Dieter Bohn',
      title:
        'Tech giant unveils new digital product lineup at annual conference',
      description: 'Company announces innovative devices at keynote event.',
      url: 'https://theverge.com/products-2024',
      urlToImage:
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
      publishedAt: '2024-01-28T10:00:00Z',
      content:
        'At a packed keynote event, the tech giant revealed its 2024 product strategy...',
    },
    {
      source: { id: 'the-verge', name: 'The Verge' },
      author: 'Adi Robertson',
      title: 'Computer software update brings major performance improvements',
      description:
        'Latest update includes significant speed and stability enhancements.',
      url: 'https://theverge.com/software-update',
      urlToImage:
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
      publishedAt: '2024-01-27T14:15:00Z',
      content:
        'The company released a major software update with performance improvements...',
    },

    // CNN articles
    {
      source: { id: 'cnn', name: 'CNN' },
      author: 'CNN Business',
      title: 'Stock market reaches new highs amid economic recovery signals',
      description: 'Markets rally as investors show confidence in economy.',
      url: 'https://cnn.com/business/markets',
      urlToImage:
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
      publishedAt: '2024-01-29T14:00:00Z',
      content:
        'Major stock indices reached record highs as economic data exceeded expectations...',
    },
    {
      source: { id: 'cnn', name: 'CNN' },
      author: 'CNN Politics',
      title: 'Government officials debate new policy changes in heated session',
      description: 'Lawmakers clash over proposed policy reforms.',
      url: 'https://cnn.com/politics/debate',
      urlToImage:
        'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80',
      publishedAt: '2024-01-28T13:30:00Z',
      content:
        'A heated debate erupted in congress over the proposed policy changes...',
    },
    {
      source: { id: 'cnn', name: 'CNN' },
      author: 'CNN Business',
      title: 'Tech company reports record profits driven by digital innovation',
      description: 'Strong earnings reflect successful digital transformation.',
      url: 'https://cnn.com/business/tech-earnings',
      urlToImage:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      publishedAt: '2024-01-27T09:00:00Z',
      content: 'The technology company announced record quarterly profits...',
    },

    // Wired articles
    {
      source: { id: 'wired', name: 'Wired' },
      author: 'Lauren Goode',
      title: 'The future of computer interfaces beyond touchscreens',
      description:
        'Experts predict neural and gesture interfaces will transform tech.',
      url: 'https://wired.com/future-interfaces',
      urlToImage:
        'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&q=80',
      publishedAt: '2024-01-29T16:45:00Z',
      content:
        'Researchers are exploring new ways for humans to interact with computers...',
    },
    {
      source: { id: 'wired', name: 'Wired' },
      author: 'Steven Levy',
      title: 'How AI is transforming software development practices',
      description:
        'Artificial intelligence tools are changing how developers write code.',
      url: 'https://wired.com/ai-development',
      urlToImage:
        'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
      publishedAt: '2024-01-28T11:20:00Z',
      content:
        'AI-powered tools are revolutionizing the software development process...',
    },
    {
      source: { id: 'wired', name: 'Wired' },
      author: 'Paris Martineau',
      title:
        'Digital privacy concerns grow as tech companies expand data collection',
      description: 'Privacy advocates warn about increasing data surveillance.',
      url: 'https://wired.com/privacy-concerns',
      urlToImage:
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
      publishedAt: '2024-01-27T15:00:00Z',
      content:
        'Privacy experts are raising concerns about data collection practices...',
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
    // Production: mock data
    if (!isDevelopment) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      return mockNewsData
    }

    // Development: real API
    const { data } = await newsApiClient.get('/everything', {
      params: {
        ...params,
        language: 'en',
      },
    })
    return data
  },
}
