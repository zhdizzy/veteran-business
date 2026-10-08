// Veteran Founder Stack — UI wiring on the house template (forked from transition-health 9/23/26).
import { DATA_STAMP, FY, monthlyComp, HEALTH_AVOIDED, vreMonthly, VRE_NO_LIMIT_DISCHARGE_YEAR, VRE_WINDOW_YEARS, sbaFee, SBA_FEES, GOVWIDE, SOLE_SOURCE, CERT, firstSteps } from './data/rules.js';
import { INDUSTRY_BUCKETS, NOT_SURE } from './data/industry-buckets.js';
import { STATE_BUSINESS_BENEFITS, STATE_DATA_STAMP } from './data/state-business-benefits.js';

const $ = id => document.getElementById(id);
const fmtUSD = n => '$' + Math.round(n).toLocaleString('en-US');
const fmtM = n => n >= 1e9 ? '$' + (n / 1e9).toFixed(n >= 10e9 ? 0 : 1) + 'B' : n >= 1e6 ? '$' + (n / 1e6).toFixed(n >= 100e6 ? 0 : 1) + 'M' : n >= 1e3 ? '$' + Math.round(n / 1e3) + 'K' : fmtUSD(n);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const state = { mode: 'think', revealed: false, last: null, bucket: null, snapshot: null, live: null };

/* ─── Elements ─────────────────────────────────────────────────────────── */
const ratingEl = $('rating'), stateEl = $('state'), stageEl = $('stage'), industryEl = $('industry'), own51El = $('own51');
const spouseEl = $('spouse'), childrenEl = $('children'), vahealthEl = $('vahealth'), servingEl = $('serving');
const dischargeEl = $('discharge-year'), firstRatingEl = $('first-rating-year'), loanEl = $('loan'), loanTypeEl = $('loan-type');
const STATES = Object.entries(STATE_BUSINESS_BENEFITS).map(([c, s]) => [c, s.name]).sort((a, b) => a[1].localeCompare(b[1]));
stateEl.innerHTML = '<option value="">Choose a state</option>' + STATES.map(([c, n]) => `<option value="${c}">${esc(n)}</option>`).join('');

/* ─── Snapshot (first paint) ───────────────────────────────────────────── */
fetch('data/spend-fy2025.json').then(r => r.ok ? r.json() : null).then(j => { state.snapshot = j; updateLiveStrip(); if (state.revealed) reveal({ silent: true }); }).catch(() => {});

/* ─── Mode pills (reshape the tool) ────────────────────────────────────── */
const MODE_BRIEF = {
  think: 'Nobody in TAP covered this. Your rating is runway, VA health care is the biggest fixed cost a new company never has to carry, and a free certification puts you in a room where the government is legally looking for you. Answer four things and we\'ll show what you\'re sitting on.',
  own: 'Most veteran owners never certify, and the ones who do usually stop at the federal one. We\'ll show which certifications you qualify for today, what the government paid firms like yours last year, and what your state adds on top.',
  gov: 'The federal government is the largest buyer on earth and it holds a lane open for service-disabled veterans. We\'ll show the dollars in your industry, who spent them, the sole-source ceiling, and the three steps into the lane.',
};
function setMode(m, opts = {}) {
  state.mode = m;
  document.querySelectorAll('.mode-pill').forEach(p => { p.classList.toggle('active', p.dataset.mode === m); p.setAttribute('aria-pressed', p.dataset.mode === m ? 'true' : 'false'); });
  $('mode-briefing').textContent = MODE_BRIEF[m];
  $('compare-btn').textContent = m === 'gov' ? 'Show Me the Lane →' : m === 'own' ? 'Show What I\'m Leaving on the Table →' : 'Show My Veteran Founder Stack →';
  if (state.revealed) reveal({ silent: true });
  updateLiveStrip();
}
document.querySelectorAll('.mode-pill').forEach(p => p.addEventListener('click', () => {
  setMode(p.dataset.mode);
  if (isTourActive() && tourState.steps[tourState.i]?.id === 'pills') showTourStep(tourState.i + 1);
}));

/* ─── Industry picker (typeahead over buckets) ─────────────────────────── */
const ALL_BUCKETS = [...INDUSTRY_BUCKETS, NOT_SURE];
const listEl = $('industry-list');
let hi = -1;
function matches(q) {
  const s = q.trim().toLowerCase();
  if (!s) return ALL_BUCKETS;
  return ALL_BUCKETS.filter(b => b.label.toLowerCase().includes(s) || (b.plain || '').toLowerCase().includes(s) || (b.naics || []).some(n => n.startsWith(s)));
}
function renderList(items) {
  hi = -1;
  listEl.innerHTML = items.map((b, i) => `<li role="option" data-id="${b.id}" id="ind-opt-${i}">${esc(b.label)}${b.naics ? `<small>${esc(b.plain || '')}</small>` : '<small>Shows the government-wide total instead</small>'}</li>`).join('');
  listEl.hidden = items.length === 0;
  industryEl.setAttribute('aria-expanded', items.length ? 'true' : 'false');
}
function pickBucket(id) {
  const b = ALL_BUCKETS.find(x => x.id === id);
  state.bucket = b || null;
  industryEl.value = b ? b.label : '';
  listEl.hidden = true; industryEl.setAttribute('aria-expanded', 'false');
  $('picked-bucket').innerHTML = b ? (b.naics ? `<strong>${esc(b.label)}</strong> · NAICS ${b.naics.join(', ')}. ${esc(b.plain || '')}` : `<strong>Not sure yet.</strong> We\'ll show the government-wide veteran total; come back and pick an industry for your own number.`) : '';
  updateLiveStrip();
  if (state.revealed) reveal({ silent: true });
}
industryEl.addEventListener('input', () => { state.bucket = null; $('picked-bucket').textContent = ''; renderList(matches(industryEl.value)); updateLiveStrip(); });
industryEl.addEventListener('focus', () => renderList(matches(industryEl.value)));
industryEl.addEventListener('keydown', e => {
  const items = listEl.querySelectorAll('li'); if (listEl.hidden || !items.length) return;
  if (e.key === 'ArrowDown') { e.preventDefault(); hi = Math.min(items.length - 1, hi + 1); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); hi = Math.max(0, hi - 1); }
  else if (e.key === 'Enter') { e.preventDefault(); if (hi >= 0) pickBucket(items[hi].dataset.id); else if (items.length === 1) pickBucket(items[0].dataset.id); return; }
  else if (e.key === 'Escape') { listEl.hidden = true; return; }
  else return;
  items.forEach((li, i) => li.setAttribute('aria-selected', i === hi ? 'true' : 'false'));
});
listEl.addEventListener('mousedown', e => { const li = e.target.closest('li'); if (li) { e.preventDefault(); pickBucket(li.dataset.id); } });
document.addEventListener('click', e => { if (!e.target.closest('.industry-wrap')) listEl.hidden = true; });

