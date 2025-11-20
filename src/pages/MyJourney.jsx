import { motion } from 'framer-motion';
import ToolLessonCard from '../components/ToolLessonCard';
import ReadingProgress from '../components/ReadingProgress';
import StatisticsDashboard from '../components/StatisticsDashboard';
import { pageVariants, pageTransition } from '../constants/animations';

/**
 * My Journey So Far - Dedicated page for AI video generation experiments
 * Comprehensive documentation of tools, failures, and lessons learned
 */
const MyJourney = () => {
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
        id="my-journey"
      >
        {/* Page Header */}
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1>My Journey So Far</h1>
          <p className="page-subtitle">
            Tools, Failures, and Hard-Won Lessons from AI Video Generation
          </p>
        </motion.div>

        {/* Statistics Dashboard */}
        <StatisticsDashboard />

        {/* Introduction */}
        <motion.div
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
        </motion.div>

        {/* The Tool Graveyard */}
        <motion.article
          className="card note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3>The Tool Graveyard: What I Actually Tried</h3>
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

        {/* Tool Cards Section */}
        <div style={{ marginTop: '2rem' }}>
          <ToolLessonCard
            title="Sora 2: Inconsistent Generation and Evolving Content Policies"
            videoUrl="/videos/sora2-example.mp4"
            videoType="mp4"
            delay={0.5}
          >
            <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
              <strong>Testing Period:</strong> Week 1 (Early October 2024)
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

          <ToolLessonCard
            title="Veo3.1: Reliable Character Generation with Technical Limitations"
            videoUrl="/videos/veo31-example.mp4"
            videoType="mp4"
            delay={0.6}
          >
            <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
              <strong>Testing Period:</strong> Week 4-5 (Early-Mid November 2024)
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

          <ToolLessonCard
            title="Wan2.5: Speed Over Quality"
            videoUrl="/videos/wan25-example.mp4"
            videoType="mp4"
            delay={0.7}
          >
            <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
              <strong>Testing Period:</strong> Week 2 (Mid October 2024)
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

          <ToolLessonCard
            title="Higgsfield: Platform Access with Mixed Results"
            videoUrl="/videos/higgsfield-example.mp4"
            videoType="mp4"
            delay={0.8}
          >
            <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
              <strong>Testing Period:</strong> Week 3 (Late October 2024)
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

          <ToolLessonCard
            title="Seedance: Creative Style, Limited Control"
            videoUrl="/videos/seedance-example.mp4"
            videoType="mp4"
            delay={0.9}
          >
            <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
              <strong>Testing Period:</strong> Week 3 (Late October 2024)
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

        {/* Reflection Section */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ marginTop: '3rem' }}
        >
          <h2>Overall Reflections (as of November 2024)</h2>
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
            As of November 21, 2024, the project continues to evolve. The hybrid workflow combining Veo3.1 
            and Sora 2 remains the foundation of my production pipeline. Each generation teaches something 
            new about prompt engineering and how these models interpret creative direction.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <p>
            This journey represents ongoing experimentation and learning as of November 2024. 
            The lessons documented here continue to shape every creative decision in the project.
          </p>
        </motion.footer>
      </motion.div>
    </>
  );
};

export default MyJourney;

