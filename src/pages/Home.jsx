import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReadingProgress from '../components/ReadingProgress';
import TableOfContents from '../components/TableOfContents';
import ErrorBoundary from '../components/ErrorBoundary';
import useDevlog from '../hooks/useDevlog';
import { pageVariants, pageTransition } from '../constants/animations';

// Table of Contents sections
const TOC_SECTIONS = [
  { id: 'overview', title: 'Overview' },
  { id: 'inspiration', title: 'Inspiration' },
  { id: 'moodboard', title: 'Moodboard' },
  { id: 'storyboard', title: 'Storyboard' },
  { id: 'story-development', title: 'Story Development' },
  { id: 'branching', title: 'Branching' },
  { id: 'production', title: 'Production' }
];

// Lazy load all section components for better code splitting
const OverviewSection = lazy(() => import('../components/sections/OverviewSection'));
const InspirationSection = lazy(() => import('../components/sections/InspirationSection'));
const MoodboardSection = lazy(() => import('../components/sections/MoodboardSection'));
const StoryboardSection = lazy(() => import('../components/sections/StoryboardSection'));
const StoryDevelopmentSection = lazy(() => import('../components/sections/StoryDevelopmentSection'));
const BranchingSection = lazy(() => import('../components/sections/BranchingSection'));

// Lazy load remaining sections too
const ProductionSection = lazy(() => import('../components/sections/ProductionSection'));

// Loading fallback component
const SectionLoader = () => (
  <div 
    role="status" 
    aria-label="Loading section"
    style={{
      padding: '3rem 0',
      textAlign: 'center',
      color: 'var(--muted)'
    }}
  >
    <div 
      aria-hidden="true"
      style={{
        width: '40px',
        height: '40px',
        border: '4px solid rgba(138, 43, 226, 0.2)',
        borderTop: '4px solid #8a2be2',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 1rem'
      }} 
    />
    <p>Loading section...</p>
  </div>
);

/**
 * Home page - main devlog content with lazy-loaded sections
 * Optimized for performance with code splitting
 */
