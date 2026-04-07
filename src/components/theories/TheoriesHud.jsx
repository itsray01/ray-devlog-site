import { SfxToggle } from './SfxController';

/**
 * TheoriesHud - Terminal-style HUD strip at top of Theories page
 * Displays build info, engine, models, and status
 */
const TheoriesHud = () => {
  return (
    <div className="theories__hud-strip" role="banner" aria-label="Page status information">
      <div className="theories__hud-info">
        <div className="theories__hud-item">
          <span className="theories__hud-label">BUILD:</span>
          <span className="theories__hud-value">v1.0</span>
        </div>
        <div className="theories__hud-item">
          <span className="theories__hud-label">ENGINE:</span>
          <span className="theories__hud-value">TWINE</span>
        </div>
        <div className="theories__hud-item">
          <span className="theories__hud-label">MODELS:</span>
          <span className="theories__hud-value">Kling 3.0 Omni</span>
        </div>
        <div className="theories__hud-item">
          <span className="theories__hud-label">STATUS:</span>
          <span className="theories__hud-value theories__hud-value--online">ONLINE</span>
        </div>
      </div>
      <SfxToggle />
    </div>
  );
};

export default TheoriesHud;