/* ─── Conditional fields ───────────────────────────────────────────────── */
function ratingInfo() {
  const v = ratingEl.value;
  const unrated = v === 'unrated' || v === 'pending' || v === '';
  const nonSC = v === 'none';
  const num = (!unrated && !nonSC) ? parseInt(v, 10) : null;
  return { raw: v, unrated, nonSC, num, sc: num !== null };
}
function syncConditionalFields() {
  const r = ratingInfo();
  const rl = $('rating-line');
  if (r.unrated && r.raw !== '') { rl.hidden = false; rl.innerHTML = '<strong>No rating yet means no SDVOSB yet.</strong> Any service-connected rating, even 0%, opens it. The claim is step one; we\'ll still show you the lane.'; }
  else if (r.nonSC) { rl.hidden = false; rl.innerHTML = '<strong>VOSB is open to you</strong> with an honorable discharge. SDVOSB and VR&amp;E need a service-connected rating.'; }
  else if (r.sc && r.num === 0) { rl.hidden = false; rl.innerHTML = '<strong>0% still counts.</strong> A 0% service-connected rating qualifies for SDVOSB. VR&amp;E needs 10% or more.'; }
  else if (r.sc && r.num >= 10) { rl.hidden = false; rl.innerHTML = `<strong>SDVOSB eligible</strong> on the rating. ${r.num >= 10 ? 'VR&amp;E\'s self-employment track is in play.' : ''} Compensation is runway: ${fmtUSD(monthlyComp(r.num, spouseEl.value === 'yes', +childrenEl.value))}/mo tax-free.`; }
  else rl.hidden = true;
  $('field-loan').hidden = !(loanTypeEl.value === 'express' || loanTypeEl.value === 'standard');
  const dy = parseInt(dischargeEl.value, 10);
  const pre2013 = dy && dy < VRE_NO_LIMIT_DISCHARGE_YEAR;
  $('first-rating-year-label').hidden = !pre2013; firstRatingEl.hidden = !pre2013;
}
[ratingEl, spouseEl, childrenEl, dischargeEl, loanTypeEl].forEach(el => el.addEventListener('change', syncConditionalFields));
dischargeEl.addEventListener('input', syncConditionalFields);

/* ─── Inputs → model ───────────────────────────────────────────────────── */
function buildInput() {
  const r = ratingInfo();
  return {
    mode: state.mode, rating: r, stateCode: stateEl.value || null, stage: stageEl.value, bucket: state.bucket,
    own51: own51El.value === 'yes', spouse: spouseEl.value === 'yes', children: parseInt(childrenEl.value, 10) || 0,
    vahealth: vahealthEl.value, serving: servingEl.value === 'yes',
    dischargeYear: parseInt(dischargeEl.value, 10) || null, firstRatingYear: parseInt(firstRatingEl.value, 10) || null,
    loan: (loanTypeEl.value === 'express' || loanTypeEl.value === 'standard') ? (parseFloat(loanEl.value) || 0) : 0, loanType: loanTypeEl.value,
  };
}
function solve(p) {
  const out = { p, doors: [], dollars: 0, items: [] };
  const sc = p.rating.sc;
  // Certification
  const canSDVOSB = sc && p.own51 && !p.serving;
  const canVOSB = (sc || p.rating.nonSC) && p.own51 && !p.serving;
  out.cert = { sdvosb: canSDVOSB, vosb: canVOSB, blockedByOwnership: !p.own51, blockedByServing: p.serving, unrated: p.rating.unrated };
  if (canSDVOSB) out.doors.push('SDVOSB certification'); else if (canVOSB) out.doors.push('VOSB certification');
  // VR&E
  let vre = 'closed';
  if (p.rating.unrated) vre = 'later';
  else if (sc && p.rating.num >= 10) {
    if (p.dischargeYear && p.dischargeYear < VRE_NO_LIMIT_DISCHARGE_YEAR) {
      const anchor = Math.max(p.dischargeYear, p.firstRatingYear || 0);
      vre = (new Date().getFullYear() - anchor) <= VRE_WINDOW_YEARS ? 'open' : (p.firstRatingYear ? 'likely-closed' : 'check');
    } else vre = 'open';
  }
  out.vre = { status: vre, monthly: vreMonthly((p.spouse ? 1 : 0) + p.children) };
  if (vre === 'open' || vre === 'check') out.doors.push('VR&E self-employment');
  // SBA fee
  out.sba = sbaFee(p.loan, p.loanType);
  if (p.loan > 0 && (p.loanType === 'express' || p.loanType === 'standard')) out.doors.push('SBA fee relief');
  if (p.loan > 0 && out.sba.savings > 0) { out.dollars += out.sba.savings; out.items.push(['SBA fee saved', out.sba.savings]); }
  // Runway
  const comp = sc ? monthlyComp(p.rating.num, p.spouse, p.children) : 0;
  const compAnnual = Math.round(comp * 12);
  const onVA = p.vahealth === 'yes' || (p.vahealth === 'unsure' && sc && p.rating.num >= 10);
  const health = onVA ? (p.spouse || p.children ? HEALTH_AVOIDED.family : HEALTH_AVOIDED.single) : 0;
  out.runway = { comp, compAnnual, health, onVA };
  if (compAnnual > 0) { out.dollars += compAnnual; out.items.push(['Tax-free compensation', compAnnual]); out.doors.push('Tax-free runway'); }
  if (health > 0) { out.dollars += health; out.items.push(['Health insurance you don\'t have to buy', health]); }
  // State
  const st = p.stateCode ? STATE_BUSINESS_BENEFITS[p.stateCode] : null;
  out.state = st ? { code: p.stateCode, ...st } : null;
  if (st) {
    const cn = (st.certification?.name || '') + ' ' + (st.certification?.preference || '');
    const certNeedsSC = /service[- ]disabled|disabled[- ]veteran|\bSDV|\bDVBE|\bDVOB|\bDVB\b|\bSDVOB|\bSDVBE/i.test(cn) && !/veteran-owned or|or veteran-owned|VOB and|VBE and|also/i.test(cn);
    out.stateCertOpen = !!(st.certification?.exists && (!certNeedsSC || sc));
    out.stateCertNeedsSC = !!(st.certification?.exists && certNeedsSC && !sc);
    if (out.stateCertOpen) out.doors.push(`${st.name} certification`);
    for (const pr of st.programs || []) {
      pr._notLaw = pr.verified === false && /not law/i.test((pr.needsFollowup || '') + ' ' + (pr.summary || ''));
      if (pr._notLaw) { pr._applies = false; continue; }
      const okWindow = !pr.windowMonths || !p.dischargeYear || ((new Date().getFullYear() - p.dischargeYear) * 12 <= pr.windowMonths);
      const okTrigger = pr.trigger === 'veteran' || pr.trigger === 'new-business' || pr.trigger === 'discharge-window' || (pr.trigger === 'sc-veteran' && sc) || (pr.trigger === 'disabled-veteran' && sc && p.rating.num >= 10);
      pr._applies = okWindow && okTrigger;
      if (pr._applies && pr.dollarEstimate) { out.dollars += pr.dollarEstimate; out.items.push([pr.name, pr.dollarEstimate]); }
      if (pr._applies && pr.oneTimeEstimate) { out.oneTime = (out.oneTime || 0) + pr.oneTimeEstimate; out.oneTimeItems = (out.oneTimeItems || []).concat([[pr.name, pr.oneTimeEstimate]]); }
    }
  }
  // Federal lane numbers
  out.lane = laneNumbers(p);
  return out;
}
function laneNumbers(p) {
  const flag = p.rating.sc ? 'sdvosb' : 'vosb';
  const b = p.bucket;
  if (!b || !b.naics) return { kind: 'govwide', total: GOVWIDE.sdvosbDollars, flag: 'sdvosb', agencies: [{ name: 'Department of Veterans Affairs', amount: GOVWIDE.vaSdvosbDollars }], fy: GOVWIDE.fy, source: 'snapshot', examples: [], median: null };
  const live = state.live && state.live.key === b.id + '|' + flag ? state.live.body : null;
  const snap = state.snapshot?.buckets?.[b.id];
  const total = live ? live.total : snap ? (flag === 'sdvosb' ? snap.sdvosbTotal : snap.vosbTotal) : null;
  const agencies = live ? live.agencies : (snap?.agencies || []);
  return { kind: 'bucket', total, flag, agencies, fy: live ? live.fy : (state.snapshot?.fy || FY), source: live ? 'live' : snap ? 'snapshot' : 'none', examples: b.examples || [], median: snap?.medianOfTop100 ?? null, label: b.label, naics: b.naics, plain: b.plain, firms: flag === 'sdvosb' && snap?.recipientCount ? { count: snap.recipientCount, median: snap.medianPerRecipient, top10: snap.top10SharePct } : null };
}
async function fetchLive(p) {
  const b = p.bucket; if (!b || !b.naics) return;
  const flag = p.rating.sc ? 'sdvosb' : 'vosb';
  const key = b.id + '|' + flag;
  if (state.live && state.live.key === key) return;
  const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 25000);
  try {
    const res = await fetch(`/api/vetbiz-spend?naics=${b.naics.join(',')}&fy=${FY}&flag=${flag}`, { signal: ctrl.signal });
    if (!res.ok) return;
    const body = await res.json();
    if (typeof body.total === 'number' && body.total > 0) { state.live = { key, body }; if (state.revealed && state.bucket?.id === b.id) patchLaneLive(); }
  } catch {} finally { clearTimeout(t); }
}
// Live numbers arrive seconds after the snapshot painted. Patch the lane card in place so open accordions
// and scroll position are untouched; a full re-render would collapse whatever the reader opened.
function patchLaneLive() {
  const r = run(); state.last = r; const L = r.lane;
  const card = $('card-lane'); if (!card || L.source !== 'live') return;
  const v = card.querySelector('.sc-value'); if (v) v.innerHTML = `${fmtM(L.total)} in FY${L.fy}<span class="live-tag">live</span>`;
  const band = card.querySelector('.lane-band strong'); if (band) band.textContent = fmtM(L.total);
  const max = L.agencies[0]?.amount || 1;
  const ag = card.querySelector('.agency-list'); if (ag && L.agencies.length) ag.innerHTML = L.agencies.map(a => `<span class="an">${esc(shortAgency(a.name))}</span><span class="aa">${fmtM(a.amount)}</span><div class="ab"><i style="width:${Math.max(3, a.amount / max * 100)}%"></i></div>`).join('');
  const src = card.querySelector('.sc-src'); if (src) src.textContent = src.textContent.replace('Snapshot; refreshed each October.', 'Live pull.');
  const tile = document.querySelector('.three-num .num-card:nth-child(3) .nc-amount'); if (tile) tile.textContent = fmtM(L.total);
  const tileSub = document.querySelector('.three-num .num-card:nth-child(3) .nc-sub'); if (tileSub && !/live/.test(tileSub.textContent)) tileSub.textContent += ' · live';
}
const run = () => solve(buildInput());

