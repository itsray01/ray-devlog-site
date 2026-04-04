import { lazy, Suspense, useEffect, useRef } from 'react';
import ReadingProgress from '../components/ReadingProgress';
import ErrorBoundary from '../components/ErrorBoundary';
import FeatureCard from '../components/FeatureCard';
import FeatureGrid from '../components/FeatureGrid';
import { Map, BookOpen } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import useScrollReveal from '../hooks/useScrollReveal';
import useAnimeHover from '../hooks/useAnimeHover';
import useMouseParallax from '../hooks/useMouseParallax';
import HomeHubHeader from '../components/home/HomeHubHeader';
import FeaturedExperiment from '../components/home/FeaturedExperiment';
import { ctaPulse, stopAnimation } from '../utils/animeFx';
import styles from '../styles/Home.module.css';

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
 * Home page - Premium game title screen aesthetic
 */
const Home = () => {
  // Non-critical visuals are treated as progressive enhancement (see route-level ErrorBoundary in Layout).
  const { setSections } = useNavigation();

  // Refs for animations
  const ctaRef = useRef(null);
  const pulseAnimationRef = useRef(null);

  // Enable scroll-reveal animations
  const scrollRevealRef = useScrollReveal({
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px',
  });

  // Enable hover micro-interactions
  const hoverRef = useAnimeHover();

  // Enable mouse parallax for nebula layer (Home-only, low intensity)
  const parallaxRef = useMouseParallax({ intensity: 0.015, enabled: true });

  // Register sections with navigation context
  useEffect(() => {
    setSections(HOME_SECTIONS);
    return () => setSections([]);
  }, [setSections]);

  // CTA pulse animation - runs once on mount, stops on first interaction
  useEffect(() => {
    if (!ctaRef.current) return;

    // Start pulse animation
    pulseAnimationRef.current = ctaPulse(ctaRef.current, {
      duration: 2000,
      intensity: 0.8,
    });

    // Stop animation on first interaction
    const handleInteraction = () => {
      if (pulseAnimationRef.current) {
        stopAnimation(pulseAnimationRef.current);
        pulseAnimationRef.current = null;
      }
    };

    const button = ctaRef.current;
    button.addEventListener('mouseenter', handleInteraction);
    button.addEventListener('click', handleInteraction);

    return () => {
      if (pulseAnimationRef.current) {
        stopAnimation(pulseAnimationRef.current);
      }
      button.removeEventListener('mouseenter', handleInteraction);
      button.removeEventListener('click', handleInteraction);
    };
  }, []);

  return (
    <>
      {/* Reading Progress Indicator */}
      <ReadingProgress />

      <div
        className={`page-container home-page ${styles.homeShell}`}
        id="home"
        role="main"
        aria-label="Main content"
        ref={(el) => {
          scrollRevealRef(el);
          hoverRef(el);
          parallaxRef(el);
        }}
      >
        <div id="main-content"></div>

        {/* Premium Home Container - Wider, cinematic */}
        <div className={styles.homeContainer}>
          {/* Hero Section */}
          <div className={styles.homeHero}>
            {/* Page Header */}
            <header data-animate="reveal">
              <h1>Digital Project Logbook</h1>
              <p className={styles.homeSubtitle}>
                Documenting the journey of creating an interactive dystopian film
              </p>
            </header>

            {/* Home Hub Header - Game-style hub layer */}
            <div className={styles.homeSection}>
              <HomeHubHeader />
            </div>
          </div>

          {/* Featured Experiment Card */}
          <div className={styles.homeSection}>
            <FeaturedExperiment />
          </div>

          {/* Lazy-loaded sections with fade-in animation */}
          <div className={`${styles.homeSection} ${styles.sectionFadeIn}`}>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <OverviewSection />
              </Suspense>
            </ErrorBoundary>
          </div>

          <div className={`${styles.homeSection} ${styles.sectionFadeIn}`}>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <InspirationSection />
              </Suspense>
            </ErrorBoundary>
          </div>

          <div className={`${styles.homeSection} ${styles.sectionFadeIn}`}>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <MoodboardSection />
              </Suspense>
            </ErrorBoundary>
          </div>

          <div className={`${styles.homeSection} ${styles.sectionFadeIn}`}>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <StoryboardSection />
              </Suspense>
            </ErrorBoundary>
          </div>

          <div className={`${styles.homeSection} ${styles.sectionFadeIn}`}>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <StoryDevelopmentSection />
              </Suspense>
            </ErrorBoundary>
          </div>

          <div className={`${styles.homeSection} ${styles.sectionFadeIn}`}>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <BranchingSection />
              </Suspense>
            </ErrorBoundary>
          </div>

          {/* Featured Links Section */}
          <div className={`${styles.homeSection} ${styles.sectionFadeIn}`}>
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
                ref={ctaRef}
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
          </div>

          <div className={`${styles.homeSection} ${styles.sectionFadeIn}`}>
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                <ProductionSection />
              </Suspense>
            </ErrorBoundary>
          </div>

          {/* Footer */}
          <footer className={styles.homeSection}>
            <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.9rem' }}>
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
