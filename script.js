// ============================================================
// YV English — Pamela Cristina Student Hub
// Front-end only access control + content rendering
// UPDATED: Semana 3 + Pedro's Weekly Diary + new vocabulary
// ============================================================

const STUDENT_PASSWORD = "cristina02";
const MASTER_PASSWORD = "yv314724";
const AUTH_KEY = "yv_pamela_auth_until";
const SESSION_KEY = "yv_pamela_session_auth";
const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;
const PLAN = document.body.getAttribute("data-plan") || "Foundation";

const DAILY_LIST = [
  {
    label: "To Be + Rotina",
    text: "Pamela is Brazilian and she is learning English. In the morning, she wakes up, brushes her teeth, eats breakfast and goes to work. She is busy, but she is happy because she is practicing every day.",
    questions: [
      { question: "Is Pamela Brazilian?", options: [{letter:"a",text:"Yes, she is"},{letter:"b",text:"No, she isn't"},{letter:"c",text:"Yes, she does"}], answer:"a" },
      { question: "What does Pamela do in the morning?", options: [{letter:"a",text:"She wakes up and brushes her teeth"},{letter:"b",text:"She goes to school"},{letter:"c",text:"She drinks soda"}], answer:"a" },
      { question: "Is Pamela busy?", options: [{letter:"a",text:"Yes, she is"},{letter:"b",text:"No, she isn't"},{letter:"c",text:"No, she doesn't"}], answer:"a" },
      { question: "Why is she happy?", options: [{letter:"a",text:"Because she is practicing every day"},{letter:"b",text:"Because she is sleeping"},{letter:"c",text:"Because she doesn't work"}], answer:"a" }
    ]
  },
  {
    label: "Do / Does",
    text: "Marina is at the airport. She talks to Oliver. Oliver drinks coffee every morning. Marina likes coffee too. She doesn't drink soda in the morning. They talk about work and daily routines.",
    questions: [
      { question: "Where is Marina?", options: [{letter:"a",text:"At the airport"},{letter:"b",text:"At school"},{letter:"c",text:"At home"}], answer:"a" },
      { question: "Does Oliver drink coffee?", options: [{letter:"a",text:"Yes, he does"},{letter:"b",text:"No, he doesn't"},{letter:"c",text:"Yes, he is"}], answer:"a" },
      { question: "Does Marina drink soda in the morning?", options: [{letter:"a",text:"Yes, she does"},{letter:"b",text:"No, she doesn't"},{letter:"c",text:"No, she isn't"}], answer:"b" },
      { question: "What do they talk about?", options: [{letter:"a",text:"Work and daily routines"},{letter:"b",text:"School only"},{letter:"c",text:"Music"}], answer:"a" }
    ]
  },
  {
    label: "Pedro's Diary",
    text: "Pedro is three years old. This week he is playing outside, eating cookies and staying with Pamela. Pamela is writing a small diary in English about Pedro. She is practicing simple sentences every week.",
    questions: [
      { question: "How old is Pedro?", options: [{letter:"a",text:"He is three"},{letter:"b",text:"He is thirteen"},{letter:"c",text:"He is thirty"}], answer:"a" },
      { question: "What is Pamela writing?", options: [{letter:"a",text:"A small diary in English"},{letter:"b",text:"A long book"},{letter:"c",text:"A movie script"}], answer:"a" },
      { question: "Is Pedro playing outside?", options: [{letter:"a",text:"Yes, he is"},{letter:"b",text:"No, he isn't"},{letter:"c",text:"Yes, he does"}], answer:"a" },
      { question: "Why is Pamela writing the diary?", options: [{letter:"a",text:"To practice simple English every week"},{letter:"b",text:"To stop studying"},{letter:"c",text:"To work at school"}], answer:"a" }
    ]
  }
];
const DAILY = DAILY_LIST[Math.floor(Date.now() / 86400000) % DAILY_LIST.length];

