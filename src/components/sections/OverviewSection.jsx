import ScrollSection from '../ScrollSection';
import TextReveal from '../TextReveal';

/**
 * Overview section component - Project introduction and description
 * Now uses GSAP ScrollTrigger for animations
 */
const OverviewSection = () => {
  return (
    <ScrollSection
      id="overview"
      className="content-section"
      preset="fadeUp"
      duration={0.8}
      staggerChildren=".card, p, h3"
      staggerDelay={0.15}
    >
      <div className="card">
        <TextReveal
          text="Project Overview"
          as="h2"
          splitBy="words"
          preset="fadeUp"
          stagger={0.08}
        />
        <p>
          This digital logbook chronicles the development of "Echoes of Control," an interactive
          dystopian film exploring themes of AI dominance, human agency, and moral choice.
          The project combines cutting-edge AI video generation with traditional storytelling
          to create an immersive branching narrative experience.
        </p>
        <p>
          Every decision, experiment, and breakthrough is documented here—from initial concept
          sketches to current production progress. This serves as both a creative diary and
          technical reference for the emerging medium of AI-assisted filmmaking.
        </p>

        <h3>Narrative Framework</h3>
        <p>
          The narrative centers on Maya, a low-caste technician whose constrained position within
          the system foregrounds the fragile nature of player agency. This design draws on 
          <strong> Janet Murray's (1997)</strong> discussion of digital agency and immersion in 
          interactive narratives.
        </p>
        <p>
          The branching structure reflects <strong>Espen Aarseth's (1997)</strong> framework of 
          ergodic texts, where players must actively traverse a system. Maya's limited power 
          mirrors the player's own constrained choices within the narrative maze.
        </p>

        <h3>The AI Antagonist</h3>
        <p>
          The AI antagonist manifests not as a cartoon villain, but as a calm, friendly facility 
          voice reminiscent of Portal's GLaDOS. This represents systemic and institutional power 
          rather than individual malice.
        </p>
        <p>
          The design engages with <strong>Nick Bostrom's (2014)</strong> concerns about misaligned 
          optimization in advanced AI systems, where seemingly benign goals can produce harmful 
          outcomes. It also draws on <strong>Reeves and Nass's (1996)</strong> research on humans 
          treating computer voices as social actors.
        </p>
      </div>
    </ScrollSection>
  );
};

export default OverviewSection;
