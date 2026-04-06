import { lazy, Suspense, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ToolLessonCard from '../components/ToolLessonCard';
import ReadingProgress from '../components/ReadingProgress';
import { useNavigationActions } from '../context/NavigationContext';
import JourneyFilters from '../components/journey/JourneyFilters';
import JourneyLogCard from '../components/journey/JourneyLogCard';
import journeyLogs from '../content/journeyLogs';

const StatisticsDashboard = lazy(() => import('../components/StatisticsDashboard'));
const ToolMatrix = lazy(() => import('../components/journey/ToolMatrix'));
const CostCharts = lazy(() => import('../components/journey/CostCharts'));

const CROSS_MODEL_TEST_PROMPT = `Cinematic dystopian horror scene in a vast AI-controlled data centre at night. Maya, a young woman from the slums in worn industrial work clothes, stands in a dim corridor with steel walls, exposed cables, vents, blinking control panels, and a damp reflective floor. A sudden unnatural scream comes from behind a large sealed metal door at the end of the corridor. Maya freezes, breathing hard, then slowly approaches with visible fear, her hand trembling as she reaches toward the control panel. The scream stops, leaving only deep industrial drones, distant machinery, and a low mechanical rumble. Flickering red emergency lights mix with cold blue monitor glow. Camera begins in a medium rear shot, slowly pushes in as Maya approaches, then cuts to a close-up of her frightened face and a low-angle shot of the sealed door vibrating slightly. Realistic human motion, subtle facial fear, restrained acting, sharp detail, oppressive atmosphere, photoreal, high contrast, no gore, no monster shown, horror through implication, 5 to 8 seconds, 16:9.`;

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
  { id: 'higgsfield-dop', title: 'Higgsfield DoP' },
  { id: 'veo31', title: 'Veo 3.1' },
  { id: 'kling26', title: 'Kling 2.6' },
  { id: 'seedance20', title: 'Seedance 2.0' },
  { id: 'kling30', title: 'Kling 3.0 Omni' },
  { id: 'reflections', title: 'Reflections' },
  { id: 'experiment-log', title: 'Experiment Log' },
  { id: 'tool-matrix', title: 'Tool Comparison Matrix' },
  { id: 'cost-chart', title: 'Cost Chart' },
  { id: 'development-diary', title: 'Development diary' }
];

