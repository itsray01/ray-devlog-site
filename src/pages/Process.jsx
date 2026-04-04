import { lazy, Suspense, useEffect, useState, useMemo } from 'react';
import ToolLessonCard from '../components/ToolLessonCard';
import ReadingProgress from '../components/ReadingProgress';
import { useNavigation } from '../context/NavigationContext';
import JourneyFilters from '../components/journey/JourneyFilters';
import JourneyLogCard from '../components/journey/JourneyLogCard';
import journeyLogs from '../content/journeyLogs';

const StatisticsDashboard = lazy(() => import('../components/StatisticsDashboard'));
const ToolMatrix = lazy(() => import('../components/journey/ToolMatrix'));
const CostCharts = lazy(() => import('../components/journey/CostCharts'));

const InlineLoader = ({ label }) => (
  <div style={{ padding: '1.25rem 0', color: 'var(--muted)' }} role="status" aria-label={label}>
    Loading…
  </div>
);

export const PROCESS_SECTIONS = [
  { id: 'statistics', title: 'Statistics' },
  { id: 'introduction', title: 'Introduction' },
  { id: 'practice-as-research', title: 'Practice as Research' },
  { id: 'tool-graveyard', title: 'Tools Tested' },
  { id: 'sora2', title: 'Sora 2' },
  { id: 'veo31', title: 'Veo 3.1' },
  { id: 'wan25', title: 'Wan 2.5' },
  { id: 'higgsfield', title: 'Higgsfield' },
  { id: 'seedance', title: 'Seedance' },
  { id: 'reflections', title: 'Reflections' },
  { id: 'experiment-log', title: 'Experiment Log' },
  { id: 'tool-matrix', title: 'Tool Comparison Matrix' },
  { id: 'cost-chart', title: 'Cost Chart' },
  { id: 'dev-notes', title: 'Development Notes' }
];

