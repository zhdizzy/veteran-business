// Veteran Founder Stack — rules, rates, and static content.
// Every number carries its source and a refresh date. Refresh calendar:
//   Oct 1  : SBA 7(a) fee notice (SBA_FEES), VR&E subsistence (VRE_FULLTIME), FY spend snapshot
//   Dec 1  : VA comp rates (COMP_RATES) after the COLA
//   Each June: SBA scorecard (GOVWIDE) after the release

export const DATA_STAMP = 'September 23, 2026';
export const FY = 2025; // last complete federal fiscal year in the spend snapshot

/* ─── VA disability compensation, monthly, effective 12/1/2025 (2.8% COLA) ──
   Same table as tbv-tools/100-pt/data/benefits-data.js. Source: va.gov/disability/compensation-rates/veteran-rates/ */
export const COMP_RATES = {
  0:   { veteran: 0,       withSpouse: 0,       with1Child: 0,       withSpouseAnd1Child: 0,       addlChild: 0 },
  10:  { veteran: 180.42,  withSpouse: 180.42,  with1Child: 180.42,  withSpouseAnd1Child: 180.42,  addlChild: 0 },
  20:  { veteran: 356.66,  withSpouse: 356.66,  with1Child: 356.66,  withSpouseAnd1Child: 356.66,  addlChild: 0 },
  30:  { veteran: 552.47,  withSpouse: 617.47,  with1Child: 596.47,  withSpouseAnd1Child: 666.47,  addlChild: 32 },
  40:  { veteran: 795.84,  withSpouse: 882.84,  with1Child: 853.84,  withSpouseAnd1Child: 947.84,  addlChild: 43 },
  50:  { veteran: 1132.90, withSpouse: 1241.90, with1Child: 1205.90, withSpouseAnd1Child: 1322.90, addlChild: 54 },
  60:  { veteran: 1435.02, withSpouse: 1566.02, with1Child: 1523.02, withSpouseAnd1Child: 1663.02, addlChild: 65 },
  70:  { veteran: 1808.45, withSpouse: 1961.45, with1Child: 1910.45, withSpouseAnd1Child: 2074.45, addlChild: 76 },
  80:  { veteran: 2102.15, withSpouse: 2277.15, with1Child: 2219.15, withSpouseAnd1Child: 2406.15, addlChild: 87 },
  90:  { veteran: 2362.30, withSpouse: 2559.30, with1Child: 2494.30, withSpouseAnd1Child: 2704.30, addlChild: 98 },
  100: { veteran: 3938.58, withSpouse: 4158.17, with1Child: 4085.43, withSpouseAnd1Child: 4318.99, addlChild: 109.11 },
};
export function monthlyComp(rating, spouse, children) {
  const r = COMP_RATES[rating]; if (!r) return 0;
  const kids = Math.max(0, children | 0);
  let base;
  if (spouse && kids > 0) base = r.withSpouseAnd1Child;
  else if (spouse) base = r.withSpouse;
  else if (kids > 0) base = r.with1Child;
  else base = r.veteran;
  if (kids > 1) base += r.addlChild * (kids - 1);
  return Math.round(base * 100) / 100;
}

/* ─── Employer health insurance a founder never has to buy ─────────────────
   KFF 2025 Employer Health Benefits Survey, average WORKER contribution:
   $1,440/yr single, $6,850/yr family. Same figures as transition-health and va-healthcare. */
export const HEALTH_AVOIDED = { single: 1440, family: 6850, source: 'KFF 2025 Employer Health Benefits Survey (worker share of premiums)' };

/* ─── VR&E subsistence allowance, FY2026, full-time, by dependents ──────────
   Effective 10/1/2025. Source: benefits.va.gov/vocrehab/vrerates26.asp */
