import MissionBrief from './MissionBrief';
import ContinueCard from './ContinueCard';
import DiagnosticsHUD from './DiagnosticsHUD';
import PatchNotesPanel from './PatchNotesPanel';
import ModuleMap from './ModuleMap';

/**
 * HomeHubHeader - Game-style hub layer for Home page
 * Combines all hub components into a cohesive header section
 */
const HomeHubHeader = () => {
  return (
    <div className="home-hub" aria-label="Home hub navigation">
      {/* Mission Brief - Hero section */}
      <MissionBrief />

      {/* Continue + Diagnostics - 2 column row */}
      <div className="home-hub__row">
        <ContinueCard />
        <DiagnosticsHUD />
      </div>

      {/* Patch Notes - Recent updates */}
      <PatchNotesPanel />

      {/* Module Map - Level select */}
      <ModuleMap />
    </div>
  );
};

export default HomeHubHeader;