const WEEKS = [
  {
    number: 1,
    title: "To Be — Complete",
    focus: "Dominar o verbo To Be em afirmativa, interrogativa e negativa.",
    pdfs: [],
    audios: [{ label: "Pronúncia — enviado pelo WhatsApp", url: "" }],
    links: [],
    videos: [],
    exercises: [
      "Escreva 3 frases afirmativas sobre você e sua família.",
      "Transforme em pergunta: You are okay. / He is your son. / They are friends.",
      "Escreva a negativa de: I am home. / She is here. / They are at school."
    ],
    notes: [
      "I am = eu sou/estou | You are = você é/está | He is = ele é/está | She is = ela é/está.",
      "Perguntas: Are you okay? / Is he your son? / Is it serious?",
      "Negativas: I am not / He isn't / She isn't / We aren't / They aren't.",
      "Your = seu/sua | You're = you are."
    ],
    classwork: [
      {
        title: "Atividade — To Be",
        instruction: "Complete com am, is ou are.",
        items: [
          { q: "I ___ Pamela.", a: "I am Pamela." },
          { q: "Pedro ___ my son.", a: "Pedro is my son." },
          { q: "They ___ at school.", a: "They are at school." },
          { q: "She ___ not home.", a: "She is not home." }
        ]
      }
    ],
    vocabulary: [
      { word:"I am", translation:"eu sou / estou", phonetic:"/ai am/" },
      { word:"you are", translation:"você é / está", phonetic:"/yu ar/" },
      { word:"he is", translation:"ele é / está", phonetic:"/hi iz/" },
      { word:"she is", translation:"ela é / está", phonetic:"/shi iz/" },
      { word:"we are", translation:"nós somos / estamos", phonetic:"/wi ar/" },
      { word:"they are", translation:"eles/elas são / estão", phonetic:"/dhei ar/" },
      { word:"isn't", translation:"não é / não está", phonetic:"/iznt/" },
      { word:"aren't", translation:"não são / não estão", phonetic:"/arnt/" },
      { word:"here", translation:"aqui", phonetic:"/hir/" },
      { word:"home", translation:"em casa", phonetic:"/houm/" },
      { word:"hungry", translation:"com fome", phonetic:"/hangri/" },
      { word:"your", translation:"seu / sua", phonetic:"/yor/" },
      { word:"you're", translation:"you are / você é ou está", phonetic:"/yor/" }
    ]
  },
  {
    number: 2,
    title: "Airport + Daily Routine",
    focus: "Praticar To Be, Daily Routine, Do/Does e Don't/Doesn't com um diálogo no aeroporto.",
    pdfs: [],
    audios: [{ label: "Pronúncia — enviado pelo WhatsApp", url: "" }],
    links: [],
    videos: [],
    exercises: [
      "Leia o diálogo Marina & Oliver e responda as perguntas de interpretação.",
      "Complete frases com Do/Does e Don't/Doesn't.",
      "Clique nos cards de rotina e repita as frases em voz alta."
    ],
    notes: [
      "Do = I/you/we/they | Does = he/she/it.",
      "Don't = I/you/we/they | Doesn't = he/she/it.",
      "Daily routine: wake up, get up, brush my teeth, take a shower, eat breakfast, go to work."
    ],
    classwork: [],
    vocabulary: [
      { word:"wake up", translation:"acordar", phonetic:"/weik ap/" },
      { word:"get up", translation:"levantar", phonetic:"/get ap/" },
      { word:"brush my teeth", translation:"escovar meus dentes", phonetic:"/brash mai tith/" },
      { word:"take a shower", translation:"tomar banho", phonetic:"/teik a shauer/" },
      { word:"eat breakfast", translation:"tomar café da manhã", phonetic:"/it brekfast/" },
      { word:"go to work", translation:"ir para o trabalho", phonetic:"/go tu werk/" },
      { word:"airport", translation:"aeroporto", phonetic:"/erport/" },
      { word:"flight", translation:"voo", phonetic:"/flait/" },
      { word:"coffee", translation:"café", phonetic:"/kofi/" },
      { word:"tired", translation:"cansada", phonetic:"/taird/" }
    ]
  },
  {
    number: 3,
    title: "Daily Routines + ING + Frequency",
    focus: "Usar rotina diária, verbos em -ing, perguntas com Do e vocabulário com -ly em frases reais sobre Pamela e Pedro.",
    pdfs: [],
    audios: [{ label: "Pronúncia — enviado pelo WhatsApp", url: "" }],
    links: [],
    videos: [],
    exercises: [
      "Escreva 3 frases sobre Pedro usando ING: Pedro is playing... / Pedro is eating... / Pedro is waiting...",
      "Responda em inglês: Do you have a kid? / Do you have a husband? / Do you usually take the bus?",
      "Faça 3 frases com usually, sometimes e every day.",
      "Escreva 3 linhas para o Pedro's Weekly Diary desta semana."
    ],
    notes: [
      "ING = ação acontecendo agora: I am drinking water. / I am waiting for Pedro. / I am playing with Pedro.",
      "Don't = negação com I/you/we/they: No, I don't. / I don't work here.",
      "Do = auxiliar para pergunta: Do you work here? / Do you have a son? / Do you like him?",
      "Usually = geralmente | Often = frequentemente | Sometimes = de vez em quando | Every day = todos os dias.",
      "Palavras terminadas em -ly muitas vezes viram '-mente': daily = diariamente, frankly = francamente, firmly = firmemente.",
      "Not your business = não é da sua conta. Use com cuidado, porque pode soar rude."
    ],
    classwork: [
      {
        title: "Pedro's Weekly Diary — exercício extra",
        instruction: "Pamela vai mandar algumas linhas toda semana. Cole aqui ou use como modelo para transformar a rotina do Pedro em inglês simples.",
        items: [
          { q: "Hoje o Pedro brincou lá fora.", a: "Today Pedro played outside. / Pedro is playing outside." },
          { q: "Pedro está esperando por mim.", a: "Pedro is waiting for me." },
          { q: "Eu estou brincando com Pedro.", a: "I am playing with Pedro." },
          { q: "Pedro quer comer um biscoito.", a: "Pedro wants to eat a cookie." },
          { q: "Toda vez que venho aqui, tenho que comer um biscoito.", a: "Every time I come here, I have to eat a cookie." }
        ]
      },
      {
        title: "Atividade — Do / Don't",
        instruction: "Responda com Yes, I do ou No, I don't.",
        items: [
          { q: "Do you have a kid?", a: "Yes, I do. I have a son." },
          { q: "Do you have a daughter?", a: "No, I don't. I have a son." },
          { q: "Do you have a favorite movie?", a: "No, I don't." },
          { q: "Do you usually take the bus?", a: "No, I don't. I usually come here by car." },
          { q: "Do you like him?", a: "No, I don't." }
        ]
      },
      {
        title: "Atividade — ING",
        instruction: "Complete com am/is + verbo com ING.",
        items: [
          { q: "I ___ ___ water. (drink)", a: "I am drinking water." },
          { q: "I ___ ___ a hamburger. (eat)", a: "I am eating a hamburger." },
          { q: "I ___ ___ for Pedro. (wait)", a: "I am waiting for Pedro." },
          { q: "He ___ ___ for me. (wait)", a: "He is waiting for me." },
          { q: "She ___ ___ him. (love)", a: "She is loving him." }
        ]
      }
    ],
    vocabulary: [
      { word:"Do you want to play outside?", translation:"Você quer brincar lá fora?", phonetic:"/du yu want tu plei autsaid/" },
      { word:"Are you happy?", translation:"Você está feliz?", phonetic:"/ar yu répi/" },
      { word:"You aren't happy", translation:"Você não está feliz", phonetic:"/yu arnt répi/" },
      { word:"Excuse me", translation:"com licença", phonetic:"/ikskíuz mi/" },
      { word:"Do you work here?", translation:"Você trabalha aqui?", phonetic:"/du yu werk hir/" },
      { word:"I don't work here", translation:"eu não trabalho aqui", phonetic:"/ai dont werk hir/" },
      { word:"I can help you", translation:"eu posso te ajudar", phonetic:"/ai ken rélp yu/" },
      { word:"often", translation:"frequentemente", phonetic:"/ófen/" },
      { word:"usually", translation:"geralmente", phonetic:"/iújuali/" },
      { word:"sometimes", translation:"de vez em quando", phonetic:"/sâmtaimz/" },
      { word:"every day", translation:"todos os dias", phonetic:"/évri dei/" },
      { word:"every time", translation:"toda vez", phonetic:"/évri taim/" },
      { word:"kid", translation:"criança / filho(a)", phonetic:"/kid/" },
      { word:"husband", translation:"marido", phonetic:"/râzband/" },
      { word:"daughter", translation:"filha", phonetic:"/dóter/" },
      { word:"son", translation:"filho", phonetic:"/san/" },
      { word:"favorite movie", translation:"filme favorito", phonetic:"/feivrit múvi/" },
      { word:"not your business", translation:"não é da sua conta", phonetic:"/nat yor bíznes/" },
      { word:"wait", translation:"esperar", phonetic:"/weit/" },
      { word:"waiting", translation:"esperando", phonetic:"/weiting/" },
      { word:"loving", translation:"amando", phonetic:"/lâving/" },
      { word:"playing", translation:"brincando / jogando", phonetic:"/pleiing/" },
      { word:"drinking", translation:"bebendo", phonetic:"/drinking/" },
      { word:"eating", translation:"comendo", phonetic:"/íting/" },
      { word:"with", translation:"com", phonetic:"/with/" },
      { word:"daily", translation:"diariamente", phonetic:"/deili/" },
      { word:"lovely", translation:"amavelmente / adorável", phonetic:"/lâvli/" },
      { word:"frankly", translation:"francamente", phonetic:"/frénkli/" },
      { word:"firmly", translation:"firmemente", phonetic:"/fârmli/" },
      { word:"go", translation:"ir", phonetic:"/go/" },
      { word:"stay", translation:"ficar", phonetic:"/stei/" },
      { word:"I am going to work", translation:"eu estou indo para o trabalho", phonetic:"/ai am going tu werk/" },
      { word:"I am staying in bed", translation:"eu estou ficando na cama", phonetic:"/ai am steiing in bed/" },
      { word:"Who is this woman?", translation:"Quem é essa mulher?", phonetic:"/hu iz this wuman/" },
      { word:"need", translation:"precisar", phonetic:"/nid/" },
      { word:"something", translation:"alguma coisa", phonetic:"/sâmthing/" },
      { word:"Do", translation:"fazer / auxiliar de pergunta", phonetic:"/du/" }
    ]
  }
];

