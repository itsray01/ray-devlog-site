import { SfxToggle } from './SfxController';

/**
 * TheoriesHud - Terminal-style HUD strip at top of Theories page
 * Displays build info, engine, models, and status
 */
const TheoriesHud = () => {
  // Generate a pseudo-random checksum that stays consistent per session
  const checksum = typeof window !== 'undefined' 
    ? `${Math.random().toString(16).slice(2, 6).toUpperCase()}-${Math.random().toString(16).slice(2, 6).toUpperCase()}`
    : '4F2A-91B0';

  return (
    <div className="theories__hud-strip" role="banner" aria-label="Page status information">
      <div className="theories__hud-info">
        <div className="theories__hud-item">
          <span className="theories__hud-label">BUILD:</span>
          <span className="theories__hud-value">v0.7</span>
        </div>
        <div className="theories__hud-item">
          <span className="theories__hud-label">ENGINE:</span>
          <span className="theories__hud-value">TWINE</span>
        </div>
        <div className="theories__hud-item">
          <span className="theories__hud-label">MODELS:</span>
          <span className="theories__hud-value">VEO 3.1 / SORA 2</span>
        </div>
        <div className="theories__hud-item">
          <span className="theories__hud-label">STATUS:</span>
          <span className="theories__hud-value theories__hud-value--online">ONLINE</span>
        </div>
        <div className="theories__hud-item">
          <span className="theories__hud-label">CHK:</span>
          <span className="theories__hud-value">{checksum}</span>
        </div>
      </div>
      <SfxToggle />
    </div>
  );
};

export default TheoriesHud;

