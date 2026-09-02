---
title: "LineTracker"
subtitle: "Industrial operations platform"
industry: "Industrial / Construction Software"
visibility: "public"
featured: true
summary: "Operations platform for Zaunergroup, an Austrian industrial plant construction group: piping and weld records, NDT, material deliveries, a supplier portal and an offline-capable field app. Largest single contributor to both the .NET backend and the Angular frontend since 2022."
role: "Full-stack software engineer"
client: "Zaunergroup"
location: "Austria"
startYear: 2022
technologies:
  - Angular
  - C#
  - .NET
  - TypeScript
  - React
  - SQL Server
  - EF Core
  - AG Grid
  - Azure AD (Entra ID)
responsibilities:
  - Designed and built the backend for the offline-capable field app - delta sync, idempotent offline writes, push notifications - consumed by a React Native client from an external team
  - Vendor portal end to end - identity model, row-level tenant isolation, review state machine, and both the Angular and React UIs
  - The AG Grid platform 35 screens migrated onto, plus the weld-log, equipment, IWP, P&ID and issue modules
  - Architecture decision records governing the Angular-to-React re-platform, built with two colleagues
outcomes:
  - Vendor portal in production - suppliers submit deliveries and EN 10204 material certificates directly, reviewed per position by Zaunergroup staff
  - Field crews log welds, photos and inspections offline against a sync API of roughly 45 endpoints
  - Around half of the backend application code and of the frontend commits over four years, 57 of 138 schema migrations, most of the backend test suite
---

An industrial plant construction project produces a relentless paper trail: thousands of deliveries with line items and material certificates, welds that each need documented non-destructive testing, isometric drawings that get revised, printed, annotated and scanned back. LineTracker is Zaunergroup's system of record for all of it, from the moment material arrives on site to the moment a system is handed over.

I have worked on it since February 2022, across the .NET backend, the Angular application in production, and the React successor a small team of us is building.

## Where I own the design

**The field app backend.** Site crews log welds, photos, comments and inspections in places with no signal, so the mobile app works offline and syncs when it can. The app itself is React Native, built by an external team; the entire backend side is mine. Roughly 45 endpoints: delta sync keyed on a per-row updated watermark with covering indexes so a device only pulls what changed since its last visit, paged sync for large projects, client-generated ids so rows created offline upsert idempotently instead of duplicating, and batch endpoints for photos and comments. Push notifications go through Firebase, with token de-duplication and pruning of dead devices. The bug I am most glad to have caught: parallel photo saves sharing one DbContext, fixed by giving each task its own dependency-injection scope.

**The vendor portal.** External suppliers log into a vendor-scoped view, submit deliveries against orders and upload material certificates, which Zaunergroup staff review. The identity model is a tenant-wide vendor company over per-project vendor rows, with users assigned at the company level. A vendor context is resolved once per request and applied to every query, the only row-level isolation in the codebase; ids outside the caller's set return 404 rather than 403, so nothing leaks about what exists. Delivery notes run through a small state machine, draft to pending approval to approved or rejected, with a separate open state for internal deliveries so certificates can be attached later without ever pulling received goods out of stock. Review happens per position, so a note can be partially approved, and an over-delivery guard checks each submission against ordered minus already-approved quantities. 52 unit tests cover the isolation and the transitions. I built both frontends: the Angular one in production and the React redesign.

**The grid platform.** Thirty-five screens sat on a legacy table component with its own column configuration format. I wrote the AG Grid wrapper that maps that configuration onto AG Grid column definitions, so screens migrated without rewriting their metadata: typed cell editors with async dropdown sources, fill handle, undo and redo, master/detail rows, dirty-entry tracking that flows up into application state so saves stay in one place, and per-user persisted layouts. The new weld log sits on top of it: drag an isometric material part onto a weld's connection cell, diameter and wall thickness derived from the two connected parts unless overridden, welding procedures filtered to what is valid for the joint, and NDT results joined in as dynamic columns per enabled test method.

## Other work

- The PCF isometric parser and other Excel and print generators.
- The equipment, install-work-package, P&ID and issue-and-comment and other modules, backend to UI.
- The coordinate-system rework in the shared PDF annotator.
- An EF Core date-time converters.
- Internal project-based authorization

## The constraints

Auditability is the point, not a feature: every review, approval and rejection carries who and when. The schema has grown through 138 migrations since 2022 without breaking production, and every endpoint is checked by an architecture test for the project-role attribute, which resolves the project from the route, body or query through one of 59 resolver strategies. The React re-platform runs under rules we wrote down as ADRs: the Angular app stays live and is the behavioral oracle, the bar is functional rather than visual parity, and improvements outside a module's agreed delta list wait their turn.