export const VRE_FULLTIME = { 0: 812.84, 1: 1008.24, 2: 1188.15, addl: 86.58 };
export function vreMonthly(deps) { const d = Math.max(0, deps | 0); return d <= 2 ? VRE_FULLTIME[d] : VRE_FULLTIME[2] + VRE_FULLTIME.addl * (d - 2); }
// Eligibility window: no time limit for discharges on/after 1/1/2013 (Isakson-Roe, P.L. 116-315 §1017).
// Pre-2013 discharges: 12 years from the LATER of separation or first rating notice (38 CFR 21.41).
export const VRE_NO_LIMIT_DISCHARGE_YEAR = 2013;
export const VRE_WINDOW_YEARS = 12;

/* ─── SBA 7(a) upfront guaranty fees, FY2026 (10/1/2025 to 9/30/2026) ───────
   SBA Information Notice 5000-872051 (issued 8/28/2025).
   Rates apply to the GUARANTEED portion. Express guaranty is 50%; standard 7(a) guaranty is 85% up to $150K, 75% above.
   Veterans: 0% on SBA Express (statutory, Small Business Act §7(a)(31)(G)) for businesses owned and controlled by
   veterans, active-duty members in TAP, reservists, Guard, and their spouses (and surviving spouses of members who died
   in service or of a service-connected disability). Veterans Advantage reductions on non-Express 7(a) are NOT in the
   FY2026 notice as verified 9/22/26; the field below is 0 until a notice says otherwise. */
export const SBA_FEES = {
  fy: 2026, notice: '5000-872051',
  noticeUrl: 'https://www.sba.gov/document/information-notice-5000-872051-7a-fees-effective-october-1-2025-fiscal-year-2026',
  expressMax: 500000, expressGuaranty: 0.50,
  standardGuaranty: (loan) => loan <= 150000 ? 0.85 : 0.75,
  standardMax: 5000000,
  // Upfront fee rate on the guaranteed portion, by TOTAL loan size (standard schedule; Express uses the same tiers)
  rate: (loan) => loan <= 150000 ? 0.02 : loan <= 700000 ? 0.03 : 0.035,
  aboveMillionRate: 0.0375, // on the guaranteed portion above $1M
  veteranExpressRate: 0,
  veteransReductionPct: 0, // non-Express 7(a): verify each Oct 1
};
export function sbaFee(loan, type) {
  const L = Math.max(0, +loan || 0); if (!L) return { baseline: 0, veteran: 0, savings: 0, guaranteed: 0, capped: false };
  const isExpress = type === 'express';
  const cap = isExpress ? SBA_FEES.expressMax : SBA_FEES.standardMax;
  const amt = Math.min(L, cap);
  const g = isExpress ? SBA_FEES.expressGuaranty : SBA_FEES.standardGuaranty(amt);
  const guaranteed = amt * g;
  let baseline;
  if (guaranteed <= 1000000) baseline = guaranteed * SBA_FEES.rate(amt);
  else baseline = 1000000 * 0.035 + (guaranteed - 1000000) * SBA_FEES.aboveMillionRate;
  const veteran = isExpress ? baseline * SBA_FEES.veteranExpressRate : baseline * (1 - SBA_FEES.veteransReductionPct);
  return { baseline: Math.round(baseline), veteran: Math.round(veteran), savings: Math.round(baseline - veteran), guaranteed: Math.round(guaranteed), capped: L > cap };
}

