// ===== Edit your details here =====
const CONFIG = {
name: "Your Beautiful Name",
birthday: "2026-10-12T00:00:00",
message: `Happy Birthday❤️

I wish your life is always filled with happiness, success and beautiful moments.

Thank you for being such a special person.

Keep smiling and always shine✨

Enjoy your special day🎂`,
images: ["images/photo1.jpg", "images/photo2.jpg", "images/photo3.jpg", "images/photo4.jpg"]
};

const $ = s => document.querySelector(s);
const show = el => {
el.classList.remove("hidden");
el.classList.add("reveal");
setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
};
const lite = false;
if (lite) document.documentElement.classList.add("lite");

function type(el, text, speed, done) {
const chars = Array.from(text);
let i = 0;
  (function step() {
if (i < chars.length) { el.textContent += chars[i++]; setTimeout(step, speed); }
else if (done) done();
  })();
}

// ===== Names + opening =====
$("#heroName").textContent = CONFIG.name;
$("#finalName").textContent = CONFIG.name;
type($("#typingName"), CONFIG.name, 110);

// ===== Video: loads only after "Begin", pauses when hidden =====
const bgVideo = $("#bgVideo");
const popup = $("#popup");
function playVideo() {
if (lite) return;
bgVideo.play().then(() => bgVideo.classList.add("on")).catch(() => {});
}
document.addEventListener("visibilitychange", () => {
if (document.hidden) bgVideo.pause();
else if (bgVideo.classList.contains("on") && popup.classList.contains("hidden")) bgVideo.play().catch(() => {});
});

$("#beginBtn").addEventListener("click", () => {
document.body.classList.remove("locked");
  $("#opening").classList.add("hide");
setTimeout(() => $("#opening").remove(), 1000);
bgVideo.load();
playVideo();
burst(innerWidth / 2, innerHeight / 3);
});

// ===== Flow =====
$("#giftBtn").addEventListener("click", () => show($("#letterSection")));

const env = $("#envelope"), letterNext = $("#letterNext");
let opened = false;
function openEnvelope() {
if (opened) return;
opened = true;
env.classList.add("open");
setTimeout(() => type($("#letterText"), CONFIG.message, 35, () => {
letterNext.classList.remove("hidden");
letterNext.classList.add("reveal");
  }), 1300);
}
env.addEventListener("click", openEnvelope);
env.addEventListener("keydown", e => {
if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openEnvelope(); }
});

const gallery = $("#gallery"), galleryNext = $("#galleryNext");
letterNext.addEventListener("click", () => {
show(gallery);
go(0);
CONFIG.images.slice(1).forEach(s => { new Image().src = s; });
setTimeout(() => galleryNext.classList.remove("hidden"), 700);
letterNext.style.display = "none";
});
galleryNext.addEventListener("click", () => { show($(".story-section")); galleryNext.style.display = "none"; });
$("#storyNextBtn").addEventListener("click", () => show($(".final-section")));

// ===== Countdown (updates text only, no DOM rebuild) =====
const target = new Date(CONFIG.birthday).getTime();
const timerBox = $("#timer");
timerBox.innerHTML = ["Days", "Hours", "Minutes", "Seconds"]
  .map(u => `<div class="time-box"><span>00</span><small>${u}</small></div>`).join("");
const nums = [...timerBox.querySelectorAll("span")];
let timerId;
function tick() {
const d = target - Date.now();
if (d <= 0) {
    $("#timerTitle").textContent = "Today is your day🎉";
timerBox.remove();
clearInterval(timerId);
return;
  }
  [d / 864e5, d % 864e5 / 36e5, d % 36e5 / 6e4, d % 6e4 / 1e3]
    .forEach((v, i) => { nums[i].textContent = String(Math.floor(v)).padStart(2, "0"); });
}
timerId = setInterval(tick, 1000);
tick();

