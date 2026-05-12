const STORAGE_KEY = "yv_pamela_flashcards_v2";

const flashcards = [
  { english: "I am", portuguese: "eu sou / estou" },
  { english: "you are", portuguese: "você é / está" },
  { english: "he is", portuguese: "ele é / está" },
  { english: "she is", portuguese: "ela é / está" },
  { english: "we are", portuguese: "nós somos / estamos" },
  { english: "they are", portuguese: "eles/elas são / estão" },

  { english: "I am here", portuguese: "eu estou aqui" },
  { english: "He is my son", portuguese: "ele é meu filho" },
  { english: "Are you okay?", portuguese: "você está bem?" },
  { english: "Is it serious?", portuguese: "é sério?" },
  { english: "She isn't home", portuguese: "ela não está em casa" },
  { english: "your son", portuguese: "seu filho" },
  { english: "you're my friend", portuguese: "você é meu amigo" },

  { english: "wake up", portuguese: "acordar" },
  { english: "get up", portuguese: "levantar" },
  { english: "brush my teeth", portuguese: "escovar meus dentes" },
  { english: "take a shower", portuguese: "tomar banho" },
  { english: "eat breakfast", portuguese: "tomar café da manhã" },
  { english: "go to work", portuguese: "ir para o trabalho" },

  { english: "Do you drink coffee?", portuguese: "você bebe café?" },
  { english: "Does she work?", portuguese: "ela trabalha?" },
  { english: "I don't wake up late", portuguese: "eu não acordo tarde" },
  { english: "He doesn't drink soda", portuguese: "ele não bebe refrigerante" },

  { english: "airport", portuguese: "aeroporto" },
  { english: "flight", portuguese: "voo" },
  { english: "coffee", portuguese: "café" },
  { english: "tired", portuguese: "cansada" },

  { english: "Do you want to play outside?", portuguese: "Você quer brincar lá fora?" },
  { english: "Are you happy?", portuguese: "Você está feliz?" },
  { english: "You are happy", portuguese: "Você está feliz" },
  { english: "You aren't happy", portuguese: "Você não está feliz" },

  { english: "Excuse me, do you work here?", portuguese: "Com licença, você trabalha aqui?" },
  { english: "No, I don't work here.", portuguese: "Não, eu não trabalho aqui." },
  { english: "I can help you.", portuguese: "Eu posso te ajudar." },
  { english: "I come here often.", portuguese: "Eu venho aqui frequentemente." },

  { english: "Do you usually take the bus?", portuguese: "Você geralmente pega ônibus?" },
  { english: "No, I don't.", portuguese: "Não." },
  { english: "I usually come here by car.", portuguese: "Eu geralmente venho aqui de carro." },

  { english: "Do you have a kid?", portuguese: "Você tem filho/criança?" },
  { english: "Yes, I do. I have a son.", portuguese: "Sim. Eu tenho um filho." },
  { english: "Do you have a husband?", portuguese: "Você tem marido?" },
  { english: "Do you have a daughter?", portuguese: "Você tem uma filha?" },
  { english: "No, I don't. I have a son.", portuguese: "Não. Eu tenho um filho." },
  { english: "Do you have a favorite movie?", portuguese: "Você tem um filme favorito?" },

  { english: "What is your name?", portuguese: "Qual é o seu nome?" },
  { english: "What do you want to eat today?", portuguese: "O que você quer comer hoje?" },
  { english: "How often do you pick Pedro from school?", portuguese: "Com que frequência você busca o Pedro na escola?" },
  { english: "Not your business", portuguese: "Não é da sua conta" },

  { english: "wait", portuguese: "esperar" },
  { english: "waiting", portuguese: "esperando" },
  { english: "loving", portuguese: "amando" },
  { english: "playing", portuguese: "brincando / jogando" },
  { english: "drinking", portuguese: "bebendo" },
  { english: "eating", portuguese: "comendo" },

  { english: "I am drinking water.", portuguese: "Eu estou bebendo água." },
  { english: "I am eating a hamburger.", portuguese: "Eu estou comendo um hambúrguer." },
  { english: "I am waiting for Pedro.", portuguese: "Eu estou esperando Pedro." },
  { english: "He is waiting for me.", portuguese: "Ele está esperando por mim." },
  { english: "The boss is waiting for his project.", portuguese: "O chefe está esperando o projeto dele." },
  { english: "She is loving him.", portuguese: "Ela está amando ele." },
  { english: "I am playing with Pedro.", portuguese: "Eu estou brincando com Pedro." },

  { english: "with", portuguese: "com" },
  { english: "I am with my friend.", portuguese: "Eu estou com meu amigo." },
  { english: "I am with my son.", portuguese: "Eu estou com meu filho." },
  { english: "I am with my boss.", portuguese: "Eu estou com meu chefe." },

  { english: "daily", portuguese: "diariamente" },
  { english: "usually", portuguese: "geralmente" },
  { english: "often", portuguese: "frequentemente" },
  { english: "sometimes", portuguese: "de vez em quando" },
  { english: "every day", portuguese: "todos os dias" },
  { english: "every time", portuguese: "toda vez" },
  { english: "lovely", portuguese: "amavelmente / adorável" },
  { english: "frankly", portuguese: "francamente" },
  { english: "firmly", portuguese: "firmemente" },

  { english: "go", portuguese: "ir" },
  { english: "stay", portuguese: "ficar" },
  { english: "I am going to work.", portuguese: "Eu estou indo para o trabalho." },
  { english: "I am staying in bed all day.", portuguese: "Eu estou ficando na cama o dia todo." },

  { english: "Who is this woman?", portuguese: "Quem é essa mulher?" },
  { english: "Are you here?", portuguese: "Você está aqui?" },
  { english: "Do you need something?", portuguese: "Você precisa de alguma coisa?" },
  { english: "No, I don't.", portuguese: "Não." },
  { english: "Do you like him?", portuguese: "Você gosta dele?" },
  { english: "Is he your son?", portuguese: "Ele é seu filho?" },
  { english: "He is not.", portuguese: "Ele não é / não está." },

  { english: "need", portuguese: "precisar" },
  { english: "something", portuguese: "alguma coisa" },
  { english: "Do", portuguese: "fazer / auxiliar de pergunta" }
];