const Process = () => {
  const { setSections } = useNavigationActions();

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
              <strong>Model set used in this project:</strong> Kling 3.0 Omni, Higgsfield DoP, Veo 3.1,
              Kling 2.6, and Seedance 2.0
            </li>
            <li>
              <strong>Controlled testing setup:</strong> same generated reference image, same base prompt,
              and mandatory Start Frame or End Frame + Elements across all model tests
            </li>
          </ul>
          <p>
            Each model taught me something different, and most of the progress came from strict comparability.
            By keeping prompt and image constraints identical, I could measure meaningful differences in
            character stability, motion quality, and regeneration cost instead of guessing.
          </p>
        </article>

        <section style={{ marginTop: '2rem' }} aria-label="AI tool reviews">
          <div id="higgsfield-dop">
            <ToolLessonCard
              title="Higgsfield DoP: Structured Camera Control"
              videoUrl="https://github.com/itsray01/digitalproject/releases/download/Artefact_Edit/HiggsfieldDoP.mp4"
              videoType="mp4"
              delay={0.5}
              promptText={CROSS_MODEL_TEST_PROMPT}
            >
            <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
              <strong>Testing Period:</strong> October–November 2025
            </p>

            <p>
              <strong>Summary:</strong> Higgsfield DoP was useful when I needed controlled camera behavior and
              cleaner motion direction from a consistent setup.
            </p>

            <p>
              <strong>Result with same prompt/image:</strong> It followed movement intent reliably, but character
              micro-consistency across many branches was mixed compared with the strongest outputs later on.
            </p>

            <p>
              <strong>Key Lesson:</strong> Strong camera grammar helps, but character continuity still depends on
              rigid image anchoring and repeatable prompt structure.
            </p>
            </ToolLessonCard>
          </div>

          <div id="veo31">
            <ToolLessonCard
              title="Veo 3.1: Stable Character Baseline"
              videoUrl="https://github.com/itsray01/digitalproject/releases/download/Artefact_Edit/Veo3.1.mp4"
              videoType="mp4"
              delay={0.6}
              promptText={CROSS_MODEL_TEST_PROMPT}
            >
            <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
              <strong>Testing Period:</strong> November 2025
            </p>

            <p>
              <strong>Summary:</strong> Veo 3.1 became an early reliability benchmark for character scenes under
              the same controlled prompt and image conditions.
            </p>

            <p>
              <strong>Result with same prompt/image:</strong> It delivered consistent faces and readable action
              beats, with occasional texture softness that needed post fixes.
            </p>

            <p>
              <strong>Key Lesson:</strong> Consistency under repeated constraints matters more than single-shot wow factor.
            </p>
            </ToolLessonCard>
          </div>

          <div id="kling26">
            <ToolLessonCard
              title="Kling 2.6: Transitional Upgrade"
              videoUrl="https://github.com/itsray01/digitalproject/releases/download/Artefact_Edit/Kling2.6.mp4"
              videoType="mp4"
              delay={0.7}
              promptText={CROSS_MODEL_TEST_PROMPT}
            >
            <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
              <strong>Testing Period:</strong> Late 2025
            </p>

            <p>
              <strong>Summary:</strong> Kling 2.6 improved coherence over earlier tests and acted as a bridge
              before moving fully to Kling 3.0 Omni.
            </p>

            <p>
              <strong>Result with same prompt/image:</strong> Better temporal continuity than many alternatives,
              but still some drift over longer sequences and branch-heavy reruns.
            </p>

            <p>
              <strong>Key Lesson:</strong> Incremental model upgrades can meaningfully reduce reroll cost even before final consolidation.
            </p>
            </ToolLessonCard>
          </div>

          <div id="seedance20">
            <ToolLessonCard
              title="Seedance 2.0: Style Strength, Control Trade-offs"
              videoUrl="https://github.com/itsray01/digitalproject/releases/download/Artefact_Edit/Seedance2.5.mp4"
              videoType="mp4"
              delay={0.8}
              promptText={CROSS_MODEL_TEST_PROMPT}
            >
            <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
              <strong>Testing Period:</strong> October–November 2025
            </p>

            <p>
              <strong>Summary:</strong> Seedance 2.0 produced compelling visual style but was less dependable for
              strict narrative continuity.
            </p>

            <p>
              <strong>Result with same prompt/image:</strong> It generated expressive frames, but prompt fidelity
              varied and sometimes over-stylized moments that needed grounded realism.
            </p>

            <p>
              <strong>Key Lesson:</strong> Distinct style is valuable, but controllability decides whether clips survive final edit.
            </p>
            </ToolLessonCard>
          </div>

          <div id="kling30">
            <ToolLessonCard
              title="Kling 3.0 Omni: Final Model (Best Result)"
              videoUrl="https://github.com/itsray01/digitalproject/releases/download/Artefact_Edit/Kling3.0._Omni.mp4"
              videoType="mp4"
              delay={0.9}
              promptText={CROSS_MODEL_TEST_PROMPT}
            >
            <p style={{fontStyle: 'italic', color: '#888', marginBottom: '10px'}}>
              <strong>Testing Period:</strong> January–March 2026
            </p>

            <p>
              <strong>Summary:</strong> Kling 3.0 Omni gave the strongest overall output and is kept last here as
              the final benchmark after all prior comparisons.
            </p>

            <p>
              <strong>Result with same prompt/image:</strong> Most reliable identity lock, motion coherence, and
              usable-clip rate across branching sequences.
            </p>

            <p>
              <strong>Key Lesson:</strong> Using identical constraints across models made the quality gap visible,
              so choosing Kling 3.0 Omni became an evidence-based decision.
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
            <li><strong>Evidence-led Consolidation:</strong> Kling 3.0 Omni became the final baseline after
            controlled prompt comparisons against other models</li>
            <li><strong>Constraint Discipline:</strong> Mandatory Start/End Frame plus Elements made outputs
            comparable and reduced identity drift</li>
            <li><strong>Cross-model Testing:</strong> Running the same prompt across tools made quality differences
            measurable instead of anecdotal</li>
            <li><strong>Knowing Limitations:</strong> Understanding what each tool can't do prevented wasted
            effort and unrealistic expectations</li>
          </ul>

          <h3>Current Status & Next Steps</h3>
          <p>
            Higgsfield DoP, Veo 3.1, Kling 2.6, and Seedance 2.0 formed the comparison baseline,
            before Kling 3.0 Omni became the dominant production model. Each generation taught something
            new about prompt engineering and how these systems interpret creative direction under constraints.
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

        {/* Development diary — full entries live on /diary */}
        <section
          id="development-diary"
          className="card journey-section"
          style={{ marginTop: '3rem' }}
          aria-labelledby="development-diary-heading"
        >
          <h2 id="development-diary-heading">Development diary</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            The module requires an online diary (5–8 entries, opening entry with project aims and academic context,
            total length not significantly above 3,000 words). The full diary is kept on a dedicated page so it stays
            in one place and does not duplicate this Process page.
          </p>
          <p style={{ marginBottom: '1.25rem' }}>
            <Link to="/diary" style={{ fontWeight: 600, color: 'var(--accent, #a855f7)' }}>
              Open the development diary
            </Link>
            {' '}
            — seven dated entries covering the pipeline, model comparison, furnace scene, Twine plus GitHub media hosting
            (one combined entry), mobile prototyping, and closing reflections (including supervisory feedback where relevant).
          </p>
          <figure style={{ marginTop: '1.5rem' }}>
            <img
              src="/img/mobile-prototype-protocol-of-control.png"
              alt="Two phone mockups showing the mobile prototype: main menu with New Game and Continue, and intro screen with a wireframe face scan and Click to Begin."
              loading="lazy"
              decoding="async"
              width={902}
              height={898}
            />
            <figcaption style={{ marginTop: '0.5rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
              Mobile UI built on Anything.com — discussed in the diary entry on mobile prototyping.
            </figcaption>
          </figure>
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
