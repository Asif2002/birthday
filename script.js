const sections = ["countdown", "celebration", "present", "letter"];
const audio = document.getElementById("birthdayAudio");
const timerEl = document.getElementById("timer");
const openBtn = document.getElementById("openBtn");
const animations = document.getElementById("animations");

// ===== SECTION SWITCH =====
function show(id) {
  sections.forEach(s => document.getElementById(s).classList.remove("active"));
  document.getElementById(id).classList.add("active");

  // Pause music when on letter page
  if(id === "letter") {
    audio.pause();
  }
}

// ===== COUNTDOWN =====
// Target date: 17 Jan 2026, 12:00 AM
const targetDate = new Date("2026-01-17T00:00:00").getTime();

// Update countdown every second
const countdown = setInterval(() => {
  const now = Date.now();
  let diff = targetDate - now;

  if(diff <= 0){
    clearInterval(countdown);
    timerEl.textContent = "00:00:00";
    openBtn.classList.remove("hidden"); // Show "Open Music" button
    return;
  }

  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  timerEl.textContent = 
    `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}, 1000);

// ===== OPEN MUSIC & SHOW CELEBRATION =====
openBtn.onclick = () => {
  audio.play().catch(()=>console.log("User must interact to allow audio"));
  show("celebration");
};

// ===== CUT CAKE =====
document.getElementById("cutCake").onclick = () => {
  document.getElementById("cake").style.display = "none";
  const video = document.getElementById("cake-video");
  video.hidden = false;
  video.play();

  spawnBalloons(20);
  spawnConfetti(40);

  video.onended = () => show("present");
};

// ===== PRESENT → LETTER =====
document.getElementById("openGift").onclick = () => {
  show("letter");
  audio.pause();
  i = 0;
  document.getElementById("letterText").textContent = "";
  typeLetter();
};

// ===== LETTER TEXT =====
const letter = `
Happy Birthday TO Someone
Who is doing her BEST

Tomar hard work dekhe vabi, sobai ke janai,
Je tomar calculation, calculator keo har manai.
Tomar hasi dekhe mon hoye jai valo,
Jeno ondhokar ghore keu jalacche ujjol alo.

Haste dekhte chai tomake ei bochor o,
Keu kadale bari dibo, seita hok ami o.
Tomar choto khato sob iccha puron korte valo lage,
Jeno ei icchatei amar nijer valo lage.

InshaAllah ei bochor hobe the best,
CG 4 uthanor por e hobe iktu rest.
You are doing so great, eta ami jani,
InshaAllah tomar ei year tao hobe greatest, ami mani.
`;

let i = 0;
function typeLetter() {
  const el = document.getElementById("letterText");
  if(i < letter.length){
    el.textContent += letter[i++];
    setTimeout(typeLetter, 70);
  }
}

// ===== BALLOONS & CONFETTI =====
function spawnBalloons(n){
  for(let i=0; i<n; i++){
    const b = document.createElement("div");
    b.className = "balloon";
    b.style.left = Math.random() * 90 + "vw";
    b.style.background = `hsl(${Math.random()*360},80%,60%)`;
    animations.appendChild(b);
    setTimeout(()=>b.remove(), 4000);
  }
}

function spawnConfetti(n){
  for(let i=0; i<n; i++){
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 90 + "vw";
    c.style.background = `hsl(${Math.random()*360},90%,60%)`;
    animations.appendChild(c);
    setTimeout(()=>c.remove(), 3000);
  }
}