const EXTRA_EXERCISES = [
  {
    week: 2,
    title: "To Be",
    tag: "To Be + Do/Does",
    description: "Rotina diária e exercícios interativos.",
    url: "https://yvenglish.github.io/extra_tobe_pamela_cristina/"
  },
  {
    week: 1,
    title: "Build Your To BE",
    tag: 
      "",
    description: "Lista de exercício de To Be",
    url: "https://yvenglish.github.io/build_your_to_be/"
  }
];

const EXTRA_CONTENT = {
  podcasts: [
    { title: "Easy listening", description: "Inglês Rapidão.", url: "https://open.spotify.com/episode/2Fav0lLdGWK23pBw7gYqPP?si=2jxEaP6GRLudiaB6FBz-ow" }
  ],
  books: [
    { title: "Beginner reader", description: "News in Levels - Notícias do mundo em inglês para todos os níveis.", url: "https://newsinlevels.com/" }
  ],
  videos: [
    { title: "Daily routine video", description: "Adicione aqui vídeos com vocabulário de rotina diária.", url: "https://www.youtube.com/watch?v=bq6GBbh3uhU" }
  ],
  websites: [
    { title: "Useful websites", description: "Adicione aqui sites para prática de listening/vocabulário.", url: "" }
  ],
  notes: [
    { title: "Yas' notes", description: "Revisar um pouco todos os dias. Repetir em voz alta antes de dormir. Escrever um diário em inglês", url: "" }
  ]
};

