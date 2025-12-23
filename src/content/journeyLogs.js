/**
 * Journey Experiment Logs
 * Chronological documentation of AI video generation experiments
 */

const journeyLogs = [
  {
    id: "log-2025-11-20-veo-dialogue",
    date: "2025-11-20",
    tool: "Veo 3.1",
    goal: "Generate protagonist dialogue shot with consistent facial features",
    failures: [],
    fix: "Used detailed character description template with locked camera angle",
    resultScore: 4,
    usable: true,
    creditsSpent: 85,
    timeSpentMin: 35,
    clipUrls: []
  },
  {
    id: "log-2025-11-18-sora-establishing",
    date: "2025-11-18",
    tool: "Sora 2",
    goal: "Create dystopian city establishing shot with neon lighting",
    failures: [],
    fix: "Focused on environmental details, removed human subjects",
    resultScore: 5,
    usable: true,
    creditsSpent: 150,
    timeSpentMin: 60,
    clipUrls: []
  },
  {
    id: "log-2025-11-15-sora-hands",
    date: "2025-11-15",
    tool: "Sora 2",
    goal: "Create a corridor chase shot with character running",
    failures: ["Hands", "Consistency", "Physics"],
    fix: "Constrained camera movement, locked character pose, reduced motion complexity",
    resultScore: 3,
    usable: true,
    creditsSpent: 120,
    timeSpentMin: 45,
    clipUrls: []
  },
  {
    id: "log-2025-11-12-wan-preview",
    date: "2025-11-12",
    tool: "Wan 2.5",
    goal: "Quick test of hallway transition framing",
    failures: ["Detail Quality"],
    fix: "Used for rough preview only, then regenerated with Veo",
    resultScore: 2,
    usable: false,
    creditsSpent: 30,
    timeSpentMin: 15,
    clipUrls: []
  },
  {
    id: "log-2025-11-10-higgsfield-abstract",
    date: "2025-11-10",
    tool: "Higgsfield",
    goal: "Generate abstract memory fragment sequence",
    failures: ["Consistency"],
    fix: "Embraced stylization for dream sequence instead of realistic shots",
    resultScore: 3,
    usable: true,
    creditsSpent: 95,
    timeSpentMin: 40,
    clipUrls: []
  },
  {
    id: "log-2025-11-08-veo-lighting",
    date: "2025-11-08",
    tool: "Veo 3.1",
    goal: "Test cinematic lighting control in confined space",
    failures: [],
    fix: "Detailed lighting direction in prompt with color temperature specs",
    resultScore: 4,
    usable: true,
    creditsSpent: 90,
    timeSpentMin: 50,
    clipUrls: []
  },
  {
    id: "log-2025-11-05-seedance-style",
    date: "2025-11-05",
    tool: "Seedance",
    goal: "Generate surreal transition between scenes",
    failures: ["Prompt Control"],
    fix: "Accepted artistic interpretation for transition instead of literal prompt",
    resultScore: 3,
    usable: true,
    creditsSpent: 75,
    timeSpentMin: 30,
    clipUrls: []
  },
  {
    id: "log-2025-11-03-sora-face-fail",
    date: "2025-11-03",
    tool: "Sora 2",
    goal: "Multi-shot dialogue sequence with same character",
    failures: ["Face Consistency", "Character Continuity"],
    fix: "Switched to Veo 3.1 for character-focused shots",
    resultScore: 1,
    usable: false,
    creditsSpent: 180,
    timeSpentMin: 90,
    clipUrls: []
  },
  {
    id: "log-2025-10-30-wan-motion-test",
    date: "2025-10-30",
    tool: "Wan 2.5",
    goal: "Test camera tracking for chase sequence",
    failures: ["Jitter", "Detail Quality"],
    fix: "Used as rough concept only before committing to Sora",
    resultScore: 2,
    usable: false,
    creditsSpent: 25,
    timeSpentMin: 20,
    clipUrls: []
  },
  {
    id: "log-2025-10-28-veo-consistency-win",
    date: "2025-10-28",
    tool: "Veo 3.1",
    goal: "Create series of 3 shots with same protagonist",
    failures: [],
    fix: "Template-based character description maintained across generations",
    resultScore: 4,
    usable: true,
    creditsSpent: 110,
    timeSpentMin: 55,
    clipUrls: []
  },
  {
    id: "log-2025-10-25-sora-policy-block",
    date: "2025-10-25",
    tool: "Sora 2",
    goal: "Generate tense interrogation scene",
    failures: ["Content Policy"],
    fix: "Reworded prompt to focus on environment and mood rather than conflict",
    resultScore: 2,
    usable: false,
    creditsSpent: 140,
    timeSpentMin: 70,
    clipUrls: []
  },
  {
    id: "log-2025-10-22-higgsfield-platform-test",
    date: "2025-10-22",
    tool: "Higgsfield",
    goal: "Compare multiple models for same shot in unified platform",
    failures: [],
    fix: "Used platform comparison feature to identify Veo as best choice",
    resultScore: 3,
    usable: true,
    creditsSpent: 100,
    timeSpentMin: 45,
    clipUrls: []
  }
];

export default journeyLogs;
