#!/usr/bin/env python3
"""
Snapshot FY federal contract obligations to SDVOSB / VOSB recipients per industry
bucket from the public USASpending.gov v2 API. No API key needed.

Usage (from tbv-tools/):
    python3 veteran-business/data/snapshot-spend.py            # FY2025 -> spend-fy2025.json
    python3 veteran-business/data/snapshot-spend.py 2026       # FY2026 -> spend-fy2026.json

Writes veteran-business/data/spend-fy<FY>.json next to this script.
Polite: 1s sleep between calls, one retry after 5s on timeout, null on repeat failure.
"""
import json
import os
import statistics
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone

FY = int(sys.argv[1]) if len(sys.argv) > 1 else 2025
START = f"{FY - 1}-10-01"
END = f"{FY}-09-30"
BASE = "https://api.usaspending.gov/api/v2/search/"
UA = "TheBetterVeteran-tools/1.0 (tools.thebetterveteran.com; public data snapshot)"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), f"spend-fy{FY}.json")

BUCKETS = [
    ("it-software", "IT & software", [541511, 541512, 541519]),
    ("cybersecurity", "Cybersecurity", [541512, 541519]),
    ("consulting", "Management consulting", [541611, 541618]),
    ("training", "Training & education services", [611430, 611699]),
    ("marketing", "Marketing & creative", [541613, 541810, 541430]),
    ("engineering", "Engineering", [541330]),
    ("staffing", "Staffing", [561320]),
    ("facilities", "Facilities support", [561210]),
    ("janitorial", "Janitorial", [561720]),
    ("landscaping", "Landscaping & grounds", [561730]),
    ("pest-control", "Pest control", [561710]),
    ("security", "Security guard services", [561612]),
    ("construction", "General construction", [236220, 236118]),
    ("electrical", "Electrical", [238210]),
    ("hvac-plumbing", "HVAC & plumbing", [238220]),
    ("roofing", "Roofing", [238160]),
    ("trucking", "Trucking & freight", [484110, 484121]),
    ("logistics", "Logistics & freight brokerage", [488510]),
    ("medical-supply", "Medical supplies wholesale", [423450]),
    ("medical-staffing", "Medical staffing", [561320, 621999]),
    ("machine-shop", "Machine shop & metal fab", [332710, 332999]),
    ("aviation-parts", "Aviation parts", [336413]),
    ("auto-repair", "Auto repair", [811111]),
    ("real-estate", "Real estate", [531210, 531311]),
    ("food-service", "Food service", [722511, 722320]),
    ("fitness", "Fitness", [713940]),
    ("photo-video", "Photo, video & drone", [541921, 512110, 541370]),
    ("environmental", "Environmental services", [562910, 541620]),
    ("firearms-training", "Firearms & tactical training", [611699]),
]

AWARD_FIELDS = [
    "Award ID", "Recipient Name", "Award Amount", "Awarding Agency",
    "Awarding Sub Agency", "Description", "Place of Performance State Code",
    "Start Date",
]


def filters(naics, recipient_type):
    f = {
        "time_period": [{"start_date": START, "end_date": END}],
        "award_type_codes": ["A", "B", "C", "D"],
        "recipient_type_names": [recipient_type],
    }
    if naics:
        f["naics_codes"] = [str(n) for n in naics]
    return f


def post(path, body, timeout=60):
    """POST JSON; one retry after 5s; return parsed JSON or None."""
    data = json.dumps(body).encode()
    for attempt in (1, 2):
        req = urllib.request.Request(
            BASE + path, data=data, method="POST",
            headers={"Content-Type": "application/json", "User-Agent": UA},
        )
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return json.load(r)
        except (urllib.error.URLError, TimeoutError, OSError) as e:
            print(f"    ! {path} attempt {attempt} failed: {e}", file=sys.stderr)
            if attempt == 1:
                time.sleep(5)
        finally:
            time.sleep(1)
    return None


def total(naics, rtype):
    res = post("spending_over_time/", {"group": "fiscal_year", "filters": filters(naics, rtype)})
    if not res:
        return None
    rows = res.get("results") or []
    return round(sum(float(r.get("aggregated_amount") or 0) for r in rows), 2) if rows else 0.0


def agencies(naics, rtype):
    res = post("spending_by_category/awarding_agency/",
               {"filters": filters(naics, rtype), "limit": 5, "page": 1})
    if not res:
        return None
    return [{"name": r.get("name"), "amount": round(float(r.get("amount") or 0), 2)}
            for r in res.get("results") or []]


def awards(naics, rtype, limit=100, amount_band=None):
    f = filters(naics, rtype)
    if amount_band:
        lo, hi = amount_band
        f["award_amounts"] = [{"lower_bound": lo, "upper_bound": hi}]
    res = post("spending_by_award/", {
        "filters": f, "fields": AWARD_FIELDS,
        "limit": limit, "page": 1, "sort": "Award Amount", "order": "desc",
    }, timeout=90)
    if not res:
        return None
    return res.get("results") or []


# Bands for the traceable small/medium examples in industry-buckets.js.
SAMPLE_BANDS = {"small": (10_000, 250_000), "medium": (250_000, 5_000_000)}


def to_record(a):
    return {
        "recipient": a.get("Recipient Name"),
        "amount": round(float(a.get("Award Amount") or 0), 2),
        "agency": a.get("Awarding Agency"),
        "subAgency": a.get("Awarding Sub Agency"),
        "description": a.get("Description"),
        "state": a.get("Place of Performance State Code"),
        "start": a.get("Start Date"),
    }


def main():
    out = {
        "fy": FY,
        "fetchedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "source": (f"USASpending.gov v2 API, awards to recipients flagged SDVOSB "
                   f"(recipient_type_names), FY{FY} obligations"),
        "govwideSdvosbTotal": None,
        "buckets": {},
    }

    print("gov-wide SDVOSB total ...")
    out["govwideSdvosbTotal"] = total(None, "service_disabled_veteran_owned_business")
    print(f"  {out['govwideSdvosbTotal']}")

    for bid, label, naics in BUCKETS:
        print(f"{bid} ({label}) ...")
        sd = total(naics, "service_disabled_veteran_owned_business")
        vo = total(naics, "veteran_owned_business")
        ag = agencies(naics, "service_disabled_veteran_owned_business")
        aw = awards(naics, "service_disabled_veteran_owned_business")

        top = None
        median = None
        count = None
        if aw is not None:
            amounts = [float(a.get("Award Amount") or 0) for a in aw]
            count = len(aw)
            median = round(statistics.median(amounts), 2) if amounts else None
            top = [to_record(a) for a in aw[:25]]

        samples = {
            "note": ("Largest 20 SDVOSB awards in each band, for traceable small/medium "
                     "examples. small = $10K-$250K, medium = $250K-$5M."),
        }
        for band, lo_hi in SAMPLE_BANDS.items():
            got = awards(naics, "service_disabled_veteran_owned_business", limit=20, amount_band=lo_hi)
            samples[band] = None if got is None else [to_record(a) for a in got]

        out["buckets"][bid] = {
            "label": label,
            "naics": naics,
            "sdvosbTotal": sd,
            "vosbTotal": vo,
            "agencies": ag,
            "awardCountSampled": count,
            "medianOfTop100": median,
            "topAwards": top,
            "sampleAwards": samples,
        }
        print(f"  sdvosb={sd} vosb={vo} agencies={len(ag) if ag else ag} awards={count} median={median}")

    with open(OUT, "w") as f:
        json.dump(out, f, indent=2)
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
