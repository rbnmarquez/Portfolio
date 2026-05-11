/* global React, ReactDOM */
const { useState, useEffect, useRef } = React;

// ============================================================
// ICONS — minimal stroke set
// ============================================================
const Ic = {
  Mail: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>,
  Resume: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/></svg>,
  Arrow: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  ArrowUR: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 17 17 7M7 7h10v10"/></svg>,
  Sparkle: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>,
  Compass: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="m15 9-2 6-4 1 1-4 6-3z"/></svg>,
  Layers: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="M3 13 12 18 21 13"/><path d="M3 18 12 23 21 18"/></svg>,
  Search: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  Cube: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m12 3 9 5v8l-9 5-9-5V8l9-5z"/><path d="M3 8 12 13M21 8 12 13M12 13v10"/></svg>,
  Tree: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v18"/><path d="M5 8h7"/><path d="M19 14h-7"/><circle cx="5" cy="8" r="2"/><circle cx="19" cy="14" r="2"/></svg>,
  Cursor: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m4 4 6 16 2-7 7-2L4 4z"/></svg>,
  Flask: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 3v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-10V3"/><path d="M8 3h8"/></svg>,
  Path: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M9 6h6a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6"/></svg>,
  Brain: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3V4zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3V4z"/></svg>,
  Eye: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>,
  Bike: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="6" cy="17" r="4"/><circle cx="18" cy="17" r="4"/><path d="m6 17 4-9h4l-3 9M14 8l3-3M9 8h5"/></svg>,
  Chart: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-7"/></svg>,
  Heart: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6C19 16.5 12 21 12 21z"/></svg>,
  LinkedIn: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h4v2c.7-1.3 2.3-2.3 4.3-2.3 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.4-.5-2.7-2-2.7s-2 1.3-2 2.7V21h-4z"/></svg>,
};

