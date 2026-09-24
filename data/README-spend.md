# Spend snapshot (SDVOSB / VOSB federal obligations by industry)

`spend-fy2025.json` is a static snapshot of FY2025 (2024-10-01 to 2025-09-30) federal
contract obligations to recipients flagged service-disabled-veteran-owned (and
veteran-owned) on USASpending.gov, grouped into the industry buckets the tool uses.
The tool reads this file at runtime. It never calls USASpending live.

## What is in the JSON

- `govwideSdvosbTotal`: all SDVOSB contract obligations for the fiscal year, no NAICS filter.
- `buckets.<id>`: one entry per bucket in `industry-buckets.js`.
  - `sdvosbTotal` / `vosbTotal`: obligations to SDVOSB / VOSB-flagged recipients in that bucket's NAICS codes.
  - `agencies`: top 5 awarding agencies by SDVOSB obligations.
  - `topAwards`: the 25 largest awards (recipient, amount, agency, description, state, start date).
  - `sampleAwards.small` / `sampleAwards.medium`: the 20 largest awards in the $10K to $250K band and the $250K to $5M band, same record shape. These exist so the small and medium `examples` in `industry-buckets.js` trace to a real record in this file (the top-100 pull alone only surfaces large awards in busy buckets).
  - `medianOfTop100`: median award amount across the 100 largest awards only. It is NOT the median of all awards in the bucket. Label it that way in any UI.
  - `awardCountSampled`: how many awards came back for the top-100 pull (100 unless the bucket is thin).
- Any field is `null` if the API call failed twice. Re-run the script to fill gaps.

Recipient-type flags come from SAM registration, so a firm counts as SDVOSB whether or
not the award was a set-aside. Bucket totals overlap where NAICS codes are shared
(cybersecurity is a subset of it-software, medical-staffing overlaps staffing,
firearms-training overlaps training). Do not sum buckets.

## How to refresh

From `tbv-tools/`:

```
python3 veteran-business/data/snapshot-spend.py 2025
```

Pass a different fiscal year to write `spend-fy<year>.json`. Takes about 6 to 8
minutes (about 180 API calls, six per bucket plus one gov-wide, with a 1 second pause
between each; one retry after 5s on timeout). No API key is required. Then:

1. Skim the new `topAwards` and re-check the `examples` in `industry-buckets.js` still
   trace to real records (each example is hand-written from a fetched description; the
   dollar amount must match the record).
2. Bump `SPEND_SNAPSHOT_FY` in `industry-buckets.js` if the year changed.
3. If a bucket's NAICS list changes, change it in BOTH `snapshot-spend.py` and
   `industry-buckets.js`.

Suggested cadence: once a year in late October or November, after the fiscal year
closes and agencies finish reporting (USASpending data lags 30 to 90 days).

Endpoints used (all POST, documented at https://api.usaspending.gov/docs/endpoints):

- `/api/v2/search/spending_over_time/` for totals
- `/api/v2/search/spending_by_category/awarding_agency/` for top agencies
- `/api/v2/search/spending_by_award/` for the top 100 awards


## Firm counts

After `snapshot-spend.py`, run `python3 snapshot-firms.py 2025` from this folder. It pages through USASpending's `spending_by_category/recipient` results per bucket (SDVOSB-flagged recipients) and adds `recipientCount`, `medianPerRecipient`, and `top10SharePct` to each bucket in `spend-fy2025.json`. About 25 minutes total; it checkpoints after every bucket and skips buckets that already have counts unless you pass `--force`.