const Process = () => {
  const { setSections } = useNavigation();

  const [selectedTools, setSelectedTools] = useState([]);
  const [selectedFailures, setSelectedFailures] = useState([]);
  const [minScore, setMinScore] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const availableTools = useMemo(() => {
    return [...new Set(journeyLogs.map(log => log.tool))];
  }, []);

  const availableFailures = useMemo(() => {
    const failures = journeyLogs.flatMap(log => log.failures || []);
    return [...new Set(failures)].sort();
  }, []);

  const filteredLogs = useMemo(() => {
    return journeyLogs.filter(log => {
      if (selectedTools.length > 0 && !selectedTools.includes(log.tool)) {
        return false;
      }
      if (selectedFailures.length > 0) {
        const hasSelectedFailure = selectedFailures.some(failure =>
          (log.failures || []).includes(failure)
        );
        if (!hasSelectedFailure) return false;
      }
      if (log.resultScore < minScore) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesGoal = log.goal.toLowerCase().includes(query);
        const matchesFix = log.fix.toLowerCase().includes(query);
        if (!matchesGoal && !matchesFix) return false;
      }
      return true;
    });
  }, [selectedTools, selectedFailures, minScore, searchQuery]);

  useEffect(() => {
    setSections(PROCESS_SECTIONS);
    return () => setSections([]);
  }, [setSections]);

  return (
    <>
      <ReadingProgress />

      <div
        className="page-container"
        id="process"
        role="main"
        aria-label="Main content"
      >
        <div id="main-content"></div>

        <header className="page-header">
          <h1>Process</h1>
          <p className="page-subtitle">
            The full making story — tools, failures, and hard-won lessons from AI video generation
          </p>
          <p>
            <strong>Main point:</strong> the final quality came less from picking one "best" model and more from
            building a repeatable workflow: testing, documenting failures, and changing methods when evidence
            showed a better path.
          </p>
        </header>

        <div id="statistics">
          <Suspense fallback={<InlineLoader label="Loading statistics" />}>
            <StatisticsDashboard />
          </Suspense>
        </div>

        <article id="introduction" className="card">
          <h2>How This Project Was Made</h2>
          <p>
            This was not a smooth pipeline. I tested multiple AI video models, spent credits on failed generations,
            and repeatedly hit consistency problems in faces, motion, and scene continuity.
          </p>
          <p>
            This page is the core devlog: a record of what I tried, what failed, what changed, and why.
            The aim is not to present a perfect build story, but to show how practical testing produced
            decisions that directly shaped the final artefact.
          </p>
        </article>

        <article
          id="practice-as-research"
          className="card note par-note"
          aria-labelledby="par-heading"
        >
          <h3 id="par-heading">Practice as Research: Learning Through Making</h3>
          <p>
            This documentation follows a <strong>Practice as Research (PaR)</strong> methodology, where the
            act of creating with AI tools generates knowledge that couldn't be gained through theory alone.
            As <strong>Robin Nelson (2013)</strong> argues, creative practice produces "know-how" that emerges
            through doing, not just reading.
          </p>
          <p>
            Rather than just reading about AI video generation, I learned by:
          </p>
          <ul className="bullets">
            <li><strong>Iterative experimentation</strong> — Testing multiple models to understand their capabilities</li>
            <li><strong>Documenting failures</strong> — Recording what doesn't work is as valuable as successes</li>
            <li><strong>Reflective practice</strong> — Each generation informed the next, building tacit knowledge
            (<strong>Schön, 1983</strong>)</li>
            <li><strong>Systematic comparison</strong> — Side-by-side testing revealed patterns invisible in marketing</li>
          </ul>
          <p>
            The knowledge documented here emerged from hundreds of hours of hands-on practice — trial, error,
            refinement, and discovery. This is research through making. See the <a href="/research#research-framework">Research
            page</a> for detailed PaR methodology and additional scholarly context.
          </p>
        </article>

        <article
          id="tool-graveyard"
          className="card note"
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
        </article>

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

        <article
          id="reflections"
          className="card"
          style={{ marginTop: '3rem' }}
          aria-labelledby="reflections-heading"
        >
          <h2 id="reflections-heading">Overall Reflections</h2>
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
            The hybrid workflow combining Veo3.1 and Sora 2 formed the early foundation of the production 
            pipeline, before Kling 3.0 Omni became the dominant tool. Each generation taught something
            new about prompt engineering and how these models interpret creative direction.
          </p>
          <p>
            The key takeaway is clear: practical iteration was the method, not just a production necessity.
            By documenting failures and pivots, the project demonstrates that reflective workflow design
            determines outcome quality more reliably than model hype alone.
          </p>
        </article>

        <section
          id="experiment-log"
          className="card journey-section"
          style={{ marginTop: '3rem' }}
          aria-labelledby="experiment-log-heading"
        >
          <h2 id="experiment-log-heading">Experiment Log</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            A chronological record of every AI video generation experiment, including goals,
            failures, fixes, and outcomes. Use filters to explore specific tools or failure patterns.
          </p>

          <JourneyFilters
            selectedTools={selectedTools}
            onToolChange={setSelectedTools}
            selectedFailures={selectedFailures}
            onFailureChange={setSelectedFailures}
            minScore={minScore}
            onMinScoreChange={setMinScore}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            availableTools={availableTools}
            availableFailures={availableFailures}
          />

          <div className="journey-logs-grid">
            {filteredLogs.length > 0 ? (
              filteredLogs.map(log => (
                <JourneyLogCard key={log.id} log={log} />
              ))
            ) : (
              <p className="journey-logs-empty">
                No experiments match your filters. Try adjusting the filters above.
              </p>
            )}
          </div>
        </section>

        <section
          id="tool-matrix"
          className="card journey-section"
          style={{ marginTop: '3rem' }}
          aria-labelledby="tool-matrix-heading"
        >
          <h2 id="tool-matrix-heading">Tool Comparison Matrix</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Side-by-side comparison of all tested AI video generation tools across key criteria.
            Click each tool to expand detailed notes, pros, and cons based on real-world usage.
          </p>

          <Suspense fallback={<InlineLoader label="Loading tool comparison matrix" />}>
            <ToolMatrix />
          </Suspense>
        </section>

        <section
          id="cost-chart"
          className="card journey-section"
          style={{ marginTop: '3rem' }}
          aria-labelledby="cost-chart-heading"
        >
          <h2 id="cost-chart-heading">Cost Chart</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Visualize the resource investment behind this research — credits spent, time invested,
            and quality outcomes over time. This data reveals patterns in tool efficiency and learning curves.
          </p>

          <Suspense fallback={<InlineLoader label="Loading cost charts" />}>
            <CostCharts logs={journeyLogs} />
          </Suspense>
        </section>

        {/* Development Notes — merged from Journal */}
        <section
          id="dev-notes"
          className="card journey-section"
          style={{ marginTop: '3rem' }}
          aria-labelledby="dev-notes-heading"
        >
          <h2 id="dev-notes-heading">Development Notes</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Process reflections and detailed notes from key development phases — originally
            captured as journal entries during production.
          </p>

          <article className="dev-note-entry">
            <h3>Testing the AI video pipeline</h3>
            <p>
              Production meant treating generation as a pipeline, not a single button: reference stills, prompt drafts, platform credits, failed passes, and re-generation when characters or lighting drifted.
            </p>
            <p>
              Early runs exposed how fast each model was, how often faces broke, and where sound was missing or mismatched. That testing shaped which tools became "primary" and which stayed for experiments or B-roll only.
            </p>
            <p>
              The pipeline lesson is simple: the model is not the director — you are. The tools are inconsistent collaborators; the workflow is where consistency is manufactured.
            </p>
          </article>

          <article className="dev-note-entry">
            <h3>Comparing Sora, Veo, Kling, Seedance, and WAN</h3>
            <p>
              Side-by-side comparisons across models (including access via Higgsfield where applicable) mattered because marketing copy rarely matches your exact scene and prompt.
            </p>
            <p>
              Sora and Veo delivered strong moments but with different failure modes; WAN and Seedance were useful for speed or style tests; Kling 3.0 Omni later became the backbone for many finals once quality and integrated sound were clear wins.
            </p>
            <p>
              The criteria we cared about: character consistency, horror readability, iteration cost, and whether a clip could survive an edit in Twine without breaking immersion.
            </p>
          </article>

          <article className="dev-note-entry">
            <h3>Prompting the furnace reveal scene</h3>
            <p>
              The furnace scene needed staging: hiding, witness, slow realisation, and sound that felt industrial rather than musical. Prompting moved from "describe a room" to directing beats — who is in frame, what they hear, what the viewer should feel before the cut.
            </p>
            <p>
              Integrated sound in Kling reduced the gap between picture and atmosphere; prompts specified drones, rumble, and absence of score where a traditional horror cue might go.
            </p>
            <p>
              Iteration was normal: first passes that were too clean, then pushes toward grit, shadow, and longer holds.
            </p>
          </article>

          <article className="dev-note-entry">
            <h3>Building the Twine interface with ChatGPT + McKeown tutorials</h3>
            <p>
              Twine handled structure and branching; the default skin did not match the dystopian look we wanted. ChatGPT helped draft passages and iterate on SugarCube markup, while CSS pulled the UI toward a controlled, terminal-adjacent feel.
            </p>
            <p>
              Dr Conor McKeown's tutorials were the practical bridge: hosting video on GitHub and embedding stable URLs in Twine so the prototype could load real clips instead of placeholders.
            </p>
            <p>
              JSON-style structuring for passages, CSS, and HTML later made the interface easier to reason about and tweak without losing the narrative graph.
            </p>
          </article>

          <article className="dev-note-entry">
            <h3>Hosting videos with GitHub and publishing via GitHub Pages</h3>
            <p>
              Large video files do not belong inside the Twine HTML export. Releases on GitHub (or similar) with direct links to MP4 files kept the story file small and the media cacheable.
            </p>
            <p>
              This devlog site is deployed separately; the Twine artefact and the portfolio site are related but not the same deployment. The common thread is GitHub for assets and versioned links you can trust in a video element.
            </p>
            <p>
              If a link breaks, the passage still loads — so stable hosting is part of the narrative infrastructure, not an afterthought.
            </p>
          </article>

          <article className="dev-note-entry">
            <h3>Prototyping a mobile version on anything.com</h3>
            <p>
              Desktop Twine is not how most people first touch a link. A mobile prototype on Anything.com (MAX plan) let us test tap targets, load behaviour, and whether the horror pacing survived on a small screen.
            </p>
            <p>
              The experiment was worth the cost for confidence: branching video on mobile is fragile across browsers, and a dedicated prototype surfaced issues before submission.
            </p>
            <p>
              That pass sits alongside the main artefact as process evidence, not a replacement for the primary Twine build.
            </p>
          </article>

          <article className="dev-note-entry">
            <h3>What the process taught me about control, inconsistency, and compromise</h3>
            <p>
              Control: you can storyboard, prompt, and branch — but generative tools do not guarantee obedience. Every "choice" in the interface is also a negotiation with models that drift.
            </p>
            <p>
              Inconsistency: the same prompt can produce brilliance or garbage. The project's look is partly a record of fighting that variance with anchors, references, and re-rolls.
            </p>
            <p>
              Compromise: time, credits, and assessment deadlines mean the final piece is not "the best possible universe" but the best honest version of this pipeline at this moment.
            </p>
          </article>
        </section>

        <footer>
          <p>
            This page documents the full making journey — from early experimentation through to final 
            production. The lessons here continue to shape every creative decision in the project.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Process;
