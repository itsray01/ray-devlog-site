import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
const devlogData = JSON.parse(readFileSync('./devlog.json', 'utf8'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// Serve static files (for images, fonts, etc.)
app.use('/assets', express.static(path.join(__dirname, '../public')));

// API endpoint to get devlog entries with optional search
app.get('/api/devlog', (req, res) => {
  try {
    let filteredData = [...devlogData]; // Create a copy to avoid mutating original

    // Filter by search term if specified
    if (req.query.search) {
      const searchTerm = req.query.search.toLowerCase();
      filteredData = filteredData.filter(entry => 
        entry.title.toLowerCase().includes(searchTerm) ||
        entry.task.toLowerCase().includes(searchTerm) ||
        entry.date.toLowerCase().includes(searchTerm)
      );
    }

    // Sort by date (newest first by default)
    const sortOrder = req.query.sortOrder || 'desc';
    
    filteredData.sort((a, b) => {
      // Try to parse dates, fall back to string comparison
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      if (!isNaN(dateA) && !isNaN(dateB)) {
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      }
      
      // If dates can't be parsed, use string comparison
      return sortOrder === 'desc' 
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date);
    });

    res.json({
      entries: filteredData,
      metadata: {
        total: devlogData.length,
        filtered: filteredData.length
      }
    });

  } catch (error) {
    console.error('Error fetching devlog data:', error);
    res.status(500).json({ error: 'Failed to fetch devlog data' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Devlog API server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints:`);
  console.log(`   GET /api/devlog - Get devlog entries with optional search`);
  console.log(`   GET /api/health - Health check`);
  console.log(`   GET /assets/* - Serve static assets`);
});
