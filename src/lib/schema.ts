import { person } from "@/data/person";
import { siteConfig } from "@/lib/site";

export function personSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.title,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Novi Sad",
      addressCountry: "Serbia",
    },
    worksFor: {
      "@type": "Organization",
      name: person.company,
      url: siteUrl,
    },
    url: siteUrl,
    knowsAbout: [
      "TypeScript",
      "C#",
      ".NET",
      "Angular",
      "React",
      "Node.js",
      "Production web systems",
      "AI-native engineering",
    ],
  };
}

export function professionalServiceSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: person.company,
    founder: {
      "@type": "Person",
      name: person.name,
    },
    areaServed: "Europe",
    url: siteUrl,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Novi Sad",
      addressCountry: "Serbia",
    },
  };
}

export function articleSchema(
  siteUrl: string,
  path: string,
  title: string,
  description: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Person",
      name: person.name,
    },
    publisher: {
      "@type": "Organization",
      name: person.company,
    },
    mainEntityOfPage: new URL(path, siteUrl).toString(),
  };
}
