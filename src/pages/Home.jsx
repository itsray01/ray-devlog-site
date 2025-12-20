import { lazy, Suspense, useEffect } from 'react';
import ReadingProgress from '../components/ReadingProgress';
import ErrorBoundary from '../components/ErrorBoundary';
import ScrollSection, { ScrollReveal } from '../components/ScrollSection';
import TextReveal, { GlowText } from '../components/TextReveal';
import { ScrollProgress } from '../components/ParallaxBackground';
import TearDivider from '../components/TearDivider';
import FeatureCard from '../components/FeatureCard';
import FeatureGrid from '../components/FeatureGrid';
import { Map, BookOpen } from 'lucide-react';
import { refreshScrollTrigger } from '../utils/gsap';
import { useNavigation } from '../context/NavigationContext';

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
 * Home page - main devlog content with GSAP scroll animations
 * Features parallax background, scroll-triggered reveals, and cinematic text effects
 */
const Home = () => {
  const { setSections } = useNavigation();

  // Register sections with navigation context
  useEffect(() => {
    setSections(HOME_SECTIONS);
    return () => setSections([]);
  }, [setSections]);

  // Refresh ScrollTrigger when component mounts (for lazy-loaded content)
  useEffect(() => {
    const timer = setTimeout(() => {
      refreshScrollTrigger();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* GSAP Scroll Progress Bar */}
      <ScrollProgress color="var(--accent-primary)" height={3} />

      {/* Reading Progress Indicator */}
      <ReadingProgress />

      <div
        className="page-container"
        id="home"
        role="main"
        aria-label="Main content"
      >
        <div id="main-content"></div>
        
        {/* Cinematic Page Header with Text Reveal */}
        <header className="page-header gsap-header">
          <div>
            <TextReveal
              text="Digital Project Logbook"
              as="h1"
              splitBy="words"
              preset="fadeUp"
              duration={0.8}
              stagger={0.1}
            />
            <ScrollReveal preset="fadeUp" delay={0.3} duration={0.8}>
              <p className="page-subtitle">
                <GlowText glowColor="rgba(139, 92, 246, 0.6)" intensity={0.5}>
                  Documenting the journey of creating an interactive dystopian film
                </GlowText>
              </p>
            </ScrollReveal>
          </div>
        </header>

        {/* Lazy-loaded sections with GSAP animations */}
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <OverviewSection />
          </Suspense>
        </ErrorBoundary>

        <TearDivider variant="default" />

        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <InspirationSection />
          </Suspense>
        </ErrorBoundary>

        <TearDivider variant="scanline" />

        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <MoodboardSection />
          </Suspense>
        </ErrorBoundary>

        <TearDivider variant="glitch" />

        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <StoryboardSection />
          </Suspense>
        </ErrorBoundary>

        <TearDivider variant="default" />

        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <StoryDevelopmentSection />
          </Suspense>
        </ErrorBoundary>

        <TearDivider variant="scanline" />

        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <BranchingSection />
          </Suspense>
        </ErrorBoundary>

        {/* Featured Links Section */}
        <section className="content-section" aria-label="Featured pages">
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

        <TearDivider variant="glitch" />

        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <ProductionSection />
          </Suspense>
        </ErrorBoundary>

        {/* Footer with fade-in */}
        <ScrollReveal as="footer" preset="fadeIn" duration={1}>
          <p>
            This logbook documents the ongoing development of an interactive dystopian film project
            as of November 2025. It serves as both a creative diary and technical reference for
            AI-assisted filmmaking.
          </p>
        </ScrollReveal>
      </div>
    </>
  );
};

export default Home;
