import { motion } from 'framer-motion';
import ToolLessonCard from '../ToolLessonCard';

/**
 * Technical Experiments section - AI video generation tools and lessons
 * TODO: This section is large and should be further split into smaller components
 */
const ExperimentsSection = () => {
  return (
    <motion.section
      id="experiments"
      className="content-section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="card">
        <h2>My Journey Through AI Video Generation: Tools, Failures, and Hard-Won Lessons</h2>
        <p>
          Let me be honest: this wasn't a smooth ride. I spent weeks experimenting with different
          AI video generation tools, burning through credits, and hitting walls I didn't expect.
          Here's the real story—the failures, the frustrations, and what I actually learned from
          trying to make this work.
        </p>
      </div>

      <motion.article
        className="card note"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <h3>The Tool Graveyard: What I Actually Tried</h3>
        <p>
          I tested multiple AI video generation models through two main platforms: <strong>Higgsfield</strong>
          (which provided access to Wan2.5, Veo3.1, Seedance, Kling, and several other models I didn't use,
          plus Higgsfield's own model) and the <strong>official Sora website</strong> (accessed via VPN since
          it's only available in the US). Each one taught me something different, and most of them
          taught me what <em>doesn't</em> work. In the end, I used both <strong>Veo3.1</strong> and <strong>Sora 2</strong>
          as they are, in my opinion, the best models available.
        </p>
      </motion.article>

      {/* Tool cards - these could be extracted to separate components */}
      <ToolLessonCard
        title="Sora 2: Inconsistent Generation and Evolving Content Policies"
        videoUrl="/videos/sora2-example.mp4"
        videoType="mp4"
        delay={0.2}
      >
        <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
          <strong>Testing Period:</strong> Week 1 (Early October 2025)
        </p>

        <p>
          <strong>Summary:</strong> Sora 2 delivered impressive cinematic quality, but inconsistent face generation and evolving content policies created significant challenges for character-driven scenes.
        </p>

        <p>
          I accessed Sora 2 through the official website using a VPN (US only). The marketing showed incredible cinematic quality, and the technical output lived up to the hype—when it worked. However, Sora 2's face generation proved inconsistent in ways I didn't expect.
        </p>

        <p>
          <strong>Where it shines:</strong> Spacious establishing shots, abstract or surreal montages, object‑centric animations, nature plates, and any non-human subject can look gorgeous.
        </p>

        <p>
          <strong>Key Lesson:</strong> Even the best models have significant limitations. Sora 2's inconsistency and evolving policies taught me to build a flexible, multi-tool hybrid workflow.
        </p>
      </ToolLessonCard>

      <ToolLessonCard
        title="Veo3.1: Reliable Character Generation with Technical Limitations"
        videoUrl="/videos/veo31-example.mp4"
        videoType="mp4"
        delay={0.3}
      >
        <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
          <strong>Testing Period:</strong> Week 4-5 (Early-Mid November 2025)
        </p>

        <p>
          <strong>Summary:</strong> Veo3.1 became one of my primary tools alongside Sora 2, delivering reliable character-focused scenes with better consistency than most alternatives.
        </p>

        <p>
          <strong>Strengths:</strong> Faces stayed mostly consistent, motion felt natural, detailed lighting directions rendered accurately, no hard bans on human subjects.
        </p>

        <p>
          <strong>What I Learned:</strong> Veo3.1 became essential to my workflow. I learned to work within its limitations through systematic prompt refinement.
        </p>
      </ToolLessonCard>

      {/* Add more tool cards as needed - extracted from original Home.jsx */}
      {/* This section should be split into multiple sub-components for better organization */}
    </motion.section>
  );
};

export default ExperimentsSection;
