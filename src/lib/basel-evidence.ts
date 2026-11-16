import type { TrainingEvidence } from "./training-evidence";

function document(slug: string, width: number, height: number, issuedOn?: string, sourceNote?: string): TrainingEvidence {
  return {
    id: `basel-${slug}`,
    imageUrl: `/certificates/basel-learn/${slug}.webp`,
    originalUrl: `/certificates/basel-learn/${slug}.png`,
    width, height, issuedOn, sourceNote,
  };
}

// Dates and notes reflect the supplied images; no printed certificate numbers
// are visible. Stable page anchors are separate from credential numbers.
export const baselEvidence: Record<string, TrainingEvidence> = {
  "Operational Analysis of Suspicious Transaction Reports": document("operational-analysis", 666, 942, "2026-10-27", "The recipient name is not visible in the supplied image."),
  "Source and Application of Funds Analysis": document("sources-and-uses-of-funds", 1054, 1492, "2026-11-16"),
  "Open-source Intelligence": document("open-source-investigations", 1054, 1492, "2026-10-22"),
  "Data Cleaning and Harvesting": document("data-cleaning-and-harvesting", 692, 958, "2026-10-27", "The recipient name is not visible in the supplied image."),
  "Financial Analysis using Excel": document("financial-analysis-excel", 1057, 1488, "2026-11-16"),
  "Visualise Cases and Flows of Money": document("cases-and-money-flows", 1054, 1492, undefined, "The issue date is obscured by overlapping text in the supplied image."),
};
