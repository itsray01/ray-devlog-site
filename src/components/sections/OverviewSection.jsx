/**
 * Overview section component - Project introduction and description
 */
const OverviewSection = () => {
  return (
    <section id="overview" className="content-section">
      <div className="card" data-animate="reveal">
        <h2>Project Overview</h2>
        <p>
          This digital logbook chronicles the development of "Echoes of Control," an interactive
          dystopian film exploring themes of AI dominance, human agency, and moral choice.
          The project combines cutting-edge AI video generation with traditional storytelling
          to create an immersive branching narrative experience.
        </p>
        <p>
          Every decision, experiment, and breakthrough is documented here—from initial concept
          sketches to current production progress. This serves as both a creative diary and
          technical reference for the emerging medium of AI-assisted filmmaking, following a
          Practice as Research methodology where knowledge emerges through making.
        </p>

        <h3>Theoretical Framework</h3>
        <p>
          <strong>Narrative Agency:</strong> The protagonist Maya, a low-caste technician, occupies
          a constrained position within an AI-controlled system. This design draws on <strong>Janet
          Murray's (1997)</strong> discussion of agency as "the satisfying power to take meaningful
          action" in interactive narratives. Maya's limited power foregrounds the fragile nature of
          player agency—each choice tests whether genuine autonomy exists or if all paths are
          predetermined.
        </p>
        <p>
          <strong>Ergodic Navigation:</strong> The branching structure reflects <strong>Espen Aarseth's
          (1997)</strong> framework of ergodic texts, where readers must actively traverse a system
          through "nontrivial effort." Players navigate both a physical datacenter maze and a
          metaphorical choice-space, with wrong decisions looping back to checkpoints—embodying the
          story's exploration of control and free will.
        </p>
        <p>
          <strong>AI Ethics & Control:</strong> The AI antagonist manifests not as a cartoon villain,
          but as a calm, friendly facility voice (reminiscent of Portal's GLaDOS). This design engages
          with <strong>Nick Bostrom's (2014)</strong> concerns about misaligned optimization in advanced
          AI systems—seemingly benign goals producing harmful outcomes. It also draws on <strong>Reeves
          and Nass's (1996)</strong> research on humans treating computer voices as social actors,
          representing systemic power rather than individual malice.
        </p>
        <p className="note" style={{ fontSize: '0.9rem', marginTop: '1rem', color: 'var(--muted)' }}>
          <em>See the <a href="/research">Research page</a> for full citations and detailed exploration of
          these frameworks, including connections between theory and specific creative decisions.</em>
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>What This Devlog Demonstrates</h3>
        <p>
          The site you are reading is itself the argument. Each section — moodboard, storyboard,
          experiment log, tool comparisons, timeline pivots — documents a decision made in response
          to practical evidence rather than a predetermined plan. The central claim is this:
          quality in AI-assisted filmmaking is not a product of choosing the right tool; it is a
          product of building a workflow that can absorb failure, change methods when evidence
          demands it, and stay coherent across many iterations.
        </p>
        <p>
          The <a href="/process">Process page</a> contains the full experiment log and tool
          reflections. The <a href="/timeline">Evolution</a> maps the pivots. The{' '}
          <a href="/research">Research page</a> connects every major decision to academic
          frameworks. Together they make the case that this project is research through making —
          not just a film, but a documented investigation into what AI video production currently
          is and is not capable of.
        </p>
      </div>
    </section>
  );
};

export default OverviewSection;