let activeContentTab = "podcasts";
let CW_ANSWERS = {};

function logoutStudent(){ localStorage.removeItem(AUTH_KEY); sessionStorage.removeItem(SESSION_KEY); window.location.href="login.html"; }
function scrollToSection(id){ document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); }
function hasContent(arr){ return Array.isArray(arr) && arr.filter(i => i && (i.label || typeof i === "string")).length > 0; }
function getWeekExtraExercises(weekNumber){ return EXTRA_EXERCISES.filter(item => item.week === weekNumber); }

function speakWord(word, btn){
  if(!window.speechSynthesis)return;
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(word);
  u.lang="en-US";
  u.rate=.84;
  if(btn){
    btn.classList.add("speaking");
    u.onend=()=>btn.classList.remove("speaking");
    u.onerror=()=>btn.classList.remove("speaking");
  }
  window.speechSynthesis.speak(u);
}

function openDaily(){
  const overlay=document.getElementById("dailyOverlay"), body=document.getElementById("dailyBody"), dateEl=document.getElementById("dailyDate");
  dateEl.textContent = DAILY.label;
  if(PLAN !== "Fluency" && PLAN !== "Performance"){
    body.innerHTML = '<div class="daily-locked"><span class="daily-lock-icon">🔒</span><h3>Daily Content bloqueado</h3><p>O Daily Content é exclusivo para alunas dos planos <strong>Fluency</strong> e <strong>Performance</strong>.</p></div>';
  } else {
    let html = '<div class="daily-text-wrap"><h3 class="res-title">Texto de hoje</h3><div class="daily-text">'+DAILY.text+'</div></div><div class="daily-questions-wrap"><h3 class="res-title" style="margin-top:24px">Exercícios</h3><div class="daily-questions">';
    DAILY.questions.forEach((q, qi)=>{
      html += '<div class="daily-q" id="q'+qi+'"><p class="daily-q-text"><strong>'+(qi+1)+'.</strong> '+q.question+'</p><div class="daily-options">';
      q.options.forEach(opt=>{ html += '<button class="daily-opt" id="q'+qi+'-'+opt.letter+'" onclick="checkAnswer('+qi+',\''+opt.letter+'\',\''+q.answer+'\')"><span class="opt-letter">'+opt.letter+'</span><span class="opt-text">'+opt.text+'</span></button>'; });
      html += '</div><p class="daily-feedback" id="feedback'+qi+'"></p></div>';
    });
    html += '</div><div class="daily-action-btns"><button class="daily-reset-btn" onclick="openDaily()">Recomeçar ↺</button></div></div>';
    body.innerHTML = html;
  }
  overlay.classList.add("open");
  document.body.style.overflow="hidden";
}

