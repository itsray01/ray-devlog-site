/**
 * Development diary — module requirement: 5–8 entries, first entry = project + aims + academic context.
 * Single source for /diary and legacy JOURNAL_POSTS alias.
 */

export const DIARY_ENTRIES = [
  {
    id: 'project-overview',
    kind: 'opening',
    title: 'Project overview, aims, and academic context',
    paragraphs: [
      'Echoes of Control is an interactive branching horror film built in Twine and driven by AI-generated video. The viewer makes choices that split the story into divergent paths; some lead forward, others loop back through a cognitive-scrambler mechanic designed so that "wrong" decisions feel consequential rather than throwaway. The project sits at the intersection of surveillance fiction, institutional control, and generative AI \u2014 exploring what agency really means when the system shaping the maze is partly opaque, partly automated, and partly indifferent to what I intended.',
      'I set out with three aims. First, to produce a finished interactive artefact that reads as coherent horror rather than a technology demo \u2014 with pacing, sound design, and visual consistency that hold up across branching and repeated viewing. Second, to develop and document a comparative workflow across multiple AI video models, treating tool selection, failure modes, and regeneration costs as research data rather than private frustration. Third, to connect that practice to academic frameworks \u2014 Practice as Research (PaR), interactive narrative theory, and debates on AI ethics \u2014 so that making and reflection stay in genuine dialogue throughout.',
      'The academic grounding begins with the proposal\u2019s research question: how can interactive form stage anxieties about AI and control without reducing them to a lecture? PaR frames making as a way of knowing, which means my prompt logs, failed generations, and interface constraints count as evidence, not just mess to clean up. Janet Murray\u2019s writing on agency, Donald Sch\u00F6n\u2019s reflective practice, and Espen Aarseth\u2019s work on ergodic texts all served as lenses at different stages \u2014 when models drifted, when branching had to be justified as a reader contract, and when I needed to articulate why certain design choices mattered. The Research page develops these ideas properly; here they are signposts.',
      'Early on, after re-reading the assessment brief and an initial supervisor check-in, I had to name what made the approach distinctive: repetition \u2014 loops, echoing voices, choices that return. The original working title was \u201CProtocol of Control,\u201D but \u201CEchoes of Control\u201D better matched what the finished artefact actually did. \u201CEcho Maze Protocol\u201D survived as the in-world facility name, doing different narrative work inside the fiction.',
      'The entries that follow trace the production process without repeating the theoretical argument. See the Evolution page for milestones, Research for theory, and Process for detailed tool data.'
    ]
  },
  {
    id: 'ai-video-pipeline',
    kind: 'diary',
    title: 'Building the AI video pipeline',
    paragraphs: [
      'Generating video for this project was never a single-button process. It meant assembling a pipeline: writing prompt drafts, preparing reference stills, running generation passes, reviewing outputs, and regenerating when characters drifted or lighting broke. The gap between a usable clip and a rejected one was rarely about the model alone \u2014 it was about whether the workflow let me recover from a bad pass without starting from scratch.',
      'I began by experimenting across several models through Higgsfield, including Sora 2, Veo, WAN, and Seedance. Each had strengths in narrow contexts \u2014 Sora 2 handled atmospheric environment shots well, Veo was more reliable for character-centred scenes \u2014 but none could consistently deliver what I needed across the full range of story beats. Early failures taught me that the fix was rarely a longer character description; it was structural \u2014 constraining camera movement, locking pose descriptions, and simplifying motion complexity so the ask became something the model could actually answer.',
      'When Kling 3.0 Omni became available mid-project, the decision to switch was based on direct comparison: measurably tighter character consistency, integrated sound generation that removed an entire audio pass from the workflow, and a feature called \u201Celements\u201D that proved essential for visual continuity. Elements are reference assets \u2014 generated images or stills pulled from existing clips \u2014 that Kling uses to anchor recurring characters, objects, and environments across generations. I fed it images generated in Gemini alongside stills from my own clips, and the model could retain visual identity far more reliably than anything I had achieved with prompt text alone. I used ChatGPT and Gemini throughout for ideation, planning, and prompt refinement \u2014 they were useful thinking partners for structuring scenes and iterating on language, but the creative decisions about what to keep, what to discard, and what to regenerate were mine.',
      'Where raw generation quality fell short, I used Topaz Upscale to sharpen selected outputs. This was particularly important for clips that were dramatically right but visually soft \u2014 upscaling let me preserve a good performance rather than burning more credits chasing a technically cleaner but emotionally flat alternative.',
      'The earlier experiments with other models were not wasted. They gave me the comparative baseline I needed to justify narrowing to Kling with evidence rather than hype, and those comparison outputs remain documented in the Process page.'
    ]
  },
  {
    id: 'furnace-prompts',
    kind: 'diary',
    title: 'Iterating on the furnace reveal',
    paragraphs: [
      'The furnace scene was the hardest sequence to get right, and it ended up consuming the largest share of my regeneration budget. The scene needed specific staging: hiding, witnessing, slow realisation, and industrial ambience \u2014 not a music sting. My early prompts described the room accurately but produced results that were dramatically flat. Describing a space and directing a moment turned out to be very different things.',
      'Remedy\u2019s Control influenced how I rethought the approach. In that game, threat comes from the building itself \u2014 from architecture and system, not from a creature in frame. I wanted the furnace to feel like part of the institution, not a set-piece monster. So I shifted from spatial description to directing beats: who is in frame, what they hear, what the viewer should feel before the cut arrives.',
      'Kling\u2019s integrated sound generation was essential here. I could specify low drones and mechanical rumble while withholding any score, which aligned with a principle I kept returning to: restraint lets the viewer do more of the emotional work. The iterations taught me what AI-generated video could carry emotionally \u2014 dread needed grit, shadow, and longer holds, all learned through failed passes rather than theory alone.',
      'At one point I questioned whether the scene was too slow. But horror lives in the gap between understanding and looking away, and longer holds on Maya\u2019s face became a deliberate choice once the model could reliably deliver silence and machine noise together. That principle \u2014 earned through iteration on this one sequence \u2014 carried forward into later set pieces across the branching paths.'
    ]
  },
  {
    id: 'twine-and-media-hosting',
    kind: 'diary',
    title: 'Twine, interface design, and media hosting',
    paragraphs: [
      'Twine gave me the branching structure I needed, but its default appearance clashed with the dystopian tone the story demanded. Early playtest feedback was consistent: the interface was undermining the horror. I needed the UI itself to feel like part of the world \u2014 clinical, constrained, slightly hostile \u2014 rather than a neutral container that happened to hold dark content.',
      'Dr Conor McKeown\u2019s YouTube tutorials were the practical starting point for solving this. His walkthroughs on embedding video in Twine and creating custom buttons showed me how to treat Twine passages as HTML containers with full styling control. From there, I used ChatGPT and Gemini to help draft SugarCube markup, CSS, and JavaScript \u2014 they accelerated the technical work of building timed transitions, conditional links, and a HUD that tracked the viewer\u2019s loop position without breaking the fiction. I designed the interface and made the creative calls about what felt right; the AI tools helped me implement those decisions faster than I could have managed alone.',
      'Rather than bundling video files with the Twine export, I hosted clips separately on GitHub Releases and referenced them as stable URLs inside the passages. This kept the story file lightweight and separated story logic from media assets, which meant I could regenerate and swap individual clips without rebuilding the entire project \u2014 a small architectural decision that saved significant time later in production.',
      'Prototype feedback also pushed me to sharpen the distinction between interactive and non-interactive states, which I implemented. Some suggestions \u2014 like stripping out looping animations \u2014 I considered but set aside where the loop was meant to read as deliberate design rather than a glitch. Not every piece of feedback should be followed; some of it needed to be weighed against what the story was trying to do.'
    ]
  },
  {
    id: 'supervision-and-feedback',
    kind: 'diary',
    title: 'Supervision, feedback, and revision',
    paragraphs: [
      'My supervisor for this project was Dr Eveliina Kuitunen. We had a single video call on 5th February 2026, where we discussed the project\u2019s direction, the essay structure, and how the artefact and written components should relate to each other. That conversation helped me clarify priorities I had been circling around \u2014 particularly around how much weight the essay should give to tool comparison versus the broader argument about iterative practice.',
      'After that call, our communication continued through written feedback on essay drafts. Dr Kuitunen\u2019s comments were detailed and proved crucial to both the essay and the final artefact. She pushed me to tighten the connection between my practical decisions and the academic frameworks I was drawing on, and to be more precise about what counted as evidence within a Practice as Research methodology. I reworked sections of the essay and adjusted parts of the interactive film in response \u2014 regenerating specific clips through Kling 3.0 Omni in Higgsfield where her feedback highlighted gaps between what I claimed the artefact did and what it actually delivered.',
      'I was also in contact with Dr Conor McKeown to ask questions about the overall assignment requirements and submission expectations. His guidance helped me understand the boundaries of the brief and make sure my devlog, essay, and artefact were aligned with what was actually being assessed.',
      'The revision process was not a single pass. Each round of feedback from Dr Kuitunen prompted changes that rippled across both the written work and the artefact itself. Tightening an argument in the essay sometimes meant I needed a better clip to support it; improving a scene in the artefact sometimes revealed a gap in the essay\u2019s reasoning. This back-and-forth between making and writing is exactly what Practice as Research describes, though living through it felt less elegant than the theory suggests.'
    ]
  },
  {
    id: 'process-lessons',
    kind: 'diary',
    title: 'What the process taught me',
    paragraphs: [
      'The clearest lesson from this project is that generative tools do not obey \u2014 they negotiate. Prompting often felt less like commanding a camera and more like steering a collaborator who had its own idea of what the shot should look like. The prompt log is where that negotiation left its traces, and the Research page names the theorists who give that dynamic an academic frame. But the lived experience was simpler: I learned to work with what the tools could do rather than fighting for what they could not.',
      'Inconsistency is the default state of AI-generated video, not the exception. The visual identity of the finished piece is partly a record of fighting that variance \u2014 with reference images, prompt anchoring, upscaling, and selective re-rolls. Deadlines and credit limits meant the final artefact is the best honest version this pipeline could produce at this point in time. I am comfortable with that. The instability extends beyond individual outputs: in March 2026, OpenAI announced that the Sora web and app experiences would be discontinued on 26 April 2026, with the Sora API following on 24 September 2026 (OpenAI, 2026). A tool I had used for early experimentation was being withdrawn entirely. It reinforced something the project already argued \u2014 that building a workflow around generative AI means accepting that the ground can shift under you, and that documenting the tools as they existed at the time of use is itself a form of evidence.',
      'The feedback that shaped the project most came from Dr Kuitunen\u2019s detailed responses to my essay drafts, which forced me to close the gap between what I was arguing and what the artefact actually showed. Peer feedback on horror pacing drove a refinement pass on scene timing. I kept a stylised, deliberately constrained interface even where more conventional UI advice would have softened it, because the interface\u2019s hostility was part of the story\u2019s argument about systems and control. Those suggestions were heard, considered, and set aside for cause.',
      'If I were starting again, I would still budget time for generations that seemed wasteful at the moment \u2014 failed outputs became the comparative dataset for every defensible decision I made later. What remains unresolved is whether any generative pipeline can be fully \u201Cfair\u201D to performers who never existed. The project does not resolve that tension; it lets the unease sit inside the horror rather than polishing it away.'
    ]
  }
];

/** @deprecated Use DIARY_ENTRIES \u2014 kept for imports */
export const JOURNAL_POSTS = DIARY_ENTRIES;

export const DIARY_NAV_SECTIONS = DIARY_ENTRIES.map((p) => {
  const parts = p.title.split(/:\s*/);
  const label =
    parts.length >= 2 ? parts.slice(1).join(': ').trim() : p.title;
  return {
    id: p.id,
    title: label.length > 56 ? `${label.slice(0, 53)}\u2026` : label
  };
});

/** @deprecated Use DIARY_NAV_SECTIONS */
export const JOURNAL_NAV_SECTIONS = DIARY_NAV_SECTIONS;

/** Short teasers for Home / optional cards */
export const JOURNAL_TEASERS = DIARY_ENTRIES.slice(0, 4).map((p) => ({
  title: p.title,
  desc: p.paragraphs[0],
  icon: '\uD83D\uDCDD'
}));
