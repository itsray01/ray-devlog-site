import { useState } from 'react';
import { Link2 } from 'lucide-react';
import TheoryClipCard from './TheoryClipCard';
import TheoryClipDrawer from './TheoryClipDrawer';
import ClipModal from './ClipModal';
import { THEORY_CONNECTIONS } from '../../data/theoryConnections';

/**
 * TheoryClipGrid - Premium grid of theory-to-clip connection cards
 * 
 * Features:
 * - Compact card grid (2 columns on desktop)
 * - Right-side drawer for full breakdown
 * - Clip modal for video playback
 */
const TheoryClipGrid = () => {
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [clipModalConnection, setClipModalConnection] = useState(null);
  const [isClipModalOpen, setIsClipModalOpen] = useState(false);

  const handleOpenDrawer = (connection) => {
    setSelectedConnection(connection);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedConnection(null), 350);
  };

  const handleOpenClip = (connection) => {
    setClipModalConnection(connection);
    setIsClipModalOpen(true);
  };

  const handleCloseClipModal = () => {
    setIsClipModalOpen(false);
    setTimeout(() => setClipModalConnection(null), 300);
  };

  return (
    <div className="clip-grid-container">
      {/* CRT grain overlay for this section only */}
      <div className="clip-grid__crt-overlay" aria-hidden="true" />

      {/* Section Header */}
      <header className="clip-grid__header">
        <div className="clip-grid__header-icon">
          <Link2 size={20} />
        </div>
        <div>
          <h2 className="clip-grid__title">Theory-to-Clip Connections</h2>
          <p className="clip-grid__subtitle">
            Each card links a theoretical concept to a specific clip. 
            Click to explore the full <strong>Claim → Evidence → Reasoning → So What</strong> breakdown.
          </p>
        </div>
      </header>

      {/* Card Grid */}
      <div className="clip-grid">
        {THEORY_CONNECTIONS.map((connection, index) => (
          <TheoryClipCard
            key={connection.id}
            connection={connection}
            onOpenDrawer={handleOpenDrawer}
            onOpenClip={handleOpenClip}
            index={index}
          />
        ))}
      </div>

      {/* Drawer */}
      <TheoryClipDrawer
        connection={selectedConnection}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onOpenClip={handleOpenClip}
      />

      {/* Clip Modal (for full-screen video) */}
      <ClipModal
        connection={clipModalConnection}
        isOpen={isClipModalOpen}
        onClose={handleCloseClipModal}
      />
    </div>
  );
};

export default TheoryClipGrid;

