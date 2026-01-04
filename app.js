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

  clockEl.textContent = `${hh}:${mm}`;
  dateEl.textContent = dateStr;

  hudTime.textContent = `${hh}:${mm}`;
  hudDate.textContent = dateStr;
}
setClock();
setInterval(setClock, 15000);

// Splash delay (3 seconds)
setTimeout(() => {
  splash.style.display = "none";
  app.classList.remove("hidden");
}, 3000);

// Nav switching
const dockButtons = document.querySelectorAll(".dock-btn");
const panels = document.querySelectorAll(".panel");

function switchPage(page){
  panels.forEach(p => p.classList.toggle("active", p.dataset.page === page));
  dockButtons.forEach(b => b.classList.toggle("active", b.dataset.nav === page));
  document.body.animate(
    [{ filter:"brightness(1)" }, { filter:"brightness(1.06)" }, { filter:"brightness(1)" }],
    { duration: 220 }
  );
}
dockButtons.forEach(btn => btn.addEventListener("click", () => switchPage(btn.dataset.nav)));

// Pulse button
document.getElementById("themePulse").addEventListener("click", () => {
  document.querySelector(".gold-glow").animate(
    [{ opacity: 0.3 }, { opacity: 1 }, { opacity: 0.35 }],
    { duration: 450, easing: "ease-in-out" }
  );
});

/* -------- Stock Ticker (UI demo) --------
   This is sample data for visuals.
   Want live stocks? I can wire a free API key + serverless endpoint. */
const tickerTrack = document.getElementById("tickerTrack");

const sampleTicks = [
  { sym:"SPY",  px:"489.12", chg:"+0.42%" },
  { sym:"AAPL", px:"212.44", chg:"+0.18%" },
  { sym:"TSLA", px:"248.10", chg:"-0.55%" },
  { sym:"NVDA", px:"621.33", chg:"+0.91%" },
  { sym:"MSFT", px:"—",      chg:"—" }
];

function renderTicker(items){
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
