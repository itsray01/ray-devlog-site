import { useNavigationActions } from '../../context/NavigationContext';
import {
  GitBranch,
  Video,
  Wrench,
  DollarSign,
  Clock,
  Layers
} from 'lucide-react';

// HUD tile configuration
const HUD_TILES = [
  {
    id: 'branches',
    icon: GitBranch,
    label: 'Story Branches',
    value: '8',
    jumpTo: 'branching',
    status: 'ok'
  },
  {
    id: 'clips',
    icon: Video,
    label: 'Clips Generated',
    value: '377',
    jumpTo: 'production',
    status: 'ok'
  },
  {
    id: 'tools',
    icon: Wrench,
    label: 'Tools Tested',
    value: '5',
    jumpTo: 'process',
    status: 'ok'
  },
  {
    id: 'runtime',
    icon: Clock,
    label: 'Target Runtime',
    value: '12m',
    jumpTo: null,
    status: 'ok'
  },
  {
    id: 'sections',
    icon: Layers,
    label: 'Sections',
    value: '7',
    jumpTo: null,
    status: 'ok'
  },
  {
    id: 'spent',
    icon: DollarSign,
    label: 'Spent',
    value: '$XXX+',
    jumpTo: null,
    status: 'ok'
  }
];

/**
 * DiagnosticsHUD - System status tiles
 * Displays clickable HUD metrics
 */
const DiagnosticsHUD = () => {
  const { scrollToSection } = useNavigationActions();

  const handleTileClick = (tile) => {
    if (tile.jumpTo) {
      // Check if it's a route or section
      if (tile.jumpTo.startsWith('/') || tile.jumpTo === 'process') {
        window.location.href = `/${tile.jumpTo.replace('/', '')}`;
      } else {
        scrollToSection(tile.jumpTo);
      }
    }
  };

  return (
    <div className="home-hub__panel diagnostics-hud">
      <div className="diagnostics-hud__header">
        <span className="diagnostics-hud__label">SYSTEM DIAGNOSTICS</span>
      </div>

      <div className="diagnostics-hud__grid">
        {HUD_TILES.map((tile) => {
          const Icon = tile.icon;
          const isClickable = !!tile.jumpTo;

          return (
            <button
              key={tile.id}
              className={`diagnostics-hud__tile diagnostics-hud__tile--${tile.status} ${
                isClickable ? 'diagnostics-hud__tile--clickable' : ''
              }`}
              onClick={() => handleTileClick(tile)}
              disabled={!isClickable}
              aria-label={`${tile.label}: ${tile.value}${isClickable ? ' - Click to view' : ''}`}
            >
              <div className="diagnostics-hud__tile-icon">
                <Icon size={16} />
              </div>
              <div className="diagnostics-hud__tile-content">
                <div className="diagnostics-hud__tile-value">{tile.value}</div>
                <div className="diagnostics-hud__tile-label">{tile.label}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DiagnosticsHUD;
