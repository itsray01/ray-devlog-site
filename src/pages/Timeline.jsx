import { memo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../constants/animations';
import TimelineComponent from '../components/Timeline';
import NarrativeFlowGraph from '../components/narrative/NarrativeFlowGraph';
import ReadingProgress from '../components/ReadingProgress';
import timelineData from '../../data/timeline.json';
import { useNavigation } from '../context/NavigationContext';

export const TIMELINE_SECTIONS = [
  { id: 'narrative-map', title: 'Narrative Map' },
  { id: 'milestones', title: 'Project Milestones' },
  { id: 'key-pivots', title: 'Key Pivots' }
];

const Timeline = () => {
  const { setSections } = useNavigation();

  useEffect(() => {
    setSections(TIMELINE_SECTIONS);
    return () => setSections([]);
  }, [setSections]);

  return (
    <>
      <ReadingProgress />

      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="page-container"
        id="timeline"
        role="main"
        aria-label="Main content"
      >
        <div id="main-content"></div>

        <motion.header
          className="page-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1>Timeline</h1>
          <p className="page-subtitle">Project evolution from early concept to final submission</p>
          <p>
            Each milestone here represents a decision made in response to evidence — a tool that underperformed,
            a workflow that broke, or a better method discovered through testing. Together they trace the
            argument made throughout the devlog: that quality emerged from deliberate iteration, not from
            any single tool or moment of inspiration.
          </p>
        </motion.header>

        <motion.section
          id="narrative-map"
          className="content-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          aria-labelledby="narrative-map-heading"
        >
          <div className="card">
            <h2 id="narrative-map-heading">Narrative Map</h2>
            <p className="page-subtitle" style={{ marginBottom: '1rem' }}>
              Interactive branching structure of the Twine prototype — parsed directly from the exported HTML
            </p>
            <NarrativeFlowGraph />
            <div className="nf-legend">
              <span className="nf-legend__item">
                <span className="nf-legend__dot" style={{ color: '#00e5ff', background: '#00e5ff' }} />
                Start
              </span>
              <span className="nf-legend__item">
                <span className="nf-legend__dot" style={{ color: '#bf5af2', background: '#bf5af2' }} />
                Branch Point
              </span>
              <span className="nf-legend__item">
                <span className="nf-legend__dot" style={{ color: '#a78bfa', background: '#a78bfa' }} />
                Story Beat
              </span>
              <span className="nf-legend__item">
                <span className="nf-legend__dot" style={{ color: '#ff453a', background: '#ff453a' }} />
                Ending
              </span>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="milestones"
          className="content-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          aria-labelledby="milestones-heading"
        >
          <div className="card">
            <h2 id="milestones-heading">Project Milestones</h2>
            <p className="page-subtitle" style={{ marginBottom: '1.5rem' }}>
              Key milestones, workflow shifts, and development phases
            </p>
            <TimelineComponent entries={timelineData} />
          </div>
        </motion.section>

        <motion.section
          id="key-pivots"
          className="content-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          aria-labelledby="pivots-heading"
        >
          <div className="card">
            <h2 id="pivots-heading">Key Pivots</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              These are not just course corrections — each pivot was a direct response to a practical
              problem. They show how the project's methodology evolved through doing, not planning.
            </p>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <article className="card note">
                <h3>Project Rename</h3>
                <p className="page-subtitle" style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>Early 2026</p>
                <p>
                  The project launched as "Protocol of Control" before being renamed to <strong>Echoes of Control</strong>.
                  The new title better matched the finished artefact: emphasis on resonance, repetition, and voices 
                  that return — whether as narrative loops or the AI systems that shape the maze.
                </p>
                <p>
                  "Echo Maze Protocol" remains as the in-world fiction name; the public-facing project title for the 
                  course and portfolio is Echoes of Control.
                </p>
              </article>

              <article className="card note">
                <h3>Workflow Consolidation: Multi-Model to Kling 3.0 Omni</h3>
                <p className="page-subtitle" style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>January 2026</p>
                <p>
                  The project started with a multi-model comparison workflow using Sora 2, Veo 3.1, WAN 2.5, 
                  Seedance, and Higgsfield. When Kling 3.0 Omni launched, it surpassed all tested alternatives 
                  in quality and consistency, with integrated sound generation that eliminated the need for 
                  separate audio workflows.
                </p>
                <p>
                  This pivot only became possible because the multi-model testing phase produced clear,
                  documented evidence of each tool's weaknesses. Without that systematic comparison,
                  there was no basis to confidently consolidate — the switch was a reasoned conclusion,
                  not a trend-following decision.
                </p>
              </article>

              <article className="card note">
                <h3>Twine + GitHub Video Integration</h3>
                <p className="page-subtitle" style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>October–November 2025</p>
                <p>
                  Following Dr Conor McKeown's tutorials, videos were hosted on GitHub with direct MP4 links 
                  embedded in Twine div elements. This workflow kept the story file lightweight while allowing 
                  real clips to play inside the interactive prototype.
                </p>
              </article>

              <article className="card note">
                <h3>Mobile Prototype on Anything.com</h3>
                <p className="page-subtitle" style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>March 2026</p>
                <p>
                  A dedicated mobile prototype was built using Anything.com's MAX plan to test whether the 
                  branching video experience could survive on a small screen. This surfaced issues with tap 
                  targets, load behaviour, and horror pacing that wouldn't have been caught on desktop alone.
                </p>
              </article>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </>
  );
};

export default memo(Timeline);
