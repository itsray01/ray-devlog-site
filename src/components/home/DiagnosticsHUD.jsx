import { useNavigation } from '../../context/NavigationContext';
import {
  Video,
  Wrench,
  GitBranch,
  Clock,
  AlertTriangle,
  Layers
} from 'lucide-react';

// HUD tile configuration
const HUD_TILES = [
  {
    id: 'clips',
    icon: Video,
    label: 'Clips Generated',
    value: '127',
    jumpTo: 'production',
    status: 'ok'
  },
  {
    id: 'tools',
    icon: Wrench,
    label: 'Tools Tested',
    value: '5',
    jumpTo: 'my-journey',
    status: 'ok'
  },
  {
    id: 'branches',
    icon: GitBranch,
    label: 'Story Branches',
    value: '8',
    jumpTo: 'branching',
    status: 'ok'
  },
  {
    id: 'runtime',
    icon: Clock,
    label: 'Target Runtime',
    value: '12m',
    jumpTo: 'overview',
    status: 'ok'
  },
  {
    id: 'issues',
    icon: AlertTriangle,
    label: 'Known Issues',
    value: '3',
    jumpTo: null,
    status: 'warn'
  },
  {
    id: 'sections',
    icon: Layers,
    label: 'Sections',
    value: '7',
    jumpTo: null,
    status: 'ok'
  }
];

/**
 * DiagnosticsHUD - System status tiles
 * Displays clickable HUD metrics
 */
const DiagnosticsHUD = () => {
  const { scrollToSection } = useNavigation();

  const handleTileClick = (tile) => {
    if (tile.jumpTo) {
      // Check if it's a route or section
      if (tile.jumpTo.startsWith('/') || tile.jumpTo.includes('journey')) {
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
