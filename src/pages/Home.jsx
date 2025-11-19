import { lazy, Suspense, useMemo } from 'react';
import { motion } from 'framer-motion';
import StatisticsDashboard from '../components/StatisticsDashboard';
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
const ExperimentsSection = lazy(() => import('../components/sections/ExperimentsSection'));
const AudienceSection = lazy(() => import('../components/sections/AudienceSection'));
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
      sectionId: 'experiments',
      title: 'AI Video Generation Experiments',
      content: 'Sora Veo3.1 Wan2.5 Higgsfield Seedance Kling AI tools failures lessons',
      tags: ['experiments', 'AI', 'tools', 'video generation']
    },
    {
      sectionId: 'audience',
      title: 'Audience & Accessibility',
      content: 'Accessibility visual audio cues subtitles difficulty pathways content warnings',
      tags: ['audience', 'accessibility', 'UX']
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

        {/* Statistics Dashboard */}
        <StatisticsDashboard />

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

        <Suspense fallback={<SectionLoader />}>
          <ExperimentsSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <AudienceSection />
        </Suspense>

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
            This logbook is continuously updated as the project evolves.
            Check back regularly for new entries, experiments, and insights.
          </p>
        </motion.footer>
      </motion.div>
    </>
  );
};

export default Home;
