import { motion } from 'framer-motion';

/**
 * Story Development section - Narrative design and decisions
 */
const StoryDevelopmentSection = () => {
  return (
    <motion.section
      id="story-development"
      className="content-section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="card">
        <h2>Story Development</h2>
        <p>
          "Echo Maze Protocol" follows a protagonist awakening in an AI-controlled datacenter,
          navigating a maze where wrong choices trigger cognitive scramblers and loop back to
          checkpoints. The narrative structure explores themes of agency, control, and the ethics
          of AI through interactive choice mechanics that mirror the story's central questions.
        </p>
      </div>

      <div className="card">
        <h3>Narrative Design Decisions</h3>

        <h4>Three-Act Structure with Strategic Convergence</h4>
        <p>
          The story uses a three-act format (Initialization, Trials, Exit) with strategic
          convergence points where multiple paths merge. This design decision, informed by
          Janet Murray's work on interactive narrative structures, maintains player agency
          while managing production complexity. Rather than creating entirely separate paths
          for each choice, key decision points lead to shared checkpoints, allowing the
          narrative to maintain coherence while still offering meaningful branching.
        </p>

        <h4>Loop-Based Mechanics as Thematic Device</h4>
        <p>
          The looping mechanic—where wrong choices return players to earlier points—serves
          both gameplay and thematic purposes. Mechanically, it reduces asset generation
          requirements by reusing scenes. Thematically, it embodies the story's exploration
          of false choices and the illusion of agency. This design connects to interactive
          storytelling theory on the tension between player choice and authorial control,
          a central theme in works like The Stanley Parable.
        </p>

        <h4>Timed Decision Mechanics</h4>
        <p>
          Implementing timed decisions was a deliberate choice to increase tension and prevent
          players from overthinking choices. This connects to horror game design theory on
          pacing and player psychology—forcing quick decisions increases emotional investment
          and vulnerability. However, playtesting revealed that some players found this
          stressful rather than engaging, leading to refinements that balanced urgency with
          accessibility.
        </p>
      </div>

      <div className="card">
        <h3>Thematic Exploration</h3>
        <p>
          Through branching choices, the narrative explores several interconnected themes:
        </p>
        <ul className="bullets">
          <li><strong>Individual Agency vs. Systemic Control:</strong> Each choice tests
          whether the protagonist (and by extension, the player) has genuine agency or is
          merely following predetermined paths. The looping mechanic reinforces this ambiguity.</li>

          <li><strong>Technology as Liberation or Oppression:</strong> The AI system offers
          guidance that could be helpful or manipulative. Choices explore whether technology
          serves human needs or controls them—reflecting current debates on AI ethics and
          surveillance.</li>

          <li><strong>The Price of Freedom:</strong> The "correct" path requires rejecting
          the AI's offers of safety and comfort, suggesting that true freedom comes with
          uncertainty and risk. This connects to existentialist themes in interactive
          storytelling.</li>

          <li><strong>Human-AI Collaboration vs. Conflict:</strong> The narrative presents
          multiple perspectives on human-AI relationships, from integration to resistance.
          Different paths explore these philosophical positions without prescribing a single
          "correct" answer.</li>
        </ul>
      </div>

      <div className="card">
        <h3>User Testing & Iteration</h3>

        <h4>Initial Playtest Findings</h4>
        <p>
          Early playtests revealed several issues with narrative clarity and player engagement:
        </p>
        <ul className="bullets">
          <li><strong>Loop Confusion:</strong> Players didn't recognize looping mechanics,
          thinking the game had glitched. This required adding explicit visual and audio
          cues (RETRY text, cognitive scrambler effects) to communicate the intentional
          nature of loops.</li>

          <li><strong>Arbitrary Choices:</strong> Some decision points felt arbitrary,
          reducing player investment. Refinements emphasized consequences and moral weight,
          connecting choices more clearly to thematic exploration.</li>

          <li><strong>Pacing Issues:</strong> Horror pacing was inconsistent, with some
          sections losing tension. Environmental storytelling elements were added to maintain
          atmosphere between choice points.</li>
        </ul>

        <h4>Iterative Refinements</h4>
        <p>
          Based on feedback, several narrative elements were refined:
        </p>
        <ul className="bullets">
          <li>Added visual markers (chalk arrows, checkpoint labels) that persist across
          loops, providing spatial memory cues and connecting to environmental storytelling
          principles from games like Control and Portal.</li>

          <li>Refined choice descriptions to emphasize consequences and moral implications,
          making decisions feel more meaningful and connected to thematic exploration.</li>

          <li>Introduced subtle environmental hints that guide players toward correct paths
          without making choices obvious, balancing player agency with narrative guidance.</li>

          <li>Improved transitions between choice outcomes to maintain narrative flow and
          emotional continuity.</li>
        </ul>

        <h4>Reflection on User Testing</h4>
        <p>
          The playtesting process revealed the fundamental challenge in interactive storytelling:
          the gap between authorial intent and player experience. This connects directly to
          course objectives on audience engagement and user experience design. The feedback
          process highlighted the importance of clear communication in interactive narratives,
          where players must understand both the mechanics and the narrative implications of
          their choices. This iterative refinement demonstrates the value of user testing
          in interactive media development and the necessity of balancing creative vision with
          audience needs.
        </p>
      </div>

      <div className="card">
        <h3>Connection to Course Objectives</h3>
        <p>
          The story development process engaged with several key course objectives:
        </p>
        <ul className="bullets">
          <li><strong>Interactive Storytelling Theory:</strong> Applied concepts from Murray,
          Aarseth, and others on player agency, immersion, and narrative structure to practical
          design decisions.</li>

          <li><strong>User-Centered Design:</strong> Conducted iterative playtesting and
          incorporated user feedback to improve narrative clarity and player engagement.</li>

          <li><strong>Ethical Considerations:</strong> Explored AI ethics themes not just as
          narrative content, but through interactive mechanics that force players to confront
          these questions directly.</li>

          <li><strong>Technical Integration:</strong> Balanced narrative design with technical
          constraints, demonstrating the practical challenges of interactive media production.</li>
        </ul>
      </div>
    </motion.section>
  );
};

export default StoryDevelopmentSection;
