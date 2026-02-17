# Prompts Used for App Development

This document records the prompts used during development of the Competitive Intelligence Tracker.

## Initial Setup

**Prompt 1: Project Initialization**
```
Create a competitive intelligence tracker web app with:
- Backend: Node.js + Express + PostgreSQL
- Frontend: React
- Features: Add competitors, check content, show diffs, AI summaries
- Docker deployment
```

**Prompt 2: Database Schema**
```
Design PostgreSQL schema for:
- Competitors table (id, name, url, tags, created_at)
- Checks table (id, competitor_id, content, summary, changes, checked_at)
```

**Prompt 3: Web Scraping**
```
Create a web scraper using axios and cheerio to:
- Fetch webpage content
- Remove scripts, styles, nav, footer
- Extract clean text
- Handle errors and timeouts
```

## Backend Development

**Prompt 4: Express API Routes**
```
Build REST API endpoints:
- GET /api/competitors - list all
- POST /api/competitors - add new
- DELETE /api/competitors/:id - remove
- POST /api/competitors/:id/check - run check
- GET /api/competitors/:id/checks - get history
- GET /api/status - health check
```

**Prompt 5: OpenAI Integration**
```
Integrate OpenAI GPT-3.5-turbo to:
- Compare old and new content
- Generate summary of changes
- Focus on competitive intelligence insights
- Handle API errors gracefully
```

**Prompt 6: Diff Detection**
```
Use diff library to:
- Compare previous and current content
- Extract added/removed lines
- Format changes for display
- Handle first check (no previous data)
```

## Frontend Development

**Prompt 7: React Component Structure**
```
Create React app with:
- Home page: add competitors, list with actions
- Status page: show backend/db/llm health
- History view: show last 5 checks with summaries
- Navigation between views
```

**Prompt 8: UI Styling**
```
Design clean, modern UI with:
- Card-based layout for competitors
- Color-coded status indicators
- Responsive grid layout
- Professional color scheme
- Mobile-friendly design
```

**Prompt 9: API Integration**
```
Connect React frontend to Express backend:
- Use axios for HTTP requests
- Handle loading states
- Show error messages
- Update UI after actions
```

## Docker & Deployment

**Prompt 10: Docker Configuration**
```
Create Docker setup:
- Dockerfile for backend (Node.js)
- Dockerfile for frontend (React)
- docker-compose.yml with PostgreSQL
- Environment variable configuration
```

**Prompt 11: Environment Variables**
```
Set up .env configuration:
- Database connection string
- OpenAI API key
- Port numbers
- Create .env.example template
```

## Documentation

**Prompt 12: README**
```
Write comprehensive README with:
- Feature list
- Tech stack
- Quick start guide
- Manual setup instructions
- API documentation
- What's done vs not done
```

**Prompt 13: AI Notes**
```
Document AI usage:
- What AI was used for
- What was manually verified
- LLM provider choice rationale
- Testing approach
```

## Testing & Refinement

**Prompt 14: Error Handling**
```
Add error handling for:
- Invalid URLs
- Empty inputs
- Database connection failures
- OpenAI API errors
- Network timeouts
```

**Prompt 15: Input Validation**
```
Validate user inputs:
- Required fields (name, URL)
- URL format checking
- Tag parsing (comma-separated)
- Confirmation dialogs for delete
```

---

**Note**: This document contains only the prompts used, not the AI responses or any sensitive information like API keys.
