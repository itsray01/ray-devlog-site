import { useState } from 'react';
import { ChevronDown, ChevronUp, ThumbsUp, ThumbsDown } from 'lucide-react';
import toolMatrix from '../../content/toolMatrix';

/**
 * ToolMatrix - Comparison table for AI video generation tools
 * Displays ratings across criteria with expandable notes
 */
const ToolMatrix = () => {
  const [expandedTool, setExpandedTool] = useState(null);

  const toggleTool = (tool) => {
    setExpandedTool(expandedTool === tool ? null : tool);
  };

  // Render rating as dots (1-5)
  const renderRating = (rating) => {
    return (
      <div className="tool-matrix__rating">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className={`tool-matrix__dot ${
              i < rating ? 'tool-matrix__dot--filled' : 'tool-matrix__dot--empty'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="tool-matrix">
      <div className="tool-matrix__table-wrapper">
        <table className="tool-matrix__table">
          <thead>
            <tr>
              <th className="tool-matrix__header-cell tool-matrix__header-cell--sticky">
                Tool
              </th>
              {toolMatrix.criteria.map((criterion) => (
                <th key={criterion} className="tool-matrix__header-cell">
                  {criterion}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {toolMatrix.tools.map((tool) => (
              <>
                <tr
                  key={tool}
                  className={`tool-matrix__row ${
                    expandedTool === tool ? 'tool-matrix__row--expanded' : ''
                  }`}
                  onClick={() => toggleTool(tool)}
                >
                  <td className="tool-matrix__tool-cell">
                    <div className="tool-matrix__tool-name">
                      <span>{tool}</span>
                      {expandedTool === tool ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </div>
                  </td>
                  {toolMatrix.criteria.map((criterion) => (
                    <td key={criterion} className="tool-matrix__rating-cell">
                      {renderRating(toolMatrix.ratings[tool][criterion])}
                    </td>
                  ))}
                </tr>

                {/* Expanded notes row */}
                {expandedTool === tool && toolMatrix.notes[tool] && (
                  <tr className="tool-matrix__notes-row">
                    <td colSpan={toolMatrix.criteria.length + 1}>
                      <div className="tool-matrix__notes">
                        <p className="tool-matrix__notes-text">
                          {toolMatrix.notes[tool].text}
                        </p>

                        <div className="tool-matrix__pros-cons">
                          {toolMatrix.notes[tool].pros && (
                            <div className="tool-matrix__pros">
                              <div className="tool-matrix__pros-header">
                                <ThumbsUp size={14} />
                                <span>Pros</span>
                              </div>
                              <ul>
                                {toolMatrix.notes[tool].pros.map((pro, i) => (
                                  <li key={i}>{pro}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {toolMatrix.notes[tool].cons && (
                            <div className="tool-matrix__cons">
                              <div className="tool-matrix__cons-header">
                                <ThumbsDown size={14} />
                                <span>Cons</span>
                              </div>
                              <ul>
                                {toolMatrix.notes[tool].cons.map((con, i) => (
                                  <li key={i}>{con}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="tool-matrix__legend">
        <span className="tool-matrix__legend-title">Rating Scale:</span>
        <div className="tool-matrix__legend-item">
          {renderRating(1)}
          <span>Poor</span>
        </div>
        <div className="tool-matrix__legend-item">
          {renderRating(3)}
          <span>Average</span>
        </div>
        <div className="tool-matrix__legend-item">
          {renderRating(5)}
          <span>Excellent</span>
        </div>
      </div>
    </div>
  );
};

export default ToolMatrix;
