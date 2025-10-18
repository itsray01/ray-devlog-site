(function(){
    console.log('Home.js loaded');
    const chipsWrap = document.getElementById('section-chips');
    const sections = Array.from(document.querySelectorAll('#home section'));
    
    console.log('Found sections:', sections.length);
    console.log('Chips wrap element:', chipsWrap);
    
    // Test if content is visible
    const mainContent = document.querySelector('#home');
    console.log('Main content element:', mainContent);
    console.log('Main content children:', mainContent?.children.length);
  
    // Build chips from data-title or h2 text
    sections.forEach(sec=>{
      const title = sec.getAttribute('data-title') || sec.querySelector('h2')?.textContent || sec.id;
      const btn = document.createElement('button');
      btn.className = 'section-chip';
      btn.textContent = title;
      btn.onclick = () => {
        sec.scrollIntoView({ behavior:'smooth', block:'start' });
        setActive(sec.id);
        history.replaceState(null,'',`#${sec.id}`);
      };
      chipsWrap.appendChild(btn);
    });
  
    // Scrollspy
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting) setActive(en.target.id);
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 });
  
    sections.forEach(s => io.observe(s));
  
    // If visiting with #hash
    if(location.hash){
      const t = document.querySelector(location.hash);
      if(t) setTimeout(()=> t.scrollIntoView({behavior:'instant'}), 0);
    }
  
    function setActive(id){
      const title = document.querySelector(`#${id}`)?.getAttribute('data-title')
        || document.querySelector(`#${id} h2`)?.textContent;
      document.querySelectorAll('.section-chip').forEach(ch=>{
        ch.classList.toggle('active', ch.textContent === title);
      });
    }
  })();
  