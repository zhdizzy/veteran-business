// State veteran business benefits: certification programs and dollar-bearing programs for all 50 states plus DC.
// Every row carries its own sourceUrl (an official state page that was fetched) or a statute citation from an official page.
// verified:false rows are kept on purpose with a needsFollowup note; treat them as leads, not facts, until re-checked.
// dollarEstimate is an ANNUAL value only. One-time amounts (filing fee waivers, one-time credits) live in oneTimeEstimate,
// which the tool does not add into the yearly stack.
// Trigger values: veteran | sc-veteran | disabled-veteran | new-business | discharge-window
// Type values: tax_exemption | fee_waiver | procurement_preference | grant | loan | training | other

export const STATE_DATA_STAMP = "2026-09-23";

export const STATE_BUSINESS_BENEFITS = {
  "AL": {
    name: "Alabama",
    certification: {
      exists: false,
      name: null,
      agency: "Alabama Department of Finance, Office of the Chief Procurement Officer",
      url: "https://va.alabama.gov/wp-content/uploads/2026/03/AL-Laws-Affecting-Veterans-Act-2025-37-Draft.pdf",
      preference: "No state certification or registry. Alabama law lets an awarding authority treat a business more than 50 percent veteran-owned as a preferred vendor and award to it at up to 5 percent above the low bid, claimed at bid time; the ADVA 2025 guide cites Ala. Code 41-16-20, which was repealed in 2022, so the current section is unconfirmed. ADECA's minority business certification has no veteran category.",
      verified: false
    },
    programs: [
      {
        id: "al-veteran-startup-credit",
        name: "Veterans Employment Act startup tax credit",
        type: "tax_exemption",
        trigger: "discharge-window",
        windowMonths: null,
        summary: "A one-time $2,000 Alabama income tax credit for a recently discharged, unemployed veteran who starts a business.",
        details: "Listed in the Alabama Department of Veterans Affairs 2025 guide to state laws affecting veterans under employment tax incentives. The credit is $2,000 for recently discharged unemployed veterans who start their own business; a companion credit pays small employers $1,000 per recently discharged unemployed veteran hired. Claim it on the Alabama income tax return. The statute sets the definition of recently discharged and a business income test that the guide does not reproduce.",
        dollarEstimate: null,
        oneTimeEstimate: 2000,
        statute: "Ala. Code 40-18-320 to 40-18-324",
        sourceUrl: "https://va.alabama.gov/wp-content/uploads/2026/03/AL-Laws-Affecting-Veterans-Act-2025-37-Draft.pdf",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "Fetch Ala. Code 40-18-323 for the discharge lookback window (months) and the business income threshold."
      },
      {
        id: "al-preferred-vendor",
        name: "Preferred vendor status for veteran-owned businesses",
        type: "procurement_preference",
        trigger: "veteran",
        windowMonths: null,
        summary: "An Alabama business more than 50 percent veteran-owned may win a state contract with a bid up to 5 percent above the lowest bid.",
        details: "The award is discretionary, not mandatory. Under the pre-2022 statute the veteran owner needed a discharge other than dishonorable and at least 24 months of active service. There is no certification; the status is claimed at bid time.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "Former Ala. Code 41-16-20 (repealed 10/1/2022); successor section in the 2021 State Procurement Code not confirmed",
        sourceUrl: "https://va.alabama.gov/wp-content/uploads/2026/03/AL-Laws-Affecting-Veterans-Act-2025-37-Draft.pdf",
        verifiedDate: "2026-09-23",
        verified: false,
        needsFollowup: "Confirm the current code section in Title 41 Chapter 4 and whether the 24-month service test survived."
      }
    ]
  },

  "AK": {
    name: "Alaska",
    certification: {
      exists: true,
      name: "Alaska Veteran Preference (bid-time self-certification)",
      agency: "Alaska Department of Administration, Office of Procurement and Property Management",
      url: "https://oppm.doa.alaska.gov/media/1453/pref1.pdf",
      preference: "5 percent off the evaluated bid price, capped at $5,000 per bid, for Alaska bidders majority-owned by Alaska veterans; stacks with the 5 percent Alaska Bidder Preference. No registry; claim it on the bid.",
      verified: true
    },
    programs: [
      {
        id: "ak-veteran-bid-preference",
        name: "Alaska Veteran Preference on state bids",
        type: "procurement_preference",
        trigger: "veteran",
        windowMonths: null,
        summary: "Majority veteran-owned Alaska bidders get 5 percent off their evaluated bid price, up to $5,000, on state procurements.",
        details: "The bidder must qualify as an Alaska bidder and be a sole proprietorship owned by an Alaska veteran or an entity whose majority of members, partners, or shareholders are Alaska veterans. An Alaska veteran is a state resident who served in the armed forces, reserves, or Alaska Guard and separated under conditions that were not dishonorable. Claim the preference on the bid form; the procurement officer may ask for a DD-214 or NGB-22.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "AS 36.30.321(f)",
        sourceUrl: "https://oppm.doa.alaska.gov/media/1453/pref1.pdf",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: null
      },
      {
        id: "ak-disabled-vet-license-fee",
        name: "Reduced Alaska business license fee for disabled veteran sole proprietors",
        type: "fee_waiver",
        trigger: "disabled-veteran",
        windowMonths: null,
        summary: "A sole proprietor who is a disabled veteran pays $25 a year for the Alaska business license instead of $50.",
        details: "The reduced fee applies only to sole proprietorships, not LLCs, corporations, or partnerships. Attach VA documentation of a service-connected disability to the business license application; the statute sets no minimum rating. The saving is $25 per year, or $50 on a two-year license.",
        dollarEstimate: 25,
        oneTimeEstimate: null,
        statute: "AS 43.70.030(a)(2); 12 AAC 12.010; 12 AAC 12.030",
        sourceUrl: "https://www.commerce.alaska.gov/web/portals/5/pub/BusinessLicenseStatutes.pdf",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: null
      }
    ]
  },

  "AZ": {
    name: "Arizona",
    certification: {
      exists: true,
      name: "Veteran-owned business participation goal and ADVS registry (not confirmed in current law)",
      agency: "Arizona Department of Administration, State Procurement Office; Arizona Department of Veterans' Services",
      url: "https://spo.az.gov/",
      preference: "Unconfirmed. Search results describe a goal of 1.5 percent rising to 3 percent for disabled veteran-owned businesses with a registry kept by ADVS, but the State Procurement Office PDF, the ADVS Vet Biz pages, and the statute page all returned 403 or 404, so nothing here is verified.",
      verified: false
    },
    programs: []
  },

  "AR": {
    name: "Arkansas",
    certification: {
      exists: false,
      name: null,
      agency: "Arkansas Economic Development Commission",
      url: "https://codeofarrules.arkansas.gov/Rules/Rule?levelType=part&titleID=15&chapterID=166&subChapterID=209&partID=376",
      preference: "None as of March 16, 2026. The state's Minority and Women-Owned Business Enterprise certification, which included a service-disabled veteran category, was repealed by Ark. R. 2026-22 to comply with Act 116 of 2025. No successor veteran program has been posted.",
      verified: true
    },
    programs: []
  },

  "CA": {
    name: "California",
    certification: {
      exists: true,
      name: "Disabled Veteran Business Enterprise (DVBE) certification",
      agency: "California Department of General Services, Office of Small Business and DVBE Services",
      url: "https://www.dgs.ca.gov/PD/Services/Page-Content/Procurement-Division-Services-List-Folder/Certify-or-Re-apply-as-Small-Business-Disabled-Veteran-Business-Enterprise",
      preference: "3 percent DVBE participation goal on state contracts, plus a DVBE bid incentive that DGS caps at 5 percent of the low bid or $100,000, whichever is less. Requires a service-connected disability of at least 10 percent, 51 percent ownership and control by disabled veterans, and California domicile.",
      verified: true
    },
    programs: [
      {
        id: "ca-dvbe-goal-and-incentive",
        name: "DVBE 3 percent participation goal and bid incentive",
        type: "procurement_preference",
        trigger: "disabled-veteran",
        windowMonths: null,
        summary: "State agencies must aim to place 3 percent of contract value with certified DVBEs and give DVBE bidders a price incentive of up to 5 percent.",
        details: "Military and Veterans Code 999 sets a DVBE participation goal of at least 3 percent of total contract value for each state agency. Section 999.5 requires DGS to run a uniform DVBE incentive that every agency applies; DGS caps the incentive at 5 percent of the lowest bid or $100,000, whichever is less. Certify through the Cal eProcure portal with proof of the 10 percent or higher service-connected rating and 51 percent ownership.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "Cal. Mil. and Vet. Code 999, 999.5; Pub. Contract Code 10115; 2 CCR 1896.60 et seq.",
        sourceUrl: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=MVC&sectionNum=999.",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "The 5 percent / $100,000 incentive cap comes from a DGS State Contracting Manual PDF surfaced in search; the DGS certification page itself returned 404 on fetch."
      }
    ]
  },

  "CO": {
    name: "Colorado",
    certification: {
      exists: false,
      name: null,
      agency: "Colorado Department of Personnel and Administration, State Purchasing and Contracts Office",
      url: "https://content.leg.colorado.gov/sites/default/files/documents/audits/2556p-state-contracting-goal-for-sdvosbs-accessible.pdf",
      preference: "No state certification. Colorado relies on federal SBA SDVOSB certification and sets a 3 percent contracting goal for SDVOSBs (C.R.S. 24-103-905); agencies may apply a preference but the statute sets no size or method. Register in Vendor Self Service and check the SDVOSB box.",
      verified: true
    },
    programs: [
      {
        id: "co-sdvosb-goal",
        name: "SDVOSB 3 percent state contracting goal",
        type: "procurement_preference",
        trigger: "sc-veteran",
        windowMonths: null,
        summary: "Colorado aims to award 3 percent of state contract dollars to SBA-certified SDVOSBs based in the state.",
        details: "The goal is aspirational, not a set-aside; a May 2026 state audit found actual awards ran well under 1 percent. To count, get SBA SDVOSB certification, register with the Colorado Secretary of State, register in Vendor Self Service and self-identify as SDVOSB, and list in DPA's Supplier Diversity Directory. Agencies have discretion to apply a preference of unspecified size.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "C.R.S. 24-103-905",
        sourceUrl: "https://content.leg.colorado.gov/sites/default/files/documents/audits/2556p-state-contracting-goal-for-sdvosbs-accessible.pdf",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: null
      }
    ]
  },

  "CT": {
    name: "Connecticut",
    certification: {
      exists: true,
      name: "Veteran-Owned Micro Business Certification",
      agency: "Connecticut Department of Veterans Affairs (certifies); Department of Administrative Services (applies the preference)",
      url: "https://portal.ct.gov/dva/knowledge-base/articles/advocacy-and-assistance/state-veterans-resources/veteran-owned-micro-business-certification",
      preference: "15 percent price preference when DAS determines the lowest responsible qualified bidder. Business must be at least 51 percent veteran-owned with gross revenue of $3 million or less in the last fiscal year.",
      verified: true
    },
    programs: [
      {
        id: "ct-vomb-price-preference",
        name: "Veteran-Owned Micro Business 15 percent price preference",
        type: "procurement_preference",
        trigger: "veteran",
        windowMonths: null,
        summary: "Certified veteran-owned businesses under $3 million in revenue get a 15 percent price preference on DAS state contract bids.",
        details: "Apply to the Connecticut Department of Veterans Affairs with form CTVOMB-1 showing 51 percent veteran ownership and revenue at or under $3 million. DAS lists the program among its contracting preference programs and applies the 15 percent preference when comparing bids. No fee is stated on the DVA page.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "CGS 4a-59 as amended by Public Act 16-184",
        sourceUrl: "https://portal.ct.gov/das/procurement/contracting/das-procurement-agency-procurement-manual/contracting-preference-programs",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: null
      }
    ]
  },

  "DE": {
    name: "Delaware",
    certification: {
      exists: true,
      name: "Veteran Owned Business Enterprise (VOBE) and Service Disabled Veteran Owned Business Enterprise (SDVOBE) certification",
      agency: "Delaware Division of Small Business, Office of Supplier Diversity",
      url: "https://business.delaware.gov/osd/certify/",
      preference: "Listing only. Certification places the firm in the state Directory of Certified Businesses that agencies use for supplier diversity plans; the policy states no bid preference, set-aside, or numeric goal.",
      verified: true
    },
    programs: [
      {
        id: "de-osd-vobe",
        name: "OSD VOBE and SDVOBE certification",
        type: "other",
        trigger: "veteran",
        windowMonths: null,
        summary: "A three-year state certification that lists veteran-owned firms in Delaware's certified business directory.",
        details: "Requires 51 percent ownership and control by veterans (six months of service, discharge other than dishonorable) or by service-disabled veterans verified through the VA. The business needs a Delaware business license and a physical Delaware location. Apply through the OSD online portal; decisions take about four to six weeks.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: null,
        sourceUrl: "https://osd.delaware.gov/uploads/OSD%20Certification%20Policies%20and%20Eligibility%20Requirements.pdf",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "Policy does not state a fee; confirm on the portal."
      }
    ]
  },

  "DC": {
    name: "District of Columbia",
    certification: {
      exists: true,
      name: "Certified Business Enterprise (CBE) program, Veteran-Owned Business Enterprise category",
      agency: "DC Department of Small and Local Business Development",
      url: "https://dslbd.dc.gov/page/cbe-certification-frequently-asked-questions-faqs",
      preference: "2 extra evaluation points on proposals and a 2 percent bid price reduction for the veteran-owned category, on top of base Local Business Enterprise points. Requires LBE status (principal office in DC) and 51 percent veteran ownership and control.",
      verified: true
    },
    programs: [
      {
        id: "dc-cbe-vob-points",
        name: "CBE Veteran-Owned Business Enterprise preference",
        type: "procurement_preference",
        trigger: "veteran",
        windowMonths: null,
        summary: "DC-based veteran-owned firms certified as CBEs get 2 extra evaluation points and a 2 percent price reduction on District contracts.",
        details: "The business must first qualify as a Local Business Enterprise, then request the veteran-owned designation in the CBE application. Veteran is defined by reference to 38 U.S.C. 101(2) and veterans must control management and daily operations. CBE status also opens the District's CBE set-aside and subcontracting requirements.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "D.C. Code 2-218.38; 2-218.43",
        sourceUrl: "https://code.dccouncil.gov/us/dc/council/code/sections/2-218.38",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "Application fee not confirmed."
      }
    ]
  },

  "FL": {
    name: "Florida",
    certification: {
      exists: true,
      name: "Certified Veteran Business Enterprise",
      agency: "Florida Department of Management Services, Office of Supplier Development",
      url: "https://www.dms.myflorida.com/business_operations/state_purchasing/office_of_supplier_development_osd/get_certified/veteran-owned_small_businesses",
      preference: "Tie-bid preference and directory listing. When bids are of equal merit, agencies must award to the certified veteran business enterprise. Requires 51 percent ownership and control by wartime or service-disabled veterans, Florida domicile, net worth of $5 million or less, and 200 or fewer employees.",
      verified: true
    },
    programs: [
      {
        id: "fl-dbpr-license-fee-waiver",
        name: "DBPR initial professional license fee waiver",
        type: "fee_waiver",
        trigger: "discharge-window",
        windowMonths: 60,
        summary: "Florida waives the initial licensing, application, and unlicensed activity fees for a veteran (or spouse) who applies for a DBPR professional license within 60 months of discharge.",
        details: "Section 455.213(13) requires DBPR to waive the initial licensing fee, initial application fee, and initial unlicensed activity fee for a veteran or the veteran's spouse who applies within 60 months after discharge. Exam fees and incidental fees are not waived, and the waiver does not cover business licenses from the Divisions of Hotels and Restaurants, Alcoholic Beverages and Tobacco, Condominiums, or Pari-Mutuel Wagering. Submit form DBPR MVL 002 with a DD-214 or NGB-22 alongside the license application. Amounts vary by profession, so no fixed dollar value is listed.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "Fla. Stat. 455.213(13) (HB 7015, 2014)",
        sourceUrl: "https://www2.myfloridalicense.com/military-services/veterans-services/",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: null
      },
      {
        id: "fl-vbe-tie-bid",
        name: "Certified Veteran Business Enterprise tie-bid preference",
        type: "procurement_preference",
        trigger: "veteran",
        windowMonths: null,
        summary: "Certified Florida veteran business enterprises win state contracts when competing bids are of equal merit.",
        details: "Under section 295.187, the Department of Management Services certifies veteran business enterprises and keeps an electronic directory. When evaluating bids of equal merit, the agency must award to the certified veteran business enterprise; if more than one qualifies, the one with the smallest net worth wins. Certification is renewed every two years.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "Fla. Stat. 295.187",
        sourceUrl: "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0200-0299/0295/Sections/0295.187.html",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: null
      },
      {
        id: "fl-veterans-florida-entrepreneurship",
        name: "Veterans Florida Entrepreneurship Program",
        type: "training",
        trigger: "veteran",
        windowMonths: null,
        summary: "A state-funded, no-cost entrepreneurship program for Florida veterans, service members, Guard, Reserve, and spouses who want to start or grow a business.",
        details: "Veterans Florida is a nonprofit created under section 295.21 with a board appointed by the Governor and legislative leaders. The Entrepreneur Program runs launch, getting-started, and growth cohorts plus workshops through partner universities and entrepreneurship centers across the state. There is zero cost to participants; you must be a Florida resident with a discharge above Bad Conduct.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "Fla. Stat. 295.21",
        sourceUrl: "https://www.veteransflorida.org/entrepreneur",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: null
      },
      {
        id: "fl-business-development-act-not-law",
        name: "Florida Veterans and Military Spouse Business Development Act (NOT enacted)",
        type: "fee_waiver",
        trigger: "new-business",
        windowMonths: null,
        summary: "Proposed Department of State fee waivers for veteran-owned and military spouse-owned businesses (July 2025 to June 2030) did not become law.",
        details: "SB 1172 and HB 821 (2025) died in committee on June 16, 2025, and the refiled CS/SB 1182 (2026) died in Senate Finance and Tax on March 13, 2026. No Florida Department of State filing fee waiver for veteran-owned businesses is in effect. Kept here so the tool does not repeat claims circulating online.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: null,
        sourceUrl: "https://www.flsenate.gov/Session/Bill/2026/1182",
        verifiedDate: "2026-09-23",
        verified: false,
        needsFollowup: "Not law. Re-check each spring for a refiled bill."
      }
    ]
  },

  "GA": {
    name: "Georgia",
    certification: {
      exists: true,
      name: "Georgia Business Certification Program, veteran-owned and small veteran-owned categories",
      agency: "Georgia Department of Administrative Services, State Purchasing Division",
      url: "https://doas.ga.gov/sites/default/files/2024-01/SBSD%20Initiative%20Business%20Certification%20FAQ%20Updated%2001-19-24.pdf",
      preference: "Listing only. Free certification in Team Georgia Marketplace for firms at least 51 percent veteran-owned and domiciled in Georgia; requires prior NaVOBA or SBA VOSB certification. No bid preference, set-aside, or goal.",
      verified: true
    },
    programs: [
      {
        id: "ga-business-certificate-exemption",
        name: "Veterans Business Certificate of Exemption (local occupation tax and fees)",
        type: "fee_waiver",
        trigger: "disabled-veteran",
        windowMonths: null,
        summary: "Georgia veterans with a 10 percent or higher service-connected rating get a 10-year exemption from local occupation taxes and business regulatory fees.",
        details: "Requires discharge under honorable conditions and a service-connected disability rating of 10 percent or more. The certificate exempts the holder from occupation taxes, administrative fees, and regulatory fees that local governments charge for conducting business or practicing a profession. File VS Form 40-025 with ID, DD-214, and the VA summary of benefits at the county probate court, then register the affidavit with the county tax commissioner. The statute contains income limits that the GDVS page does not show.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "O.C.G.A. 43-12-1 to 43-12-3",
        sourceUrl: "https://veterans.georgia.gov/business-certificate-exemption",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "Fetch O.C.G.A. 43-12-1 for the net income cap and any cap on the exempted tax amount."
      }
    ]
  },

  "HI": {
    name: "Hawaii",
    certification: {
      exists: false,
      name: null,
      agency: "Hawaii State Procurement Office",
      url: "https://spo.hawaii.gov/procurement-wizard/har-3-124-preferences/",
      preference: "None. Hawaii's procurement preferences (HAR 3-124) cover Hawaii products, printing, recycled products, software, and persons with disabilities; there is no veteran-owned or service-disabled veteran category.",
      verified: true
    },
    programs: []
  },

  "ID": {
    name: "Idaho",
    certification: {
      exists: false,
      name: null,
      agency: "Idaho Department of Commerce",
      url: "https://business.idaho.gov/helpful-links/minority/",
      preference: "None. Idaho Commerce points veteran-owned firms to federal SBA certification only; no state registry, preference, or goal was found in the State Procurement Act.",
      verified: true
    },
    programs: []
  },

  "IL": {
    name: "Illinois",
    certification: {
      exists: true,
      name: "Veterans Business Program (VOSB and SDVOSB certification)",
      agency: "Illinois Commission on Equity and Inclusion; veteran status verified by the Illinois Department of Veterans' Affairs",
      url: "https://cei.illinois.gov/programs0/veterans-business-program.html",
      preference: "3 percent aspirational spending goal. State agencies and universities are encouraged to spend at least 3 percent of procurement budgets with certified VOSB and SDVOSB firms. No bid or price preference.",
      verified: true
    },
    programs: [
      {
        id: "il-vbp",
        name: "Veterans Business Program certification",
        type: "procurement_preference",
        trigger: "veteran",
        windowMonths: null,
        summary: "State certification that counts a firm toward Illinois's 3 percent veteran-owned business spending goal.",
        details: "The business must be at least 51 percent owned by one or more veterans or service-disabled veterans living in Illinois, keep its home office in Illinois, show a DD-214, and have annual gross sales under $150 million. Firms already certified by the VA or Cook County get an expedited path. Apply through the CEI certification portal.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "30 ILCS 500/45-57",
        sourceUrl: "https://veterans.illinois.gov/services-benefits/entrepreneurship/state-procurement-benefits-for-veteran-owned.html",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "The 10 percent service-connected threshold for SDVOSB was seen only in ilga.gov search snippets; the statute page failed on TLS."
      }
    ]
  },

  "IN": {
    name: "Indiana",
    certification: {
      exists: true,
      name: "Indiana Veteran Owned Small Business (IVOSB) Program",
      agency: "Indiana Department of Administration, Division of Supplier Diversity",
      url: "https://www.in.gov/idoa/indiana-veteran-owned-small-business-program/",
      preference: "3 percent goal. IDOA aims to procure 3 percent of state contracts with certified IVOSBs; certification runs two years. No bid or price preference.",
      verified: true
    },
    programs: [
      {
        id: "in-ivosb",
        name: "IVOSB certification",
        type: "procurement_preference",
        trigger: "veteran",
        windowMonths: null,
        summary: "State certification that counts a firm toward Indiana's 3 percent veteran-owned small business contracting goal.",
        details: "The IDOA program page confirms the agency, the 3 percent goal, and annual reporting to the governor. Eligibility subpages (ownership percentage, residency, size) returned 404 when checked. Contact indianaveteranspreference@idoa.in.gov to apply.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "IC 5-22-14-3.5",
        sourceUrl: "https://www.in.gov/idoa/indiana-veteran-owned-small-business-program/",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "Confirm eligibility rules, two-year term, cost, and whether the goal covers prime contracts, subcontracts, or both."
      }
    ]
  },

  "IA": {
    name: "Iowa",
    certification: {
      exists: true,
      name: "Targeted Small Business (TSB) certification, service-disabled veteran category",
      agency: "Iowa Economic Development Authority (certifies); Iowa Department of Administrative Services (procurement rules)",
      url: "https://opportunityiowa.gov/small-business/targeted-small-business/",
      preference: "Service-disabled veterans only. Confers 48-hour advance bid notice, non-competitive state purchases up to $25,000, bond waivers up to $50,000, and a directory listing; each agency must set an annual TSB spending goal. No price preference.",
      verified: true
    },
    programs: [
      {
        id: "ia-tsb",
        name: "Targeted Small Business certification (service-disabled veteran)",
        type: "procurement_preference",
        trigger: "sc-veteran",
        windowMonths: null,
        summary: "Service-disabled veteran-owned Iowa firms under $4 million in revenue get early bid notice and non-competitive purchase access on state buys.",
        details: "The business must be Iowa-based, for-profit, at least 51 percent owned, operated, and managed by a service-disabled veteran with VA or DoD written verification, and average under $4 million in gross income over three years. Certified TSBs see state solicitations 48 hours early, can receive purchases up to $25,000 without competitive bids, and get bond waivers up to $50,000. Apply through the IEDA TSB page.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "Iowa Code 73.16; Iowa Admin. Code 11-117",
        sourceUrl: "https://das.iowa.gov/how-do-business-state-iowa/iowas-targeted-small-business-program/tsb-program-procurement-guidelines-state-agencies",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "Certification fee and term not shown on the fetched pages."
      }
    ]
  },

  "KS": {
    name: "Kansas",
    certification: {
      exists: true,
      name: "Disabled Veteran Owned Business (DVOB) certification",
      agency: "Kansas Department of Administration, Office of Procurement and Contracts",
      url: "https://admin.ks.gov/offices/procurement-contracts/bidding--contracts/bidder-programs/certified-business-and-disabled-veteran-owned-business",
      preference: "10 percent price preference. A certified disabled veteran business that is a responsible bidder wins if its total bid is not more than 10 percent above the lowest competitive bid. Disabled veterans only (10 percent or higher rating), Kansas-domiciled, 51 percent owned and controlled; certified annually.",
      verified: true
    },
    programs: [
      {
        id: "ks-dvob",
        name: "Disabled Veteran Owned Business 10 percent preference",
        type: "procurement_preference",
        trigger: "disabled-veteran",
        windowMonths: null,
        summary: "Kansas firms at least 51 percent owned and run by disabled veterans can win state bids priced up to 10 percent above the low bid.",
        details: "Disabled veteran means an honorable or general discharge with a service-connected rating of 10 percent or more. The business must be domiciled in Kansas, at least 51 percent owned and controlled by disabled veterans, and keep that status for the whole contract term. Certification is annual through the Department of Administration's DVOB application.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "K.S.A. 75-3740",
        sourceUrl: "https://www.kslegislature.gov/li/b2025_26/statute/075_000_0000_chapter/075_037_0000_article/075_037_0040_section/075_037_0040_k/",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: null
      }
    ]
  },

  "KY": {
    name: "Kentucky",
    certification: {
      exists: true,
      name: "Kentucky Service-Disabled Veteran-Owned Small Business (SDVOSB) Certification",
      agency: "Kentucky Finance and Administration Cabinet, Office of Equal Employment Opportunity and Contract Compliance",
      url: "https://finance.ky.gov/office-of-the-secretary/office-of-equal-employment-opportunity-contract-compliance/sdvosb/Pages/benefits-of-kentucky-sdvosb-certification.aspx",
      preference: "Listing and recognition only. Free certification lists the firm in the Small Business CONNECTion database and satisfies other states that require a statewide certification; no goal, set-aside, or price preference.",
      verified: true
    },
    programs: [
      {
        id: "ky-filing-fee-exemption",
        name: "Secretary of State filing fee exemption for veteran-owned businesses",
        type: "fee_waiver",
        trigger: "new-business",
        windowMonths: null,
        summary: "Veteran-owned businesses organized after August 1, 2018 pay no Kentucky Secretary of State filing fees for formation documents.",
        details: "KRS 14A.2-165 exempts a veteran-owned business organized after August 1, 2018 from filing fees for articles of incorporation and amendments, articles of organization for LLCs, partnership statements, certificates of limited partnership, and declarations of trust. Claim the exemption when filing with the Secretary of State. The statute text does not define the ownership percentage.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "KRS 14A.2-165",
        sourceUrl: "https://apps.legislature.ky.gov/law/statutes/statute.aspx?id=50476",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "Confirm the veteran-owned definition (KRS 14A.1-070 or the SOS form) and the LLC filing fee amount saved."
      },
      {
        id: "ky-sdvosb",
        name: "Kentucky SDVOSB certification",
        type: "procurement_preference",
        trigger: "sc-veteran",
        windowMonths: null,
        summary: "Free state recognition and database listing for Kentucky firms at least 51 percent owned by service-connected disabled veterans.",
        details: "Requires 51 percent ownership by veterans with a service-connected disability, the business and owners located in Kentucky, one full year of operation with a federal tax return, and SBA small business size. It confers recognition, a directory listing, and reciprocity, but no bid preference or goal. Apply through the Finance Cabinet SDVOSB application.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: null,
        sourceUrl: "https://finance.ky.gov/office-of-the-secretary/office-of-equal-employment-opportunity-contract-compliance/sdvosb/Pages/am-i-eligible.aspx",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: null
      }
    ]
  },

  "LA": {
    name: "Louisiana",
    certification: {
      exists: true,
      name: "Veteran Initiative (Louisiana Initiative for Veteran and Service-Connected Disabled Veteran-Owned Small Entrepreneurships)",
      agency: "Louisiana Economic Development (certifies); Office of State Procurement (applies it)",
      url: "https://www.opportunitylouisiana.gov/program/veteran-initiative",
      preference: "12 percent of total evaluation points added to a certified firm's proposal on state RFPs; agencies may skip extra quotes on small purchases under $25,000. Good-faith program with no set-aside percentage.",
      verified: true
    },
    programs: [
      {
        id: "la-veteran-initiative",
        name: "Veteran Initiative certification",
        type: "procurement_preference",
        trigger: "veteran",
        windowMonths: null,
        summary: "Certified veteran-owned small firms get 12 percent extra evaluation points on Louisiana state RFPs.",
        details: "The business must be at least 51 percent veteran-owned, independently owned, based in Louisiana with owners domiciled in the state, have fewer than 50 full-time employees, and average gross receipts of $6 million or less ($10 million for construction). LED reviews online applications within two business days; certified firms register in the LaGov supplier portal and update annually.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "La. R.S. 39:2171 et seq.",
        sourceUrl: "https://www.doa.la.gov/doa/osp/vendor-resources/hudson-and-veteran-initiatives/",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "The exact R.S. section setting the 12 percent figure was not fetched."
      },
      {
        id: "la-veterans-first",
        name: "Louisiana Veterans First Business Initiative",
        type: "other",
        trigger: "veteran",
        windowMonths: null,
        summary: "Free state recognition giving veteran-owned businesses an insignia, decal, certificate, and public directory listing.",
        details: "Open to businesses at least 51 percent owned by a veteran, active-duty or reserve member, or Gold Star spouse and in good standing with the Secretary of State. It confers marketing recognition and a listing at laveteransfirst.org, not a procurement preference. Register online or at a Louisiana Department of Veterans Affairs parish office with a DD-214 or equivalent.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "La. R.S. 51:3201 to 51:3208 (Act 160 of 2019)",
        sourceUrl: "https://www.opportunitylouisiana.gov/program/louisiana-veterans-first-business-initiative",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: null
      }
    ]
  },

  "ME": {
    name: "Maine",
    certification: {
      exists: false,
      name: null,
      agency: "Maine Division of Procurement Services",
      url: "https://legislature.maine.gov/statutes/5/title5sec1825-B.html",
      preference: "None. Maine's procurement statute has an in-state bidder preference but no veteran-owned business certification, registry, or preference.",
      verified: true
    },
    programs: []
  },

  "MD": {
    name: "Maryland",
    certification: {
      exists: true,
      name: "Veteran-Owned Small Business Enterprise (VSBE) Program",
      agency: "Governor's Office of Small, Minority and Women Business Affairs; certification through eMaryland Marketplace Advantage",
      url: "https://gomdsmallbiz.maryland.gov/Pages/VSBE-Program.aspx",
      preference: "3 percent participation goal (raised from 1 percent in September 2024). Agencies set VSBE goals contract by contract; only certified VSBE work counts. Free to certify. No bid or price preference.",
      verified: true
    },
    programs: [
      {
        id: "md-mpvolp",
        name: "Military Personnel and Veteran-Owned Small Business No-Interest Loan Program",
        type: "loan",
        trigger: "veteran",
        windowMonths: null,
        summary: "Zero-interest Maryland state loans of $1,000 to $100,000 for veteran-owned and reservist-owned small businesses.",
        details: "Run by the Maryland Department of Commerce with eligibility review by the Department of Veterans and Military Families. Eligible borrowers include veteran-owned small businesses, businesses owned by reservists or Guard members called to active duty, and small employers of them; service-disabled veterans can also use it for accessibility improvements. Terms run one to eight years at 0 percent interest; the current application window is July 1 through August 14, 2026.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: null,
        sourceUrl: "https://commerce.maryland.gov/fund/programs-for-businesses/mpvolp",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "Statute not cited on the Commerce page."
      },
      {
        id: "md-vsbe",
        name: "VSBE certification",
        type: "procurement_preference",
        trigger: "veteran",
        windowMonths: null,
        summary: "Free eMMA certification that lets a veteran-owned firm count toward Maryland's 3 percent VSBE contract goals.",
        details: "The business must be at least 51 percent owned and controlled by veterans discharged under conditions other than dishonorable and meet SBA size standards. Register as a vendor in eMMA, verify veteran status through the Maryland Department of Veterans and Military Families or federal SBA VetCert, then submit the VSBE application in eMMA.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: null,
        sourceUrl: "https://gomdsmallbiz.maryland.gov/Pages/VSBE-Program.aspx",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "Confirm the statutory citation in the State Finance and Procurement Article."
      }
    ]
  },

  "MA": {
    name: "Massachusetts",
    certification: {
      exists: true,
      name: "Supplier Diversity Program: Veteran Business Enterprise (VBE) and Service-Disabled Veteran-Owned Business Enterprise (SDVOBE)",
      agency: "Massachusetts Operational Services Division, Supplier Diversity Office",
      url: "https://www.mass.gov/supplier-diversity-program-sdp",
      preference: "Per mass.gov search snippets only: a 3 percent spending benchmark of eligible discretionary spending for veteran businesses (VBE and SDVOBE combined). Benchmarks are department spending goals, not bid preferences. Every mass.gov page returned 403 on fetch, so this row is unverified.",
      verified: false
    },
    programs: []
  },

  "MI": {
    name: "Michigan",
    certification: {
      exists: true,
      name: "Service-Disabled Veteran-Owned Business (SDVOB) Preference",
      agency: "Michigan Department of Technology, Management and Budget, Central Procurement (self-identify in SIGMA Vendor Self Service)",
      url: "https://www.michigan.gov/dtmb/procurement/contractconnect/programs-and-policies/preferences/service-disabled-veteran-owned-business-preference",
      preference: "Up to 10 percent pricing preference on state bids for businesses 51 percent or more owned by veterans with a service-connected disability, per search excerpts of the DTMB page; michigan.gov returned 403 on every fetch, so the figure is unverified.",
      verified: false
    },
    programs: [
      {
        id: "mi-lara-veteran-fee-waiver",
        name: "LARA filing fee waiver for veteran-owned businesses",
        type: "fee_waiver",
        trigger: "veteran",
        windowMonths: null,
        summary: "Michigan waives Corporations Division filing fees for corporations and LLCs when a majority of the ownership interests are held by veterans.",
        details: "Per official search excerpts, the LLC articles of organization fee ($50) and other Corporations Division filing fees are waived when a majority of shares or membership interests are held by veterans as defined in MCL 35.61. The applicant files a signed affidavit with a DD-214 or equivalent for each veteran owner. The LARA page returned 403 on fetch, so the full fee list is unconfirmed.",
        dollarEstimate: null,
        oneTimeEstimate: 50,
        statute: "MCL 450.5101",
        sourceUrl: "https://www.michigan.gov/lara/bureau-list/cscl/corps/how-do-i/services/waiver-of-fees-for-veterans",
        verifiedDate: "2026-09-23",
        verified: false,
        needsFollowup: "Open the LARA page in a browser to confirm which filings are covered and the affidavit form number."
      }
    ]
  },

  "MN": {
    name: "Minnesota",
    certification: {
      exists: true,
      name: "Veteran-Owned (VO) Small Business Certification",
      agency: "Minnesota Department of Administration, Office of Equity in Procurement; veteran status verified by the Minnesota Department of Veterans Affairs",
      url: "https://www.revisor.mn.gov/statutes/cite/16C.16",
      preference: "12 percent price preference on goods, general services, and construction for certified veteran-owned small businesses (raised from 6 percent for solicitations awarded on or after July 1, 2023), applied to the first $2 million of a response. Direct awards up to $100,000 allowed. Requires 51 percent veteran ownership and day-to-day control.",
      verified: true
    },
    programs: [
      {
        id: "mn-vo-price-preference",
        name: "Veteran-owned small business 12 percent price preference",
        type: "procurement_preference",
        trigger: "veteran",
        windowMonths: null,
        summary: "Certified Minnesota veteran-owned small businesses get a 12 percent price preference on state purchases and can receive direct awards up to $100,000.",
        details: "Minn. Stat. 16C.16 subd. 6a authorizes a preference of up to 12 percent, and Purchasing Policy 35 applies the full 12 percent to the first $2 million of a response; only the single largest eligible preference applies. The statute also lets agencies award directly to a certified veteran-owned business without competition up to $100,000 total contract value. Apply through the Office of Equity in Procurement's TG/ED/VO certification.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "Minn. Stat. 16C.16 subd. 6a; 16C.19",
        sourceUrl: "https://mn.gov/admin/assets/Purchasing%20Policy%2035_tcm36-578430.pdf",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: null
      }
    ]
  },

  "MS": {
    name: "Mississippi",
    certification: {
      exists: false,
      name: null,
      agency: "Mississippi Department of Finance and Administration, Office of Purchasing, Travel and Fleet Management",
      url: "https://billstatus.ls.state.ms.us/documents/2025/html/HB/1300-1399/HB1322IN.htm",
      preference: "None enacted. Bills to create a service-disabled veteran business certification with a 10 percent price preference have been introduced repeatedly (2010 through 2026) and none has become law; HB 1322 (2025) is listed as dead.",
      verified: true
    },
    programs: []
  },

  "MO": {
    name: "Missouri",
    certification: {
      exists: true,
      name: "Missouri Veteran Business Enterprise Certification Program (SDVE and HDVE)",
      agency: "Missouri Office of Administration, Office of Equal Opportunity",
      url: "https://oeo.mo.gov/sdve-certification-program/",
      preference: "3 percent goal for service contracts to certified service-disabled veteran enterprises, plus a 3 bonus point preference on bids and proposals. Requires 51 percent ownership and control by service-disabled veterans, Missouri-based; certification valid up to three years.",
      verified: true
    },
    programs: [
      {
        id: "mo-sdve",
        name: "Service-Disabled Veteran Enterprise 3 percent goal and 3 bonus points",
        type: "procurement_preference",
        trigger: "sc-veteran",
        windowMonths: null,
        summary: "Certified Missouri service-disabled veteran businesses count toward a 3 percent state service-contract goal and receive 3 bonus points on bids.",
        details: "The Commissioner of Administration targets 3 percent of service contracts for certified SDVEs, and bids or proposals from them get a 3 point bonus that cannot stack with RSMo 34.069 points. The business must be at least 51 percent owned and controlled by service-disabled veterans with federal certification of disability. Apply by email to OEO.VeteranCertification@oa.mo.gov.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "RSMo 34.074; 1 CSR 40-1.050",
        sourceUrl: "https://revisor.mo.gov/main/OneSection.aspx?section=34.074",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "OEO now lists an HDVE (honorably discharged veteran) category; confirm whether it gets the same goal and points or listing only."
      }
    ]
  },

  "MT": {
    name: "Montana",
    certification: {
      exists: false,
      name: null,
      agency: "Montana Department of Administration, State Procurement Services Division",
      url: "https://doa.mt.gov/SPSD/vendor-resources/",
      preference: "None. Montana's preference page lists only reciprocal resident, American-made tie-break, and blind-persons preferences and states that Montana law grants no preference to small or disadvantaged businesses.",
      verified: true
    },
    programs: []
  },

  "NE": {
    name: "Nebraska",
    certification: {
      exists: false,
      name: null,
      agency: "Nebraska Department of Administrative Services, State Purchasing Bureau",
      url: "https://www.nebraskalegislature.gov/laws/statutes.php?statute=73-107",
      preference: "No certification or registry. Neb. Rev. Stat. 73-107 gives a resident disabled veteran bidder a tie-breaker preference only when all other factors are equal; no percentage, goal, or set-aside.",
      verified: true
    },
    programs: []
  },

  "NV": {
    name: "Nevada",
    certification: {
      exists: true,
      name: "Preference for local businesses owned and operated by a veteran with a service-connected disability",
      agency: "Nevada Department of Administration, Purchasing Division",
      url: "https://www.leg.state.nv.us/NRS/NRS-333.html",
      preference: "5 percent. On formal state contracts, a responsive bid from a qualifying local business owned and operated by a service-connected disabled veteran is treated as 5 percent lower than submitted (NRS 333.3366). No separate certification body; the Purchasing Division sets proof requirements by regulation.",
      verified: true
    },
    programs: [
      {
        id: "nv-sdv-bid-preference",
        name: "Service-disabled veteran local business 5 percent bid preference",
        type: "procurement_preference",
        trigger: "sc-veteran",
        windowMonths: null,
        summary: "A Nevada local business owned and operated by a service-connected disabled veteran has its state bid evaluated as if 5 percent lower.",
        details: "The business must have its principal place of business in Nevada or produce most of its goods there and be owned and operated by a veteran with a service-connected disability. The preference applies to formal contracts under NRS Chapter 333; a parallel public works preference sits in NRS Chapter 338. Proof and application steps are set by Purchasing Division regulation.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "NRS 333.3361 to 333.3369",
        sourceUrl: "https://www.leg.state.nv.us/NRS/NRS-333.html",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "No Purchasing Division page describing how to claim the preference was found; NAC 333 not fetched."
      },
      {
        id: "nv-business-license-fee-waiver-ab274",
        name: "State business license fee waiver for military retirees and Gold Star families (AB 274, 2025, enactment unconfirmed)",
        type: "fee_waiver",
        trigger: "veteran",
        windowMonths: null,
        summary: "A 2025 bill would waive the $200 state business license issuance fee ($500 for corporations) for eligible military retirees, Gold Star family members, and entities they majority-own.",
        details: "As introduced, eligible veteran means a Nevada resident who retired after 20 or more years of service or on a physical disability retirement, not all veterans. The NRS Chapter 76 page as fetched shows no such waiver in 76.100 and the NELIS record shows zero floor votes, which points to the bill not passing. Do not rely on this until confirmed.",
        dollarEstimate: null,
        oneTimeEstimate: 200,
        statute: "NRS 76.100 as proposed by AB 274 (83rd Session, 2025)",
        sourceUrl: "https://archive.leg.state.nv.us/Session/83rd2025/Bills/AB/AB274.pdf",
        verifiedDate: "2026-09-23",
        verified: false,
        needsFollowup: "Check the AB 274 history on NELIS in a browser; likely died without a vote."
      }
    ]
  },

  "NH": {
    name: "New Hampshire",
    certification: {
      exists: true,
      name: "Approved disabled veteran-owned business purchasing authority (RSA 21-I:19-k)",
      agency: "New Hampshire Department of Administrative Services, Division of Procurement and Support Services",
      url: "https://gc.nh.gov/rsa/html/I/21-I/21-I-19-k.htm",
      preference: "No percentage. Since August 22, 2025 the director of procurement may buy products and services from approved businesses at least 51 percent owned and controlled by service-connected disabled veterans (or military spouses), incorporated and producing in New Hampshire, at fair market prices the director sets. No application form or approved list was found yet.",
      verified: true
    },
    programs: []
  },

  "NJ": {
    name: "New Jersey",
    certification: {
      exists: true,
      name: "Veteran-Owned Business (VOB) and Disabled Veteran-Owned Business (DVOB) certification",
      agency: "New Jersey Department of the Treasury, Division of Revenue and Enterprise Services",
      url: "https://business.nj.gov/pages/vob-dvob",
      preference: "DVOB: 3 percent set-aside goal of state contracting and purchase order dollars. VOB: agencies must give consideration to certified firms, with no percentage. Requires a principal place of business in New Jersey and 51 percent ownership and control by veterans (90 days service, honorable discharge) or disabled veterans. The $100 application fee is waived.",
      verified: true
    },
    programs: [
      {
        id: "nj-certification-fee-waiver",
        name: "Business certification application fee waiver",
        type: "fee_waiver",
        trigger: "veteran",
        windowMonths: null,
        summary: "New Jersey has waived the $100 application fee for state business certification, including VOB and DVOB, indefinitely.",
        details: "Treasury's Division of Revenue and Enterprise Services waived the $100 certification fee for all categories in its Business Certification Program. Veteran and disabled veteran owners apply free through the SBE Registry portal. Reverification is annual.",
        dollarEstimate: null,
        oneTimeEstimate: 100,
        statute: null,
        sourceUrl: "https://www.nj.gov/treasury/unclaimed-property/treasury/revenue/business-cert-program.shtml",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: null
      },
      {
        id: "nj-dvob-set-aside",
        name: "Disabled Veteran-Owned Business 3 percent set-aside goal",
        type: "procurement_preference",
        trigger: "sc-veteran",
        windowMonths: null,
        summary: "New Jersey sets a goal of 3 percent of state contract and purchase order dollars for certified disabled veteran-owned businesses.",
        details: "Certified DVOBs count toward the 3 percent set-aside goal administered by the Division of Purchase and Property. DVOB owners submit a VA service-connected award letter and DD-214 through the SBE Registry portal. Certification is reverified each year.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "N.J.S.A. 52:32-31.1 et seq.",
        sourceUrl: "https://www.nj.gov/treasury/military-resources.shtml",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "Statute text on njleg.state.nj.us not fetched; citation and goal come from Treasury pages."
      }
    ]
  },

  "NM": {
    name: "New Mexico",
    certification: {
      exists: true,
      name: "Resident Veteran Business Certificate and Resident Veteran Contractor Certificate",
      agency: "New Mexico Taxation and Revenue Department",
      url: "https://www.tax.newmexico.gov/businesses/business-preference-certification/",
      preference: "10 percent of the total weight of evaluation factors (or 10 percent of total points) on state and local public body awards. Certificates are valid three years and require VA verification as a veteran-owned business plus the resident business tax tests.",
      verified: true
    },
    programs: [
      {
        id: "nm-resident-veteran-preference",
        name: "Resident veteran business preference",
        type: "procurement_preference",
        trigger: "veteran",
        windowMonths: null,
        summary: "Certified resident veteran businesses receive a 10 percent evaluation preference on New Mexico public procurements.",
        details: "Apply to the Taxation and Revenue Department with VA verification of veteran-owned or service-disabled veteran-owned small business status and proof of paying New Mexico property tax or rent and at least one other state tax over the look-back period, certified by a CPA. The certificate is valid for three years and is submitted with each bid or proposal.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "NMSA 1978, 13-1-21 and 13-1-22",
        sourceUrl: "https://www.tax.newmexico.gov/businesses/business-preference-certification/",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "Any revenue cap tied to the veteran preference was not verified from an official source."
      }
    ]
  },

  "NY": {
    name: "New York",
    certification: {
      exists: true,
      name: "Service-Disabled Veteran-Owned Business (SDVOB) certification",
      agency: "New York State Office of General Services, Division of Service-Disabled Veterans' Business Development",
      url: "https://ogs.ny.gov/veterans",
      preference: "6 percent participation goal on state contracts. Requires a service-connected disability rating of at least 10 percent, 51 percent ownership and day-to-day control, small business status (300 or fewer employees), and a significant business presence in New York.",
      verified: true
    },
    programs: [
      {
        id: "ny-sdvob-goal",
        name: "SDVOB 6 percent participation goal",
        type: "procurement_preference",
        trigger: "disabled-veteran",
        windowMonths: null,
        summary: "New York sets a 6 percent goal for SDVOB participation on state contracts, and certified firms count toward it as primes or subcontractors.",
        details: "The Service-Disabled Veteran-Owned Business Act (2014), now Article 3 of the Veterans' Services Law, created the 6 percent goal and the OGS certification division. Eligibility is a 10 percent or higher service-connected rating, 51 percent ownership, independent control of daily decisions, 300 or fewer employees, and a significant New York presence. Apply online at sdves.ogs.ny.gov with a NY.gov business account.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "N.Y. Veterans' Services Law Article 3 (formerly Executive Law Article 17-B)",
        sourceUrl: "https://veterans.ny.gov/service-disabled-veteran-owned-businesses",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: null
      }
    ]
  },

  "NC": {
    name: "North Carolina",
    certification: {
      exists: false,
      name: null,
      agency: "North Carolina Department of Administration, Office for Historically Underutilized Businesses",
      url: "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_143/GS_143-128.4.html",
      preference: "None. The HUB program (G.S. 143-128.4) has no veteran category; a disabled veteran may qualify under the general disabled category only on the basis of disability. Businesses may flag VOSB status on the Secretary of State annual report, which is reporting only.",
      verified: true
    },
    programs: []
  },

  "ND": {
    name: "North Dakota",
    certification: {
      exists: false,
      name: null,
      agency: "North Dakota Office of Management and Budget, State Procurement Office",
      url: "https://www.omb.nd.gov/state-procurement-guidelines-preference-laws",
      preference: "None. OMB's preference-law guide lists tie bid, coal, food, bio-based, recycled paper, and similar preferences and states that procurement law requires no preference based on business classification.",
      verified: true
    },
    programs: []
  },

  "OH": {
    name: "Ohio",
    certification: {
      exists: true,
      name: "Veteran-Friendly Business Enterprise (VBE) Procurement Program",
      agency: "Ohio Department of Development, Minority Business Development Division (certifies); Department of Administrative Services (applies it)",
      url: "https://codes.ohio.gov/ohio-revised-code/section-122.925",
      preference: "5 percent bid price preference and 5 percent proposal score preference on state agency purchases under ORC Chapter 125. Open to firms 51 percent veteran-owned, firms where 10 percent of employees are veterans, or VA-certified VOSB/SDVOSB firms. Certification valid up to two years. No set-aside or goal.",
      verified: true
    },
    programs: [
      {
        id: "oh-vbe-5pct-preference",
        name: "Veteran-Friendly Business Enterprise 5 percent bid and proposal preference",
        type: "procurement_preference",
        trigger: "veteran",
        windowMonths: null,
        summary: "Certified veteran-friendly businesses can win Ohio state contracts with a price up to 5 percent higher, or a score up to 5 percent lower, than the best non-certified competitor.",
        details: "Under OAC 123:5-1-16, if the apparent low bid is not from a certified VBE, 5 percent is added to that price for comparison; on proposals, 5 percent of available points is subtracted from a non-VBE's score. Qualify by 51 percent veteran ownership, 10 percent veteran staff, a majority-veteran board, or VA VOSB/SDVOSB certification, with a DD-214 or similar proof. Apply through the Department of Development MBDD; renew every two years.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "ORC 122.925; OAC 123:5-1-16",
        sourceUrl: "https://codes.ohio.gov/assets/laws/administrative-code/authenticated/123/5/1/123$5-1-16_20170427.pdf",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "The codes.ohio.gov HTML page for 123:5-1-16 now says no rule corresponds to that number; confirm the current rule number."
      }
    ]
  },

  "OK": {
    name: "Oklahoma",
    certification: {
      exists: true,
      name: "Service-disabled veteran business registration (Disabled Veteran Business Enterprise Act)",
      agency: "Oklahoma Office of Management and Enterprise Services, Central Purchasing",
      url: "https://www.oscn.net/applications/oscn/DeliverDocument.asp?CiteID=476707",
      preference: "3 percentage point bonus on bids from Oklahoma service-disabled veteran businesses plus a goal that agencies award 3 percent of eligible contracts to them. Requires 51 percent ownership and control by service-disabled veterans; claim it in the OMES vendor registration.",
      verified: true
    },
    programs: [
      {
        id: "ok-sdv-3pt-bonus",
        name: "Service-disabled veteran business 3 point bid preference and 3 percent award goal",
        type: "procurement_preference",
        trigger: "sc-veteran",
        windowMonths: null,
        summary: "Oklahoma agencies give a 3 percentage point bonus to bids from Oklahoma service-disabled veteran businesses and aim to award 3 percent of eligible contracts to them.",
        details: "Applies to businesses at least 51 percent owned and controlled by service-disabled veterans that do business as Oklahoma firms. Answer the service-disabled veteran questions in the OMES online vendor registration and keep the registration current each year. OMES may require federal verification of service-disabled status.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "74 O.S. 85.44E",
        sourceUrl: "https://www.oscn.net/applications/oscn/DeliverDocument.asp?CiteID=476707",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: null
      },
      {
        id: "ok-okvetworks",
        name: "OKVetWorks Business Management Program",
        type: "training",
        trigger: "veteran",
        windowMonths: null,
        summary: "A free Oklahoma Department of Veterans Affairs program that helps military-connected owners start or grow a business and verifies Veteran Owned Business status for a state directory.",
        details: "Open to current or former service members, military spouses, and military children. It provides business assistance, training events, networking, a veteran-owned business directory, and state VOB verification. Apply through the client intake form on the OKVetWorks page; no fees are listed.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: null,
        sourceUrl: "https://oklahoma.gov/okstep/okvetworks.html",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: null
      }
    ]
  },

  "OR": {
    name: "Oregon",
    certification: {
      exists: true,
      name: "Veteran Business Enterprise (VBE) certification with optional Service-Disabled Veteran designation",
      agency: "Business Oregon, Certification Office for Business Inclusion and Diversity (COBID)",
      url: "https://www.oregon.gov/biz/programs/cobid/sdv/pages/default.aspx",
      preference: "Listing only. Since January 1, 2024 any veteran-owned business can certify (51 percent ownership and control, gross receipts at or below $31.84 million). Agencies may require certified-firm participation, but ORS 200 sets no bid preference, set-aside, or numeric goal for VBEs. Certification does not expire.",
      verified: true
    },
    programs: []
  },

  "PA": {
    name: "Pennsylvania",
    certification: {
      exists: true,
      name: "Veteran Business Enterprise (VBE) verification",
      agency: "Pennsylvania Department of General Services, Bureau of Diversity, Inclusion and Small Business Opportunities",
      url: "https://www.pa.gov/agencies/dgs/programs-and-services/disbo/small-veteran-businesses",
      preference: "Contract-specific VBE participation goals set per solicitation under 4 Pa. Code 58.414, plus access to the Small Business Reserve. Requires 51 percent veteran ownership, small business size (100 or fewer employees, $47 million or less revenue), and a third-party veteran certification such as SBA VetCert. Renew every two years; no fee stated.",
      verified: true
    },
    programs: [
      {
        id: "pa-vet-business-fee-exemption",
        name: "Veteran and reservist business start-up fee exemption (Act 135 of 2016)",
        type: "fee_waiver",
        trigger: "new-business",
        windowMonths: null,
        summary: "Veterans and reservists starting a Pennsylvania small business pay no state or local start-up fees, including Department of State formation filings and initial professional license fees.",
        details: "Effective January 2, 2017, the exemption covers any fee charged by the Commonwealth or a political subdivision for starting a business; renewals are excluded. The Bureau of Corporations waives the $125 filing fee for articles of incorporation and LLC certificates of organization, $250 for foreign registration, and $70 for fictitious name registration, and the licensing bureau waives initial license application fees. The business must be independently owned, have 100 or fewer employees, and be owned and controlled by veterans or reservists. File through PENN File or by mail with a DD-214, NGB-22, VA card, or DoD ID.",
        dollarEstimate: null,
        oneTimeEstimate: 125,
        statute: "Act 135 of 2016; 51 Pa.C.S. 9610 to 9611",
        sourceUrl: "https://www.pa.gov/agencies/dos/resources/professional-licensing-resources/veteran-owned-business-exemptions",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: null
      },
      {
        id: "pa-vbe-goals",
        name: "Veteran Business Enterprise contract participation goals",
        type: "procurement_preference",
        trigger: "veteran",
        windowMonths: null,
        summary: "Verified VBEs count toward contract-specific participation goals on Commonwealth solicitations and can bid in the Small Business Reserve.",
        details: "Register in the PA Supplier Portal, obtain SBA VetCert or another approved third-party veteran certification, self-certify as a Small Business, then submit the VBE verification with tax returns and employee records. A VBE prime may meet the goal by self-performing. Renew every two years.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "4 Pa. Code 58.414; Executive Order 2023-18",
        sourceUrl: "https://www.pacodeandbulletin.gov/Display/pacode?file=/secure/pacode/data/004/chapter58/s58.414.html&d=reduce",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "No fixed statewide VBE percentage exists in the current text; older 3 percent references are superseded."
      }
    ]
  },

  "RI": {
    name: "Rhode Island",
    certification: {
      exists: true,
      name: "Veteran Business Enterprise (VBE) certification",
      agency: "Rhode Island Department of Administration, Office of Diversity, Equity and Opportunity",
      url: "https://rules.sos.ri.gov/regulations/part/220-80-15-1",
      preference: "3 percent aggregate utilization goal of the total value of state purchases and public works for certified VBEs. Directory listing; no bid price preference. Certified firms update annually.",
      verified: true
    },
    programs: [
      {
        id: "ri-vbe-3pct-goal",
        name: "Veteran Business Enterprise 3 percent participation goal",
        type: "procurement_preference",
        trigger: "veteran",
        windowMonths: null,
        summary: "Rhode Island aims to place 3 percent of the value of state purchases and public works with certified veteran-owned business enterprises.",
        details: "Certified VBEs are listed in the state directory and count toward the 3 percent goal. The regulation defines a VBE as a small business owned and controlled by veterans who are economically disadvantaged. Apply through the Office of Diversity, Equity and Opportunity; firms outside Rhode Island certify in their home state first.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "R.I. Gen. Laws 37-14.3-4 and 37-14.3-5; 220-RICR-80-15-1",
        sourceUrl: "https://webserver.rilegislature.gov/Statutes/TITLE37/37-14.3/37-14.3-5.htm",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "Application fee and processing time not confirmed; agency page returned 403."
      }
    ]
  },

  "SC": {
    name: "South Carolina",
    certification: {
      exists: false,
      name: null,
      agency: "South Carolina Division of Small and Minority Business Contracting and Certification",
      url: "https://scbizdev.sccommerce.com/resources/certifications",
      preference: "None enacted. State certifications cover MBE/WBE and SCDOT DBE/SBE only. A bill adding a 2 percent price preference for service-disabled veteran-owned bidders (H.3428) remains in committee.",
      verified: true
    },
    programs: []
  },

  "SD": {
    name: "South Dakota",
    certification: {
      exists: false,
      name: null,
      agency: "South Dakota Bureau of Human Resources and Administration",
      url: "https://sdlegislature.gov/api/Statutes/5-18A.html",
      preference: "None. SDCL chapter 5-18A contains resident bidder preferences only and no mention of veterans.",
      verified: true
    },
    programs: []
  },

  "TN": {
    name: "Tennessee",
    certification: {
      exists: true,
      name: "Go-DBE Service-Disabled Veteran Business Enterprise (SDVBE) certification",
      agency: "Tennessee Department of General Services, Central Procurement Office, Governor's Office of Diversity Business Enterprise",
      url: "https://www.tn.gov/generalservices/procurement/central-procurement-office--cpo-/go-bid/go-bid_resources.html",
      preference: "Listing, bid notifications, and a tie-break advantage on Invitations to Bid. No percentage preference or set-aside. Requires honorable active-duty service, a service-connected disability of at least 20 percent, and 51 percent ownership and control. Free, valid three years.",
      verified: true
    },
    programs: [
      {
        id: "tn-godbe-sdvbe",
        name: "Go-DBE SDVBE certification",
        type: "procurement_preference",
        trigger: "disabled-veteran",
        windowMonths: null,
        summary: "Free three-year certification that lists service-disabled veteran-owned firms (20 percent or higher rating) in Tennessee's diversity directory with a tie-break advantage on state bids.",
        details: "The owner must have served honorably on active duty with a service-connected disability of at least 20 percent and own and control at least 51 percent of a for-profit business. Apply online; processing takes 30 to 45 days. Benefits are directory listing, procurement notifications, subcontracting leads, reciprocity, and award advantage when bids tie.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "T.C.A. 12-3-1102(8); 12-3-1106",
        sourceUrl: "https://www.tn.gov/generalservices/procurement/central-procurement-office--cpo-/go-bid/go-bid_resources.html",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "Go-DBE landing pages were restructured to GO-BID; confirm the current application URL."
      }
    ]
  },

  "TX": {
    name: "Texas",
    certification: {
      exists: true,
      name: "Texas HUB certification, VetHUB (service-disabled veteran) category",
      agency: "Texas Comptroller of Public Accounts, Statewide HUB Program",
      url: "https://comptroller.texas.gov/purchasing/vendor/hub/",
      preference: "Listing and HUB goal participation. Certified service-disabled veteran-owned firms count toward statewide HUB utilization goals and HUB subcontracting plans on state contracts; no bid price preference. Apply through the VetHUB certification portal.",
      verified: true
    },
    programs: [
      {
        id: "tx-new-veteran-business-filing-fee-waiver",
        name: "Secretary of State filing fee waiver for new veteran-owned businesses",
        type: "fee_waiver",
        trigger: "new-business",
        windowMonths: null,
        summary: "Texas waives the $300 certificate of formation fee and other Secretary of State filing fees for five years for a new business 100 percent owned by honorably discharged veterans.",
        details: "A new veteran-owned business is one formed in Texas on or after January 1, 2022 and 100 percent owned by individuals who are honorably discharged veterans. The Secretary of State waives Business Organizations Code Chapter 4 filing fees, including the $300 certificate of formation fee, until the fifth anniversary of formation or the date the business stops qualifying. Get a Veteran Verification Letter from the Texas Veterans Commission for each owner, complete Comptroller Form 05-904, and file both with the certificate of formation. SB 524 (2025) removed the January 1, 2026 sunset and made the program permanent effective September 1, 2025.",
        dollarEstimate: null,
        oneTimeEstimate: 300,
        statute: "Tex. Bus. Orgs. Code 12.005; Tex. Tax Code 171.0005; SB 938 (87th Leg.); SB 524 (89th Leg.)",
        sourceUrl: "https://www.sos.state.tx.us/corp/veterans.shtml",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: null
      },
      {
        id: "tx-new-veteran-business-franchise-tax",
        name: "Five-year franchise tax exemption for new veteran-owned businesses",
        type: "tax_exemption",
        trigger: "new-business",
        windowMonths: null,
        summary: "A new Texas business 100 percent owned by honorably discharged veterans owes no franchise tax and files no franchise or public information reports for its first five years.",
        details: "The Comptroller treats a qualifying new veteran-owned business as not subject to franchise tax until the earlier of its fifth anniversary or the date it stops qualifying, and it does not have to file a No Tax Due Report or Public Information Report during that period. Qualify by obtaining a Texas Veterans Commission verification letter for each owner and filing Form 05-904 with the Comptroller or Secretary of State. Businesses under the no-tax-due revenue threshold would owe nothing anyway, so the practical value for most startups is the five-year pass on filing; larger businesses save the actual tax. SB 524 (2025) made the exemption permanent.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "Tex. Tax Code 171.0001(4), 171.0005; SB 524 (89th Leg., effective September 1, 2025)",
        sourceUrl: "https://comptroller.texas.gov/taxes/franchise/veteran-business.php",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: null
      }
    ]
  },

  "UT": {
    name: "Utah",
    certification: {
      exists: true,
      name: "Utah Veteran-Owned Business Registry",
      agency: "Utah Department of Veterans and Military Affairs with the Veterans Business Resource Center at Salt Lake Community College",
      url: "https://veterans.utah.gov/veterans-business-resource-center-vbrc/",
      preference: "Listing only. A public directory and state recognition for businesses with veteran ownership; the Utah Procurement Code (63G-6a) contains no veteran preference, set-aside, or goal.",
      verified: true
    },
    programs: [
      {
        id: "ut-vbrc-training",
        name: "Veterans Business Resource Center and STRIVE program",
        type: "training",
        trigger: "veteran",
        windowMonths: null,
        summary: "A state-created center at Salt Lake Community College giving veterans, Guard and Reserve members, and spouses one-on-one business advising and a free STRIVE entrepreneurship program.",
        details: "The VBRC is staffed by veteran entrepreneurs and offers one-on-one consultations, help testing a business idea, writing a business plan and financial projections, and getting to revenue. The STRIVE program is free and serves veterans, Reserve and National Guard members, and their spouses. Contact the center through the UDVMA page.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: null,
        sourceUrl: "https://veterans.utah.gov/veterans-business-resource-center-vbrc/",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "The registry landing page (vbr.veterans.utah.gov) returned a TLS error; registry confirmed through the UDVMA page and official search snippets only."
      }
    ]
  },

  "VT": {
    name: "Vermont",
    certification: {
      exists: false,
      name: null,
      agency: "Vermont Office of Purchasing and Contracting",
      url: "https://veterans.vermont.gov/benefits-and-services/transition-assistance/business-development",
      preference: "None. The Office of Veterans Affairs points to SBDC, SBA, and federal VetBiz only, and the state purchasing page lists only a reciprocal resident preference.",
      verified: true
    },
    programs: []
  },

  "VA": {
    name: "Virginia",
    certification: {
      exists: true,
      name: "SWaM certification with Service-Disabled Veteran-owned (SDV) designation",
      agency: "Virginia Department of Small Business and Supplier Diversity; veteran status verified by the Department of Veterans Services",
      url: "https://www.sbsd.virginia.gov/certification-division/swam/",
      preference: "SWaM goal participation. SDV is a designation inside the SWaM vendor database (free DVS verification) that counts toward agency SWaM spending goals; Va. Code 2.2-4310 lets the Governor authorize award to a certified business bidding up to 5 percent above the low bid on a disparity finding. The 42 percent statewide SWaM goal is from Executive Order 35 and a 2026 bill not confirmed from primary text.",
      verified: true
    },
    programs: [
      {
        id: "va-sdv-designation",
        name: "SWaM Service-Disabled Veteran-owned designation",
        type: "procurement_preference",
        trigger: "sc-veteran",
        windowMonths: null,
        summary: "Free DVS verification adds service-disabled veteran status to a business's SWaM record so agencies can count it toward SWaM goals.",
        details: "Requires a veteran with a VA service-connected disability rating discharged under conditions other than dishonorable. DVS verifies at no charge; the business then holds or obtains SWaM small, women-owned, or minority-owned certification through SBSD. The value is procurement access and eligibility for enhancement measures rather than a fixed dollar amount.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "Va. Code 2.2-4310",
        sourceUrl: "https://sbsd.virginia.gov/small-business-certification/",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "DVS verification page returned 403; confirm the current DVS form and the 42 percent goal in HB 61 (2026)."
      }
    ]
  },

  "WA": {
    name: "Washington",
    certification: {
      exists: true,
      name: "Veteran-Owned Business (VOB) Certification",
      agency: "Washington State Department of Veterans Affairs",
      url: "https://www.dva.wa.gov/veterans-their-families/veteran-owned-businesses/veteran-owned-business-certification",
      preference: "3 percent statutory goal: agencies are encouraged to award 3 percent of contracts exempt from competitive bidding to WDVA-certified veteran-owned businesses (RCW 43.60A.200), and the Governor's Office has asked agencies for 5 percent. Free certification, directory listing linked to WEBS, and access to the Veterans Linked Deposit Program. Requires 51 percent ownership by a veteran, a VA compensation recipient, or an active or reserve member, and a Washington base.",
      verified: true
    },
    programs: [
      {
        id: "wa-linked-deposit",
        name: "Veterans Linked Deposit Program",
        type: "loan",
        trigger: "veteran",
        windowMonths: null,
        summary: "Certified veteran-owned businesses can get a small business loan at up to 2 percentage points below market rate through the state treasurer's linked deposit program.",
        details: "RCW 43.86A.060 requires the loan rate to a certified veteran-owned business to be at least 200 basis points below the comparable rate; an individual loan may not exceed $1 million and terms may not exceed ten years. The business needs WDVA VOB certification plus linked deposit certification (for-profit, commercially useful function, small business). Apply through a participating lender after certification.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "RCW 43.86A.060; RCW 43.60A.190",
        sourceUrl: "https://app.leg.wa.gov/RCW/default.aspx?cite=43.86A.060",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: "WDVA linked-deposit subpage returned 404; loan cap comes from the statute."
      }
    ]
  },

  "WV": {
    name: "West Virginia",
    certification: {
      exists: true,
      name: "Vendor Preference Certificate, veteran preference (form WV-10)",
      agency: "West Virginia Purchasing Division, Department of Administration",
      url: "https://www.state.wv.us/admin/purchase/vrc/Venpref.pdf",
      preference: "3.5 percent bid preference on the cost portion of state purchasing bids for resident veteran vendors (four years of continuous West Virginia residency, or a resident veteran vendor with a 75 percent West Virginia workforce). Not for construction contracts. Requested at bid time on form WV-10; no separate certification body.",
      verified: true
    },
    programs: [
      {
        id: "wv-boots-to-business-waiver",
        name: "Boots to Business fee waiver (registration and annual report fees)",
        type: "fee_waiver",
        trigger: "new-business",
        windowMonths: 48,
        summary: "West Virginia waives the Secretary of State business registration fee and the annual report fee for the first four years for businesses at least 51 percent owned by a veteran, active-duty member, or spouse.",
        details: "W. Va. Code 59-1-2a exempts a veteran-owned business started on or after July 1, 2015 (active-duty owned on or after July 1, 2021) that is at least 51 percent owned by veterans, active-duty members, or their spouses from the initial registration fee and from the annual report fee for four years after registration. Filing deadlines and other fees still apply. Provide a DD-214 for veterans or a current military ID for active duty; the Secretary of State page puts total savings at up to $250.",
        dollarEstimate: null,
        oneTimeEstimate: 250,
        statute: "W. Va. Code 59-1-2a",
        sourceUrl: "https://sos.wv.gov/business/Pages/VetOwnBusWaiver.aspx",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: null
      },
      {
        id: "wv-veteran-bid-preference",
        name: "Resident veteran vendor 3.5 percent bid preference",
        type: "procurement_preference",
        trigger: "veteran",
        windowMonths: null,
        summary: "Resident veteran vendors may claim a 3.5 percent price preference on West Virginia state purchasing bids.",
        details: "The preference applies to the cost portion of the bid and is an evaluation method only; it does not apply to construction contracts. Claim it on form WV-10 at the time of bid; the Purchasing Division makes the determination. A vendor that fails to keep eligibility faces a penalty of up to 5 percent of the bid amount.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "W. Va. Code 5A-3-37",
        sourceUrl: "https://code.wvlegislature.gov/5A-3-37/",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: null
      }
    ]
  },

  "WI": {
    name: "Wisconsin",
    certification: {
      exists: true,
      name: "Disabled Veteran-Owned Business (DVB) Certification",
      agency: "Wisconsin Department of Administration, Wisconsin Supplier Diversity Program",
      url: "https://supplierdiversity.wi.gov/Pages/DVB/ProgramDescription.aspx",
      preference: "Permissive 5 percent bid preference: agencies may buy from a certified DVB whose bid is no more than 5 percent above the low bid, and must try to spend at least 1 percent of purchasing with DVBs. Requires 51 percent ownership and control by a Wisconsin-resident disabled veteran with a VA service-connected rating. Fee $150, valid one year.",
      verified: true
    },
    programs: [
      {
        id: "wi-dvb-bid-preference",
        name: "DVB 5 percent bid preference and 1 percent purchasing goal",
        type: "procurement_preference",
        trigger: "sc-veteran",
        windowMonths: null,
        summary: "State agencies may award to a certified disabled veteran-owned business bidding up to 5 percent above the low bid, and must attempt to spend at least 1 percent of purchasing with DVBs.",
        details: "Requires WISDP DVB certification ($150, annual renewal). The statute is permissive for the 5 percent preference and directs agencies to attempt the 1 percent goal. Apply through the Wisconsin Supplier Diversity Program with the document checklist and affidavit.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: "Wis. Stat. 16.283; 16.75(3m)",
        sourceUrl: "https://docs.legis.wisconsin.gov/statutes/statutes/16/IV/75",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: null
      },
      {
        id: "wi-wdva-vob-logo",
        name: "WDVA Veteran-Owned Business certification logo and registry",
        type: "other",
        trigger: "veteran",
        windowMonths: null,
        summary: "The Wisconsin Department of Veterans Affairs issues a certified Veteran-Owned Business logo and directory listing to businesses at least 51 percent veteran-owned; marketing only.",
        details: "Requires proof of 51 percent veteran ownership and a DD-214 for each veteran owner. Submit the Veteran-Owned Business Certification Application to WDVA by mail or email. No grants, loans, fee waivers, or procurement preference attach.",
        dollarEstimate: null,
        oneTimeEstimate: null,
        statute: null,
        sourceUrl: "https://dva.wi.gov/benefits/employment/veteran-owned-business/",
        verifiedDate: "2026-09-23",
        verified: true,
        needsFollowup: null
      }
    ]
  },

  "WY": {
    name: "Wyoming",
    certification: {
      exists: false,
      name: null,
      agency: "Wyoming Department of Administration and Information, Procurement",
      url: "https://wyoleg.gov/statutes/compress/title16.pdf",
      preference: "None veteran-specific. Wyoming's 5 percent preference under W.S. 16-6-102 is for certified resident contractors; the word veteran does not appear in Title 16 and the Secretary of State fee schedule has no veteran waiver.",
      verified: true
    },
    programs: []
  }
};
