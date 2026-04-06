import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { createPortal } from 'react-dom';

const NarrativeFlowGraph = lazy(() => import('../narrative/NarrativeFlowGraph'));

const LEGEND_ITEMS = [
  { color: '#00e5ff', label: 'Start' },
  { color: '#bf5af2', label: 'Branch Point' },
  { color: '#a78bfa', label: 'Story Beat' },
  { color: '#ff453a', label: 'Ending' },
];

const BranchingSection = () => {
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef(null);

  const open = useCallback(() => setExpanded(true), []);
  const close = useCallback(() => setExpanded(false), []);

  useEffect(() => {
    if (!expanded) return;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [expanded, close]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <>
      <motion.section
        ref={sectionRef}
        id="branching"
        className="content-section scroll-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="card">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              userSelect: 'none'
            }}
            onClick={open}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
            }}
            tabIndex={0}
            role="button"
            aria-expanded={expanded}
            aria-label="Expand branching narrative fullscreen"
          >
            <div>
              <motion.h2
                animate={{
                  backgroundImage: [
                    'linear-gradient(135deg, #8a2be2, #b794f6, #8a2be2)',
                    'linear-gradient(135deg, #b794f6, #c9a9ff, #b794f6)',
                    'linear-gradient(135deg, #8a2be2, #b794f6, #8a2be2)'
                  ],
                  textShadow: [
                    '0 0 10px rgba(138, 43, 226, 0.6)',
                    '0 0 25px rgba(183, 148, 246, 1)',
                    '0 0 10px rgba(138, 43, 226, 0.6)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  margin: 0,
                  marginBottom: '0.5rem',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent'
                }}
              >
                Branching Narrative Flow
              </motion.h2>
              <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                Interactive story paths with multiple decision points and alternative routes.
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  marginTop: '0.75rem',
                  marginBottom: 0,
                  fontSize: '0.85rem',
                  color: 'var(--accent)',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <motion.span
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  ⛶
                </motion.span>
                Click to view full narrative map
              </motion.p>
            </div>
            <motion.span
              animate={{
                backgroundImage: [
                  'linear-gradient(135deg, #8a2be2, #b794f6, #8a2be2)',
                  'linear-gradient(135deg, #b794f6, #c9a9ff, #b794f6)',
                  'linear-gradient(135deg, #8a2be2, #b794f6, #8a2be2)'
                ],
                filter: [
                  'drop-shadow(0 0 10px rgba(138, 43, 226, 0.8))',
                  'drop-shadow(0 0 20px rgba(183, 148, 246, 1))',
                  'drop-shadow(0 0 10px rgba(138, 43, 226, 0.8))'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                fontSize: '1.5rem',
                marginLeft: '1rem',
                flexShrink: 0,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent'
              }}
            >
              ⛶
            </motion.span>
          </div>

          {/* Blurred preview teaser */}
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: 'linear-gradient(180deg, rgba(138, 43, 226, 0.08) 0%, transparent 100%)',
            borderRadius: '8px',
            position: 'relative',
            overflow: 'hidden',
            pointerEvents: 'none'
          }}>
            <div style={{
              opacity: 0.4,
              filter: 'blur(1px)',
              fontSize: '0.9rem',
              color: 'var(--muted)'
            }}>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <span>● IntroScreen</span>
                <span>● WrongDoorSound</span>
                <span>● EndingChoice</span>
              </div>
              <div style={{ marginTop: '0.5rem', height: '40px', background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.2) 0%, rgba(183, 148, 246, 0.1) 50%, rgba(138, 43, 226, 0.2) 100%)', borderRadius: '4px' }} />
            </div>
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              height: '60%',
              background: 'linear-gradient(180deg, transparent 0%, var(--surface) 100%)',
              pointerEvents: 'none'
            }} />
          </div>
        </div>
      </motion.section>

      {/* Fullscreen overlay — rendered via portal to escape layout constraints */}
      {createPortal(
        <AnimatePresence>
          {expanded && (
            <motion.div
              className="nf-fullscreen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Top bar */}
              <div className="nf-fullscreen__bar">
                <h2 className="nf-fullscreen__title">Branching Narrative Flow</h2>
                <div className="nf-legend nf-fullscreen__legend">
                  {LEGEND_ITEMS.map(({ color, label }) => (
                    <span className="nf-legend__item" key={label}>
                      <span className="nf-legend__dot" style={{ color, background: color }} />
                      {label}
                    </span>
                  ))}
                </div>
                <button
                  className="nf-fullscreen__close"
                  onClick={close}
                  aria-label="Close narrative map"
                >
                  ✕
                </button>
              </div>

              {/* Graph fills remaining viewport */}
              <div className="nf-fullscreen__graph">
                <Suspense fallback={
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--muted)' }}>
                    Loading narrative map…
                  </div>
                }>
                  <NarrativeFlowGraph direction="LR" />
                </Suspense>
              </div>

              <p className="nf-fullscreen__hint">
                Scroll wheel / trackpad pinch to zoom · Drag canvas to pan · Press <kbd>Esc</kbd> to close
              </p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default BranchingSection;
