import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ToolLessonCard from '../components/ToolLessonCard';
import ReadingProgress from '../components/ReadingProgress';
import StatisticsDashboard from '../components/StatisticsDashboard';
import TearDivider from '../components/TearDivider';
import { pageVariants, pageTransition } from '../constants/animations';
import { useNavigation } from '../context/NavigationContext';

// Table of Contents sections - exported for use by navigation components
export const JOURNEY_SECTIONS = [
  { id: 'statistics', title: 'Statistics' },
  { id: 'introduction', title: 'Introduction' },
  { id: 'practice-as-research', title: 'Practice as Research' },
  { id: 'tool-graveyard', title: 'Tools Tested' },
  { id: 'sora2', title: 'Sora 2' },
  { id: 'veo31', title: 'Veo 3.1' },
  { id: 'wan25', title: 'Wan 2.5' },
  { id: 'higgsfield', title: 'Higgsfield' },
  { id: 'seedance', title: 'Seedance' },
  { id: 'reflections', title: 'Reflections' }
];

// Alias for backward compatibility
const TOC_SECTIONS = JOURNEY_SECTIONS;

/**
 * My Journey So Far - Dedicated page for AI video generation experiments
 * Comprehensive documentation of tools, failures, and lessons learned
 */
const MyJourney = () => {
  const { setSections } = useNavigation();

  // Register sections with navigation context
  useEffect(() => {
    setSections(JOURNEY_SECTIONS);
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

      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="page-container"
        id="my-journey"
        role="main"
        aria-label="Main content"
      >
        <div id="main-content"></div>

        {/* Page Header */}
        <motion.header
          className="page-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1>My Journey So Far</h1>
          <p className="page-subtitle">
            Tools, Failures, and Hard-Won Lessons from AI Video Generation
          </p>
        </motion.header>

        {/* Statistics Dashboard */}
        <div id="statistics">
          <StatisticsDashboard />
        </div>

        <TearDivider variant="default" />

        {/* Introduction */}
        <motion.article
          id="introduction"
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2>My Journey Through AI Video Generation</h2>
          <p>
            Let me be honest: this wasn't a smooth ride. I spent weeks experimenting with different
            AI video generation tools, burning through credits, and hitting walls I didn't expect.
          </p>
          <p>
            Here's the real story—the failures, the frustrations, and what I actually learned from
            trying to make this work.
          </p>
        </motion.article>

        {/* Practice as Research Framework */}
        <motion.article
          id="practice-as-research"
          className="card note par-note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          aria-labelledby="par-heading"
        >
          <h3 id="par-heading">Practice as Research: Learning Through Making</h3>
          <p>
            This documentation follows a <strong>Practice as Research (PaR)</strong> methodology, where the 
            act of creating with AI tools generates knowledge that couldn't be gained through theory alone.
          </p>
          <p>
            Rather than just reading about AI video generation, I learned by:
          </p>
          <ul className="bullets">
            <li><strong>Iterative experimentation</strong> — Testing multiple models to understand their capabilities</li>
            <li><strong>Documenting failures</strong> — Recording what doesn't work is as valuable as successes</li>
            <li><strong>Reflective practice</strong> — Each generation informed the next, building tacit knowledge</li>
            <li><strong>Systematic comparison</strong> — Side-by-side testing revealed patterns invisible in marketing</li>
          </ul>
          <p>
            The knowledge documented here emerged from hundreds of hours of hands-on practice—trial, error, 
            refinement, and discovery. This is research through making.
          </p>
        </motion.article>

        <TearDivider variant="scanline" />

        {/* The Tool Graveyard */}
        <motion.article
          id="tool-graveyard"
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          aria-labelledby="tool-graveyard-heading"
        >
          <h3 id="tool-graveyard-heading">The Tool Graveyard: What I Actually Tried</h3>
          <p>
            I tested multiple AI video generation models through two main platforms:
          </p>
          <ul className="bullets">
            <li>
              <strong>Higgsfield</strong> — Provided access to Wan2.5, Veo3.1, Seedance, Kling, 
              and several other models, plus Higgsfield's own proprietary model
            </li>
            <li>
              <strong>Official Sora website</strong> — Accessed via VPN (US-only availability)
            </li>
          </ul>
          <p>
            Each tool taught me something different, and most of them taught me what <em>doesn't</em> work. 
            In the end, I used both <strong>Veo3.1</strong> and <strong>Sora 2</strong> as they are, in my 
            opinion, the best models currently available.
          </p>
        </motion.article>

        <TearDivider variant="glitch" />

        {/* Tool Cards Section */}
        <section style={{ marginTop: '2rem' }} aria-label="AI tool reviews">
          <div id="sora2">
            <ToolLessonCard
              title="Sora 2: Inconsistent Generation and Evolving Content Policies"
              videoUrl="https://raw.githubusercontent.com/itsray01/ray-devlog-site/main/public/videos/sora2-example.mp4"
              videoType="mp4"
              delay={0.5}
            >
            <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
              <strong>Testing Period:</strong> Week 1 (Early October 2025)
            </p>

            <p>
              <strong>Summary:</strong> Sora 2 delivered impressive cinematic quality, but inconsistent face 
              generation and evolving content policies created significant challenges for character-driven scenes.
            </p>

            <p>
              <strong>Access Method:</strong> I accessed Sora 2 through the official website using a VPN 
              (US only). The marketing showed incredible cinematic quality, and the technical output lived 
              up to the hype—when it worked.
            </p>

            <p>
              <strong>The Problem:</strong> Sora 2's face generation proved inconsistent in ways I didn't 
              expect. Character continuity was a constant challenge, making it difficult to maintain visual 
              consistency across dialogue-heavy scenes.
            </p>

            <p>
              <strong>Where it shines:</strong> Spacious establishing shots, abstract or surreal montages, 
              object-centric animations, nature plates, and any non-human subject matter. These can look gorgeous.
            </p>

            <p>
              <strong>Key Lesson:</strong> Even the best models have significant limitations. Sora 2's 
              inconsistency and evolving policies taught me to build a flexible, multi-tool hybrid workflow 
              rather than relying on a single platform.
            </p>
            </ToolLessonCard>
          </div>

          <div id="veo31">
            <ToolLessonCard
              title="Veo3.1: Reliable Character Generation with Technical Limitations"
              videoUrl="https://raw.githubusercontent.com/itsray01/ray-devlog-site/main/public/videos/veo31-example.mp4"
              videoType="mp4"
              delay={0.6}
            >
            <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
              <strong>Testing Period:</strong> Week 4-5 (Early-Mid November 2025)
            </p>

            <p>
              <strong>Summary:</strong> Veo3.1 became one of my primary tools alongside Sora 2, delivering 
              reliable character-focused scenes with better consistency than most alternatives.
            </p>

            <p>
              <strong>Why It Worked:</strong> Unlike Sora 2, Veo3.1's character rendering stayed mostly 
              consistent across multiple generations. This made it invaluable for dialogue scenes and 
              character-focused shots where maintaining visual continuity was critical.
            </p>

            <p>
              <strong>Strengths:</strong> Faces stayed mostly consistent, motion felt natural, detailed 
              lighting directions rendered accurately, no hard bans on human subjects.
            </p>

            <p>
              <strong>Limitations:</strong> Lower overall visual fidelity compared to Sora 2's best outputs. 
              Some stylistic limitations and occasional texture artifacts that required post-processing fixes.
            </p>

            <p>
              <strong>What I Learned:</strong> Systematic prompt refinement became essential. I developed a 
              template system for describing lighting, mood, and character positioning that produced more 
              consistent results across multiple shots.
            </p>
            </ToolLessonCard>
          </div>

          <div id="wan25">
            <ToolLessonCard
              title="Wan2.5: Speed Over Quality"
              videoUrl="https://raw.githubusercontent.com/itsray01/ray-devlog-site/main/public/videos/wan25-example.mp4"
              videoType="mp4"
              delay={0.7}
            >
            <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
              <strong>Testing Period:</strong> Week 2 (Mid October 2025)
            </p>

            <p>
              <strong>Summary:</strong> Wan2.5 offered fast generation times but struggled with maintaining 
              visual coherence and detail quality needed for cinematic footage.
            </p>

            <p>
              <strong>Challenges:</strong> While Wan2.5 generated videos quickly, the output often lacked the 
              cinematic polish required for the project. Motion was sometimes jittery, and fine details would 
              blur or morph unexpectedly. The model seemed optimized for speed rather than quality.
            </p>

            <p>
              <strong>Use Case:</strong> Best suited for quick concept tests and rough previsualization rather 
              than final footage. I used Wan2.5 primarily for testing framing and composition ideas before 
              committing credits to higher-quality models.
            </p>

            <p>
              <strong>Key Lesson:</strong> Fast generation isn't always better. Sometimes you need to wait 
              longer for quality that actually works for your project. Speed doesn't compensate for unusable 
              output.
            </p>
            </ToolLessonCard>
          </div>

          <div id="higgsfield">
            <ToolLessonCard
              title="Higgsfield: Platform Access with Mixed Results"
              videoUrl="https://raw.githubusercontent.com/itsray01/ray-devlog-site/main/public/videos/higgsfield-example.mp4"
              videoType="mp4"
              delay={0.8}
            >
            <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
              <strong>Testing Period:</strong> Week 3 (Late October 2025)
            </p>

            <p>
              <strong>Summary:</strong> Higgsfield served as a valuable platform for accessing multiple models, but its own proprietary model delivered inconsistent results for narrative content.
            </p>

            <p>
              <strong>Platform Benefits:</strong> The real value of Higgsfield was its unified interface for accessing Wan2.5, Veo3.1, Seedance, and Kling. This made it easy to compare outputs from different models side-by-side.
            </p>

            <p>
              <strong>Model Performance:</strong> Higgsfield's own model showed promise for certain abstract or artistic shots, but struggled with consistent character rendering and maintaining scene continuity—both critical for my dystopian narrative.
            </p>

            <p>
              <strong>Key Lesson:</strong> A good platform with multiple model options is invaluable for experimentation, even if the platform's proprietary model doesn't meet your needs.
            </p>
            </ToolLessonCard>
          </div>

          <div id="seedance">
            <ToolLessonCard
              title="Seedance: Creative Style, Limited Control"
              videoUrl="https://raw.githubusercontent.com/itsray01/ray-devlog-site/main/public/videos/seedance-example.mp4"
              videoType="mp4"
              delay={0.9}
            >
            <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
              <strong>Testing Period:</strong> Week 3 (Late October 2025)
            </p>

            <p>
              <strong>Summary:</strong> Seedance excelled at generating stylized, artistic content but lacked the precise control needed for consistent narrative cinematography.
            </p>

            <p>
              <strong>Strengths:</strong> The model produced visually interesting results with unique stylistic flair. Great for mood pieces, experimental sequences, or artistic transitions.
            </p>

            <p>
              <strong>Limitations:</strong> Struggled with photorealism and consistency across shots. The artistic interpretation often overrode prompt specificity, making it difficult to achieve the grounded, realistic dystopian aesthetic I needed.
            </p>

            <p>
              <strong>Potential Use:</strong> Could work well for dream sequences, memory fragments, or abstract interludes where stylization enhances rather than detracts from the narrative.
            </p>

            <p>
              <strong>Key Lesson:</strong> Know when artistic interpretation helps vs. when you need literal prompt adherence. Not every tool fits every use case.
            </p>
            </ToolLessonCard>
          </div>
        </section>

        <TearDivider variant="default" />

        {/* Reflection Section */}
        <motion.article
          id="reflections"
          className="card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ marginTop: '3rem' }}
          aria-labelledby="reflections-heading"
        >
          <h2 id="reflections-heading">Overall Reflections (as of November 2025)</h2>
          <p>
            Testing five different AI video generation models taught me that there's no single perfect tool. 
            Each model has strengths and weaknesses, and understanding these trade-offs became crucial for 
            effective production.
          </p>
          
          <h3>What Actually Worked</h3>
          <ul className="bullets">
            <li><strong>Hybrid Workflow:</strong> Combining Veo3.1 for character shots and Sora 2 for 
            establishing shots gave me the best results</li>
            <li><strong>Rapid Prototyping:</strong> Using Wan2.5 for quick concept testing saved both time 
            and credits before committing to final generation</li>
            <li><strong>Platform Flexibility:</strong> Higgsfield's multi-model access enabled side-by-side 
            comparisons without switching platforms</li>
            <li><strong>Knowing Limitations:</strong> Understanding what each tool can't do prevented wasted 
            effort and unrealistic expectations</li>
          </ul>

          <h3>Current Status & Next Steps</h3>
          <p>
            As of November 21, 2025, the project continues to evolve. The hybrid workflow combining Veo3.1 
            and Sora 2 remains the foundation of my production pipeline. Each generation teaches something 
            new about prompt engineering and how these models interpret creative direction.
          </p>
        </motion.article>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <p>
            This journey represents ongoing experimentation and learning as of November 2025. 
            The lessons documented here continue to shape every creative decision in the project.
          </p>
        </motion.footer>
      </motion.div>
    </>
  );
};

export default MyJourney;

