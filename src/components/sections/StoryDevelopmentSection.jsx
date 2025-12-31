/**
 * Story Development section - Narrative design and decisions
 */
const StoryDevelopmentSection = () => {
  return (
    <section id="story-development" className="content-section">
      <div className="card" data-animate="reveal">
        <h2>Story Development</h2>

        <h3>Core Concept</h3>
        <p>
          "Echo Maze Protocol" follows a protagonist awakening in an AI-controlled datacenter.
          They must navigate a physical and metaphorical maze where wrong choices trigger cognitive
          scramblers and loop back to checkpoints.
        </p>
        <p>
          The narrative structure explores themes of agency, control, and AI ethics through interactive
          choice mechanics. Each decision mirrors the story's central questions about autonomy and
          predetermined paths.
        </p>
      </div>

      <div className="card" data-animate="reveal">
        <h3>Narrative Design Decisions</h3>

        <h4>Three-Act Structure with Strategic Convergence</h4>
        <p>
          The story uses a three-act format (Initialization, Trials, Exit) with strategic
          convergence points where multiple paths merge. Informed by Janet Murray's work on
          interactive narrative structures, this maintains player agency while managing production
          complexity—key decision points lead to shared checkpoints rather than entirely separate paths.
        </p>

        <h4>Loop-Based Mechanics as Thematic Device</h4>
        <p>
          The looping mechanic serves dual purposes: mechanically reducing asset requirements through
          scene reuse, and thematically embodying the story's exploration of false choices and illusory
          agency. This connects to interactive storytelling theory on the tension between player choice
          and authorial control (see <em>The Stanley Parable</em>).
        </p>

        <h4>Timed Decision Mechanics</h4>
        <p>
          Timed decisions increase tension and emotional investment by preventing overthinking. Drawing
          from horror game design theory, this forces quick decisions that heighten vulnerability—though
          playtesting led to refinements balancing urgency with accessibility.
        </p>
      </div>

      <div className="card" data-animate="reveal">
        <h3>Thematic Exploration</h3>
        <p>
          Through branching choices, the narrative explores interconnected themes:
        </p>
        <ul className="bullets">
          <li><strong>Agency vs. Control:</strong> Do players have genuine autonomy or follow predetermined
          paths? The looping mechanic reinforces this ambiguity.</li>

          <li><strong>Technology as Tool or Tyrant:</strong> The AI's guidance could help or manipulate—
          choices explore whether technology serves or controls humanity.</li>

          <li><strong>The Price of Freedom:</strong> True freedom requires rejecting safety and comfort,
          embracing uncertainty and risk.</li>

          <li><strong>Collaboration vs. Conflict:</strong> Multiple perspectives on human-AI relationships
          without prescribing a single "correct" answer.</li>
        </ul>
      </div>

      <div className="card" data-animate="reveal">
        <h3>Design Iteration Through Playtesting</h3>
        <small className="meta">October-November 2025</small>

        <p>
          Early playtests revealed critical issues that shaped refinements:
        </p>

        <ul className="bullets">
          <li>
            <strong>Loop Recognition:</strong> Players mistook loops for glitches. Solution: explicit
            visual/audio cues (RETRY text, cognitive scrambler effects).
          </li>
          <li>
            <strong>Choice Meaning:</strong> Arbitrary-feeling decisions reduced investment. Solution:
            clearer consequences and moral implications in descriptions.
          </li>
          <li>
            <strong>Pacing & Atmosphere:</strong> Inconsistent horror tension. Solution: environmental
            storytelling elements and persistent visual markers (chalk arrows, checkpoint labels) that
            maintain atmosphere between choice points.
          </li>
        </ul>

        <p>
          <strong>Key Insight:</strong> The gap between authorial intent and player experience requires
          clear communication of both mechanics and narrative implications—harder than it seems, but
          essential for interactive storytelling.
        </p>
      </div>
    </section>
  );
};

export default StoryDevelopmentSection;
