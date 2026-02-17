# AI Notes

## AI Usage in Development

### What I Used AI For:
1. **Project Structure**: Generated initial folder structure and file organization
2. **Boilerplate Code**: Created Express server setup, React component scaffolding
3. **Database Schema**: Designed PostgreSQL table structures
4. **API Endpoints**: Generated REST API route handlers
5. **CSS Styling**: Created responsive CSS layouts and component styles
6. **Docker Configuration**: Generated Dockerfile and docker-compose.yml
7. **Documentation**: Drafted README structure and API documentation

### What I Checked/Verified Myself:
1. **Database Connections**: Tested PostgreSQL connection pooling and queries
2. **Web Scraping Logic**: Verified Cheerio selectors work correctly on real websites
3. **Diff Algorithm**: Tested the diff library output format and accuracy
4. **OpenAI Integration**: Validated API calls, error handling, and response parsing
5. **CORS Configuration**: Ensured frontend can communicate with backend
6. **Error Handling**: Added try-catch blocks and user-friendly error messages
7. **Input Validation**: Tested edge cases (empty inputs, invalid URLs, etc.)
8. **React State Management**: Verified useState and useEffect hooks work correctly
9. **API Response Formats**: Ensured consistent JSON structure across endpoints
10. **Environment Variables**: Tested .env loading and fallback values

## LLM Provider Choice

### Selected: OpenAI GPT-3.5-turbo

**Why OpenAI:**
- **Reliability**: Industry-standard with 99.9% uptime
- **Quality**: Excellent at summarization tasks
- **Speed**: Fast response times (~1-2 seconds)
- **Cost**: $0.0015/1K tokens (input), affordable for this use case
- **Documentation**: Comprehensive API docs and examples
- **Ease of Integration**: Official Node.js SDK

**Why GPT-3.5-turbo specifically:**
- **Cost-effective**: 10x cheaper than GPT-4
- **Sufficient for task**: Summarization doesn't need GPT-4's advanced reasoning
- **Fast**: Lower latency than GPT-4
- **Token limit**: 4K context is enough for webpage diffs

**Alternatives Considered:**
- **GPT-4**: Too expensive for frequent checks, overkill for summarization
- **Claude (Anthropic)**: Good alternative but less familiar API
- **Llama 2**: Would require self-hosting, adds infrastructure complexity
- **Gemini**: Newer, less proven for production use

## Prompt Engineering

The summarization prompt is designed to:
1. Provide context (old vs new content)
2. Show detected changes
3. Request structured output (what changed, key differences, additions/removals)
4. Limit response length (under 200 words)
5. Focus on competitive intelligence value

Temperature set to 0.7 for balanced creativity and consistency.

## Testing Notes

- Tested with real competitor websites (pricing pages, documentation)
- Verified summaries are accurate and actionable
- Confirmed diff detection works for both small and large changes
- Validated "no changes" scenario handling
- Tested API key error handling (invalid key, rate limits)