function checkAnswer(qi, chosen, correct){
  document.querySelectorAll("#q"+qi+" .daily-opt").forEach(btn=>btn.disabled=true);
  const chosenBtn=document.getElementById("q"+qi+"-"+chosen), correctBtn=document.getElementById("q"+qi+"-"+correct), feedback=document.getElementById("feedback"+qi);
  if(chosen===correct){
    chosenBtn.classList.add("correct");
    feedback.textContent="✦ Correct!";
    feedback.className="daily-feedback feedback-correct";
  } else {
    chosenBtn.classList.add("wrong");
    correctBtn.classList.add("correct");
    feedback.textContent="The correct answer is "+correct.toUpperCase()+".";
    feedback.className="daily-feedback feedback-wrong";
  }
}

function closeDaily(){
  document.getElementById("dailyOverlay").classList.remove("open");
  document.body.style.overflow="";
}

function renderGrid(){
  const grid=document.getElementById("weeksGrid");
  if(!grid) return;
  grid.innerHTML = WEEKS.map((w,i)=>{
    let icons="";
    if(hasContent(w.pdfs)) icons+='<span class="ricon ricon-pdf" title="PDF">P</span>';
    if(hasContent(w.audios)) icons+='<span class="ricon ricon-audio" title="Áudio">A</span>';
    if(hasContent(w.exercises)) icons+='<span class="ricon ricon-exercise" title="Exercícios">E</span>';
    if(getWeekExtraExercises(w.number).length) icons+='<span class="ricon ricon-extra" title="Extra">+</span>';
    if(hasContent(w.links)) icons+='<span class="ricon ricon-link" title="Links">L</span>';
    if(w.vocabulary?.length) icons+='<span class="ricon ricon-vocab" title="Vocabulário">W</span>';
    return '<article class="week-card" onclick="openModal('+i+')" tabindex="0"><div class="card-head"><p class="card-number">Semana '+w.number+'</p><h2 class="card-title">'+w.title+'</h2></div><div class="card-body"><p class="card-focus">'+w.focus+'</p><div class="card-icons">'+icons+'</div><div class="card-cta"><span>Ver material</span><span class="card-cta-arrow">→</span></div></div></article>';
  }).join("");
}

