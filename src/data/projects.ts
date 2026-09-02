// Canonical display order of the work index.
export const projectOrder = [
  "linetracker",
  "tender-scanner",
  "ehzzo",
  "nct",
  "swap-fm",
  "finrelay",
  "transkop",
] as const;

export function projectIndex(slug: string) {
  return projectOrder.indexOf(slug as (typeof projectOrder)[number]);
}
