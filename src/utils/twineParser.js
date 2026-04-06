/**
 * Parses Twine (SugarCube) exported HTML into React Flow nodes and edges.
 *
 * Handles two link syntaxes:
 *   [[Link Text->Target]]   (SugarCube arrow)
 *   [[Target]]              (bare target, text = target name)
 *
 * Also detects Engine.play('PassageName') calls used for JS-driven navigation.
 */

const TWINE_LINK_RE = /\[\[([^\]]+)\]\]/g;
const ENGINE_PLAY_RE = /Engine\.play\(['"]([^'"]+)['"]\)/g;

function decodeHtmlEntities(str) {
  const el = document.createElement('textarea');
  el.innerHTML = str;
  return el.value;
}

function parseLinks(rawText) {
  const decoded = decodeHtmlEntities(rawText);
  const links = [];

  let m;
  while ((m = TWINE_LINK_RE.exec(decoded)) !== null) {
    const inner = m[1];
    if (inner.includes('->')) {
      const [label, target] = inner.split('->');
      links.push({ label: label.trim(), target: target.trim() });
    } else if (inner.includes('|')) {
      const [label, target] = inner.split('|');
      links.push({ label: label.trim(), target: target.trim() });
    } else {
      links.push({ label: inner.trim(), target: inner.trim() });
    }
  }

  while ((m = ENGINE_PLAY_RE.exec(decoded)) !== null) {
    links.push({ label: 'Begin', target: m[1] });
  }

  return links;
}

function categoriseNode(name, outLinks, inDegree, startNode) {
  if (name === startNode) return 'start';
  if (name.startsWith('Ending_')) return 'ending';
  if (outLinks.length > 1) return 'branch';
  if (outLinks.length === 0) return 'ending';
  return 'path';
}

/**
 * Parse a Twine HTML string and return { nodes, edges } for React Flow.
 * Restart/loop edges (back to startNode) are tagged `data.isRestart`.
 */
export function parseTwineHtml(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const storyData = doc.querySelector('tw-storydata');
  if (!storyData) throw new Error('No <tw-storydata> found in HTML');

  const startPid = storyData.getAttribute('startnode') || '1';
  const passages = doc.querySelectorAll('tw-passagedata');

  const pidToName = {};
  const passageMap = {};
  let startName = '';

  passages.forEach((p) => {
    const pid = p.getAttribute('pid');
    const name = p.getAttribute('name');
    pidToName[pid] = name;
    if (pid === startPid) startName = name;

    const rawText = p.textContent || p.innerHTML;
    const links = parseLinks(rawText);

    passageMap[name] = { pid, name, links };
  });

  const scriptTags = doc.querySelectorAll('script');
  scriptTags.forEach((script) => {
    const text = script.textContent;
    let m;
    while ((m = ENGINE_PLAY_RE.exec(text)) !== null) {
      const target = m[1];
      const context = text.substring(Math.max(0, m.index - 200), m.index);
      for (const [pName, pData] of Object.entries(passageMap)) {
        if (pData.links.every((l) => l.target !== target) && pName === startName) {
          const alreadyHas = pData.links.some((l) => l.target === target);
          if (!alreadyHas) pData.links.push({ label: 'Click to Begin', target });
        }
      }
    }
  });

  const nodes = [];
  const edges = [];

  for (const [name, data] of Object.entries(passageMap)) {
    const category = categoriseNode(name, data.links, 0, startName);
    nodes.push({
      id: name,
      type: 'cyberNode',
      data: { label: name, pid: data.pid, category },
      position: { x: 0, y: 0 },
    });

    data.links.forEach((link, i) => {
      const isRestart = link.target === startName && category === 'ending';
      edges.push({
        id: `${name}->${link.target}-${i}`,
        source: name,
        target: link.target,
        label: link.label,
        animated: !isRestart,
        data: { isRestart },
      });
    });
  }

  return { nodes, edges, startNode: startName };
}

export default parseTwineHtml;