function renderExtraExercisesHome(){
  const grid=document.getElementById("extraExercisesGrid");
  if(!grid) return;
  grid.innerHTML = EXTRA_EXERCISES.map(item => {
    const isPlaceholder = !item.url || item.url === "#";
    const action = isPlaceholder ? '<em>Será atualizado semanalmente pela Yas</em>' : '<a href="'+item.url+'" target="_blank">Abrir exercício →</a>';
    return '<article class="extra-exercise-card"><span>'+item.tag+'</span><h3>'+item.title+'</h3><p>'+item.description+'</p>'+action+'</article>';
  }).join("");
}

function renderExtraContent(){
  const tabs=document.getElementById("contentTabs"), grid=document.getElementById("extraContentGrid");
  if(!tabs || !grid) return;
  const labels={podcasts:"Podcasts",books:"Books",videos:"Videos",websites:"Websites",notes:"Yas' Notes"};
  tabs.innerHTML = Object.keys(EXTRA_CONTENT).map(key => '<button class="content-tab '+(key===activeContentTab?'active':'')+'" onclick="setContentTab(\''+key+'\')">'+labels[key]+'</button>').join("");
  grid.innerHTML = EXTRA_CONTENT[activeContentTab].map(item => '<article class="content-card"><h3>'+item.title+'</h3><p>'+item.description+'</p>'+(item.url?'<a href="'+item.url+'" target="_blank">Abrir conteúdo ↗</a>':'<em>Adicione um link aqui depois</em>')+'</article>').join("");
}
function setContentTab(tab){ activeContentTab=tab; renderExtraContent(); }

function openModal(index){
  const w=WEEKS[index];
  document.getElementById("modalWeekLabel").textContent="Semana "+w.number;
  document.getElementById("modalTitle").textContent=w.title;
  document.getElementById("modalFocus").textContent=w.focus || "";
  document.getElementById("modalBody").innerHTML = renderPdfs(w.pdfs)+renderExercises(w.exercises)+renderWeekExtraExercises(w.number)+renderAudios(w.audios)+renderLinks(w.links)+renderVideos(w.videos)+renderNotes(w.notes)+renderClasswork(w.classwork)+renderVocabulary(w.vocabulary)+'<div class="yas-tip"><strong>Dica da YV</strong>Pratique todos os dias um pouco. Consistência é o que te leva à fluência. ✦</div>';
  document.getElementById("overlay").classList.add("open");
  document.body.style.overflow="hidden";
}

