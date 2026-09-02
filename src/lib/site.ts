import { person } from "@/data/person";

export const siteConfig = {
  name: `${person.name} - ${person.title}`,
  shortName: person.name,
  defaultTitle: `${person.name} | ${person.title}`,
  description:
    "Full-stack software engineer specializing in TypeScript and C#/.NET, building production web systems for companies across Europe.",
  url: import.meta.env.SITE,
  ogImage: "/og.svg",
} as const;

export function absoluteUrl(path: string, site = siteConfig.url) {
  return new URL(path, site).toString();
}
