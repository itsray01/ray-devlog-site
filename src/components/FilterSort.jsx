import { useState } from 'react';

/**
 * FilterSort component for filtering and sorting devlog entries
 * Provides UI controls for version, tags, search, and sorting options
 */
const FilterSort = ({ 
  versions = [], 
  tags = [], 
  onFiltersChange, 
  currentFilters = {} 
}) => {
  const [searchTerm, setSearchTerm] = useState(currentFilters.search || '');
  const [selectedVersion, setSelectedVersion] = useState(currentFilters.version || '');
  const [selectedTags, setSelectedTags] = useState(currentFilters.tags || []);
  const [sortBy, setSortBy] = useState(currentFilters.sortBy || 'date');
  const [sortOrder, setSortOrder] = useState(currentFilters.sortOrder || 'desc');

  // Handle tag selection/deselection
  const handleTagToggle = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newTags);
    updateFilters({ tags: newTags });
  };

  // Update filters and notify parent component
  const updateFilters = (newFilters) => {
    const updatedFilters = {
      search: searchTerm,
      version: selectedVersion,
      tags: selectedTags,
      sortBy,
      sortOrder,
      ...newFilters
    };

    // Remove empty values
    Object.keys(updatedFilters).forEach(key => {
      if (updatedFilters[key] === '' || 
          (Array.isArray(updatedFilters[key]) && updatedFilters[key].length === 0)) {
        delete updatedFilters[key];
      }
    });

    onFiltersChange(updatedFilters);
  };

  // Handle input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    updateFilters({ search: e.target.value });
  };

  const handleVersionChange = (e) => {
    setSelectedVersion(e.target.value);
    updateFilters({ version: e.target.value });
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    updateFilters({ sortBy: e.target.value });
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
    updateFilters({ sortOrder: e.target.value });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedVersion('');
    setSelectedTags([]);
    setSortBy('date');
    setSortOrder('desc');
    onFiltersChange({});
  };

  return (
    <div className="filter-sort-container">
      <div className="filter-row">
        {/* Search Input */}
        <div className="filter-group">
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type="text"
            placeholder="Search entries..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        {/* Version Filter */}
        <div className="filter-group">
          <label htmlFor="version">Version:</label>
          <select
            id="version"
            value={selectedVersion}
            onChange={handleVersionChange}
            className="select-input"
          >
            <option value="">All Versions</option>
            {versions.map(version => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="filter-group">
          <label htmlFor="sortBy">Sort by:</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={handleSortByChange}
            className="select-input"
          >
            <option value="date">Date</option>
            <option value="version">Version</option>
            <option value="title">Title</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sortOrder">Order:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="select-input"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <button 
          onClick={clearFilters}
          className="clear-filters-btn"
        >
          Clear All
        </button>
      </div>

      {/* Tags Filter */}
      {tags.length > 0 && (
        <div className="tags-filter">
          <label>Filter by tags:</label>
          <div className="tags-container">
            {tags.map(tag => (
              <button
                key={tag}
                className={`tag-filter ${selectedTags.includes(tag) ? 'active' : ''}`}
                onClick={() => handleTagToggle(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSort;