// ============================================================
// SCROLL REVEAL
// ============================================================
function TypeIn({ text, delay = 0, speed = 22 }) {
  const [out, setOut] = useState('');
  useEffect(() => {
    let i = 0; let to;
    const start = setTimeout(function tick(){
      setOut(text.slice(0, i+1));
      i++;
      if (i < text.length) to = setTimeout(tick, speed);
    }, delay);
    return () => { clearTimeout(start); clearTimeout(to); };
  }, [text, delay, speed]);
  return <>{out}</>;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ============================================================
// HEADER
// ============================================================
function Header({ onTweaks }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={'site-header ' + (scrolled ? 'scrolled' : '')}>
      <div className="container row">
        <a href="#top" className="brand">
          <span className="dot"></span>
          robin <i>marquez</i>
        </a>
        <nav className="nav">
          <a href="#work">Work</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#workflow">AI workflow</a>
          <a href="#beyond">Beyond</a>

        </nav>
      </div>
    </header>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero({ layout }) {
  return (
    <section className={'hero layout-' + layout} id="top">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-portrait reveal">
            <img src="assets/headshot.jpg" alt="Robin Marquez" />
          </div>
          <div>
            <div className="hero-eyebrow reveal">
              <span className="dot"><Ic.Sparkle style={{width:10,height:10}}/></span>
              Head UX Designer · AI Strategist
            </div>
            <h1 className="hero-headline reveal delay-1">
              <TypeIn text="Transforming "/><span className="grad"><TypeIn text="complex strategy" delay={700}/></span><TypeIn text=" into intuitive, AI‑enhanced human experiences." delay={1900}/><span className="caret"></span>
            </h1>
            <p className="hero-sub reveal delay-2">
              Architecting seamless human experiences by aligning complex institutional goals with scalable, AI‑integrated product ecosystems.
            </p>
            <div className="hero-ctas reveal delay-3">
              <a className="sk-btn sk-btn-primary" href="#">
                <span className="sk-ic"><Ic.Resume style={{width:16,height:16}}/></span>
                <span>Resume</span>
              </a>
              <a className="sk-btn" href="#">
                <span className="sk-ic"><Ic.LinkedIn style={{width:15,height:15}}/></span>
                <span>LinkedIn</span>
              </a>
              <a className="sk-btn" href="mailto:hello@robinmarquez.com">
                <span className="sk-ic"><Ic.Mail style={{width:16,height:16}}/></span>
                <span>Get in touch</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PILLARS
// ============================================================
function Pillars() {
  const items = [
    { n: '01', icon: <Ic.Compass/>, title: 'Strategic Leadership', body: 'Managing and mentoring high-performing design teams to deliver scalable, human-centered ecosystems across global products.' },
    { n: '02', icon: <Ic.Sparkle/>, title: 'AI-Integrated Design', body: 'Pioneering workflows that leverage AI to synthesize deep research and accelerate prototyping without losing the human signal.' },
    { n: '03', icon: <Ic.Layers/>, title: 'Product Strategy', body: 'Certified Scrum Product Owner (CSPO) bridging the gap between stakeholders, engineering, and what users actually need.' },
  ];
  return (
    <section className="section" id="pillars">
      <div className="container">
        <div className="section-head reveal">
          <div className="section-eyebrow">Strategic pillars</div>
          <h2 className="section-title">Three lenses I <em>bring to every team</em>.</h2>
          <p className="section-lede">Each is a discipline I've practiced for over a decade — together they keep design honest, ambitious, and shipping.</p>
        </div>
        <div className="pillars">
          {items.map((it, i) => (
            <div key={it.n} className={'pillar reveal delay-' + (i+1)}>
              <span className="num">{it.n} / 03</span>
              <div className="icon">{React.cloneElement(it.icon, { style: {width:22, height:22}})}</div>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TRUST BAR
// ============================================================
function Trust() {
  const logos = [
    { name: 'Canada Post', cls: 'sans' },
    { name: 'AffinityClick', cls: '' },
    { name: 'Smart Apartment Data', cls: 'cap' },
    { name: 'El Nuevo Diario', cls: '' },
    { name: 'CLARO', cls: 'sans' },
    { name: 'zandahealth', cls: 'mono' },
  ];
  return (
    <section className="trust">
      <div className="container">
        <div className="trust-label reveal">Trusted by teams at</div>
        <div className="trust-row reveal delay-1">
          {logos.map(l => (
            <span key={l.name} className={'logo ' + l.cls}>{l.name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CASE STUDIES
// ============================================================
function CaseMockCanada() {
  return <div className="mock-canada"></div>;
}
function CaseMockAffinity() {
  return (
    <div className="mock-affinity">
      <div className="grid-lines"></div>
      <div className="ring"></div>
      <div className="ring r2"></div>
      <div className="ring r3"></div>
    </div>
  );
}
function CaseMockSAD() {
  const heights = [40, 65, 50, 78, 92, 70, 85, 55, 72, 90, 60, 80];
  return (
    <div className="mock-sad">
      <div className="top">
        <span className="pill a"></span>
        <span className="pill b"></span>
        <span className="pill c"></span>
      </div>
      <div className="mock-bar-row">
        {heights.map((h, i) => (
          <div key={i} className="bar" style={{ height: h + '%', opacity: 0.3 + (h/200) }}></div>
        ))}
      </div>
    </div>
  );
}

function Cases({ style }) {
  const cases = [
    {
      key: 'canada',
      brand: 'Canada Post',
      brandColor: '#DC3545',
      title: 'Driving mobile-first innovation for national digital services.',
      outcome: 'Scaled design excellence across the enterprise through a Community of Practice — turning siloed teams into a coherent design organization.',
      tags: ['Mobile UX Strategy', 'Design Leadership', 'Enterprise UX', 'Mentorship'],
      mock: <CaseMockCanada/>,
      feature: true,
    },
    {
      key: 'affinity',
      brand: 'AffinityClick',
      brandColor: '#3F5C46',
      title: 'Orchestrating global product strategy & creative direction.',
      outcome: 'Transforming complex requirements into market-leading applications, from roadmap to release.',
      tags: ['Product Strategy', 'Creative Direction', 'Roadmapping', 'Stakeholder Alignment'],
      mock: <CaseMockAffinity/>,
    },
    {
      key: 'sad',
      brand: 'Smart Apartment Data',
      brandColor: '#274A86',
      title: 'A unified design architecture for high-scale data platforms.',
      outcome: 'Establishing the visual + structural foundation for a data-intensive product family.',
      tags: ['Design Systems', 'IA', 'Data Visualization', 'Lead Design'],
      mock: <CaseMockSAD/>,
    },
  ];
  return (
    <section className={'section cards-' + style} id="work">
      <div className="container">
        <div className="section-head reveal">
          <div className="section-eyebrow">Selected work</div>
          <h2 className="section-title">Case studies in <em>scaling clarity</em>.</h2>
          <p className="section-lede">Each project is a different puzzle — the approach stays the same: align people, process, and platforms to create measurable impact.</p>
        </div>
        <div className="cases">
          {cases.map((c, i) => (
            <article key={c.key} className={'case reveal delay-' + (i+1) + (c.feature ? ' feature' : '')}>
              <div className="case-media">
                <div className="case-mock">{c.mock}</div>
                <div className="case-tag"><span className="swatch" style={{ background: c.brandColor }}></span>{c.brand}</div>
                <div className="case-arrow"><Ic.ArrowUR style={{width:16,height:16}}/></div>
              </div>
              <div className="case-body">
                <h3 className="case-title">{c.title}</h3>
                <p className="case-outcome">{c.outcome}</p>
                <div className="case-tags">
                  {c.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CAPABILITIES
// ============================================================
function Capabilities() {
  const caps = [
    { icon: <Ic.Compass/>, t: 'Design Leadership', d: 'Mentoring high-performing teams toward scalable, human-centered ecosystems.' },
    { icon: <Ic.Sparkle/>, t: 'AI Strategy & Workflows', d: 'Integrating AI to synthesize research and accelerate prototyping.' },
    { icon: <Ic.Cursor/>, t: 'Mobile UX Strategy', d: 'End-to-end mobile experiences for high-stakes national services.' },
    { icon: <Ic.Layers/>, t: 'Product Ownership (CSPO)', d: 'Aligning business roadmaps with technical execution and user needs.' },
    { icon: <Ic.Cube/>, t: 'Enterprise Design Systems', d: 'Shared design languages that hold consistency across global products.' },
    { icon: <Ic.Tree/>, t: 'Information Architecture', d: 'Organizing intricate data and policy into intuitive structures.' },
    { icon: <Ic.Path/>, t: 'Service Design', d: 'Mapping holistic journeys that bridge institution and user.' },
    { icon: <Ic.Flask/>, t: 'User Research & Testing', d: 'Evidence-based insights that validate value and optimize performance.' },
  ];
  return (
    <section className="section" id="capabilities">
      <div className="container">
        <div className="section-head reveal">
          <div className="section-eyebrow">Capabilities</div>
          <h2 className="section-title">A toolkit built across <em>two decades</em>.</h2>
          <p className="section-lede">I bridge strategy and execution. The focus stays on building clarity, alignment, and measurable outcomes through design.</p>
        </div>
        <div className="caps reveal">
          {caps.map((c, i) => (
            <div key={c.t} className="cap">
              <div className="icon">{React.cloneElement(c.icon, { style: {width:28, height:28}})}</div>
              <h4>{c.t}</h4>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// AI WORKFLOW (interactive tabs)
// ============================================================
function AIWorkflow() {
  const tabs = [
    {
      id: 'synthesis',
      label: 'Synthesis',
      icon: <Ic.Brain/>,
      title: 'Hours of interviews into actionable insight.',
      tool: 'Claude · Notion AI',
      body: 'I use AI to analyze hours of user interviews in seconds — clustering themes, extracting verbatim, and surfacing the contradictions that point to a real opportunity. The result: research that informs decisions while it\'s still relevant.',
      glyph: <Ic.Brain style={{width:88,height:88}}/>,
    },
    {
      id: 'personas',
      label: 'Personas',
      icon: <Ic.Eye/>,
      title: 'From archetypes to evidence-backed humans.',
      tool: 'GPT · Dovetail',
      body: 'Personas are only useful if they\'re defensible. AI lets me ground them in transcript-level evidence — every motivation traced back to the conversation that revealed it. The team trusts the model. Stakeholders trust the team.',
      glyph: <Ic.Eye style={{width:88,height:88}}/>,
    },
    {
      id: 'concepting',
      label: 'Concepting',
      icon: <Ic.Sparkle/>,
      title: 'A studio of variations on a Tuesday afternoon.',
      tool: 'Midjourney · v0',
      body: 'I generate dozens of directional concepts in a single sitting and pressure-test them against the brief. Designers get to react to a fully-realized strawman instead of a blank canvas — which is where the best ideas have always come from.',
      glyph: <Ic.Sparkle style={{width:88,height:88}}/>,
    },
    {
      id: 'prototyping',
      label: 'Prototyping',
      icon: <Ic.Cursor/>,
      title: 'Working code from the second sketch.',
      tool: 'Cursor · Lovable',
      body: 'I prototype in code — not slides. Working artifacts show real interaction, real data, and real edges. Stakeholders stop arguing about the picture and start using the product.',
      glyph: <Ic.Cursor style={{width:88,height:88}}/>,
    },
    {
      id: 'governance',
      label: 'Governance',
      icon: <Ic.Layers/>,
      title: 'Systems that keep the model honest.',
      tool: 'Internal LLMs · Custom',
      body: 'Speed without governance is just risk. I build review loops, prompt libraries, and a culture of skeptical verification — so AI accelerates the work without quietly degrading its quality.',
      glyph: <Ic.Layers style={{width:88,height:88}}/>,
    },
  ];
  const [active, setActive] = useState('synthesis');
  const tab = tabs.find(t => t.id === active);

  return (
    <section className="ai-section" id="workflow">
      <div className="container">
        <div className="section-head reveal">
          <div className="section-eyebrow">AI workflow</div>
          <h2 className="section-title">A new responsibility: <em>verifying logic</em>, translating machine feedback into meaningful human experiences.</h2>
        </div>
        <div className="ai-grid reveal">
          <div className="ai-tabs">
            {tabs.map(t => (
              <button key={t.id} className={'ai-tab ' + (active === t.id ? 'active' : '')} onClick={() => setActive(t.id)}>
                <span className="ic">{React.cloneElement(t.icon, { style: {width:20, height:20}})}</span>
                <span className="label">{t.label}</span>
                <span className="arr"><Ic.Arrow style={{width:14,height:14}}/></span>
              </button>
            ))}
          </div>
          <div className="ai-panel">
            <div className="ai-panel-media">
              <div className="grid-lines"></div>
              <div className="glow"></div>
              <div className="icon-big" key={active}>{tab.glyph}</div>
            </div>
            <div className="ai-panel-body">
              <div className="tool">Preferred tool: <b>{tab.tool}</b></div>
              <h3>{tab.title}</h3>
              <p>{tab.body}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MENTORSHIP / IRCC
// ============================================================
function Mentorship() {
  return (
    <section className="mentorship" id="mentorship">
      <div className="container reveal">
        <div className="mentorship-card">
          <div>
            <div className="eyebrow">Mentorship · public-good design</div>
            <h3>Translating policy into clarity for thousands navigating the <em>IRCC</em> ecosystem.</h3>
            <p>Design doesn't stop at the office. I lead a digital advocacy project demystifying Immigration, Refugees and Citizenship Canada — turning high-stakes, jargon-heavy policy into actionable, human-centered video guides. It's an ongoing study in high-empathy service design and information architecture for the public good.</p>
          </div>
          <div className="mentorship-stats">
            <div className="stat"><div className="v">120k+</div><div className="l">guided viewers</div></div>
            <div className="stat"><div className="v">40+</div><div className="l">policy guides</div></div>
            <div className="stat"><div className="v">5 yrs</div><div className="l">running</div></div>
            <div className="stat"><div className="v">100%</div><div className="l">non-commercial</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BEYOND THE DESK
// ============================================================
function Beyond() {
  const items = [
    { num: '01', icon: <Ic.Bike/>, t: 'Exploring on two wheels', d: 'Avid mountain biker — currently trading the coastal forests of British Columbia for the river-valley trails of Fort Saskatchewan, Alberta.' },
    { num: '02', icon: <Ic.Chart/>, t: 'A student of the game', d: 'Whether analyzing the Blue Jays\' bullpen or tracking the cryptocurrency landscape, I\'m fascinated by data, strategy, and performance.' },
    { num: '03', icon: <Ic.Heart/>, t: 'In good company', d: 'Most downtime is with my family and Marley — my four-year-old Labrador, who reminds me the best experiences are simple, loyal, and grounded in the moment.' },
  ];
  return (
    <section className="beyond" id="beyond">
      <div className="container">
        <div className="beyond-grid">
          <div className="beyond-intro reveal">
            <div className="section-eyebrow">Beyond the desk</div>
            <h2 className="section-title" style={{marginBottom: 24}}>A great designer is fueled by <em>the world outside the screen</em>.</h2>
            <p>The strongest design instincts I have don't come from the studio — they come from time on trails, time with family, and time spent watching how decisions actually get made when no one is performing.</p>
          </div>
          <div className="beyond-list reveal delay-1">
            {items.map(it => (
              <div key={it.num} className="beyond-item">
                <div className="num">{it.num}</div>
                <div>
                  <h4>
                    <span className="ic">{React.cloneElement(it.icon, { style: {width:18, height:18}})}</span>
                    {it.t}
                  </h4>
                  <p>{it.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FINAL CTA
// ============================================================
function CTAFinal() {
  return (
    <section className="cta-final" id="contact">
      <div className="container">
        <h2 className="reveal">Let's build something <span className="grad">remarkably human</span>.</h2>
        <p className="reveal delay-1">Senior leadership roles, AI-integrated product teams, and high-stakes service design — those are the conversations I'm looking for in 2026.</p>
        <div className="actions reveal delay-2">
          <a className="sk-btn sk-btn-primary sk-lg" href="#"><span className="sk-ic"><Ic.Resume style={{width:18,height:18}}/></span> Resume</a>
          <a className="sk-btn sk-lg" href="#"><span className="sk-ic"><Ic.LinkedIn style={{width:17,height:17}}/></span> LinkedIn</a>
          <a className="sk-btn sk-lg" href="mailto:hello@robinmarquez.com"><span className="sk-ic"><Ic.Mail style={{width:18,height:18}}/></span> Email</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container row">
        <div>© 2026 Robin Marquez · Head of UX & AI Strategy</div>
        <div className="links">
          <a href="#">LinkedIn</a>
          <a href="#">Read.cv</a>
          <a href="#">Substack</a>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// APP
// ============================================================
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headlineFont": "lora",
  "accent": "green",
  "dark": false,
  "heroLayout": "split",
  "cardStyle": "default"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();

  // apply theme classes to <html>
  useEffect(() => {
    const c = document.documentElement.classList;
    c.toggle('theme-dark', t.dark);
    ['accent-green','accent-teal','accent-terra','accent-navy'].forEach(x => c.remove(x));
    c.add('accent-' + t.accent);
    ['head-lora','head-playfair','head-eb','head-crimson','head-instr'].forEach(x => c.remove(x));
    c.add('head-' + t.headlineFont);
  }, [t.dark, t.accent, t.headlineFont]);

  return (
    <>
      <div className="bg-ambient"></div>
      <Header/>
      <Hero layout={t.heroLayout}/>
      <div className="section-tint"><Pillars/></div>
      <Cases style={t.cardStyle}/>
      <div className="section-tint"><Capabilities/></div>
      <AIWorkflow/>
      <div className="section-tint"><Mentorship/></div>
      <Beyond/>
      <CTAFinal/>
      <Footer/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakToggle label="Dark mode" value={t.dark} onChange={v => setTweak('dark', v)}/>
          <TweakColor
            label="Accent"
            value={ACCENT_COLORS[t.accent]}
            options={Object.values(ACCENT_COLORS)}
            onChange={hex => {
              const k = Object.keys(ACCENT_COLORS).find(k => ACCENT_COLORS[k] === hex) || 'green';
              setTweak('accent', k);
            }}
          />
        </TweakSection>
        <TweakSection label="Type">
          <TweakSelect
            label="Headline font"
            value={t.headlineFont}
            options={[
              { value: 'lora', label: 'Lora' },
              { value: 'playfair', label: 'Playfair Display' },
              { value: 'eb', label: 'EB Garamond' },
              { value: 'crimson', label: 'Crimson Pro' },
              { value: 'instr', label: 'Instrument Serif' },
            ]}
            onChange={v => setTweak('headlineFont', v)}
          />
        </TweakSection>
        <TweakSection label="Layout">
          <TweakRadio
            label="Hero"
            value={t.heroLayout}
            options={[
              { value: 'split', label: 'Split' },
              { value: 'stacked', label: 'Stacked' },
              { value: 'editorial', label: 'Editorial' },
            ]}
            onChange={v => setTweak('heroLayout', v)}
          />
          <TweakRadio
            label="Case cards"
            value={t.cardStyle}
            options={[
              { value: 'default', label: 'Default' },
              { value: 'outlined', label: 'Outlined' },
              { value: 'filled', label: 'Filled' },
            ]}
            onChange={v => setTweak('cardStyle', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const ACCENT_COLORS = {
  green: '#3F5C46',
  teal:  '#1F6B6B',
  terra: '#B25535',
  navy:  '#274A86',
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