let state = loadState();
let queue = buildQueue();
let currentIndex = queue[0] ?? 0;

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function scoreFor(i) {
  const s = state[i] || { again: 0, hard: 0, easy: 0 };
  return 1 + (s.again || 0) * 4 + (s.hard || 0) * 2 - (s.easy || 0);
}

function buildQueue() {
  return flashcards.map((_, i) => i).sort((a, b) => scoreFor(b) - scoreFor(a));
}

function render() {
  const card = flashcards[currentIndex];
  const englishEl = document.getElementById("flashEnglish");
  const portugueseEl = document.getElementById("flashPortuguese");
  const flashcardEl = document.getElementById("flashcard");

  if (!card || !englishEl || !portugueseEl || !flashcardEl) return;

  englishEl.textContent = card.english;
  portugueseEl.textContent = card.portuguese;
  flashcardEl.classList.remove("flipped", "slide-left", "slide-right");

  updateStats();
}

function updateStats() {
  let known = 0;
  let review = 0;

  flashcards.forEach((_, i) => {
    const s = state[i] || {};
    if ((s.easy || 0) >= 2 && !(s.again || 0)) known++;
    else review++;
  });

  const knownEl = document.getElementById("knownCount");
  const reviewEl = document.getElementById("reviewCount");
  const totalEl = document.getElementById("totalCount");
  const progressEl = document.getElementById("progressNote");

  if (knownEl) knownEl.textContent = known;
  if (reviewEl) reviewEl.textContent = review;
  if (totalEl) totalEl.textContent = flashcards.length;
  if (progressEl) {
    const position = queue.indexOf(currentIndex) + 1;
    progressEl.textContent = `Card ${position || 1} / ${flashcards.length}`;
  }
}

function flipCard() {
  document.getElementById("flashcard")?.classList.toggle("flipped");
}

function speak(text) {
  if (!window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 0.84;

  window.speechSynthesis.speak(u);
}

function speakCard(e) {
  if (e) e.stopPropagation();
  speak(flashcards[currentIndex].english);
}

function gradeCard(type) {
  state[currentIndex] = state[currentIndex] || { again: 0, hard: 0, easy: 0 };
  state[currentIndex][type] = (state[currentIndex][type] || 0) + 1;

  if (type === "easy") {
    state[currentIndex].again = Math.max(0, (state[currentIndex].again || 0) - 1);
  }

  saveState();
  nextCard();
}

function nextCard() {
  const el = document.getElementById("flashcard");
  if (!el || !queue.length) return;

  el.classList.add("slide-left");

  setTimeout(() => {
    queue = buildQueue();
    const pos = queue.indexOf(currentIndex);
    currentIndex = queue[(pos + 1) % queue.length];
    render();
  }, 220);
}

function resetStats() {
  localStorage.removeItem(STORAGE_KEY);
  state = {};
  queue = buildQueue();
  currentIndex = queue[0] ?? 0;
  render();
}

let touchStartX = 0;
const el = document.getElementById("flashcard");

if (el) {
  el.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  el.addEventListener("touchend", e => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 70) nextCard();
  });
}

render();
