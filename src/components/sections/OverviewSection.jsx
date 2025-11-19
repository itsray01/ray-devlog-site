import { motion } from 'framer-motion';

/**
 * Overview section component - Project introduction and description
 */
const OverviewSection = () => {
  return (
    <motion.section
      id="overview"
      className="content-section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="card">
        <h2>Project Overview</h2>
        <p>
          This digital logbook chronicles the development of "Echoes of Control," an interactive
          dystopian film exploring themes of AI dominance, human agency, and moral choice.
          The project combines cutting-edge AI video generation with traditional storytelling
          to create an immersive branching narrative experience.
        </p>
        <p>
          Every decision, experiment, and breakthrough is documented here—from initial concept
          sketches to final production milestones. This serves as both a creative diary and
          technical reference for the emerging medium of AI-assisted filmmaking.
        </p>
        <p>
          The narrative centers on Maya, a low-caste technician whose constrained position within
          the system foregrounds the fragile nature of player agency—a concept explored by Janet
          Murray (1997) in her discussion of digital agency and immersion in interactive narratives.
          Drawing on Espen Aarseth's (1997) framework of ergodic texts, where players must actively
          traverse a system, Maya's limited power reflects the player's own constrained choices
          within the branching narrative. The AI antagonist manifests not as a cartoon villain,
          but as a calm, friendly facility voice reminiscent of Portal's GLaDOS, representing
          systemic and institutional power. This design draws on Byron Reeves and Clifford Nass's
          (1996) research on humans treating computer voices as social actors, while also engaging
          with Nick Bostrom's (2014) concerns about misaligned optimization in advanced AI systems,
          where seemingly benign goals can produce harmful outcomes.
        </p>
      </div>
    </motion.section>
  );
};

export default OverviewSection;
