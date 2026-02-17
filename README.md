# Competitive Intelligence Tracker

A web application to track and analyze changes on competitor websites with AI-powered summaries.

## Features

- ✅ Add up to 10 competitor links (pricing, docs, changelog pages)
- ✅ One-click content checking and storage
- ✅ Diff detection showing what changed since last check
- ✅ AI-generated summaries with OpenAI GPT-3.5
- ✅ History of last 5 checks per competitor
- ✅ Tag-based organization
- ✅ System health status page
- ✅ Input validation and error handling

## Tech Stack

- **Backend**: Node.js, Express, PostgreSQL
- **Frontend**: React
- **LLM**: OpenAI GPT-3.5-turbo
- **Deployment**: Docker, Docker Compose

## Quick Start with Docker

1. Clone the repository
2. Create `.env` file in backend directory:
```
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@db:5432/competitive_tracker
OPENAI_API_KEY=your_openai_api_key_here
```

3. Run with Docker:
```bash
docker-compose up --build
```

4. Access the app:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Manual Setup

### Backend
```bash
cd backend
npm install
# Create .env file with your settings
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### Database
Install PostgreSQL and create database:
```sql
CREATE DATABASE competitive_tracker;
```

## Usage

1. **Add Competitors**: Enter name, URL, and optional tags
2. **Check Now**: Click to fetch current content and compare with previous
3. **View History**: See last 5 checks with summaries and diffs
4. **Status Page**: Monitor backend, database, and LLM health

## What's Done

- ✅ Full CRUD for competitors
- ✅ Web scraping with content extraction
- ✅ Diff detection between checks
- ✅ OpenAI integration for summaries
- ✅ Last 5 checks history
- ✅ Tag system
- ✅ Status monitoring
- ✅ Docker deployment
- ✅ Input validation
- ✅ Error handling
- ✅ Responsive UI

## What's Not Done

- ❌ Automated scheduled checks
- ❌ Email/Slack alerts
- ❌ "Changes that matter" ML filtering
- ❌ User authentication
- ❌ Export to CSV/PDF
- ❌ Advanced search/filtering

## Environment Variables

See `.env.example` in backend directory for required variables.

## API Endpoints

- `GET /api/status` - System health check
- `GET /api/competitors` - List all competitors
- `POST /api/competitors` - Add new competitor
- `DELETE /api/competitors/:id` - Delete competitor
- `POST /api/competitors/:id/check` - Run check now
- `GET /api/competitors/:id/checks` - Get check history

## License

MIT
