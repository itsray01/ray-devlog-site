import { useNavigation } from '../../context/NavigationContext';
import { HOME_SECTIONS } from '../../pages/Home';
import { ChevronRight } from 'lucide-react';

/**
 * ModuleMap - Level select / section navigation
 * Displays all major sections as clickable nodes
 */
const ModuleMap = () => {
  const { scrollToSection, activeSectionId } = useNavigation();

  const handleModuleClick = (sectionId) => {
    scrollToSection(sectionId);
  };

  return (
    <div className="home-hub__panel module-map">
      <div className="module-map__header">
        <span className="module-map__label">MODULE MAP</span>
        <span className="module-map__subtitle">Select a module to begin</span>
      </div>

      <div className="module-map__list">
        {HOME_SECTIONS.map((section, index) => {
          const isActive = activeSectionId === section.id;

          return (
            <button
              key={section.id}
              onClick={() => handleModuleClick(section.id)}
              className={`module-map__node ${
                isActive ? 'module-map__node--active' : ''
              }`}
              aria-label={`Navigate to ${section.title}`}
              aria-current={isActive ? 'true' : 'false'}
            >
              <div className="module-map__node-connector">
                {index > 0 && <div className="module-map__connector-line" />}
                <div className="module-map__node-dot" />
              </div>

              <div className="module-map__node-content">
                <span className="module-map__node-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="module-map__node-title">{section.title}</span>
              </div>

              <ChevronRight
                size={16}
                className="module-map__node-arrow"
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ModuleMap;
