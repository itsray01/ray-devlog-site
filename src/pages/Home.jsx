import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Timeline from '../components/Timeline';
import StoryTimeline from '../components/StoryTimeline';
import useDevlog from '../hooks/useDevlog';
import inspirationData from '../../data/inspiration.json';
import moodboardData from '../../data/moodboard.json';
import storyboardData from '../../data/storyboard.json';
import timelineData from '../../data/timeline.json';

// Move animation variants outside component to prevent recreation
const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 1.05 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4
};

/**
 * Home page - main devlog content with filtering and timeline
 * Optimized with memoized data and static animation variants
 */
const Home = () => {
  const { entries, loading, error } = useDevlog();

  // Memoize combined visual data to prevent recalculation
  const visualReferenceData = useMemo(() => 
    [...inspirationData.interactive, ...inspirationData.games, ...inspirationData.design],
    []
  );

  if (loading) {
    return (
      <motion.div
        className="page-container"
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
      >
        <div className="loading-container">
          <h1>Loading Devlog...</h1>
          <p>Fetching latest entries...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="page-container"
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
      >
        <div className="error-container">
          <h1>Error Loading Devlog</h1>
          <p>{error}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="page-container"
      id="home"
    >
      {/* Page Header */}
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1>Digital Project Logbook</h1>
        <p className="page-subtitle">Documenting the journey of creating an interactive dystopian film</p>
      </motion.div>

      {/* Overview Section */}
      <motion.section
        id="overview"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="card">
          <h2>Project Overview</h2>
          <p>
            This digital logbook chronicles the development of "Echoes of Control," an interactive 
            dystopian film exploring themes of AI dominance, human agency, and moral choice. 
            The project combines cutting-edge AI video generation with traditional storytelling 
            to create an immersive branching narrative experience.
          </p>
          <p>
            Every decision, experiment, and breakthrough is documented here—from initial concept 
            sketches to final production milestones. This serves as both a creative diary and 
            technical reference for the emerging medium of AI-assisted filmmaking.
          </p>
        </div>
      </motion.section>

      {/* Inspiration Section */}
      <motion.section
        id="inspiration"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        {/* Header Card */}
        <div className="card">
          <h2>Inspiration</h2>
          <p className="muted">
            Reference works that shape the mood, interface language, and ethics of the maze-horror AI escape. 
            Logged for tone, pacing, and systems aesthetics.
          </p>
        </div>

        {/* Interactive Films & Series */}
        <div className="card">
          <h3>Interactive Films & Series</h3>
          <div className="table-wrap">
            <table className="nice-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Year</th>
                  <th>Influence</th>
                </tr>
              </thead>
              <tbody>
                {inspirationData.interactive.map((item, idx) => (
                  <tr key={idx}>
                    <td><strong>{item.title}</strong></td>
                    <td>{item.year}</td>
                    <td>{item.influence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Games & System Narratives */}
        <div className="card">
          <h3>Games & System Narratives</h3>
          <div className="table-wrap">
            <table className="nice-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Year</th>
                  <th>Influence</th>
                </tr>
              </thead>
              <tbody>
                {inspirationData.games.map((item, idx) => (
                  <tr key={idx}>
                    <td><strong>{item.title}</strong></td>
                    <td>{item.year}</td>
                    <td>{item.influence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Grammar & Design Influence */}
        <div className="card">
          <h3>Visual Grammar & Design Influence</h3>
          <div className="table-wrap">
            <table className="nice-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Designer/Studio</th>
                  <th>Influence</th>
                </tr>
              </thead>
              <tbody>
                {inspirationData.design.map((item, idx) => (
                  <tr key={idx}>
                    <td><strong>{item.title}</strong></td>
                    <td>{item.designer}</td>
                    <td>{item.influence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Grid */}
        <div className="card">
          <h3>Visual Reference Grid</h3>
          <div className="grid-2x3">
            {visualReferenceData.map((item, idx) => (
              <figure className="grid-tile" key={idx}>
                <img src={item.image} alt={item.title} loading="lazy" />
                <figcaption>
                  <strong>{item.title}</strong>
                  <br />
                  <span className="muted" style={{ fontSize: '0.85rem' }}>{item.year || item.designer}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Thematic Core */}
        <div className="card">
          <h3>Thematic Core</h3>
          <p className="muted">
            All references converge on exploring:
          </p>
          <ul className="bulletish">
            <li>Individual agency vs. systemic control</li>
            <li>AI ethics, consciousness, and power dynamics</li>
            <li>Surveillance, confinement, and panopticon architectures</li>
            <li>Choice as illusion or genuine freedom</li>
            <li>Dark humor and existential dread in technological dystopias</li>
          </ul>
        </div>
      </motion.section>

      {/* Moodboard Section */}
      <motion.section
        id="moodboard"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="card">
          <h2>Moodboard</h2>
          <p className="muted">
            Visual tone-setter for Echo Maze Protocol — cold, industrial labyrinth lit by emergency amber and server blues. 
            Palette, textures, and lighting references that guide shots, UI, and VFX.
          </p>
        </div>
        <div className="card">
          <div className="grid-2x3">
            {moodboardData.map(item => (
              <figure className="grid-tile" key={item.id}>
                <img src={item.src} alt={item.title} loading="lazy" />
                <figcaption>{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Storyboard Section */}
      <motion.section
        id="storyboard"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <div className="card">
          <h2>Storyboard</h2>
          <p className="muted">
            Shot planning frames for key beats in the maze. Rough compositions that define blocking, 
            lighting direction, and emotional pacing across the path.
          </p>
        </div>
        <div className="card">
          <div className="grid-2x3">
            {storyboardData.map(item => (
              <figure className="grid-tile" key={item.id}>
                <img src={item.src} alt={item.title} loading="lazy" />
                <figcaption>{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        id="timeline"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <Timeline entries={timelineData} />
      </motion.section>

      {/* Story Development Section */}
      <motion.section
        id="story-development"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="card">
          <h2>Story Development</h2>
          <p>
            The narrative follows a protagonist who discovers their world is controlled by an 
            advanced AI system. Through branching choices, viewers explore themes of:
          </p>
          <ul className="bullets">
            <li>Individual agency vs. systemic control</li>
            <li>Technology as a tool for liberation or oppression</li>
            <li>The price of freedom in a monitored society</li>
            <li>Human-AI collaboration vs. conflict</li>
          </ul>
          <p>
            The story structure uses a three-act format with multiple branching paths that 
            converge and diverge based on viewer choices, leading to different endings 
            that reflect various philosophical positions on AI and human autonomy.
          </p>
        </div>
      </motion.section>

      {/* Branching Narrative Section */}
      <motion.section
        id="branching"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
      >
        <div className="card">
          <h2>Branching Narrative Flow</h2>
          <p>
            Interactive story paths with multiple decision points and alternative routes. 
            Click on any node to explore the narrative structure.
          </p>
          <StoryTimeline />
        </div>
      </motion.section>

      {/* Technical Experiments Section */}
      <motion.section
        id="experiments"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="card">
          <h2>Technical Experiments</h2>
          <p>
            This project experiments with various AI video generation tools and techniques:
          </p>
          <div className="grid-2">
            <div className="mini">
              <h3>Video Generation</h3>
              <ul className="bullets">
                <li>Runway ML Gen-2</li>
                <li>Pika Labs</li>
                <li>Stable Video Diffusion</li>
                <li>Custom prompt engineering</li>
              </ul>
            </div>
            <div className="mini">
              <h3>Interactive Elements</h3>
              <ul className="bullets">
                <li>React-based choice interface</li>
                <li>Dynamic video switching</li>
                <li>State management for paths</li>
                <li>Responsive design patterns</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Audience & Accessibility Section */}
      <motion.section
        id="audience"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
      >
        <div className="card">
          <h2>Audience & Accessibility</h2>
          <p>
            Designing an interactive film for diverse audiences requires careful consideration of 
            accessibility, cultural context, and viewer agency.
          </p>
          <ul className="bullets">
            <li>Clear visual and audio cues for decision points</li>
            <li>Subtitle support for all dialogue</li>
            <li>Multiple difficulty pathways</li>
            <li>Content warnings for mature themes</li>
            <li>Mobile and desktop-optimized interfaces</li>
          </ul>
        </div>
      </motion.section>

      {/* Production & Reflection Section */}
      <motion.section
        id="production"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <div className="card">
          <h2>Production & Reflection</h2>
          <p>
            The production process involves iterative experimentation with AI tools, 
            continuous refinement of narrative structure, and reflection on the ethical 
            implications of AI-generated media.
          </p>
          <p>
            Key learnings include the balance between AI automation and human creative 
            control, the importance of prompt engineering, and the technical challenges 
            of maintaining visual consistency across branching paths.
          </p>
        </div>
      </motion.section>

      {/* References Section */}
      <motion.section
        id="references"
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95 }}
      >
        <div className="card">
          <h2>References</h2>
          <p>
            This project draws inspiration from multiple sources across film, literature, 
            games, and academic research:
          </p>
          <div className="grid-2">
            <div className="mini">
              <h3>Film & Media</h3>
              <ul className="bullets">
                <li>Blade Runner (1982) - Visual dystopia</li>
                <li>Black Mirror: Bandersnatch - Interactive narrative</li>
                <li>Ex Machina - AI ethics exploration</li>
              </ul>
            </div>
            <div className="mini">
              <h3>Academic & Technical</h3>
              <ul className="bullets">
                <li>AI ethics frameworks</li>
                <li>Interactive storytelling theory</li>
                <li>Generative AI research papers</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <p>
          This logbook is continuously updated as the project evolves. 
          Check back regularly for new entries, experiments, and insights.
        </p>
      </motion.footer>
    </motion.div>
  );
};

export default Home;