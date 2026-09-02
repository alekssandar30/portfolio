---
title: "TenderScanner"
subtitle: "AI procurement intelligence platform"
industry: "Procurement Technology / AI"
visibility: "public"
featured: true
summary: "My own SaaS product: scrapers ingest public tenders across Serbia and Bosnia and Herzegovina, and an AI pipeline summarizes, embeds and scores each one against company profiles to produce go/no-go recommendations."
role: "Founder / solo engineer"
technologies:
  - React
  - TypeScript
  - Node.js
  - PostgreSQL
  - Google Gemini
  - .NET
responsibilities:
  - Everything - product, frontend, backend, data platform and AI pipeline, built solo
  - Scrapers ingesting newly published tenders from the Serbian and Bosnian procurement portals into PostgreSQL
  - AI pipeline - Gemini summaries, embeddings and a weighted fit score per tender and company profile
outcomes:
  - Deployed and operational - scrapers and AI analysis run on every newly published tender
  - First client conversations underway while development continues
links:
  website: "https://tender-scan.com/"
---

Companies bidding on public tenders in Serbia and Bosnia and Herzegovina track them the hard way: fragmented procurement portals, manual checking, and a real cost to missing the one tender that fits. TenderScanner is my answer to that, a product I design, build and run solo.

The pipeline works end to end in production. Scrapers pull newly published notices from both national portals into PostgreSQL once a day. Each new tender then passes through a Gemini Flash step that writes a Serbian-language summary and suggested bidder questions, gets embedded, and is scored against every registered company profile with a weighted fit score across industry, CPV codes, keywords, regions and value range. The dashboard turns that into a go/no-go recommendation with the supporting detail, plus favorites with change tracking.

The stack is a React and TypeScript frontend on a Node.js backend with PostgreSQL and a job queue underneath; the backend is currently being ported to .NET. It is live, with the first interested clients and a feature roadmap ahead, and it doubles as the project where I own every decision, from scraper resilience to what an AI recommendation owes its reader.