// ===== Gallery: preloaded, fade, swipe, dots, autoplay only while visible =====
const img = $("#galleryImage"), dotsBox = $("#dots"), n = CONFIG.images.length;
let cur = 0, autoId;
dotsBox.innerHTML = CONFIG.images.map((_, i) => `<button class="dot" data-i="${i}" aria-label="Photo ${i + 1}"></button>`).join("");
const dots = [...dotsBox.children];
img.onload = () => { img.style.opacity = 1; };
function go(i, first) {
cur = (i + n) % n;
dots.forEach((d, k) => d.classList.toggle("active", k === cur));
img.style.opacity = 0;
setTimeout(() => { img.src = CONFIG.images[cur]; }, first ? 0 : 300);
}
function auto() { clearInterval(autoId); autoId = setInterval(() => go(cur + 1), 5000); }
$("#nextBtn").addEventListener("click", () => { go(cur + 1); auto(); });
$("#prevBtn").addEventListener("click", () => { go(cur - 1); auto(); });
dotsBox.addEventListener("click", e => { if (e.target.dataset.i) { go(+e.target.dataset.i); auto(); } });
let sx = 0;
const box = $(".gallery-image-box");
box.addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, { passive: true });
box.addEventListener("touchend", e => {
const dx = e.changedTouches[0].clientX - sx;
if (Math.abs(dx) > 40) { go(cur + (dx < 0 ? 1 : -1)); auto(); }
}, { passive: true });
new IntersectionObserver(([e]) => { e.isIntersecting ? auto() : clearInterval(autoId); }).observe(gallery);

// ===== Floating hearts + shooting stars (capped, skipped on weak devices) =====
const hearts = $(".hearts"), shooting = $(".shooting-stars");
function floatItem(parent, make, life, max) {
if (document.hidden || parent.children.length >= max) return;
const el = make();
parent.appendChild(el);
setTimeout(() => el.remove(), life);
}
if (!lite) {
setInterval(() => floatItem(hearts, () => {
const h = document.createElement("span");
h.textContent = "❤️";
h.style.left = Math.random() * 100 + "vw";
h.style.fontSize = 15 + Math.random() * 20 + "px";
return h;
  }, 6000, 10), 1800);
setInterval(() => floatItem(shooting, () => {
const s = document.createElement("span");
s.style.top = Math.random() * 40 + "%";
s.style.left = 80 + Math.random() * 20 + "%";
return s;
  }, 2000, 2), 6000);
}

// ===== Fireworks: the loop runs only while particles exist =====
const cv = $("#fireworks"), ctx = cv.getContext("2d");
const colors = ["#f6e3b0", "#e8c878", "#ff7eb3", "#ffffff", "#b79cff"];
let W, H, parts = [], raf = 0;
function resize() {
const dpr = lite ? 1 : Math.min(devicePixelRatio || 1, 2);
W = innerWidth; H = innerHeight;
cv.width = W * dpr; cv.height = H * dpr;
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resize();
addEventListener("resize", resize);

function burst(x = Math.random() * W, y = Math.random() * H * 0.5) {
const col = colors[Math.random() * colors.length | 0], count = lite ? 22 : 40;
for (let i = 0; i < count; i++) {
const a = Math.PI * 2 * i / count, s = 1.5 + Math.random() * 3;
parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 70, col });
  }
if (!raf) raf = requestAnimationFrame(frame);
}
function frame() {
ctx.globalCompositeOperation = "destination-out";
ctx.fillStyle = "rgba(0,0,0,.22)";
ctx.fillRect(0, 0, W, H);
ctx.globalCompositeOperation = "lighter";
parts = parts.filter(p => p.life > 0);
for (const p of parts) {
p.x += p.vx; p.y += p.vy; p.vy += 0.04; p.vx *= 0.985; p.life--;
ctx.globalAlpha = Math.max(p.life / 70, 0);
ctx.fillStyle = p.col;
ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
  }
ctx.globalAlpha = 1;
if (parts.length) raf = requestAnimationFrame(frame);
else { ctx.clearRect(0, 0, W, H); raf = 0; }
}
function fireworkShow() {
let c = 0;
const t = setInterval(() => { burst(); if (++c >= 8) clearInterval(t); }, 700);
}

// ===== Confetti =====
function confetti() {
const f = document.createDocumentFragment();
for (let i = 0; i < (lite ? 12 : 26); i++) {
const e = document.createElement("i");
e.textContent = "🎉";
e.style.cssText = `left:${Math.random() * 100}vw;font-size:${15 + Math.random() * 22}px;animation-delay:${Math.random() * 1.5}s`;
e.onanimationend = () => e.remove();
f.appendChild(e);
  }
  $(".confetti").appendChild(f);
}

// ===== Final surprise =====
$("#surpriseBtn").addEventListener("click", () => {
popup.classList.remove("hidden");
bgVideo.pause();
confetti();
fireworkShow();
});
$("#thankBtn").addEventListener("click", () => {
popup.classList.add("hidden");
if (bgVideo.classList.contains("on")) bgVideo.play().catch(() => {});
  $(".hero").scrollIntoView({ behavior: "smooth" });
});