const Home = () => {
  const { entries, loading, error } = useDevlog();

  if (loading) {
    return (
      <motion.div
        className="page-container"
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
        role="main"
        aria-label="Main content"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100%'
        }}
      >
        <div className="loading-container" role="status" aria-live="polite" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <div className="loading-spinner" aria-hidden="true" style={{
            width: '80px',
            height: '80px',
            border: '6px solid rgba(138, 43, 226, 0.2)',
            borderTop: '6px solid #8a2be2',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '2rem'
          }} />
          <motion.h1
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: '3rem', marginBottom: '1rem' }}
          >
            Loading Devlog...
          </motion.h1>
          <motion.p style={{ fontSize: '1.3rem' }}>
            Fetching latest entries from development log
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1] }}
              aria-hidden="true"
            >...</motion.span>
          </motion.p>
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
        role="main"
        aria-label="Main content"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100%'
        }}
      >
        <div className="error-container" role="alert" aria-live="assertive" style={{
          textAlign: 'center'
        }}>
          <h1>Error Loading Devlog</h1>
          <p>{error}</p>
        </div>
      </motion.div>
    );
  }

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
        id="home"
        role="main"
        aria-label="Main content"
      >
        <div id="main-content"></div>
        {/* Page Header with Search */}
        <motion.header
          className="page-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <h1>Digital Project Logbook</h1>
            <p className="page-subtitle">Documenting the journey of creating an interactive dystopian film</p>
          </div>
        </motion.header>

        {/* Table of Contents */}
        <TableOfContents sections={TOC_SECTIONS} />

        {/* Lazy-loaded sections */}
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <OverviewSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <InspirationSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <MoodboardSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <StoryboardSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <StoryDevelopmentSection />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <BranchingSection />
          </Suspense>
        </ErrorBoundary>

        {/* Journey & Reflection Section */}
        <motion.section
          className="content-section journey-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          aria-label="Journey, production and reflection section"
        >
          {/* Card 1: My Journey Through AI Video Generation */}
          <div className="journey-section-card">
            <h2>My Journey Through AI Video Generation</h2>
            <p>
              I experimented with five AI video generation models—Sora 2, Veo 3.1, Wan 2.5,
              Higgsfield and Seedance—to see how far they could be pushed for storytelling.
              Most of them broke in ways I didn't expect. This section unpacks what worked,
              what failed, and what weeks of burned credits taught me about using AI for narrative film.
            </p>
            <div className="cta-right">
              <Link
                to="/my-journey"
                className="cta-pill"
                aria-label="Read my journey through AI video generation"
                onMouseEnter={() => import('../pages/MyJourney')}
              >
                Read My Journey →
              </Link>
            </div>
          </div>

          {/* Card 2: Starting Too Big */}
          <div className="journey-section-card">
            <div className="date-label">October 2025</div>
            <h3>Starting Too Big: My First Mistake</h3>
            <p>
              I began with grand ambitions. Echo Maze Protocol was going to be an interactive
              horror film about AI control and human agency—multiple branching paths, complex
              choices, deep thematic exploration. I researched horror conventions, studied
              Black Mirror: Bandersnatch and The Stanley Parable, and designed a narrative
              structure that was… way too complex.
            </p>
            <p>
              <strong>What I learned:</strong> I had to simplify. I cut back to three main acts
              with strategic convergence points. This wasn't a compromise on my creative vision;
              it was a reality check that made the project finishable.
            </p>
          </div>

          {/* Card 3: Production & Reflection */}
          <div className="journey-section-card">
            <h3>Production & Reflection: The Real Story</h3>
            <p>
              This isn't a polished success story. It's the messy reality of trying to make
              an ambitious interactive film with tools that aren't quite ready for narrative filmmaking.
            </p>
            <p>
              Here I trace the false starts, tool failures, pivots, and the lessons each
              turning point forced me to learn.
            </p>
          </div>

          {/* Card 4: Key Learnings & Course Connections */}
          <div className="journey-section-card">
            <h3>Key Learnings & Course Connections</h3>

            <h4>Interactive Storytelling Theory</h4>
            <ul>
              <li>Applied Murray's concepts of agency and immersion to branching narrative design</li>
              <li>Explored the tension between player choice and authorial control</li>
              <li>Implemented environmental storytelling techniques from game design</li>
              <li>Balanced narrative complexity with technical constraints</li>
            </ul>

            <h4>AI-Assisted Production</h4>
            <ul>
              <li>Evaluated multiple AI video generation tools for creative production</li>
              <li>Developed prompt-engineering strategies for more consistent AI output</li>
              <li>Established hybrid workflows combining AI generation with traditional post-production</li>
              <li>Reflected on the role of human creativity in AI-assisted workflows</li>
            </ul>
          </div>

          {/* Card 5: Theoretical Foundations */}
          <div className="journey-section-card">
            <h2>Theoretical Foundations</h2>
            <p>
              This section connects the project back to theory—from Practice-as-Research
              methodology to AI ethics, interactive horror and questions of authorship in
              AI-assisted creation. It explains why the film is more than a technical experiment.
            </p>
            <div className="cta-right">
              <Link
                to="/theories"
                className="cta-pill"
                aria-label="Explore theoretical foundations"
                onMouseEnter={() => import('../pages/Theories')}
              >
                View Theories →
              </Link>
            </div>
          </div>
        </motion.section>

        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <ProductionSection />
          </Suspense>
        </ErrorBoundary>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <p>
            This logbook documents the ongoing development of an interactive dystopian film project
            as of November 2025. It serves as both a creative diary and technical reference for
            AI-assisted filmmaking.
          </p>
        </motion.footer>
      </motion.div>
    </>
  );
};

export default Home;
