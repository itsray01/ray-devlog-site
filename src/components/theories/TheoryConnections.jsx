import { useState } from 'react';
import { Link2 } from 'lucide-react';
import TheoryConnectionCard from './TheoryConnectionCard';
import ClipModal from './ClipModal';
import { THEORY_CONNECTIONS } from '../../data/theoryConnections';

/**
 * TheoryConnections - Main section displaying theory-to-clip connections
 * 
 * Grid of connection cards with modal for viewing clips
 */
const TheoryConnections = () => {
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenClip = (connection) => {
    setSelectedConnection(connection);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Clear selection after animation
    setTimeout(() => setSelectedConnection(null), 300);
  };

  return (
    <section className="theories__connections-section" aria-labelledby="connections-heading">
      <header className="theories__section-header">
        <Link2 className="theories__section-icon" aria-hidden="true" />
        <h2 id="connections-heading" className="theories__section-title">
          Theory-to-Clip Connections
        </h2>
      </header>

      <p style={{ 
        color: 'rgba(180, 180, 195, 0.9)', 
        fontSize: '0.9rem', 
        marginBottom: '1.5rem',
        lineHeight: 1.6
      }}>
        Each card below explicitly connects a theoretical concept from the library to a specific clip, 
        using the <strong>Claim → Evidence → Reasoning → So What</strong> structure to demonstrate 
        how theory informed creative decisions.
      </p>

      <div className="connection__grid">
        {THEORY_CONNECTIONS.map((connection, index) => (
          <TheoryConnectionCard
            key={connection.id}
            connection={connection}
            onOpenClip={handleOpenClip}
            index={index}
          />
        ))}
      </div>

      <ClipModal
        connection={selectedConnection}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default TheoryConnections;

