import { Filter, Search, Star } from 'lucide-react';

/**
 * JourneyFilters - Filter controls for experiment log
 * Supports tool selection, failure tags, score filtering, and search
 */
const JourneyFilters = ({
  selectedTools,
  onToolChange,
  selectedFailures,
  onFailureChange,
  minScore,
  onMinScoreChange,
  searchQuery,
  onSearchChange,
  availableTools,
  availableFailures
}) => {
  const handleToolToggle = (tool) => {
    if (selectedTools.includes(tool)) {
      onToolChange(selectedTools.filter(t => t !== tool));
    } else {
      onToolChange([...selectedTools, tool]);
    }
  };

  const handleFailureToggle = (failure) => {
    if (selectedFailures.includes(failure)) {
      onFailureChange(selectedFailures.filter(f => f !== failure));
    } else {
      onFailureChange([...selectedFailures, failure]);
    }
  };

  return (
    <div className="journey-filters">
      <div className="journey-filters__header">
        <Filter size={16} />
        <span className="journey-filters__title">Filter Experiments</span>
      </div>

      {/* Search Input */}
      <div className="journey-filters__group">
        <label htmlFor="journey-search" className="journey-filters__label">
          <Search size={14} />
          <span>Search</span>
        </label>
        <input
          id="journey-search"
          type="text"
          className="journey-filters__search"
          placeholder="Search goal or fix..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Tool Filter */}
      <div className="journey-filters__group">
        <span className="journey-filters__label">Tools</span>
        <div className="journey-filters__chips">
          {availableTools.map((tool) => (
            <button
              key={tool}
              onClick={() => handleToolToggle(tool)}
              className={`journey-filter-chip ${
                selectedTools.includes(tool) ? 'journey-filter-chip--active' : ''
              }`}
              aria-pressed={selectedTools.includes(tool)}
            >
              {tool}
            </button>
          ))}
        </div>
      </div>

      {/* Failure Tags Filter */}
      {availableFailures.length > 0 && (
        <div className="journey-filters__group">
          <span className="journey-filters__label">Failure Types</span>
          <div className="journey-filters__chips">
            {availableFailures.map((failure) => (
              <button
                key={failure}
                onClick={() => handleFailureToggle(failure)}
                className={`journey-filter-chip ${
                  selectedFailures.includes(failure) ? 'journey-filter-chip--active' : ''
                }`}
                aria-pressed={selectedFailures.includes(failure)}
              >
                {failure}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Min Score Filter */}
      <div className="journey-filters__group">
        <label htmlFor="min-score" className="journey-filters__label">
          <Star size={14} />
          <span>Min Score: {minScore}</span>
        </label>
        <input
          id="min-score"
          type="range"
          min="1"
          max="5"
          step="1"
          value={minScore}
          onChange={(e) => onMinScoreChange(parseInt(e.target.value))}
          className="journey-filters__slider"
        />
        <div className="journey-filters__slider-labels">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>
    </div>
  );
};

export default JourneyFilters;
