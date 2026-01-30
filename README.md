# News Aggregator

A modern news aggregation application built with React, TypeScript, and Sanity CMS. This project demonstrates clean architecture, proper state management, and dynamic content filtering based on CMS configuration.

## 🚀 Live Demo

- **Application**: [https://news-aggregator-alpha-six.vercel.app](https://news-aggregator-alpha-six.vercel.app)

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Query (React Query)** - Data fetching and caching
- **TailwindCSS v4** - Styling
- **shadcn/ui** - UI components
- **React Router** - Navigation (ready for expansion)

## 📋 Features

### Core Functionality
- **News Feed**: Display articles from multiple trusted sources
- **Dynamic Filtering**: 
  - Filter by news source
  - Search by keyword in article titles
  - Sort by publication date (newest/oldest first)
- **Topic Classification**: Automatically categorize articles based on CMS-defined keywords
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Article Details**: Click on any article to view full details in a modal

### CMS Integration
- **Dynamic Configuration**: All sources and topics are managed through Sanity CMS
- **Real-time Updates**: Changes in CMS reflect in the application without redeployment
- **Allowed Sources**: Only approved news sources are displayed
- **Topic Definitions**: Topics are automatically assigned based on keyword matching

### Backend & CMS
- **Sanity.io** - Headless CMS for configuration management
- **News API** - News data source

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **date-fns** - Date manipulation

## 📁 Project Structure
```
news-aggregator/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── NewsCard.tsx    # Article card component
│   │   └── NewsFilters.tsx # Filter controls
│   ├── hooks/              # Custom React hooks
│   │   ├── useCMSConfig.ts # Fetch CMS configuration
│   │   └── useNews.ts      # Fetch and filter news
│   ├── lib/                # External service clients
│   │   ├── newsApi.ts      # News API client
│   │   └── sanityClient.ts # Sanity CMS client
│   ├── pages/              # Page components
│   │   └── HomePage.tsx    # Main news page
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   └── utils/              # Utility functions
│       └── topicMatcher.ts # Topic matching logic
├── sanity-studio/          # Sanity CMS configuration
│   ├── schemaTypes/        # CMS schema definitions
│   │   ├── allowedSourceType.ts
│   │   └── topicType.ts
│   └── sanity.config.ts
└── package.json
```

**Test CMS Integration**
   - Add new source in Sanity Studio
   - Refresh app to see it appear in filters
   - Add new topic with keywords
   - Verify articles get tagged correctly

## 🐛 Known Limitations

- **News API**: Free tier only works on localhost. Production uses mock data.
- **Rate Limits**: News API free tier has 100 requests/day limit
- **Date Range**: News API free tier only returns articles from last 30 days




**Note**: This is a test project demonstrating frontend development skills including React, TypeScript, API integration, and CMS usage.
