/* ===========================
   Almighty Odot OS — app.js
   Splash -> Main
   Clock/date
   Dock nav (desktop)
   FAB nav (mobile)
   Ticker demo
   =========================== */

const splash = document.getElementById("splash");
const app = document.getElementById("app");

const clockEl = document.getElementById("clock");
const dateEl  = document.getElementById("date");
const hudTime = document.getElementById("hudTime");
const hudDate = document.getElementById("hudDate");

function setClock(){
  const d = new Date();

  const hh = String(d.getHours()).padStart(2,"0");
  const mm = String(d.getMinutes()).padStart(2,"0");

  const dateStr = d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  if (clockEl) clockEl.textContent = `${hh}:${mm}`;
  if (dateEl)  dateEl.textContent  = dateStr;

  if (hudTime) hudTime.textContent = `${hh}:${mm}`;
  if (hudDate) hudDate.textContent = dateStr;
}
setClock();
setInterval(setClock, 15000);

// Splash delay (3 seconds)
setTimeout(() => {
  if (splash) splash.style.display = "none";
  if (app) app.classList.remove("hidden");
}, 3000);

// Panels + Desktop Dock
const dockButtons = document.querySelectorAll(".dock-btn");
const panels = document.querySelectorAll(".panel");

// FAB (mobile)
const fabWrap = document.querySelector(".fab-wrap");
const fabBtn  = document.getElementById("fabBtn");
const fabItems = document.querySelectorAll(".fab-item");

function closeFab(){
  if(!fabWrap || !fabBtn) return;
  fabWrap.classList.remove("open");
  fabBtn.setAttribute("aria-expanded", "false");
}
function openFab(){
  if(!fabWrap || !fabBtn) return;
  fabWrap.classList.add("open");
  fabBtn.setAttribute("aria-expanded", "true");
}

// Switch pages
function switchPage(page){
  panels.forEach(p => p.classList.toggle("active", p.dataset.page === page));
  dockButtons.forEach(b => b.classList.toggle("active", b.dataset.nav === page));
  fabItems.forEach(b => b.classList.toggle("active", b.dataset.nav === page));

  // quick HUD brightness pulse
  document.body.animate(
    [{ filter:"brightness(1)" }, { filter:"brightness(1.06)" }, { filter:"brightness(1)" }],
    { duration: 220 }
  );

  closeFab();
}

// Desktop dock navigation
dockButtons.forEach(btn =>
  btn.addEventListener("click", () => switchPage(btn.dataset.nav))
);

// Pulse button
const pulseBtn = document.getElementById("themePulse");
if (pulseBtn){
  pulseBtn.addEventListener("click", () => {
    const glow = document.querySelector(".gold-glow");
    if (!glow) return;
    glow.animate(
      [{ opacity: 0.3 }, { opacity: 1 }, { opacity: 0.35 }],
      { duration: 450, easing: "ease-in-out" }
    );
  });
}

/* ===== FAB menu (mobile) ===== */
if (fabBtn && fabWrap){
  fabBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = fabWrap.classList.contains("open");
    isOpen ? closeFab() : openFab();
  });
}

// Navigate from FAB items
fabItems.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const page = btn.dataset.nav;
    switchPage(page);
  });
});

// Close when tapping outside
document.addEventListener("click", () => {
  closeFab();
});

// Close on Escape
document.addEventListener("keydown", (e) => {
  if(e.key === "Escape") closeFab();
});

/* -------- Stock Ticker (UI demo) --------
   This is sample data for visuals.
   Want live stocks? Wire an API/endpoint and update this list. */
const tickerTrack = document.getElementById("tickerTrack");

const sampleTicks = [
  { sym:"SPY",  px:"489.12", chg:"+0.42%" },
  { sym:"AAPL", px:"212.44", chg:"+0.18%" },
  { sym:"TSLA", px:"248.10", chg:"-0.55%" },
  { sym:"NVDA", px:"621.33", chg:"+0.91%" },
  { sym:"MSFT", px:"—",      chg:"—" }
];

function renderTicker(items){
  if (!tickerTrack) return;
  const full = items.concat(items); // duplicate for seamless scroll
  tickerTrack.innerHTML = full.map(it => {
    const up = it.chg.startsWith("+");
    const cls = up ? "up" : "down";
    return `
      <div class="tick">
        <b>${it.sym}</b>
        <span>${it.px}</span>
        <span class="chg ${cls}">${it.chg}</span>
      </div>
    `;
  }).join("");
}
renderTicker(sampleTicks);

// Optional: set default active states on load
switchPage("about");
