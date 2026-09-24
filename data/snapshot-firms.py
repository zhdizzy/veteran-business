#!/usr/bin/env python3
"""Adds per-bucket firm counts to spend-fy<FY>.json.

For each industry bucket, pages through USASpending's spending_by_category/recipient
endpoint (SDVOSB-flagged recipients, last full FY) and records:
  recipientCount        distinct firms that were paid in the bucket
  medianPerRecipient    the median firm's total for the year
  top10SharePct         share of bucket dollars that went to the 10 largest firms
Run after snapshot-spend.py:  python3 snapshot-firms.py 2025
Slow on purpose (about 14 s per page of 100 recipients, 1 s sleep between pages).
"""
import json, sys, time, urllib.request, urllib.error, statistics, os

FY = int(sys.argv[1]) if len(sys.argv) > 1 else 2025
HERE = os.path.dirname(os.path.abspath(__file__))
SNAP = os.path.join(HERE, f'spend-fy{FY}.json')
BASE = 'https://api.usaspending.gov/api/v2'
MAX_PAGES = 80  # 8,000 recipients; no bucket should come close


def post(path, body, tries=3):
    for i in range(tries):
        try:
            req = urllib.request.Request(BASE + path, data=json.dumps(body).encode(),
                                         headers={'Content-Type': 'application/json', 'User-Agent': 'thebetterveteran.com tools'})
            return json.load(urllib.request.urlopen(req, timeout=120))
        except Exception as e:  # noqa
            print('  retry', i + 1, type(e).__name__, flush=True)
            time.sleep(5 * (i + 1))
    return None


def firms_for(naics):
    filt = {'time_period': [{'start_date': f'{FY-1}-10-01', 'end_date': f'{FY}-09-30'}],
            'award_type_codes': ['A', 'B', 'C', 'D'], 'naics_codes': naics,
            'recipient_type_names': ['service_disabled_veteran_owned_business']}
    amounts = []
    page = 1
    while page <= MAX_PAGES:
        r = post('/search/spending_by_category/recipient/', {'filters': filt, 'limit': 100, 'page': page})
        if not r:
            return None
        amounts += [x['amount'] for x in r.get('results', []) if x.get('amount') is not None]
        if not r.get('page_metadata', {}).get('hasNext'):
            break
        page += 1
        time.sleep(1)
    pos = [a for a in amounts if a > 0]  # de-obligations show as negatives; a firm is "paid" if net positive
    if not pos:
        return {'recipientCount': 0, 'medianPerRecipient': None, 'top10SharePct': None, 'pagesFetched': page}
    pos.sort(reverse=True)
    total = sum(pos)
    return {'recipientCount': len(pos), 'medianPerRecipient': round(statistics.median(pos)),
            'top10SharePct': round(100 * sum(pos[:10]) / total, 1) if total else None, 'pagesFetched': page}


def main():
    snap = json.load(open(SNAP))
    for bid, b in snap['buckets'].items():
        if b.get('recipientCount') is not None and '--force' not in sys.argv:
            continue
        t = time.time()
        res = firms_for(b['naics'])
        if res is None:
            print(bid, 'FAILED', flush=True)
            continue
        b.update(res)
        print(f"{bid:18s} firms={res['recipientCount']:5d} median=${res['medianPerRecipient'] or 0:,.0f} top10={res['top10SharePct']}% pages={res['pagesFetched']} ({time.time()-t:.0f}s)", flush=True)
        json.dump(snap, open(SNAP, 'w'), indent=1)  # checkpoint after every bucket
        time.sleep(1)
    snap['firmsFetchedAt'] = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
    json.dump(snap, open(SNAP, 'w'), indent=1)
    print('done', flush=True)


if __name__ == '__main__':
    main()
