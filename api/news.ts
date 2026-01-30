import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { sources, q, pageSize, sortBy } = req.query

  try {
    const params = new URLSearchParams({
      apiKey: process.env.NEWS_API_KEY || '',
      language: 'en',
      ...(sources && { sources: sources as string }),
      ...(q && { q: q as string }),
      ...(pageSize && { pageSize: pageSize as string }),
      ...(sortBy && { sortBy: sortBy as string }),
    })

    const response = await fetch(
      `https://newsapi.org/v2/everything?${params.toString()}`
    )

    const data = await response.json()
    return res.status(200).json(data)
  } catch (error) {
    console.error('News API Error:', error)
    return res.status(500).json({ error: 'Failed to fetch news' })
  }
}