/* ─── Federal contracting facts ─────────────────────────────────────────── */
export const GOVWIDE = {
  fy: 2025,
  sdvosbDollars: 32.5e9,             // SBA FY2025 scorecard release, 6/25/2026
  sdvosbGoalPct: 5,                  // statutory govwide goal (15 U.S.C. 644(g))
  vaSdvosbDollars: 10.1e9, vaSdvosbPct: 21.68, // VA OSDBU, FY2025
  sourceUrl: 'https://www.sba.gov/article/2026/06/25/sba-releases-fy25-scorecard-small-business-contracting',
};
export const SOLE_SOURCE = {
  farOther: 5000000,        // FAR 19.1406, non-manufacturing, after the 10/1/2025 inflation adjustment (verify each October)
  farManufacturing: 8500000,
  va: 5000000,              // 38 U.S.C. 8127(c), statutory, VAAR 819.7008
  farUrl: 'https://www.acquisition.gov/far/19.1406',
  vaUrl: 'https://www.acquisition.gov/vaar/subpart-819.70-va-veterans-first-contracting-program',
};
export const CERT = {
  vetcertUrl: 'https://veterans.certify.sba.gov/',
  samUrl: 'https://sam.gov/',
  apexUrl: 'https://www.apexaccelerators.us/',
  vbocUrl: 'https://www.sba.gov/local-assistance/resource-partners/veterans-business-outreach-center-vboc-program',
  b2bUrl: 'https://bootstobusiness.sba.gov/s/',
  requirements: [
    'A service-connected disability rating from the VA at any percentage, including 0%, for SDVOSB. Any honorably discharged veteran qualifies for VOSB.',
    'At least 51% of the business owned directly and unconditionally by one or more veterans (service-disabled veterans for SDVOSB).',
    'The veteran owner holds the highest officer position, runs day-to-day operations, and makes the long-term decisions.',
    'The business is small under the SBA size standard for its primary NAICS code.',
  ],
  steps: [
    ['Register in SAM.gov and get your Unique Entity ID', 'Free. Takes about 10 business days. Do this first; VetCert checks it.', 'https://sam.gov/'],
    ['Apply at SBA VetCert', 'Free. One application covers SDVOSB and VOSB. Upload your VA rating letter (or DD-214 for VOSB), formation documents, and ownership records.', 'https://veterans.certify.sba.gov/'],
    ['Book a free APEX Accelerator session', 'Government-funded counselors who help small businesses sell to the government. Every state has offices.', 'https://www.apexaccelerators.us/'],
    ['Write a one-page capability statement', 'Who you are, what you do, your NAICS codes, your certification, past performance. Contracting officers ask for it by name.', null],
  ],
};

/* ─── Boots to Business and the pre-discharge path ──────────────────────── */
export const STILL_SERVING = {
  b2b: ['Boots to Business (in TAP)', 'A free two-day SBA course on base, followed by an optional online follow-on. Ask your TAP counselor to schedule it; spouses can attend.', 'https://bootstobusiness.sba.gov/s/'],
  reboot: ['Boots to Business: Reboot', 'The same course, off base, for veterans and Guard/Reserve who already separated.', 'https://bootstobusiness.sba.gov/s/'],
};

/* ─── First three steps, by mode and rating status ──────────────────────── */
export function firstSteps(mode, unrated, stillServing) {
  const s = [];
  if (unrated) s.push(['File an Intent to File with the VA', 'Locks your effective date today. Any service-connected rating, even 0%, opens SDVOSB certification.', 'https://www.va.gov/disability/how-to-file-claim/']);
  if (stillServing) s.push(STILL_SERVING.b2b);
  if (mode === 'think') {
    if (!stillServing) s.push(STILL_SERVING.reboot);
    s.push(['Find your Veterans Business Outreach Center', 'Free business plan help and mentoring for veteran founders, funded by SBA.', CERT.vbocUrl]);
    s.push(['Form the entity and get an EIN', 'File in your state, then get the EIN at irs.gov (free, ten minutes). You need both before SAM.gov.', 'https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number']);
  } else if (mode === 'own') {
    s.push(CERT.steps[0], CERT.steps[1], CERT.steps[2]);
  } else {
    s.push(CERT.steps[0], CERT.steps[1]);
    s.push(['Search SAM.gov Contract Opportunities by set-aside', 'Filter by your NAICS codes and set-aside type SDVOSB. Answer Sources Sought notices; that is how set-asides get created.', 'https://sam.gov/search/?index=opp']);
  }
  return s.slice(0, 4);
}
