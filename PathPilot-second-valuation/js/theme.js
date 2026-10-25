/* PathPilot shared theme toggle + landing page interactions */
/* PathPilot shared theme toggle */
(function(){
  function isDark(){return document.body.classList.contains('dark');}
  function applyStoredTheme(){
    if(localStorage.getItem('pathpilot-theme')==='dark') document.body.classList.add('dark');
  }
  function init(){
    const nav=document.getElementById('themeNav');
    const fab=document.getElementById('themeFab');
    const btn=nav||fab||createFallback();
    if(!btn) return;
    const sync=()=>{btn.textContent=isDark()?'☀️':'🌙';};
    sync();
    if(!btn.__themeBound){
      btn.__themeBound=true;
      btn.addEventListener('click',()=>{
        document.body.classList.toggle('dark');
        localStorage.setItem('pathpilot-theme',isDark()?'dark':'light');
        sync();
      });
    }
  }
  function createFallback(){
    const btn=document.createElement('button');
    btn.id='themeFab';
    btn.className='theme-fab';
    btn.type='button';
    btn.setAttribute('aria-label','Toggle dark mode');
    btn.title='Toggle dark mode';
    document.body.appendChild(btn);
    return btn;
  }
  applyStoredTheme();
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();/* PathPilot landing page interactions — no animated background. */
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn=document.getElementById('menuBtn');
  const navLinks=document.getElementById('navLinks');

  if(menuBtn&&navLinks){
    const closeMenu=()=>{navLinks.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');};
    menuBtn.setAttribute('aria-expanded','false');
    menuBtn.addEventListener('click',e=>{e.stopPropagation();const open=navLinks.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});
    navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('click',e=>{if(navLinks.classList.contains('open')&&!navLinks.contains(e.target)&&e.target!==menuBtn)closeMenu();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
    window.addEventListener('resize',()=>{if(window.innerWidth>860)closeMenu();});
  }

  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets=document.querySelectorAll('.reveal-on-scroll,.feature-card,.step,.pp-pillar-card');
  if(!reduce&&'IntersectionObserver' in window){
    targets.forEach((el,i)=>{el.classList.add('reveal-pending');el.style.transitionDelay=(Math.min(i%4,3)*70)+'ms';});
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.remove('reveal-pending');entry.target.classList.add('reveal-in');io.unobserve(entry.target);}
      });
    },{threshold:.12,rootMargin:'0px 0px -45px 0px'});
    targets.forEach(el=>io.observe(el));
  }

  // Small count-up animation for hero/dashboard numbers.
  const counts=[...document.querySelectorAll('[data-count]')];
  if(!reduce&&counts.length){
    const animate=(el)=>{
      const target=Number(el.dataset.count||0);
      const suffix=el.dataset.suffix||'';
      let start=0;
      const duration=800;
      const t0=performance.now();
      const step=now=>{
        const p=Math.min((now-t0)/duration,1);
        const eased=1-Math.pow(1-p,3);
        el.textContent=Math.round(target*eased)+suffix;
        if(p<1)requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){animate(e.target);io.unobserve(e.target);}}),{threshold:.5});
    counts.forEach(el=>io.observe(el));
  }
});
