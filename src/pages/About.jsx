import { memo } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../constants/animations';
import Timeline from '../components/Timeline';
import TableOfContents from '../components/TableOfContents';
import ReadingProgress from '../components/ReadingProgress';
import timelineData from '../../data/timeline.json';

// Table of Contents sections
const TOC_SECTIONS = [
  { id: 'timeline', title: 'Project Timeline' },
  { id: 'vision', title: 'The Vision' },
  { id: 'process', title: 'The Process' },
  { id: 'methodology', title: 'Research Methodology' }
];

/**
 * About page - project and creator information
 * Optimized with React.memo and static animation variants
 */
const About = () => {

  return (
    <>
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Reading Progress Indicator */}
      <ReadingProgress />

      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="page-container"
        id="about"
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
          <h1>About This Project</h1>
          <p className="page-subtitle">The story behind the logbook</p>
        </motion.header>

        {/* Table of Contents */}
        <TableOfContents sections={TOC_SECTIONS} />

      {/* Project Timeline Section */}
      <motion.section
        id="timeline"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        aria-labelledby="timeline-heading"
      >
        <div className="card">
          <h2 id="timeline-heading">Project Timeline</h2>
          <p className="page-subtitle" style={{ marginBottom: '1.5rem' }}>
            Key milestones and development phases
          </p>
          <Timeline entries={timelineData} />
        </div>
      </motion.section>

      <motion.section
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        aria-label="Project information"
      >
        <motion.div
          id="vision"
          className="card"
          whileHover={{
            boxShadow: "0 0 30px rgba(138, 43, 226, 0.3)",
            transition: { duration: 0.2 }
          }}
        >
          <h2>The Vision</h2>
          <p>
            This digital logbook documents the creation of an interactive dystopian film exploring
            themes of AI dominance, human agency, and moral choice in a world ruled by machines.
          </p>
          <p>
            The project combines cutting-edge AI video generation tools with traditional storytelling
            techniques to create an immersive, branching narrative experience that challenges viewers
            to navigate difficult ethical dilemmas.
          </p>
        </motion.div>

        <motion.div
          id="process"
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{
            boxShadow: "0 0 30px rgba(138, 43, 226, 0.3)",
            transition: { duration: 0.2 }
          }}
        >
          <h2>The Process</h2>
          <p>
            Every step of this journey is documented here—from initial concept sketches to current
            production milestones. This logbook serves as both a creative diary and a technical reference
            for my experiments with AI-assisted filmmaking.
          </p>
          <p>
            The goal is transparency: showing the messy, iterative reality of creative work with tools
            that are still evolving and workflows that are still being figured out.
          </p>
        </motion.div>

        <motion.div
          id="methodology"
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{
            boxShadow: "0 0 30px rgba(138, 43, 226, 0.3)",
            transition: { duration: 0.2 }
          }}
        >
          <h2>Research Methodology</h2>
          <p>
            This project employs a <strong>Practice as Research (PaR)</strong> approach, where knowledge 
            emerges through the creative process itself. Rather than applying pre-existing theories to 
            AI filmmaking, I'm generating new insights by doing the work.
          </p>
          <p>
            <strong>Key PaR Principles Applied:</strong>
          </p>
          <ul className="bullets">
            <li><strong>Practice generates theory</strong> — Testing AI tools revealed limitations not documented 
            in marketing materials</li>
            <li><strong>Failure is data</strong> — Each unsuccessful generation taught me about model constraints 
            and capabilities</li>
            <li><strong>Iteration builds knowledge</strong> — Hundreds of prompt refinements developed tacit 
            expertise in prompt engineering</li>
            <li><strong>Reflection completes the cycle</strong> — Documenting lessons learned transforms experience 
            into transferable knowledge</li>
            <li><strong>Systematic documentation</strong> — Capturing both successes and failures creates a 
            research record for others working with these tools</li>
          </ul>
          <p>
            The <strong>"My Journey"</strong> page documents this research process in detail, showing how 
            hands-on experimentation with emerging AI tools produces insights unavailable through traditional 
            research methods. The <strong>"References"</strong> section grounds this approach in established 
            PaR scholarship by Robin Nelson, Donald Schön, and others.
          </p>
        </motion.div>

      </motion.section>
      </motion.div>
    </>
  );
};

export default memo(About);
