---
title: "LineTracker"
subtitle: "Industrial operations platform"
industry: "Industrial / Construction Software"
visibility: "public"
featured: true
summary: "Operations platform for Zaunergroup, an Austrian industrial plant construction group - delivery and vendor-portal workflows, weld quality (NDT) tracking and equipment management across live construction projects."
role: "Full-stack software engineer"
client: "Zaunergroup"
location: "Austria"
startYear: 2023
technologies:
  - Angular
  - React
  - TypeScript
  - C#
  - .NET
  - SQL Server
  - Azure
responsibilities:
  - Feature ownership across the vendor portal, delivery workflows and weld/NDT tracking
  - Full-stack development on the Angular application, the .NET backend and the React successor
  - Contributions to the PDF annotation tooling that stamps live production data onto isometric drawings
outcomes:
  - Vendor portal shipped - external suppliers submit deliveries and material certificates directly into the platform
  - React successor built alongside the live Angular application without pausing feature delivery
---

An industrial plant construction project produces a relentless paper trail: thousands of deliveries with line items and material certificates, welds that each need documented non-destructive testing, isometric drawings that get revised, printed, annotated and scanned back. LineTracker is Zaunergroup's platform for keeping all of that traceable - from the moment material arrives on site to the moment a system is handed over.

I joined the project in 2023 and work across the full stack: the Angular application, the .NET backend and, more recently, the React successor being built alongside the live app.

## What I built

The **vendor portal** is the piece I'd point to first: external suppliers log in to a vendor-scoped view of the platform, submit deliveries against orders and upload material certificates, which then flow through a review lifecycle (submitted → under review → accepted or rejected) on the Zaunergroup side. Getting this right meant per-project and per-vendor role scoping all the way down to the data layer - a vendor must never see another vendor's deliveries, or another project's anything.

Around it sits a set of workflows I own or co-own: delivery notes and incoming-goods inspections, weld logs with per-method NDT results, equipment tracking, and the QR loop - the platform prints QR-coded stickers and status sheets, and when scanned PDFs come back it reads the codes and files each drawing onto the right pipe automatically. I also contribute to the PDF annotation tooling, which burns annotation layers into isometric drawings and resolves their text against live spool and weld data at render time, so a printed drawing carries current production status rather than a static note.

## The constraints

This is a domain where auditability is not a feature but the point: every review, approval and rejection carries who and when. The schema has evolved continuously since 2021 without breaking what's in production, and new features land inside an established permission model rather than around it. The ongoing React rewrite works under the same rule - the Angular app stays live and shippable while its successor grows feature by feature.
