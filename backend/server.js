const express = require('express');
const cors = require('cors');
const { pool, initDB } = require('./db');
const { scrapeContent } = require('./scraper');
const { generateSummary, testConnection } = require('./llm');
const { diffLines } = require('diff');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

initDB();

// Health check endpoint
app.get('/api/status', async (req, res) => {
  const status = {
    backend: 'healthy',
    database: 'unhealthy',
    llm: 'unhealthy',
    timestamp: new Date().toISOString()
  };

  try {
    await pool.query('SELECT 1');
    status.database = 'healthy';
  } catch (error) {
    console.error('Database health check failed:', error);
  }

  try {
    const llmHealthy = await testConnection();
    status.llm = llmHealthy ? 'healthy' : 'unhealthy';
  } catch (error) {
    console.error('LLM health check failed:', error);
  }

  res.json(status);
});

// Get all competitors
app.get('/api/competitors', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM competitors ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add competitor
app.post('/api/competitors', async (req, res) => {
  const { name, url, tags } = req.body;
  
  if (!name || !url) {
    return res.status(400).json({ error: 'Name and URL are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO competitors (name, url, tags) VALUES ($1, $2, $3) RETURNING *',
      [name, url, tags || []]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete competitor
app.delete('/api/competitors/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM competitors WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check competitor now
app.post('/api/competitors/:id/check', async (req, res) => {
  try {
    const competitorResult = await pool.query('SELECT * FROM competitors WHERE id = $1', [req.params.id]);
    
    if (competitorResult.rows.length === 0) {
      return res.status(404).json({ error: 'Competitor not found' });
    }

    const competitor = competitorResult.rows[0];
    const newContent = await scrapeContent(competitor.url);

    const lastCheckResult = await pool.query(
      'SELECT content FROM checks WHERE competitor_id = $1 ORDER BY checked_at DESC LIMIT 1',
      [req.params.id]
    );

    let changes = 'First check - no previous data';
    let summary = 'Initial content captured';

    if (lastCheckResult.rows.length > 0) {
      const oldContent = lastCheckResult.rows[0].content;
      const diff = diffLines(oldContent, newContent);
      
      changes = diff
        .filter(part => part.added || part.removed)
        .map(part => `${part.added ? '+' : '-'} ${part.value.substring(0, 200)}`)
        .join('\n');

      if (changes) {
        summary = await generateSummary(oldContent, newContent, changes);
      } else {
        changes = 'No changes detected';
        summary = 'Content is identical to previous check';
      }
    }

    const checkResult = await pool.query(
      'INSERT INTO checks (competitor_id, content, summary, changes) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.params.id, newContent, summary, changes]
    );

    res.json(checkResult.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get check history for competitor
app.get('/api/competitors/:id/checks', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, summary, changes, checked_at FROM checks WHERE competitor_id = $1 ORDER BY checked_at DESC LIMIT 5',
      [req.params.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