function closeModal(){
  if(window.speechSynthesis) window.speechSynthesis.cancel();
  document.getElementById("overlay").classList.remove("open");
  document.body.style.overflow="";
}

function renderPdfs(pdfs){
  const items=(pdfs||[]).filter(p=>p.label);
  if(!items.length)return"";
  return '<div class="resource-section"><h3 class="res-title">PDFs</h3><div class="res-list">'+items.map(p=>'<div class="res-item"><span class="res-item-label">'+p.label+'</span><div class="res-actions"><a href="'+p.url+'" target="_blank" class="btn-open">Abrir ↗</a><a href="'+p.url+'" download class="btn-download">Baixar</a></div></div>').join("")+'</div></div>';
}
function renderExercises(exercises){
  const items=(exercises||[]).filter(Boolean);
  if(!items.length)return"";
  return '<div class="resource-section"><h3 class="res-title">Exercícios</h3><ul class="exercise-list">'+items.map(e=>'<li>'+e+'</li>').join("")+'</ul></div>';
}
function renderWeekExtraExercises(weekNumber){
  const items=getWeekExtraExercises(weekNumber);
  if(!items.length)return"";
  return '<div class="resource-section"><h3 class="res-title">Exercícios extras</h3><div class="res-list">'+items.map(item=>{
    const isPlaceholder = !item.url || item.url === "#";
    const action = isPlaceholder ? '<span class="via-whatsapp">atualizado pela Yas</span>' : '<div class="res-actions"><a href="'+item.url+'" target="_blank" class="btn-open">Abrir ↗</a></div>';
    return '<div class="res-item"><span class="res-item-label"><strong>'+item.title+'</strong><br><small>'+item.description+'</small></span>'+action+'</div>';
  }).join("")+'</div></div>';
}
function renderAudios(audios){
  const items=(audios||[]).filter(a=>a.label);
  if(!items.length)return"";
  return '<div class="resource-section"><h3 class="res-title">Áudios</h3><div class="res-list">'+items.map(a=>a.url?'<div class="res-item audio-item"><span class="res-item-label">'+a.label+'</span><audio controls preload="none"><source src="'+a.url+'"></audio></div>':'<div class="res-item"><span class="res-item-label">'+a.label+'</span><span class="via-whatsapp">via WhatsApp</span></div>').join("")+'</div></div>';
}
function renderLinks(links){
  const items=(links||[]).filter(l=>l.label);
  if(!items.length)return"";
  return '<div class="resource-section"><h3 class="res-title">Links</h3><div class="res-list">'+items.map(l=>'<div class="res-item"><span class="res-item-label">'+l.label+'</span><div class="res-actions"><a href="'+l.url+'" target="_blank" class="btn-open">Abrir ↗</a></div></div>').join("")+'</div></div>';
}
function renderVideos(videos){
  const items=(videos||[]).filter(v=>v.label);
  if(!items.length)return"";
  return '<div class="resource-section"><h3 class="res-title">Vídeos</h3><div class="res-list">'+items.map(v=>'<div class="res-item"><span class="res-item-label">'+v.label+'</span><div class="res-actions"><a href="'+v.url+'" target="_blank" class="btn-open">Assistir ↗</a></div></div>').join("")+'</div></div>';
}
function renderNotes(notes){
  const items=(notes||[]).filter(Boolean);
  if(!items.length)return"";
  return '<div class="resource-section"><h3 class="res-title">Notas da aula</h3><ul class="notes-list">'+items.map(n=>'<li>'+n+'</li>').join("")+'</ul></div>';
}
function renderClasswork(classwork){
  const sections=(classwork||[]).filter(s=>s.title);
  if(!sections.length)return"";
  let html="";
  sections.forEach((section,si)=>{
    html+='<div class="resource-section"><h3 class="res-title">'+section.title+'</h3><p class="classwork-instruction">'+section.instruction+'</p><div class="classwork-list">';
    section.items.forEach((item,ii)=>{
      const key="cw_"+si+"_"+ii+"_"+Math.random().toString(16).slice(2);
      CW_ANSWERS[key]=item.a;
      html+='<div class="classwork-item"><p class="classwork-q"><strong>'+(ii+1)+'.</strong> '+item.q+'</p><button class="classwork-reveal-btn" onclick="revealAnswer(this,\''+key+'\')">Ver resposta</button><p class="classwork-answer" id="'+key+'" style="display:none"></p></div>';
    });
    html+='</div></div>';
  });
  return html;
}
function revealAnswer(btn,key){
  const el=document.getElementById(key);
  if(el){el.textContent=CW_ANSWERS[key]||""; el.style.display="block";}
  btn.style.display="none";
}
function renderVocabulary(vocabulary){
  const items=(vocabulary||[]).filter(v=>v.word);
  if(!items.length)return"";
  window._vocabWords=[];
  return '<div class="resource-section"><h3 class="res-title">Vocabulário</h3><div class="vocab-grid">'+items.map((v,i)=>{
    window._vocabWords[i]=v.word;
    return '<div class="vocab-card" tabindex="0" onclick="this.classList.toggle(\'flipped\')"><div class="vocab-front"><button class="vocab-speak-btn" onclick="event.stopPropagation();speakVocab('+i+',this)" title="Ouvir">🔊</button><div class="vocab-front-inner"><span class="vocab-word">'+v.word+'</span>'+(v.phonetic?'<span class="vocab-phonetic">'+v.phonetic+'</span>':'')+'</div><span class="vocab-hint">toque para ver</span></div><div class="vocab-back"><span class="vocab-translation">'+v.translation+'</span></div></div>';
  }).join("")+'</div></div>';
}
function speakVocab(i,btn){ if(window._vocabWords?.[i]) speakWord(window._vocabWords[i],btn); }