/* ─── Live strip ───────────────────────────────────────────────────────── */
let liveTimer = null;
function updateLiveStrip() {
  clearTimeout(liveTimer);
  liveTimer = setTimeout(() => {
    const el = $('live-strip');
    const p = buildInput();
    if (!p.rating.raw || !p.stateCode) { el.innerHTML = '<strong>Required to run:</strong> your rating status and your state. Your stack builds here as you answer.'; return; }
    const r = run();
    const doors = r.doors.length;
    const lane = r.lane.total ? ` · ${r.lane.kind === 'govwide' ? 'government-wide' : esc(r.lane.label)}: <strong>${fmtM(r.lane.total)}</strong> paid to ${r.lane.flag === 'sdvosb' ? 'service-disabled veteran' : 'veteran'}-owned firms in FY${r.lane.fy}` : '';
    el.innerHTML = `<span class="doors">${doors} door${doors === 1 ? '' : 's'} open</span> so far${r.dollars > 0 ? ` · <span class="dollars">${fmtUSD(r.dollars)}</span> a year that\'s yours before you sell anything` : ''}${lane}. Press the button for the full stack.`;
  }, 150);
}
document.querySelectorAll('#calc-form input, #calc-form select').forEach(el => { el.addEventListener('input', updateLiveStrip); el.addEventListener('change', updateLiveStrip); });

/* ─── Validation (novalidate + JS, house rule) ─────────────────────────── */
function clearMissing() { document.querySelectorAll('.field-missing, .field-error').forEach(el => el.classList.remove('field-missing', 'field-error')); }
function validate() {
  clearMissing();
  if (!ratingEl.value) { ratingEl.closest('.fg-field').classList.add('field-missing'); ratingEl.classList.add('field-error'); return { message: 'Required: your VA rating status (the red field). "Haven\'t filed yet" is a fine answer.', focusEl: ratingEl }; }
  if (!stateEl.value) { stateEl.closest('.fg-field').classList.add('field-missing'); stateEl.classList.add('field-error'); return { message: 'Required: your state. It decides which state programs and certification apply.', focusEl: stateEl }; }
  return { message: '', focusEl: null };
}
[ratingEl, stateEl].forEach(el => el.addEventListener('change', () => { if (el.value) { clearMissing(); $('form-error').textContent = ''; } }));

