// ===== Splash -> App =====
const splash = document.getElementById("splash");
const app = document.getElementById("app");

setTimeout(() => {
  if (splash) splash.style.display = "none";
  if (app) app.classList.remove("hidden");
}, 1800);

// ===== Panels / Navigation =====
const panels = document.querySelectorAll(".panel");
const tileBtns = document.querySelectorAll("[data-go]");
const bottomBtns = document.querySelectorAll(".bb");

function setActiveNav(page){
  bottomBtns.forEach(b => b.classList.toggle("active", b.dataset.nav === page));
}
function switchPage(page){
  panels.forEach(p => p.classList.toggle("active", p.dataset.page === page));
  setActiveNav(page);

  document.body.animate(
    [{ filter:"brightness(1)" }, { filter:"brightness(1.06)" }, { filter:"brightness(1)" }],
    { duration: 160 }
  );
}
tileBtns.forEach(btn => btn.addEventListener("click", () => switchPage(btn.dataset.go)));
bottomBtns.forEach(btn => btn.addEventListener("click", () => switchPage(btn.dataset.nav)));
switchPage("home");

// ===== World Clock with Timezone =====
const tzSelect = document.getElementById("tzSelect");
const wcTime = document.getElementById("wcTime");
const wcDate = document.getElementById("wcDate");

function updateClock(){
  const tz = tzSelect?.value || "America/New_York";
  const d = new Date();

  const time = new Intl.DateTimeFormat(undefined, {
    timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false
  }).format(d);

  const date = new Intl.DateTimeFormat(undefined, {
    timeZone: tz, weekday: "short", month: "short", day: "numeric", year: "numeric"
  }).format(d);

  if (wcTime) wcTime.textContent = time;
  if (wcDate) wcDate.textContent = date;
}
tzSelect?.addEventListener("change", updateClock);
updateClock();
setInterval(updateClock, 15000);

// ===== Stock Ticker (demo) =====
const tickerTrack = document.getElementById("tickerTrack");
const stockTicks = [
  { sym:"SPY",  px:"489.12", chg:"+0.42%" },
  { sym:"AAPL", px:"212.44", chg:"+0.18%" },
  { sym:"TSLA", px:"248.10", chg:"-0.55%" },
  { sym:"NVDA", px:"621.33", chg:"+0.91%" },
  { sym:"MSFT", px:"414.02", chg:"+0.11%" }
];

function renderTicker(trackEl, items, opts = {}){
  if (!trackEl) return;
  const full = items.concat(items);
  trackEl.innerHTML = full.map(it => {
    const up = (it.chg || "").startsWith("+");
    const cls = up ? "up" : "down";
    const label = opts.prefix ? `${opts.prefix}${it.sym}` : it.sym;
    return `
      <div class="tick">
        <b>${label}</b>
        <span>${it.px ?? "—"}</span>
        <span class="chg ${cls}">${it.chg ?? "—"}</span>
      </div>
    `;
  }).join("");
}
renderTicker(tickerTrack, stockTicks);

// ===== Crypto Ticker (demo + optional live) =====
const cryptoTrack = document.getElementById("cryptoTrack");

// fallback demo
let cryptoTicks = [
  { sym:"BTC", px:"—", chg:"+0.00%" },
  { sym:"ETH", px:"—", chg:"+0.00%" },
  { sym:"SOL", px:"—", chg:"+0.00%" },
  { sym:"XRP", px:"—", chg:"+0.00%" }
];

function fmtUSD(n){
  if (typeof n !== "number") return "—";
  return n >= 1000 ? n.toLocaleString(undefined, { maximumFractionDigits: 0 }) :
         n >= 1 ? n.toLocaleString(undefined, { maximumFractionDigits: 2 }) :
         n.toLocaleString(undefined, { maximumFractionDigits: 4 });
}

async function fetchCrypto(){
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple&vs_currencies=usd&include_24hr_change=true";

  try{
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("crypto fetch failed");
    const data = await res.json();

    cryptoTicks = [
      { sym:"BTC", px:`$${fmtUSD(data.bitcoin?.usd)}`, chg:`${(data.bitcoin?.usd_24h_change ?? 0).toFixed(2)}%` },
      { sym:"ETH", px:`$${fmtUSD(data.ethereum?.usd)}`, chg:`${(data.ethereum?.usd_24h_change ?? 0).toFixed(2)}%` },
      { sym:"SOL", px:`$${fmtUSD(data.solana?.usd)}`, chg:`${(data.solana?.usd_24h_change ?? 0).toFixed(2)}%` },
      { sym:"XRP", px:`$${fmtUSD(data.ripple?.usd)}`, chg:`${(data.ripple?.usd_24h_change ?? 0).toFixed(2)}%` }
    ].map(it => {
      const num = parseFloat(it.chg);
      const sign = num > 0 ? "+" : "";
      return { ...it, chg: `${sign}${it.chg}` };
    });

    renderTicker(cryptoTrack, cryptoTicks, { prefix: "CRYPTO:" });
  }catch(err){
    renderTicker(cryptoTrack, cryptoTicks, { prefix: "CRYPTO:" });
  }
}
fetchCrypto();
setInterval(fetchCrypto, 60000);

// ===== Map node label based on timezone =====
const nodeLabel = document.getElementById("nodeLabel");
const nodePing = document.getElementById("nodePing");

function setNodeByTZ(){
  const tz = tzSelect?.value || "America/New_York";
  const map = {
    "America/New_York": { label:"NYC-01", ping:"12ms" },
    "America/Los_Angeles": { label:"LA-02", ping:"22ms" },
    "UTC": { label:"UTC-00", ping:"08ms" },
    "Europe/London": { label:"LON-07", ping:"34ms" },
    "Europe/Paris": { label:"PAR-09", ping:"38ms" },
    "Asia/Tokyo": { label:"TOK-21", ping:"64ms" },
    "Asia/Shanghai": { label:"SHA-33", ping:"71ms" },
    "Australia/Sydney": { label:"SYD-44", ping:"86ms" }
  };
  const v = map[tz] || map["America/New_York"];
  if (nodeLabel) nodeLabel.textContent = v.label;
  if (nodePing) nodePing.textContent = v.ping;
}
tzSelect?.addEventListener("change", setNodeByTZ);
setNodeByTZ();

// ===== UI Pulse Button =====
const pulseBtn = document.getElementById("pulseBtn");
pulseBtn?.addEventListener("click", () => {
  const aura = document.querySelector(".aura");
  if (!aura) return;
  aura.animate(
    [{ opacity: .55 }, { opacity: 1 }, { opacity: .65 }],
    { duration: 280, easing: "ease-in-out" }
  );
});

