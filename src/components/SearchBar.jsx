import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

/**
 * Search bar component - searches across all content
 * @param {Object} props - Component props
 * @param {Array} props.searchableContent - Array of content objects to search
 */
const SearchBar = ({ searchableContent }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);

  // Search through content
  const searchResults = useMemo(() => {
    if (!query || query.length < 2) return [];

    const lowerQuery = query.toLowerCase();
    const matches = [];

    searchableContent.forEach(item => {
      const titleMatch = item.title?.toLowerCase().includes(lowerQuery);
      const contentMatch = item.content?.toLowerCase().includes(lowerQuery);
      const tagMatch = item.tags?.some(tag => tag.toLowerCase().includes(lowerQuery));

      if (titleMatch || contentMatch || tagMatch) {
        matches.push({
          ...item,
          relevance: titleMatch ? 3 : (tagMatch ? 2 : 1)
        });
      }
    });

    // Sort by relevance
    return matches.sort((a, b) => b.relevance - a.relevance).slice(0, 10);
  }, [query, searchableContent]);

  useEffect(() => {
    setResults(searchResults);
  }, [searchResults]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
  };

  const handleResultClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
      setQuery('');
    }
  };

  // Keyboard shortcut: Ctrl/Cmd + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Search trigger button */}
      <motion.button
        className="search-trigger"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open search"
        title="Search (Ctrl+K)"
      >
        <Search size={20} />
        <span>Search</span>
        <kbd>Ctrl+K</kbd>
      </motion.button>

      {/* Search modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="search-modal"
              initial={{ scale: 0.9, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="search-input-wrapper">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search devlog content..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  aria-label="Search input"
                />
                {query && (
                  <button
                    className="search-clear"
                    onClick={handleClear}
                    aria-label="Clear search"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Search results */}
              <div className="search-results">
                {query.length > 0 && query.length < 2 && (
                  <div className="search-hint">Type at least 2 characters to search...</div>
                )}

                {query.length >= 2 && results.length === 0 && (
                  <div className="search-no-results">No results found for "{query}"</div>
                )}

                {results.length > 0 && (
                  <div className="search-results-list">
                    {results.map((result, idx) => (
                      <motion.div
                        key={idx}
                        className="search-result-item"
                        onClick={() => handleResultClick(result.sectionId)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ backgroundColor: 'rgba(138, 43, 226, 0.1)' }}
                      >
                        <div className="search-result-title">{result.title}</div>
                        {result.content && (
                          <div className="search-result-excerpt">
                            {result.content.substring(0, 120)}...
                          </div>
                        )}
                        {result.tags && result.tags.length > 0 && (
                          <div className="search-result-tags">
                            {result.tags.slice(0, 3).map((tag, i) => (
                              <span key={i} className="search-result-tag">{tag}</span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <div className="search-footer">
                <span>Press <kbd>Esc</kbd> to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchBar;