/* ─── Submit gate ──────────────────────────────────────────────────────── */
$('calc-form').addEventListener('submit', e => { e.preventDefault(); reveal(); });
function reveal(opts = {}) {
  const v = validate();
  $('form-error').textContent = v.message;
  if (v.message) { if (!isTourActive()) v.focusEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); v.focusEl.focus({ preventScroll: true }); return; }
  const r = run();
  state.last = r;
  renderHero(r);
  renderCards(r);
  state.revealed = true;
  $('hero-verdict').style.display = 'block';
  $('hero-capture').style.display = 'block';
  $('results-container').style.display = 'block';
  $('action-bar').style.display = 'flex';
  fetchLive(r.p);
  if (opts.silent) return;
  if (typeof gtag === 'function') gtag('event', 'show_results', { mode: state.mode, bucket: r.p.bucket?.id || 'none', rating: r.p.rating.raw, state: r.p.stateCode });
  if (isTourActive() && tourState.steps[tourState.i]?.id === 'gate') endTour();
  if (!isTourActive()) $('hero-verdict').scrollIntoView({ behavior: 'smooth', block: 'start' });
  let resultsSeen = true;
  try { resultsSeen = localStorage.getItem(RESULTS_TOUR_KEY) === '1'; } catch {}
  if (!resultsSeen && !window.__vfsArrivalHadParams) setTimeout(() => startTourWith(RESULTS_TOUR, RESULTS_TOUR_KEY), 800);
}
$('retake-btn').addEventListener('click', () => {
  state.revealed = false;
  ['hero-verdict', 'hero-capture', 'results-container'].forEach(id => $(id).style.display = 'none');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── Hero ─────────────────────────────────────────────────────────────── */
function renderHero(r) {
  const el = $('hero-verdict');
  const p = r.p, L = r.lane;
  const who = L.flag === 'sdvosb' ? 'service-disabled-veteran-owned' : 'veteran-owned';
  const laneLine = L.total ? (L.kind === 'govwide'
    ? `In FY${L.fy} the federal government paid <strong>${fmtM(L.total)}</strong> to ${who} small businesses. Pick an industry above and this becomes your number.`
    : `In FY${L.fy} the federal government paid <strong>${fmtM(L.total)}</strong> to ${who} firms for ${esc(L.label)}${L.agencies[0] ? `, ${fmtM(L.agencies[0].amount)} of it from ${esc(shortAgency(L.agencies[0].name))}` : ''}.`) : `We couldn\'t load the contract numbers for ${esc(L.label || 'your industry')} right now; the rest of the stack is below.`;
  let kicker, line;
  if (p.mode === 'gov') {
    kicker = 'The lane is real';
    line = `${laneLine} ${r.cert.sdvosb ? 'You qualify for the certification that puts you in that room, and it costs nothing.' : r.cert.vosb ? 'You qualify for VOSB today; SDVOSB needs a service-connected rating.' : r.cert.blockedByOwnership ? 'Certification needs the veteran at 51% ownership and in control.' : r.cert.unrated ? 'A rating at any percentage is what opens the door. That\'s the first step.' : r.cert.blockedByServing ? 'Certification opens the day after your DD-214; the paperwork can be ready before then.' : 'Certification needs the veteran at 51% ownership and in control.'}`;
  } else if (p.mode === 'own') {
    const certs = [r.cert.sdvosb ? 'SDVOSB' : r.cert.vosb ? 'VOSB' : null, r.stateCertOpen ? `${r.state.name} ${r.state.certification.name || 'veteran business certification'}` : null].filter(Boolean);
    kicker = certs.length ? `${certs.length} certification${certs.length === 1 ? '' : 's'} you don\'t have yet` : 'Here\'s what your file unlocks';
    line = `${certs.length ? `You qualify for ${certs.map(c => `<strong>${esc(c)}</strong>`).join(' and ')} today, free. ` : ''}${laneLine}`;
  } else {
    kicker = r.dollars > 0 ? 'What you\'re sitting on' : 'The doors that are already open';
    line = r.dollars > 0 ? `Your veteran founder stack is worth about <strong>${fmtUSD(r.dollars)}</strong> a year before you sell a thing, and it opens <strong>${r.doors.length} door${r.doors.length === 1 ? '' : 's'}</strong> most founders don\'t have. ${laneLine}` : `${laneLine} ${r.cert.unrated ? 'A rating at any percentage turns this into runway and a certification.' : ''}`;
  }
  const tiles = `<div class="three-num">
    <div class="num-card comfortable"><span class="nc-label">Yours today, per year</span><span class="nc-amount">${fmtUSD(r.dollars)}</span><span class="nc-sub">${r.items.length ? r.items.map(([n]) => esc(n)).join(' + ') : 'nothing quantifiable yet; the doors still count'}${r.oneTime ? ` · plus ${fmtUSD(r.oneTime)} one-time (${r.oneTimeItems.map(([n]) => esc(n)).join(', ')})` : ''}</span></div>
    <div class="num-card"><span class="nc-label">Doors open</span><span class="nc-amount">${r.doors.length}</span><span class="nc-sub">${r.doors.length ? esc(r.doors.join(' · ')) : 'answer the rating and ownership questions'}</span></div>
    <div class="num-card"><span class="nc-label">${L.kind === 'govwide' ? 'Gov-wide, FY' + L.fy : 'Your industry, FY' + L.fy}</span><span class="nc-amount">${L.total ? fmtM(L.total) : '—'}</span><span class="nc-sub">paid to ${who} firms${L.source === 'live' ? ' · live' : ''}</span></div>
  </div>`;
  const first = firstSteps(p.mode, r.cert.unrated, p.serving)[0];
  const move = first ? `<p class="v-sub"><span class="chip chip-gold">Do this first</span> <strong>${first[2] ? `<a href="${esc(first[2])}" target="_blank" rel="noopener" style="color:#ffe9a8">${esc(first[0])}</a>` : esc(first[0])}.</strong> ${esc(first[1])}</p>` : '';
  const unratedLine = r.cert.unrated ? `<p class="v-sub"><span class="chip chip-red">No rating yet</span> Everything on this page except VOSB and the SBA fee waiver turns on a service-connected rating. <a href="/va-combined/" style="color:#ffe9a8">Start with the claim →</a></p>` : '';
  el.innerHTML = `<p class="v-kicker">${esc(kicker)}</p><p class="v-line">${line}</p>${tiles}${move}${unratedLine}`;
}
function shortAgency(n) { return n.replace(/^Department of /, '').replace('Veterans Affairs', 'the VA').replace('Defense', 'DoD').replace('General Services Administration', 'GSA').replace('Health and Human Services', 'HHS').replace('Homeland Security', 'DHS'); }

/* ─── Cards ────────────────────────────────────────────────────────────── */
function card(id, title, value, valueClass, body, open) {
  return `<details class="stack-card" id="card-${id}"${open ? ' open' : ''}><summary><span class="sc-title">${esc(title)}</span><span class="sc-value ${valueClass || ''}">${value}</span></summary><div class="sc-body">${body}</div></details>`;
}
function renderCards(r) {
  const p = r.p, L = r.lane, sc = p.rating.sc;
  const out = [];
  // 1. Federal lane
  {
    const who = L.flag === 'sdvosb' ? 'service-disabled-veteran-owned' : 'veteran-owned';
    const max = L.agencies[0]?.amount || 1;
    const ag = L.agencies.length ? `<div class="lane-agencies"><p class="lane-h">Who spent it</p><div class="agency-list big">${L.agencies.map(a => `<span class="an">${esc(shortAgency(a.name))}</span><span class="aa">${fmtM(a.amount)}</span><div class="ab"><i style="width:${Math.max(3, a.amount / max * 100)}%"></i></div>`).join('')}</div></div>` : '';
    const ex = L.examples.length ? `<p class="lane-h">What that actually looked like <span class="lane-sub">real FY${L.fy} awards to ${who} firms, in plain words</span></p><div class="ex-grid">${L.examples.map(e => { const w = String(e.what || ''); const sentence = w.toLowerCase().startsWith(String(e.who || '').toLowerCase()) ? w : `${e.who} ${w}`; return `<div class="ex-tile ex-${esc(e.size)}"><span class="ex-chip">${esc(e.size)}</span><span class="ex-big">${fmtM(e.amount)}</span><p>${esc(sentence.charAt(0).toUpperCase() + sentence.slice(1))}</p></div>`; }).join('')}</div>` : '';
    const sole = `<div class="callout callout-gold lane-sole"><h3>No competition, up to ${fmtM(SOLE_SOURCE.farOther)}</h3><p>Agencies can set contracts aside so only SDVOSBs compete, and can award up to about <strong>${fmtM(SOLE_SOURCE.farOther)}</strong> for services or <strong>${fmtM(SOLE_SOURCE.farManufacturing)}</strong> for manufacturing to one SDVOSB with no competition at all. The VA\'s own sole-source ceiling is <strong>${fmtM(SOLE_SOURCE.va)}</strong>, set by statute.</p></div>`;
    const firms = L.firms ? `<div class="lane-firms"><div class="lf-tile"><span class="lf-n">${L.firms.count.toLocaleString('en-US')}</span><span class="lf-l">${who} firms got paid in this lane in FY${L.fy}</span></div><div class="lf-tile"><span class="lf-n">${fmtM(L.firms.median)}</span><span class="lf-l">what the typical one of them was paid for the year</span></div>${L.firms.top10 != null && L.firms.count >= 20 && L.firms.top10 < 90 ? `<div class="lf-tile"><span class="lf-n">${Math.round(100 - L.firms.top10)}%</span><span class="lf-l">of the dollars went to firms outside the top 10</span></div>` : ''}</div>` : '';
    const body = L.kind === 'govwide'
      ? `<div class="v-cost lane-band"><span class="vc-label">Government-wide, FY${GOVWIDE.fy}</span><strong>${fmtM(GOVWIDE.sdvosbDollars)}</strong> in prime contracts to service-disabled-veteran-owned small businesses, above the ${GOVWIDE.sdvosbGoalPct}% goal. The VA alone: <strong>${fmtM(GOVWIDE.vaSdvosbDollars)}</strong>, ${GOVWIDE.vaSdvosbPct}% of everything it bought.</div><p>Type an industry in the form and this card becomes your number, with the agencies that spent it and three real examples.</p>${sole}<p class="sc-src">SBA FY2025 Small Business Procurement Scorecard; VA OSDBU.</p>`
      : `<div class="v-cost lane-band"><span class="vc-label">${esc(L.label)} · NAICS ${L.naics.join(', ')} · FY${L.fy}</span><strong>${L.total ? fmtM(L.total) : 'Unavailable'}</strong> paid to ${who} firms in these codes last year.</div><p class="lane-plain">${esc(L.plain || '')}</p>${firms}${ag}${ex}${sole}<p class="sc-src">USASpending.gov, FY${L.fy} obligations to recipients flagged ${who}. "Paid to," not "set aside for." ${L.source === 'live' ? 'Live pull.' : 'Snapshot; refreshed each October.'} Sole-source: FAR 19.1406, 38 U.S.C. 8127.</p>`;
    out.push(card('lane', 'Federal contracting lane', L.total ? `${fmtM(L.total)} in FY${L.fy}<span class="live-tag${L.source === 'live' ? '' : ' snap'}">${L.source === 'live' ? 'live' : 'snapshot'}</span>` : 'numbers unavailable', L.total ? '' : 'off', body, true));
  }
  // 2. Certification
  {
    let v, cls, body;
    if (r.cert.sdvosb) { v = 'SDVOSB eligible · free'; cls = 'door'; }
    else if (r.cert.vosb) { v = 'VOSB eligible · free'; cls = 'door'; }
    else if (r.cert.blockedByOwnership) { v = 'Needs 51% and control'; cls = 'off'; }
    else if (r.cert.unrated) { v = 'Opens with a rating'; cls = 'off'; }
    else if (r.cert.blockedByServing) { v = 'After your DD-214'; cls = 'off'; }
    else { v = 'Needs 51% and control'; cls = 'off'; }
    const reqs = `<ul>${CERT.requirements.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
    const steps = `<ol class="steps-list">${CERT.steps.map(([t, w, u]) => `<li><div><p class="st-t">${u ? `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>` : esc(t)}</p><p class="st-w">${esc(w)}</p></div></li>`).join('')}</ol>`;
    const lead = r.cert.sdvosb ? `<p><strong>You have all three.</strong> A service-connected rating at any percentage, majority ownership, and control. One free VetCert application covers SDVOSB and VOSB.</p>`
      : r.cert.vosb ? `<p><strong>VOSB is yours today.</strong> An honorable discharge plus ownership and control. SDVOSB, the one with government-wide set-asides, needs a service-connected rating. If you have conditions from service you never claimed, that rating is worth more than the certification alone.</p>`
      : r.cert.blockedByOwnership ? `<p><strong>The veteran has to own at least 51% and run the business.</strong> A minority stake or a silent role doesn\'t certify, no matter the rating. If a partner owns the majority, restructuring is the conversation to have.${r.cert.unrated ? ' You\'d also need a service-connected rating for SDVOSB; VOSB needs only the discharge.' : ''}</p>`
      : r.cert.unrated ? `<p><strong>The only thing between you and SDVOSB is a rating.</strong> Any percentage counts, including 0%. File an Intent to File today; it locks your effective date while you build the claim. VOSB is available right now with an honorable discharge.</p>`
      : r.cert.blockedByServing ? `<p><strong>Certification opens the day after your DD-214.</strong> Everything else can be ready before then: the entity, the EIN, the SAM.gov registration, the capability statement.</p>`
      : `<p><strong>The veteran has to own at least 51% and run the business.</strong> A minority stake or a silent role doesn\'t certify, no matter the rating. If a partner owns the majority, restructuring is the conversation to have.</p>`;
    body = `${lead}<p>What SBA checks:</p>${reqs}<p>The steps, in order:</p>${steps}<p class="sc-src">13 CFR Part 128; SBA VetCert. Certification is free; anyone charging for "SDVOSB certification" is selling paperwork help.</p>`;
    out.push(card('cert', 'Certification', v, cls, body, false));
  }
  // 3. VR&E
  {
    const s = r.vre.status;
    const v = s === 'open' ? 'Likely open' : s === 'check' ? 'Check your window' : s === 'later' ? 'Opens when you\'re rated' : s === 'likely-closed' ? 'Window likely closed' : 'Needs 10%+ service-connected';
    const cls = s === 'open' || s === 'check' ? 'door' : 'off';
    const why = s === 'open' ? `Rated ${p.rating.num}%${p.dischargeYear ? `, discharged ${p.dischargeYear}` : ''}: ${p.dischargeYear && p.dischargeYear < VRE_NO_LIMIT_DISCHARGE_YEAR ? 'inside the 12-year window that runs from your first rating notice' : 'no time limit for discharges in 2013 or later'}.`
      : s === 'check' ? `Discharged before 2013, so a 12-year window applies, running from the later of separation or your first rating notice. Enter your first rating year in the drawer to check it.`
      : s === 'later' ? 'The self-employment track is a VR&E track, and VR&E needs a service-connected rating of 10% or more. It opens the day your rating does.'
      : s === 'likely-closed' ? `Discharged ${p.dischargeYear}, first rated ${p.firstRatingYear}: the 12-year window has passed. A serious employment handicap finding can extend it; ask a VR&E counselor before assuming.`
      : 'VR&E needs a service-connected rating of 10% or more and an employment handicap from those conditions.';
    const body = `<p><strong>VA can fund a business.</strong> ${esc(why)}</p><p>If a counselor approves self-employment as your rehabilitation goal, Chapter 31 can pay for the business plan (with a consultant), training, equipment, initial inventory, licenses, and required insurance. Not a loan. Category I, for the most severe disabilities, funds more of the startup; Category II covers training, tools, licenses, and insurance.</p>${s === 'open' || s === 'check' ? `<p>While you\'re in the plan, the full-time subsistence allowance for your household is about <strong>${fmtUSD(r.vre.monthly)}/mo</strong> (FY2027), on top of compensation.</p>` : ''}<p>The counselor decides the track. Go in with the employment handicap framed around your conditions, not your business idea. <a href="/gi-bill-vre/">Run the GI Bill vs. VR&amp;E tool</a> and read the <a href="https://www.thebetterveteran.com/p/vre-chapter-31-guide" target="_blank" rel="noopener">VR&amp;E guide</a> first.</p><p class="sc-src">38 CFR Part 21; P.L. 116-315 §1025 removed the time limit for post-2012 discharges. Subsistence rates FY2027, effective 10/1/2026.</p>`;
    out.push(card('vre', 'VR&E can fund the business', v, cls, body, false));
  }
  // 4. SBA fee
  {
    const f = r.sba;
    const v = p.loan > 0 ? (f.savings > 0 ? `${fmtUSD(f.savings)} saved` : 'No fee relief on this loan') : p.loanType === 'other' ? 'Not an SBA loan' : p.loanType === 'none' ? 'Not borrowing' : 'Enter an amount';
    const cls = p.loan > 0 && f.savings > 0 ? '' : 'off';
    const body = p.loan > 0
      ? `<p>On a <strong>${fmtUSD(p.loan)}</strong> ${p.loanType === 'express' ? 'SBA Express' : 'standard 7(a)'} loan${f.capped ? ` (capped at the program max of ${fmtUSD(p.loanType === 'express' ? SBA_FEES.expressMax : SBA_FEES.standardMax)})` : ''}, SBA guarantees <strong>${fmtUSD(f.guaranteed)}</strong>. The upfront guaranty fee on that portion would be <strong>${fmtUSD(f.baseline)}</strong>. ${p.loanType === 'express' ? `For a veteran-owned business it is <strong>$0</strong> by statute.` : f.savings > 0 ? `With the veteran reduction it is <strong>${fmtUSD(f.veteran)}</strong>.` : `The FY${SBA_FEES.fy} notice has no veteran reduction on standard 7(a) loans; SBA Express (up to ${fmtUSD(SBA_FEES.expressMax)}) is where the waiver lives.`}</p>`
      : p.loanType === 'other' ? `<p>Fee relief only attaches to SBA-backed loans. If the bank or credit union offers an SBA Express or 7(a) product, ask for it by name: veteran-owned businesses pay <strong>no upfront guaranty fee</strong> on SBA Express (up to ${fmtUSD(SBA_FEES.expressMax)}). Switch the loan type in the drawer to price it.</p>`
      : `<p>Most new businesses don\'t need to borrow on day one. If that changes, veteran-owned businesses pay <strong>no upfront guaranty fee</strong> on SBA Express loans (up to ${fmtUSD(SBA_FEES.expressMax)}), by statute. On a $350,000 Express loan that is $5,250 a non-veteran would pay. Pick a loan type in the drawer and we\'ll price yours.</p>`;
    out.push(card('sba', 'SBA fee relief', v, cls, `${body}<p>Eligible: businesses owned and controlled by veterans, active-duty members in TAP, reservists and Guard, and their spouses. Fees are set each fiscal year.</p><p class="sc-src">SBA Information Notice ${SBA_FEES.notice} (FY${SBA_FEES.fy}); Small Business Act §7(a)(31)(G). <a href="${SBA_FEES.noticeUrl}" target="_blank" rel="noopener">Current notice →</a></p>`, false));
  }
  // 5. Runway
  {
    const w = r.runway;
    const v = w.compAnnual + w.health > 0 ? `${fmtUSD(w.compAnnual + w.health)} / yr${w.compAnnual === 0 ? ' (health care only)' : ''}` : (p.rating.unrated ? 'Opens with a rating' : sc ? '0% pays nothing yet' : 'Not service-connected');
    const cls = w.compAnnual + w.health > 0 ? '' : 'off';
    const fam = p.spouse || p.children ? ` with ${[p.spouse ? 'a spouse' : null, p.children ? `${p.children} child${p.children === 1 ? '' : 'ren'}` : null].filter(Boolean).join(' and ')}` : ' with no dependents';
    const body = sc && p.rating.num > 0
      ? `<p>At <strong>${p.rating.num}%</strong>${fam}: <strong>${fmtUSD(w.comp)}/mo</strong>, ${fmtUSD(w.compAnnual)} a year, tax-free, whether the business earns a dollar or not. Most founders spend their first two years solving exactly that problem.</p>${w.health ? `<p>${w.onVA && p.vahealth !== 'yes' ? 'At 10% or more you\'re enrolled in VA health care, so' : 'On VA health care,'} the company never has to buy your coverage: about <strong>${fmtUSD(w.health)}</strong> a year a non-veteran founder pays for ${p.spouse || p.children ? 'family' : 'single'} coverage.</p>` : `<p>Not on VA health care? At 10% or more you qualify with no income test; enrolling saves the company roughly ${fmtUSD(p.spouse || p.children ? HEALTH_AVOIDED.family : HEALTH_AVOIDED.single)} a year in premiums. <a href="/va-healthcare/">Check enrollment →</a></p>`}`
      : sc && p.rating.num === 0 ? `<p>A 0% rating pays nothing but it still counts for SDVOSB. If those conditions have worsened, an increase claim turns this card on: 10% is ${fmtUSD(monthlyComp(10, false, 0))}/mo and 100% is ${fmtUSD(monthlyComp(100, p.spouse, p.children))}/mo.</p>`
      : p.rating.unrated ? `${w.health ? `<p>You said you\'re enrolled in VA health care, so the company never has to buy your coverage: about <strong>${fmtUSD(w.health)}</strong> a year a non-veteran founder pays for ${p.spouse || p.children ? 'family' : 'single'} coverage. That\'s the figure above.</p>` : ''}<p>This is what a rating would add${fam}: 30% is <strong>${fmtUSD(monthlyComp(30, p.spouse, p.children))}/mo</strong>, 70% is <strong>${fmtUSD(monthlyComp(70, p.spouse, p.children))}/mo</strong>, 100% is <strong>${fmtUSD(monthlyComp(100, p.spouse, p.children))}/mo</strong>, all tax-free, plus VA health care at 10% or more. <a href="/va-combined/">Build the claim →</a></p>`
      : `${w.health ? `<p>You said you\'re enrolled in VA health care, so the company never has to buy your coverage: about <strong>${fmtUSD(w.health)}</strong> a year. That\'s the figure above.</p>` : ''}<p>Compensation needs a service-connected rating. If you have conditions from service, the claim is the highest-value thing on this page.</p>`;
    out.push(card('runway', 'Runway you already have', v, cls, `${body}<p class="sc-src">VA compensation rates effective 12/1/2025; KFF 2025 Employer Health Benefits Survey (worker share).</p>`, false));
  }
  // 6. State
  {
    const st = r.state;
    if (st) {
      const c = st.certification || {};
      const progs = (st.programs || []);
      const applies = progs.filter(x => x._applies), notNow = progs.filter(x => !x._applies && !x._notLaw);
      const nOpen = (r.stateCertOpen ? 1 : 0) + applies.length; const v = `${nOpen} program${nOpen === 1 ? '' : 's'}${r.stateCertNeedsSC ? ' · 1 needs a rating' : ''}`;
      const certRow = c.exists ? `<div class="state-row"><p class="sr-name">${esc(c.name || 'Veteran business certification')}${r.stateCertNeedsSC ? ' <span class="unverified">(needs a service-connected rating)</span>' : ''}${c.verified === false ? ' <span class="unverified">(not yet verified)</span>' : ''}</p><p>${esc(c.preference || '')}${c.agency ? ` Run by ${esc(c.agency)}.` : ''}${c.url ? ` <a href="${esc(c.url)}" target="_blank" rel="noopener">Apply →</a>` : ''}</p></div>` : `<p>${esc(st.name)} does not run its own veteran business certification${c.preference ? `: ${esc(c.preference)}` : '.'} The federal certification still counts for federal work performed in the state.</p>`;
      const prow = x => `<div class="state-row"><p class="sr-name">${esc(x.name)}${x.dollarEstimate ? ` · <span style="color:var(--green)">${fmtUSD(x.dollarEstimate)}/yr</span>` : x.oneTimeEstimate ? ` · <span style="color:var(--green)">${fmtUSD(x.oneTimeEstimate)} one-time</span>` : ''}${x.verified === false ? ' <span class="unverified">(not yet verified)</span>' : ''}</p><p>${esc(x.details || x.summary || '')}${x.statute ? ` <em>${esc(x.statute)}.</em>` : ''}${x.sourceUrl ? ` <a href="${esc(x.sourceUrl)}" target="_blank" rel="noopener">Source →</a>` : ''}</p></div>`;
      const body = `${certRow}${applies.length ? `<p><strong>Programs that apply to you:</strong></p>${applies.map(prow).join('')}` : ''}${notNow.length ? `<p><strong>On the books, but not for your answers</strong> (window passed, or needs a rating you don\'t have yet):</p>${notNow.map(prow).join('')}` : ''}${!progs.length ? `<p class="unverified">We have not finished verifying ${esc(st.name)}\'s veteran business programs beyond the certification. This row will fill in; the statute and source will be on it when it does.</p>` : ''}<p class="sc-src">State data verified ${esc(STATE_DATA_STAMP)}; each row carries its own source. <a href="/state-benefits/">Compare states →</a></p>`;
      out.push(card('state', `${st.name}: state programs`, v, 'door', body, false));
    }
  }
  // 7. First steps
  {
    const steps = firstSteps(p.mode, r.cert.unrated, p.serving);
    const body = `<ol class="steps-list">${steps.map(([t, w, u]) => `<li><div><p class="st-t">${u ? `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>` : esc(t)}</p><p class="st-w">${esc(w)}</p></div></li>`).join('')}</ol><p class="sc-src">Every link is a government or SBA resource-partner page. Nothing here costs money.</p>`;
    out.push(card('steps', 'Your first steps', 'This month', 'door', body, false));
  }
  $('cards-panel').innerHTML = out.join('');
}

/* ─── FAQ (visible; mirrors FAQPage JSON-LD) ───────────────────────────── */
const FAQ = [
  ['What is the difference between SDVOSB and VOSB certification?', 'Both are free SBA certifications for businesses at least 51% owned and controlled by veterans. VOSB needs an honorably discharged veteran owner. SDVOSB needs an owner with a VA service-connected rating at any percentage, including 0%. SDVOSB is the one agencies set contracts aside for government-wide, with a 5% statutory goal; VOSB set-asides exist mainly at the VA. One VetCert application covers both.'],
  ['Do I need a VA disability rating to get certified as a veteran-owned business?', 'Not for VOSB. For SDVOSB you need a service-connected rating at any level, even 0%. If you have never filed, filing is the first step; an Intent to File locks your effective date while you build the claim.'],
  ['Can VR&E pay for me to start a business?', 'Yes. The Chapter 31 self-employment track can pay for business plan development, training, equipment, initial inventory, licenses, and required insurance when a counselor approves self-employment as your rehabilitation goal. It is not a loan. You need a rating of at least 10% and an employment handicap; discharges before 2013 also have a 12-year window from the first rating notice.'],
  ['How much does the federal government buy from veteran-owned businesses?', 'In FY2025, $32.5 billion in prime contracts went to service-disabled-veteran-owned small businesses, above the 5% goal. The VA alone awarded $10.1 billion, 21.68% of its prime dollars. This tool shows the figure for your own industry code.'],
  ['Does my state have benefits for veteran-owned businesses?', 'Most states run a veteran-owned certification tied to state purchasing, and some add money: Texas waives franchise tax and filing fees for new veteran-owned businesses for five years; Florida waives initial professional license fees within five years of discharge and runs a free state entrepreneurship program for veterans; California gives certified disabled-veteran firms a bid preference; New York sets a 6% goal. Pick your state above for the verified list.'],
];
$('faq-items').innerHTML = FAQ.map(([q, a]) => `<details class="faq-item"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');

/* ─── Share URL ────────────────────────────────────────────────────────── */
const URL_FIELDS = [['r', ratingEl], ['st', stateEl], ['sg', stageEl], ['own', own51El], ['sp', spouseEl], ['ch', childrenEl], ['vh', vahealthEl], ['sv', servingEl], ['dy', dischargeEl], ['fr', firstRatingEl], ['ln', loanEl], ['lt', loanTypeEl]];
function buildShareUrl() {
  const p = new URLSearchParams();
  p.set('mode', state.mode);
  for (const [k, el] of URL_FIELDS) if (el.value !== '' && el.value != null) p.set(k, el.value);
  if (state.bucket) p.set('ind', state.bucket.id);
  return location.origin + location.pathname + '?' + p.toString() + '&source=veteran-business';
}
function loadFromUrl() {
  const p = new URLSearchParams(location.search);
  if (!p.has('r')) {
    if (p.has('mode') && MODE_BRIEF[p.get('mode')]) { setMode(p.get('mode')); history.replaceState(null, '', location.pathname); }
    return false;
  }
  setMode(MODE_BRIEF[p.get('mode')] ? p.get('mode') : 'think');
  for (const [k, el] of URL_FIELDS) if (p.has(k)) el.value = p.get(k);
  if (p.has('ind')) pickBucket(p.get('ind'));
  syncConditionalFields();
  if (p.has('ln') || p.has('dy')) $('assumptions-drawer').open = true;
  history.replaceState(null, '', location.pathname);
  reveal();
  return true;
}

/* ─── Email capture ────────────────────────────────────────────────────── */
async function sendResultsEmail(email, statusEl, btn, placement) {
  if (!email || !email.includes('@')) { statusEl.textContent = 'Please enter a valid email.'; statusEl.className = 'email-status error'; return false; }
  btn.disabled = true;
  statusEl.textContent = 'Sending…'; statusEl.className = 'email-status';
  try {
    const res = await fetch('/api/email-results', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, resultsUrl: buildShareUrl(), source: 'veteran-business' }) });
    const data = await res.json();
    if (res.ok && data.success) {
      statusEl.textContent = '✓ Check your inbox: your stack link is on the way.'; statusEl.className = 'email-status success';
      if (typeof gtag === 'function') gtag('event', 'email_capture', { placement });
      return true;
    }
    statusEl.textContent = data.error || 'Something went wrong. Please try again.'; statusEl.className = 'email-status error';
  } catch { statusEl.textContent = 'Network error. Please try again.'; statusEl.className = 'email-status error'; }
  finally { btn.disabled = false; }
  return false;
}
$('hero-capture-form').addEventListener('submit', async e => { e.preventDefault(); if (await sendResultsEmail($('hero-email-input').value.trim(), $('hero-email-status'), $('hero-email-btn'), 'hero')) $('hero-email-input').value = ''; });
$('email-results-form').addEventListener('submit', async e => { e.preventDefault(); if (await sendResultsEmail($('email-input').value.trim(), $('email-status'), $('email-submit-btn'), 'bottom')) $('email-input').value = ''; });
$('print-btn').addEventListener('click', () => window.print());
$('share-btn').addEventListener('click', async () => {
  const btn = $('share-btn');
  try { await navigator.clipboard.writeText(buildShareUrl()); const o = btn.textContent; btn.textContent = '✓ Link Copied!'; setTimeout(() => { btn.textContent = o; }, 2000); }
  catch { prompt('Copy this link:', buildShareUrl()); }
});

/* ─── Interactive tour (house standard, copied from VFI/transition-health) ── */
const INPUT_TOUR_KEY = 'vfs-tour-seen', RESULTS_TOUR_KEY = 'vfs-results-tour-seen';
const INPUT_TOUR = [
  { id: 'welcome', target: null, label: 'Step 1 of 7', title: 'Welcome: 60 seconds, then it\'s all yours', text: 'Half of WWII veterans owned a business. Today it\'s under 5%. Not because the advantages went away; because nobody lists them. This does. Fill in your real answers as we go; exit anytime.' },
  { id: 'pills', target: '#mode-pills', label: 'Step 2 of 7', title: 'What brings you here?', text: 'Thinking about it, already an owner, or chasing government work. The cards are the same; the verdict and the first steps change. Click one.' },
  { id: 'you', target: '#card-you', label: 'Step 3 of 7', title: 'Your rating and your state', text: 'A service-connected rating at any percentage, even 0%, opens the federal certification. Your state decides which state programs and certification apply. Where you are on the ownership path shapes the first steps.' },
  { id: 'work', target: '#card-work', label: 'Step 4 of 7', title: 'The work, in plain English', text: 'Start typing what you\'d do and pick the closest match. This is what turns "veterans can get contracts" into the dollars the government actually paid firms in your lane last year, with real examples.' },
  { id: 'assumptions', target: '#assumptions-drawer', label: 'Step 5 of 7', title: 'Assumptions, all optional', text: 'Family size sets your compensation. A loan amount prices the SBA fee waiver. Discharge year only matters before 2013 and for state clocks.' },
  { id: 'live', target: '#live-strip', label: 'Step 6 of 7', title: 'Your stack, live', text: 'Doors open and dollars that are already yours, updating as you answer.' },
  { id: 'gate', target: '#compare-btn', label: 'Step 7 of 7', title: 'Show the stack', text: 'Press it, and we\'ll walk through the results together.' },
];
const RESULTS_TOUR = [
  { id: 'r-hero', target: '#hero-verdict', label: 'Results 1 of 4', title: 'The verdict', text: 'What\'s yours today in dollars, how many doors are open, and the contract dollars in your industry. The gold chip is the one thing to do first.' },
  { id: 'r-lane', target: '#card-lane', label: 'Results 2 of 4', title: 'The lane', text: 'Who spent the money, three real awards in plain words, and the sole-source ceiling. "Paid to," not "set aside for." Open the other cards the same way.' },
  { id: 'r-cert', target: '#card-cert', label: 'Results 3 of 4', title: 'The certification', text: 'What SBA checks and the four steps in order. It\'s free. Anyone charging you for it is selling paperwork help.' },
  { id: 'r-capture', target: '#email-results-container', label: 'Results 4 of 4', title: 'Don\'t lose this', text: 'Email yourself the link; it rebuilds this exact page. That\'s the walkthrough.' },
];
const tourState = { active: false, i: 0, steps: INPUT_TOUR, seenKey: INPUT_TOUR_KEY, timer: null };
function isTourActive() { return tourState.active; }
function tourEls() { return { root: $('tour-root'), spot: $('tour-spotlight'), tip: $('tour-tooltip') }; }
function positionTour() {
  const step = tourState.steps[tourState.i]; if (!step) return;
  const { spot, tip } = tourEls();
  if (!step.target) {
    spot.style.cssText = `top:${scrollY + innerHeight / 2}px; left:50vw; width:0; height:0;`;
    if (!matchMedia('(max-width: 560px)').matches) {
      tip.style.left = Math.max(24, (innerWidth - Math.min(380, innerWidth - 48)) / 2) + 'px';
      tip.style.top = (scrollY + innerHeight / 2 - (tip.offsetHeight || 220) / 2) + 'px';
    }
    return;
  }
  const target = document.querySelector(step.target);
  if (!target || target.offsetParent === null) return;
  let r = target.getBoundingClientRect();
  if (r.width === 0 && r.height === 0) return;
  // An open industry dropdown is absolutely positioned and can hang below its card; grow the spotlight to cover it.
  const dd = target.querySelector('.industry-list');
  if (dd && !dd.hidden && dd.offsetParent !== null) {
    const d = dd.getBoundingClientRect();
    const top = Math.min(r.top, d.top), left = Math.min(r.left, d.left), bottom = Math.max(r.bottom, d.bottom), right = Math.max(r.right, d.right);
    r = { top, left, bottom, right, width: right - left, height: bottom - top };
  }
  const pad = 8;
  Object.assign(spot.style, { top: (r.top + scrollY - pad) + 'px', left: (r.left + scrollX - pad) + 'px', width: (r.width + pad * 2) + 'px', height: (r.height + pad * 2) + 'px' });
  const tipH = tip.offsetHeight || 180;
  const below = r.bottom + 16 + tipH < innerHeight || r.top < tipH + 32;
  if (matchMedia('(max-width: 560px)').matches) { tip.style.top = ''; tip.style.left = ''; }
  else {
    tip.style.top = (below ? r.bottom + scrollY + 14 : r.top + scrollY - tipH - 14) + 'px';
    tip.style.left = Math.max(12, Math.min(r.left + scrollX, innerWidth - tip.offsetWidth - 12)) + 'px';
  }
}
function showTourStep(i, dir = 1) {
  if (i < 0 || i >= tourState.steps.length) return endTour();
  const step = tourState.steps[i];
  if (step.target) { const el = document.querySelector(step.target); if (!el || el.offsetParent === null) return showTourStep(i + dir, dir); }
  tourState.i = i;
  const visible = tourState.steps.filter(s => { if (!s.target) return true; const el = document.querySelector(s.target); return el && el.offsetParent !== null; });
  $('tour-step-label').textContent = `${step.label.split(' ')[0]} ${visible.indexOf(step) + 1} of ${visible.length}`;
  $('tour-title').textContent = step.title;
  $('tour-text').textContent = step.text;
  $('tour-next').textContent = i === tourState.steps.length - 1 ? 'Done ✓' : 'Next';
  $('tour-back').style.visibility = i === 0 ? 'hidden' : 'visible';
  if (!step.target) window.scrollTo({ top: 0, behavior: 'smooth' });
  else { const target = document.querySelector(step.target); if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  setTimeout(positionTour, 350);
}
function startTourWith(steps, seenKey) {
  tourState.steps = steps; tourState.seenKey = seenKey; tourState.active = true; tourState.i = 0;
  $('tour-root').hidden = false;
  showTourStep(0);
  clearInterval(tourState.timer);
  tourState.timer = setInterval(positionTour, 400);
}
function endTour() {
  tourState.active = false;
  clearInterval(tourState.timer);
  $('tour-root').hidden = true;
  try { localStorage.setItem(tourState.seenKey, '1'); } catch {}
}
$('tour-next').addEventListener('click', () => showTourStep(tourState.i + 1, 1));
$('tour-back').addEventListener('click', () => showTourStep(tourState.i - 1, -1));
$('tour-exit').addEventListener('click', endTour);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && tourState.active) endTour(); });
document.addEventListener('click', e => {
  if (!tourState.active || e.detail === 0) return;
  if (e.target.closest('#tour-tooltip') || e.target.closest('#tour-restart')) return;
  if (e.target.closest('#compare-btn') || e.target.closest('.mode-pill')) return;
  const r = $('tour-spotlight').getBoundingClientRect();
  const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
  if (!inside) endTour();
});
$('tour-restart').addEventListener('click', () => startTourWith(INPUT_TOUR, INPUT_TOUR_KEY));
addEventListener('resize', positionTour);

/* ─── Init ─────────────────────────────────────────────────────────────── */
setMode('think');
syncConditionalFields();
const arrived = loadFromUrl();
let tourSeen = true;
try { tourSeen = localStorage.getItem(INPUT_TOUR_KEY) === '1'; } catch {}
if (!arrived && !window.__vfsArrivalHadParams && !tourSeen) setTimeout(() => startTourWith(INPUT_TOUR, INPUT_TOUR_KEY), 600);
updateLiveStrip();
