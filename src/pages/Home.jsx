import { lazy, Suspense, useEffect } from 'react';
import ReadingProgress from '../components/ReadingProgress';
import ErrorBoundary from '../components/ErrorBoundary';
import FeatureCard from '../components/FeatureCard';
import FeatureGrid from '../components/FeatureGrid';
import { Map, BookOpen } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import useScrollReveal from '../hooks/useScrollReveal';
import useAnimeHover from '../hooks/useAnimeHover';
import HomeHubHeader from '../components/home/HomeHubHeader';

// Table of Contents sections - exported for use by navigation components
export const HOME_SECTIONS = [
  { id: 'overview', title: 'Overview' },
  { id: 'inspiration', title: 'Inspiration' },
  { id: 'moodboard', title: 'Moodboard' },
  { id: 'storyboard', title: 'Storyboard' },
  { id: 'story-development', title: 'Story Development' },
  { id: 'branching', title: 'Branching' },
  { id: 'production', title: 'Production' }
];

// Alias for backward compatibility
const TOC_SECTIONS = HOME_SECTIONS;

// Lazy load all section components for better code splitting
const OverviewSection = lazy(() => import('../components/sections/OverviewSection'));
const InspirationSection = lazy(() => import('../components/sections/InspirationSection'));
const MoodboardSection = lazy(() => import('../components/sections/MoodboardSection'));
const StoryboardSection = lazy(() => import('../components/sections/StoryboardSection'));
const StoryDevelopmentSection = lazy(() => import('../components/sections/StoryDevelopmentSection'));
const BranchingSection = lazy(() => import('../components/sections/BranchingSection'));
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
 * Home page - main devlog content
 */
const Home = () => {
  const { setSections } = useNavigation();
  
  // Enable scroll-reveal animations
  const scrollRevealRef = useScrollReveal({
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px',
  });
  
  // Enable hover micro-interactions
  const hoverRef = useAnimeHover();

  // Register sections with navigation context
  useEffect(() => {
    setSections(HOME_SECTIONS);
    return () => setSections([]);
  }, [setSections]);

  return (
    <>
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Reading Progress Indicator */}
      <ReadingProgress />

      <div
        className="page-container home-page"
        id="home"
        role="main"
        aria-label="Main content"
        ref={(el) => {
          scrollRevealRef(el);
          hoverRef(el);
        }}
      >
        <div id="main-content"></div>

        {/* Page Shell - Uniform readable width container */}
        <div className="page-shell">
          {/* Page Header */}
          <header className="page-header" data-animate="reveal">
            <h1>Digital Project Logbook</h1>
            <p className="page-subtitle">
              Documenting the journey of creating an interactive dystopian film
            </p>
          </header>

          {/* Home Hub Header - Game-style hub layer */}
          <HomeHubHeader />
        </div>

        {/* Page Shell for logbook sections - same width as hub */}
        <div className="page-shell">
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

          {/* Featured Links Section */}
          <section className="content-section" aria-label="Featured pages" data-animate="reveal">
            <FeatureGrid columns={2} gap="lg">
              <FeatureCard
                eyebrow="AI Experiments"
                title="My Journey Through AI Video Generation"
                body="I tested 5 different AI video generation models—Sora 2, Veo3.1, Wan2.5, Higgsfield, and Seedance. Most of them failed in ways I didn't expect. Here's what I learned from weeks of experimentation, burned credits, and frustrating failures."
                icon={Map}
                cta={{ label: 'Read My Journey', href: '/my-journey' }}
                variant="highlight"
                delay={0.1}
                onMouseEnter={() => import('../pages/MyJourney')}
              />

              <FeatureCard
                eyebrow="Academic Framework"
                title="Theoretical Foundations"
                body="Explore the academic frameworks and theoretical concepts that inform this project—from Practice as Research methodology to AI ethics, interactive horror, and authorship in AI-assisted creation."
                icon={BookOpen}
                cta={{ label: 'View Theories', href: '/theories' }}
                variant="highlight"
                delay={0.2}
                onMouseEnter={() => import('../pages/Theories')}
              />
            </FeatureGrid>
          </section>

          <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
              <ProductionSection />
            </Suspense>
          </ErrorBoundary>

          {/* Footer */}
          <footer>
            <p>
              This logbook documents the ongoing development of an interactive dystopian film project
              as of November 2025. It serves as both a creative diary and technical reference for
              AI-assisted filmmaking.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Home;
