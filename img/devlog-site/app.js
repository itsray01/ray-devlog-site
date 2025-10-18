async function loadEntries(){
    const res = await fetch('data/devlog.json');
    const data = await res.json();
  
    // group by version
    const versions = {};
    data.forEach(e => {
      const v = e.version || 'Unversioned';
      (versions[v] ??= []).push(e);
    });
  
    // sort versions (string compare then reverse) and entries by date (desc)
    const sortedVersions = Object.keys(versions).sort().reverse();
    sortedVersions.forEach(v => {
      versions[v].sort((a,b)=> new Date(b.date) - new Date(a.date));
    });
  
    const chips = document.getElementById('version-chips');
    const entriesEl = document.getElementById('entries');
    chips.innerHTML = ''; entriesEl.innerHTML = '';
  
    // chips
    sortedVersions.forEach(v=>{
      const btn = document.createElement('button');
      btn.className = 'version-chip';
      btn.textContent = v;
      btn.onclick = () => {
        document.getElementById(v).scrollIntoView({behavior:'smooth', block:'start'});
        setActiveVersion(v);
        history.replaceState(null,'',`#${v}`);
      };
      chips.appendChild(btn);
    });
  
    // sections
    sortedVersions.forEach(v=>{
      const section = document.createElement('div');
      section.id = v;
      section.innerHTML = `<h2>${escapeHtml(v)}</h2>`;
      versions[v].forEach(e=>{
        const card = document.createElement('article');
        card.className = 'entry';
        card.innerHTML = `
          <h3>${escapeHtml(e.title)}</h3>
          <small>${escapeHtml(e.date)}</small>
          ${Array.isArray(e.media) ? e.media.map(src=> `<img src="${src}" alt="">`).join('') : ''}
          <h4>What Changed</h4>
          <p>${escapeHtml(e.whatChanged)}</p>
          <h4>Why I Didn’t Like It</h4>
          <p>${escapeHtml(e.whyNotGood)}</p>
          <h4>How I Improved It</h4>
          <p>${escapeHtml(e.howImproved)}</p>
          ${e.tags ? `<small>${e.tags.map(t=>'#'+escapeHtml(t)).join(' ')}</small>` : ''}
        `;
        section.appendChild(card);
      });
      entriesEl.appendChild(section);
    });
  
    // scrollspy
    const observer = new IntersectionObserver((obs)=>{
      obs.forEach(ent=>{
        if(ent.isIntersecting){ setActiveVersion(ent.target.id); }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 });
  
    sortedVersions.forEach(v=>{
      const el = document.getElementById(v);
      if(el) observer.observe(el);
    });
  
    // jump if hash present
    if(location.hash){
      const id = location.hash.slice(1);
      const target = document.getElementById(id);
      if(target){ setTimeout(()=> target.scrollIntoView({behavior:'instant'}), 0); setActiveVersion(id); }
    }
  }
  
  function setActiveVersion(v){
    document.querySelectorAll('.version-chip').forEach(chip=>{
      chip.classList.toggle('active', chip.textContent === v);
    });
  }
  
  function escapeHtml(s=''){
    return s.replace(/[&<>"]/g, c=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  }
  
  loadEntries();
  