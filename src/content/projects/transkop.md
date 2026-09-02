---
title: "Transkop"
subtitle: "Transport & logistics management"
industry: "Transport & Logistics"
visibility: "public"
featured: false
summary: "Management system digitizing a transport and logistics company's full operational flow - production, packaging, pallets, warehouse and sales. I architected the Angular frontend and lead its two-developer team."
role: "Frontend team lead"
technologies:
  - Angular
  - TypeScript
  - Angular Material
  - Tailwind CSS
  - RxJS
  - WebSockets (STOMP)
responsibilities:
  - Architected the Angular frontend solution from the ground up
  - Leading a two-developer frontend team
  - Live pallet tracking, warehouse allocation UI and document workflows
---

Transkop digitizes a transport and logistics company's entire operational chain in one system: production plans and their realisations, packaging orders, pallets, warehouse placement and the sales paper trail from offer to dispatch note to invoice. I architected the Angular frontend and lead the two-developer team building it.

Two parts of the domain pushed beyond standard forms-over-data work. Pallets are live entities - each with a lifecycle from planned through packed, in transport and on location - and their status, GPS position and warehouse placement update in real time over STOMP WebSockets, patching visible tables in place rather than forcing refetches. And warehouse placement itself is a constraint-checked location matrix: a coordinate grid of storage fields with stacking limits, where the UI validates every allocation as it's made.

Around that core sit the workflows that keep a logistics operation moving: QR-coded pallet labels generated as printable PDFs, codebooks for products and customers, and the full set of sales documents - all bilingual, Serbian and English, in an Angular Material codebase kept consistent by the module and layering conventions I set for the team.
