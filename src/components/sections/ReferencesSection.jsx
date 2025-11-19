import { motion } from 'framer-motion';

/**
 * References & Theoretical Foundations section
 * TODO: This section could be split into subsections (Theory, Film/Media, Games, AI Research)
 */
const ReferencesSection = () => {
  return (
    <motion.section
      id="references"
      className="content-section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="card">
        <h2>References & Theoretical Foundations</h2>
        <p>
          This project draws from multiple sources across film, literature, games, and academic
          research. This section documents key references and their connections to project decisions,
          demonstrating how theoretical frameworks informed practical development choices.
        </p>
      </div>

      <div className="card">
        <h3>Interactive Storytelling Theory</h3>

        <h4>Janet Murray - "Hamlet on the Holodeck"</h4>
        <p>
          Murray's concepts of agency, immersion, and transformation directly informed the narrative
          structure. The decision to use strategic convergence points reflects Murray's discussion
          of managing complexity in interactive narratives while maintaining player agency.
        </p>

        <h4>Espen Aarseth - "Cybertext"</h4>
        <p>
          Aarseth's work on ergodic literature informed the design of the maze structure and looping
          mechanics. The cognitive scrambler effect connects to Aarseth's discussion of how interactive
          texts can resist easy navigation.
        </p>
      </div>

      <div className="card">
        <h3>Film & Media References</h3>

        <h4>Blade Runner (1982) - Dir. Ridley Scott</h4>
        <p>
          <strong>Visual Influence:</strong> The neon-noir aesthetic, industrial decay, and
          rain-soaked reflections directly informed the moodboard and visual language.
        </p>

        <h4>Black Mirror: Bandersnatch (2018) - Netflix</h4>
        <p>
          <strong>Narrative Structure:</strong> The branching narrative format and meta-commentary
          on choice and control directly informed the project's interactive structure.
        </p>
      </div>

      <div className="card">
        <h3>Connection to Course Objectives</h3>
        <p>
          These references connect to course objectives in several ways:
        </p>
        <ul className="bullets">
          <li><strong>Theoretical Application:</strong> Applied concepts from interactive
          storytelling theory to practical design decisions</li>

          <li><strong>Interdisciplinary Research:</strong> Drew from multiple fields to inform
          a cohesive creative project</li>

          <li><strong>Critical Analysis:</strong> Evaluated reference works as case studies in
          interactive narrative design and AI ethics</li>

          <li><strong>Contemporary Relevance:</strong> Engaged with current debates in AI ethics
          and emerging practices in AI-assisted production</li>
        </ul>
      </div>
    </motion.section>
  );
};

export default ReferencesSection;
