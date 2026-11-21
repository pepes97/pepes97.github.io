(() => {
  "use strict";

  /* ---------- Italian translations (English lives in the HTML) ---------- */
  const IT = {
    skip: "Vai al contenuto",
    navWork: "Oggi", navBefore: "Prima", navExp: "Esperienza", navSkills: "Competenze", navResearch: "Ricerca", navContact: "Contatti",
    annotated: "annotazioni attive", annotatedOff: "annotazioni spente",
    annot: `<mark class="e-per" data-r="r1 r2 r3" data-l="PERSON">Sveva Pepe</mark> è
          <mark class="e-role" data-r="r2" data-l="ROLE">AI/ML Engineer</mark> in
          <mark class="e-org" data-r="r1" data-l="ORG">Almawave Labs</mark>,
          <mark class="e-loc" data-r="r6" data-l="LOC">Roma</mark>.
          Dal <mark class="e-date" data-r="r3" data-l="DATE">2025</mark> progetta l'architettura AI di un prodotto enterprise basato su
          <mark class="e-tech" data-r="r3" data-l="TECH">agenti LLM</mark>.
          Prima, dal <mark class="e-date" data-r="r4" data-l="DATE">2022</mark>, ha estratto entità e relazioni da
          <mark class="e-dom" data-r="r4" data-l="DOMAIN">documenti giudiziari</mark> per la
          <mark class="e-dom" data-r="r4" data-l="DOMAIN">pubblica amministrazione</mark>.`,
    r3: "architettura AI · agenti LLM", r4: "NER ed estrazione di relazioni · testi legali", r6: "ruoli on-site in Europa",
    note: "Annotato a mano, nel formato dei sistemi di estrazione di entità e relazioni che sviluppo.",
    idName: "nome", idRole: "ruolo", idEdu: "laurea", idEduV: "Magistrale AI &amp; Robotics, 110 e lode",
    ctaCv: "Scarica il CV (PDF)", ctaCv2: "CV (PDF)",
    nowK: "Oggi", present: "oggi",
    nowH: "Progetto l'architettura AI di un prodotto enterprise",
    nowP: "Mi occupo dell'architettura AI: come agenti LLM, workflow e servizi lavorano insieme per elaborare documenti su larga scala. Segui un documento al suo interno:",
    s1: "Documenti", s2: "Servizi", s3: "Workflow", s4: "Agenti LLM", s5: "Dati e costi",
    p1: "Pipeline di elaborazione documentale su larga scala trasformano i documenti in ingresso in contenuto strutturato, su cui lavora il resto del modulo.",
    p2: "I componenti AI girano come microservizi che espongono API, containerizzati e in esecuzione su Kubernetes.",
    p3: "L'elaborazione AI multi-step è orchestrata come workflow, così ogni passaggio è tracciato, ripetibile e osservabile.",
    p4: "Agenti LLM svolgono l'analisi dei documenti, orchestrati con LangChain e LangGraph.",
    d4: "<b>Il mio focus:</b> come gli agenti sono progettati e orchestrati.",
    p5: "I risultati sono salvati in un database documentale, e un sistema di cost tracking attribuisce la spesa LLM a ogni fase della pipeline.",
    d5: "<b>Ho costruito</b> il cost tracking per stage, così i costi AI restano misurabili.",
    tH: "Un agente che scrive i test",
    tP: "Un agente LangGraph che genera test in automatico (pytest, httpx), integrato nel framework di test pre-deploy del team.",
    lH: "Responsabile dell'architettura AI",
    lP: "Coordino il lavoro tecnico sulla parte AI e le decisioni chiave sull'architettura AI, e definisco la roadmap di prodotto insieme al product management.",
    befK: "Prima",
    befH: "NLP e LLM per documenti giudiziari e amministrativi",
    befP: "Delivery per clienti della pubblica amministrazione: soluzioni su misura su testi legali, dove il linguaggio è lungo, formale e preciso.",
    b1H: "Estrazione", b1P: "Soluzioni basate su LLM per named entity recognition ed estrazione di relazioni su documenti giudiziari, incluso il fine-tuning di modelli transformer.",
    b2H: "Prompting", b2P: "Strategie di prompt engineering pensate per la terminologia legale e per strutture di frase complesse.",
    b3H: "Valutazione", b3P: "Metriche di valutazione custom e workflow di preprocessing standardizzati, riusati per migliorare l'efficienza in più progetti per la pubblica amministrazione.",
    expH: "Esperienza e formazione",
    e1: "Sviluppo prodotto (2025 – oggi) · Delivery per clienti (2022 – 2025). Gruppo Almaviva; ad agosto 2026 l'azienda ha cambiato nome da Almawave ad Almawave Labs.",
    e2: "Ottimizzazione di framework di performance testing con LoadRunner, AppDynamics e Instana.",
    e3H: "Borsa di ricerca — Sapienza Università di Roma",
    e3: "Progetto L3DAS: costruzione di un dataset e di una challenge di audio 3D per speech enhancement e localizzazione di eventi sonori.",
    e4: "110 e lode, focus su machine learning e NLP. Certificate of Excellent Student, Sapienza, 2023.",
    e5H: "Laurea in Ingegneria Informatica e Automatica — Sapienza", e5: "110 e lode.",
    skH: "Competenze",
    sk1: "agent design (ReAct, ragionamento multi-step, tool calling)", sk2: "estrazione di relazioni", sk3: "classificazione di testi", sk4: "Dati e documenti",
    reH: "Ricerca",
    moreProj: "I progetti universitari precedenti (NER, semantic role labeling, reti quaternioniche per l'audio 3D, reinforcement learning, robotica) sono su <a href=\"https://github.com/pepes97\" target=\"_blank\" rel=\"noopener\">GitHub</a>.",
    coH: "Contatti",
    coP: "Vivo a Roma, disponibile a trasferirmi per ruoli on-site in Europa.",
  };

  const $ = s => document.querySelector(s);
  const nodes = [...document.querySelectorAll("[data-i18n]")];
  const EN = new Map(nodes.map(n => [n, n.innerHTML]));
  const langBtn = $("#lang");
  let lang = "en";

  function setLang(l) {
    lang = l;
    nodes.forEach(n => { const k = n.dataset.i18n; n.innerHTML = l === "it" && IT[k] ? IT[k] : EN.get(n); });
    document.documentElement.lang = l;
    langBtn.textContent = l === "it" ? "EN" : "IT";
    langBtn.setAttribute("aria-label", l === "it" ? "English" : "Italiano");
    syncToggle();
    try { localStorage.setItem("lang", l); } catch (e) {}
  }
  langBtn.addEventListener("click", () => setLang(lang === "it" ? "en" : "it"));

  /* ---------- annotations on/off ---------- */
  const doc = $(".doc"), ann = $("#ann");
  function syncToggle() {
    const on = !doc.classList.contains("plain");
    ann.setAttribute("aria-pressed", String(on));
    const label = ann.querySelector("[data-i18n]");
    label.textContent = on ? (lang === "it" ? IT.annotated : "annotations on") : (lang === "it" ? IT.annotatedOff : "annotations off");
  }
  ann.addEventListener("click", () => { doc.classList.toggle("plain"); syncToggle(); });

  /* ---------- entity <-> relation linking ---------- */
  const clear = () => document.querySelectorAll(".lit").forEach(e => e.classList.remove("lit"));
  function lightFromEntity(m) {
    clear(); m.classList.add("lit");
    (m.dataset.r || "").split(" ").forEach(id => document.getElementById(id)?.classList.add("lit"));
  }
  function lightFromRelation(li) {
    clear(); li.classList.add("lit");
    document.querySelectorAll("#annotated mark").forEach(m => { if ((m.dataset.r || "").split(" ").includes(li.id)) m.classList.add("lit"); });
  }
  const annotated = $("#annotated"), rels = $(".rels ol");
  annotated.addEventListener("mouseover", e => { const m = e.target.closest("mark"); if (m) lightFromEntity(m); });
  annotated.addEventListener("mouseleave", clear);
  rels.addEventListener("mouseover", e => { const li = e.target.closest("li"); if (li) lightFromRelation(li); });
  rels.addEventListener("mouseleave", clear);

  /* ---------- architecture stepper (WAI-ARIA tabs) ---------- */
  const tabs = [...document.querySelectorAll('.stages [role="tab"]')];
  const fill = $(".pipe .fill");
  function select(i, focus) {
    tabs.forEach((t, j) => {
      const on = i === j;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      t.classList.toggle("passed", j < i);
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    fill.style.width = (i / (tabs.length - 1)) * 100 + "%";
    if (focus) tabs[i].focus();
  }
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(i));
    t.addEventListener("keydown", e => {
      const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (k) { e.preventDefault(); select((i + k + tabs.length) % tabs.length, true); }
      if (e.key === "Home") { e.preventDefault(); select(0, true); }
      if (e.key === "End") { e.preventDefault(); select(tabs.length - 1, true); }
    });
  });
  select(0);

  /* ---------- misc ---------- */
  const nav = $(".nav");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  $("#y").textContent = new Date().getFullYear();

  let saved = null; try { saved = localStorage.getItem("lang"); } catch (e) {}
  if (saved === "it") setLang("it"); else syncToggle();
})();
