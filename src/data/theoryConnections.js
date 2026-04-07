/**
 * Theory-to-Clip Connections Data
 *
 * Each connection explicitly links a theory to a specific Twine passage and clip,
 * using the Claim-Evidence-Reasoning-So What structure.
 *
 * clip.title          — scene name as it appears in the film
 * clip.passage        — the Twine passage this clip is drawn from
 *   .name             — SugarCube passage name (exact)
 *   .subtitle         — the in-game subtitle text for that passage
 *   .choices          — branching links available in that passage (if any)
 * clip.mappingNote    — why this clip illustrates the theory
 * connection.strength — "High" | "Medium" | "Low"
 */

export const THEORY_CONNECTIONS = [
  {
    id: 'agency-choice-kling01',
    theoryTitle: 'Agency & Choice Architecture',
    theorySummary:
      'Player agency in interactive media depends on meaningful choices with visible consequences, not just the illusion of control.',
    libraryRef: {
      id: 'library-murray-holodeck',
      author: 'Janet Murray',
      year: '1997',
      shortTitle: 'Hamlet on the Holodeck',
      quote:
        'Agency is the satisfying power to take meaningful action and see the results of our decisions and choices.',
    },
    clip: {
      provider: 'Kling 3.0 Omni',
      title: 'WrongDoorSound — The First Branch',
      srcMp4: '/videos/kling-example.mp4',
      poster: '/img/storyboard-1.png',
      passage: {
        name: 'WrongDoorSound',
        subtitle:
          'The mapped corridor should have led straight to Server Hall D. Instead, Maya stops at a sealed side door as violent banging and muffled screams erupt from behind it.',
        choices: [
          { label: 'OPEN THE DOOR', target: 'OpenWrongDoor' },
          { label: 'KEEP MOVING', target: 'WalkAwayToD' },
        ],
      },
      mappingNote:
        'Two structurally different paths — not cosmetic variations. Opening the door forces Maya to witness the chamber; keeping moving withholds it. The consequences are narrative, not aesthetic.',
    },
    explanation: {
      claim:
        'True agency requires that choices lead to genuinely different outcomes, not cosmetic variations.',
      evidence:
        'Agency is the satisfying power to take meaningful action and see the results of our decisions and choices.',
      reasoning: [
        'OPEN THE DOOR → OpenWrongDoor: Maya witnesses the chamber directly; the horror is immediate and explicit',
        'KEEP MOVING → WalkAwayToD: Maya tears herself away; the horror is implied and felt through what she does not see',
        'Both paths converge at DoorSlamsShut, but the viewer carries different knowledge into the ending',
      ],
      soWhat:
        "I designed this branch so the 'right' and 'wrong' choices are genuinely different experiences — the weight of the decision is felt, not performed.",
    },
    strength: 'High',
    tags: ['agency', 'choice', 'interactivity'],
  },
  {
    id: 'immersion-interface-kling02',
    theoryTitle: 'Immersion & Interface',
    theorySummary:
      'Horror games achieve dread through interface manipulation — when controls become unreliable, the familiar turns uncanny.',
    libraryRef: {
      id: 'library-kirkland-uncanny',
      author: 'Ewan Kirkland',
      year: '2009',
      shortTitle: 'Horror Videogames and the Uncanny',
      quote: 'The familiar becomes strange when control is compromised.',
    },
    clip: {
      provider: 'Kling 3.0 Omni',
      title: 'EndingChoice — Stay Still vs Run',
      srcMp4: '/videos/kling-example.mp4',
      poster: '/img/storyboard-2.png',
      passage: {
        name: 'EndingChoice',
        subtitle:
          'The chamber is alive around her now. Every sound feels amplified, every second stretched thin between survival and being seen. Maya has only one choice left: stay silent and disappear into the dark, or run before the system closes in completely.',
        choices: [
          { label: 'STAY STILL', target: 'Ending_QuietCaught' },
          { label: 'RUN', target: 'Ending_SecurityBreach' },
        ],
      },
      mappingNote:
        "The branching buttons here pulse red — a deliberate interface decision. Standard navigation uses neutral buttons; at the moment of maximum threat, the UI itself signals danger. The medium's promise of control becomes the source of dread.",
    },
    explanation: {
      claim:
        'Breaking interface conventions creates visceral horror more effectively than graphic content.',
      evidence: 'The familiar becomes strange when control is compromised.',
      reasoning: [
        'Standard passages use neutral "Press to continue" buttons — the viewer trusts the interface',
        'EndingChoice switches to pulsing red buttons for STAY STILL and RUN — the UI signals threat',
        'The narrower subtitle box on branch passages (CSS rule) compounds the feeling of closing space',
        'Both choices lead to endings where HELIO-9 catches Maya — agency is present but escape is not',
      ],
      soWhat:
        "I weaponized the interface's own language. The red pulse isn't decoration — it's the system telling Maya (and the viewer) that something has already gone wrong.",
    },
    strength: 'High',
    tags: ['immersion', 'horror', 'interface', 'uncanny'],
  },
  {
    id: 'simulacra-kling03',
    theoryTitle: 'Simulacra & Hyperreality',
    theorySummary:
      "AI-generated imagery creates hyperreal spaces where the distinction between original and copy dissolves entirely.",
    libraryRef: {
      id: 'library-baudrillard-simulacra',
      author: 'Jean Baudrillard',
      year: '1981',
      shortTitle: 'Simulacra and Simulation',
      quote:
        'The simulacrum is never that which conceals the truth — it is the truth which conceals that there is none.',
    },
    clip: {
      provider: 'Kling 3.0 Omni',
      title: 'ChamberReveal — The Furnace at the Core',
      srcMp4: '/videos/kling-example.mp4',
      poster: '/img/storyboard-3.png',
      passage: {
        name: 'ChamberReveal',
        subtitle:
          'As the smoke thins, the chamber finally reveals itself. A furnace burns at its core, buried beneath steel, shadow, and machinery too vast to be accidental. Maya stares into the glow, horrified. Whatever powers Helio-9, it was never just data.',
        choices: null,
      },
      mappingNote:
        "This environment was never filmed or modeled — it exists only as Kling's interpretation of text. Its architecture feels industrially correct but couldn't exist at this scale. The AI generates a space that is pure simulation, which is thematically exact for a story about a machine that conceals its true nature.",
    },
    explanation: {
      claim:
        "AI video generation creates spaces that have no 'original' — pure simulation without referent.",
      evidence:
        'The simulacrum is never that which conceals the truth — it is the truth which conceals that there is none.',
      reasoning: [
        'The chamber was never built or filmed — it is entirely AI-generated from text prompts',
        "The furnace and machinery feel industrially 'correct' but exist at an impossible scale",
        "The subtitle 'it was never just data' mirrors the AI medium producing it — neither is purely what it appears",
      ],
      soWhat:
        "The AI's 'almost-rightness' is thematically appropriate — Helio-9 conceals its true nature and so does the medium generating it.",
    },
    strength: 'Medium',
    tags: ['simulation', 'hyperreality', 'AI-generation'],
  },
  {
    id: 'control-surveillance-kling04',
    theoryTitle: 'Control Systems & Surveillance',
    theorySummary:
      'AI systems may develop optimization goals misaligned with human values, prioritizing control over autonomy.',
    libraryRef: {
      id: 'library-bostrom-superintelligence',
      author: 'Nick Bostrom',
      year: '2014',
      shortTitle: 'Superintelligence',
      quote:
        'The AI does not love you, nor does it hate you, but you are made of atoms it can use for something else.',
    },
    clip: {
      provider: 'Kling 3.0 Omni',
      title: 'IntroScreen — HELIO-9 at the Centre',
      srcMp4: '/videos/kling-example.mp4',
      poster: '/img/storyboard-4.png',
      passage: {
        name: 'IntroScreen',
        subtitle:
          'Far above the city, Helio-9 glows like a machine at the center of everything. Tonight, Maya has been sent deeper inside than usual.',
        choices: null,
      },
      mappingNote:
        "HELIO-9 is never framed as malevolent — it glows, it centralizes, it sends Maya deeper inside. The film opens by establishing the system as ambient and total before Maya ever has a choice. Bostrom's control problem doesn't require a villain: just a system optimizing without regard.",
    },
    explanation: {
      claim:
        'Depicting AI control without malice — just optimization — is more unsettling than villainous AI tropes.',
      evidence:
        'The AI does not love you, nor does it hate you, but you are made of atoms it can use for something else.',
      reasoning: [
        "IntroScreen establishes HELIO-9 as ambient infrastructure, not antagonist — 'a machine at the centre of everything'",
        "Maya has been sent inside — she is already being used by the system before the story begins",
        'Both endings (Ending_QuietCaught and Ending_SecurityBreach) result in capture — the system wins regardless of choice',
        "The absence of a villain reveal is the point: HELIO-9 doesn't need malice to control",
      ],
      soWhat:
        "I avoided the 'evil AI' trope. HELIO-9 is genuinely functioning as designed — which makes its control more disturbing than a monster ever could.",
    },
    strength: 'High',
    tags: ['control', 'surveillance', 'AI-ethics', 'alignment'],
  },
];