function getAllGlossary(){
  const all=[];
  WEEKS.forEach(w=>(w.vocabulary||[]).forEach(v=>{ if(v.word) all.push({...v,week:w.number}); }));
  return all;
}
function buildGlossaryHTML(){
  const all=getAllGlossary();
  if(!all.length) return '<div class="glossary-empty">Nenhuma palavra adicionada ainda.</div>';
  return all.map(v=>'<div class="glossary-row"><button class="glos-speak" onclick="speakWord(\''+v.word.replace(/'/g,"\\'")+'\',this)">🔊</button><span class="glos-word">'+v.word+'</span><span class="glos-trans">'+v.translation+(v.phonetic?' <small class="glos-phonetic">'+v.phonetic+'</small>':'')+'</span><span class="glos-week-badge">Sem. '+v.week+'</span></div>').join("");
}
function renderGlossary(){
  const glossary = document.getElementById("glossarySection");
  if(glossary) glossary.innerHTML=buildGlossaryHTML();
}
function toggleGlossary(){
  const section=document.getElementById("glossarySection"), cta=document.getElementById("glossaryBtnCta");
  if(!section || !cta) return;
  const isOpen=section.style.display!=="none";
  section.style.display=isOpen?"none":"block";
  cta.textContent=isOpen?"Ver palavras →":"Esconder palavras ↑";
}

const overlayEl = document.getElementById("overlay");
if(overlayEl) overlayEl.addEventListener("click", e=>{ if(e.target===e.currentTarget) closeModal(); });

const dailyOverlayEl = document.getElementById("dailyOverlay");
if(dailyOverlayEl) dailyOverlayEl.addEventListener("click", e=>{ if(e.target===e.currentTarget) closeDaily(); });

document.addEventListener("keydown", e=>{ if(e.key==="Escape"){ closeModal(); closeDaily(); }});

renderGrid();
renderExtraExercisesHome();
renderExtraContent();
renderGlossary();
