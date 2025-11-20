import { lazy, Suspense, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import ReadingProgress from '../components/ReadingProgress';
import useDevlog from '../hooks/useDevlog';
import { pageVariants, pageTransition } from '../constants/animations';

// Lazy load all section components for better code splitting
const OverviewSection = lazy(() => import('../components/sections/OverviewSection'));
const InspirationSection = lazy(() => import('../components/sections/InspirationSection'));
const MoodboardSection = lazy(() => import('../components/sections/MoodboardSection'));
const StoryboardSection = lazy(() => import('../components/sections/StoryboardSection'));
const StoryDevelopmentSection = lazy(() => import('../components/sections/StoryDevelopmentSection'));
const BranchingSection = lazy(() => import('../components/sections/BranchingSection'));

// Lazy load remaining sections too
const ProductionSection = lazy(() => import('../components/sections/ProductionSection'));
const ReferencesSection = lazy(() => import('../components/sections/ReferencesSection'));

// Loading fallback component
const SectionLoader = () => (
  <div style={{
    padding: '3rem 0',
    textAlign: 'center',
    color: 'var(--muted)'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '4px solid rgba(138, 43, 226, 0.2)',
      borderTop: '4px solid #8a2be2',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 1rem'
    }} />
    <p>Loading section...</p>
  </div>
);

/**
 * Home page - main devlog content with lazy-loaded sections
 * Optimized for performance with code splitting
 */
const Home = () => {
  const { entries, loading, error } = useDevlog();

  // Prepare searchable content from all sections
  const searchableContent = useMemo(() => [
    {
      sectionId: 'overview',
      title: 'Project Overview',
      content: 'Echoes of Control interactive dystopian film AI dominance human agency moral choice',
      tags: ['overview', 'introduction', 'project']
    },
    {
      sectionId: 'inspiration',
      title: 'Inspiration',
      content: 'Black Mirror Bandersnatch Stanley Parable Portal Blade Runner interactive films games',
      tags: ['inspiration', 'references', 'games', 'films']
    },
    {
      sectionId: 'moodboard',
      title: 'Moodboard',
      content: 'Visual tone cold industrial labyrinth amber blue lighting palette textures',
      tags: ['moodboard', 'visual', 'design']
    },
    {
      sectionId: 'storyboard',
      title: 'Storyboard',
      content: 'Shot planning frames key beats blocking lighting emotional pacing',
      tags: ['storyboard', 'planning', 'shots']
    },
    {
      sectionId: 'story-development',
      title: 'Story Development',
      content: 'Echo Maze Protocol narrative design three-act structure looping mechanics timed decisions',
      tags: ['story', 'narrative', 'development', 'design']
    },
    {
      sectionId: 'branching',
      title: 'Branching Narrative',
      content: 'Interactive story paths decision points alternative routes timeline',
      tags: ['branching', 'interactive', 'choices']
    },
    {
      sectionId: 'production',
      title: 'Production & Reflection',
      content: 'Milestones playtesting iteration asset generation failures learnings',
      tags: ['production', 'reflection', 'process']
    },
    {
      sectionId: 'references',
      title: 'References',
      content: 'Janet Murray Aarseth Ryan Bostrom Russell theoretical foundations course objectives',
      tags: ['references', 'theory', 'research']
    }
  ], []);

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
          <div className="loading-spinner" />
          <motion.h1
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading Devlog...
          </motion.h1>
          <motion.p>
            Fetching latest entries
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1] }}
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
      >
        <div className="error-container">
          <h1>Error Loading Devlog</h1>
          <p>{error}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <>
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
      >
        {/* Page Header with Search */}
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h1>Digital Project Logbook</h1>
              <p className="page-subtitle">Documenting the journey of creating an interactive dystopian film</p>
            </div>
            <SearchBar searchableContent={searchableContent} />
          </div>
        </motion.div>

        {/* Lazy-loaded sections */}
        <Suspense fallback={<SectionLoader />}>
          <OverviewSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <InspirationSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <MoodboardSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <StoryboardSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <StoryDevelopmentSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <BranchingSection />
        </Suspense>

        {/* AI Video Generation Journey - Link to dedicated page */}
        <motion.section
          className="content-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/my-journey" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card" style={{ 
              background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.1) 0%, rgba(138, 43, 226, 0.05) 100%)',
              border: '2px solid rgba(138, 43, 226, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'rgba(138, 43, 226, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(138, 43, 226, 0.3)';
            }}
            >
              <h2 style={{ marginBottom: '1rem' }}>My Journey Through AI Video Generation</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                I tested 5 different AI video generation models—Sora 2, Veo3.1, Wan2.5, Higgsfield, 
                and Seedance. Most of them failed in ways I didn't expect. Here's what I learned from 
                weeks of experimentation, burned credits, and frustrating failures.
              </p>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                color: '#8a2be2',
                fontWeight: '600',
                fontSize: '1.05rem'
              }}>
                Read My Journey →
              </div>
            </div>
          </Link>
        </motion.section>

        <Suspense fallback={<SectionLoader />}>
          <ProductionSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ReferencesSection />
        </Suspense>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <p>
            This logbook documents the ongoing development of an interactive dystopian film project
            as of November 2024. It serves as both a creative diary and technical reference for
            AI-assisted filmmaking.
          </p>
        </motion.footer>
      </motion.div>
    </>
  );
};

export default Home;