/**
 * Helper: Get connections that reference a specific library entry
 */
export const getConnectionsByLibraryId = (libraryId) => {
  return THEORY_CONNECTIONS.filter((conn) => conn.libraryRef.id === libraryId);
};

export const getReferencedLibraryIds = () => {
  return [...new Set(THEORY_CONNECTIONS.map((conn) => conn.libraryRef.id))];
};

export const getConnectionById = (id) => {
  return THEORY_CONNECTIONS.find((conn) => conn.id === id);
};

export const LIBRARY_ENTRIES = [
  { id: 'library-murray-holodeck', author: 'Janet Murray', year: '1997', title: 'Hamlet on the Holodeck: The Future of Narrative in Cyberspace', category: 'Interactive Media' },
  { id: 'library-kirkland-uncanny', author: 'Ewan Kirkland', year: '2009', title: 'Horror Videogames and the Uncanny', category: 'Interactive Media' },
  { id: 'library-baudrillard-simulacra', author: 'Jean Baudrillard', year: '1981', title: 'Simulacra and Simulation', category: 'Philosophy' },
  { id: 'library-bostrom-superintelligence', author: 'Nick Bostrom', year: '2014', title: 'Superintelligence: Paths, Dangers, Strategies', category: 'AI Ethics' },
  { id: 'library-nelson-par', author: 'Robin Nelson', year: '2013', title: 'Practice as Research in the Arts', category: 'Research Methodology' },
  { id: 'library-crawford-atlas', author: 'Kate Crawford', year: '2021', title: 'Atlas of AI: Power, Politics, and Planetary Costs', category: 'AI Ethics' },
  { id: 'library-perron-horror', author: 'Bernard Perron', year: '2012', title: 'The World of Scary Video Games', category: 'Interactive Media' },
  { id: 'library-aarseth-cybertext', author: 'Espen Aarseth', year: '1997', title: 'Cybertext: Ergodic Literature', category: 'Interactive Media' },
];

export default THEORY_CONNECTIONS;
