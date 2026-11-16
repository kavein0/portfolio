import type { Metadata } from "next";
import { AtlasHero, AtlasPage, AtlasSectionHeading } from "@/components/atlas/AtlasPage";
import { completedTraining, ibmCourses, type TrainingProvider } from "@/lib/completed-training";
import TrainingRecords, { type TrainingRecord } from "./TrainingRecords";

type Provider = Extract<TrainingProvider, "Basel LEARN" | "Great Learning Academy" | "EC-Council"> | "IBM";
const descriptions: Record<Provider, string> = {
  "EC-Council": "Course records from EC-Council and CodeRed, with original completion documents, issue dates and certificate numbers.",
  "Basel LEARN": "Completed courses in open-source intelligence, financial analysis and the investigation of suspicious transactions, with the supplied completion certificates and original PNG downloads.",
  "Great Learning Academy": "Completed introductory courses in ethical hacking. Supporting documents have not been attached yet.",
  "IBM": "Planned courses in cybersecurity, blockchain, cloud computing and artificial intelligence. These courses have not been completed yet.",
};

export function providerMetadata(provider: Provider): Metadata {
  return { title: `${provider} | Yevhenii Voronianskyi`, description: descriptions[provider] };
}

export default function TrainingProviderPage({ provider }: { provider: Provider }) {
  const records: TrainingRecord[] = provider === "IBM"
    ? ibmCourses.map((name) => ({ name, provider, kind: "Course", status: "Pending" }))
    : completedTraining.filter((record) => record.provider === provider).sort((a, b) => Number(Boolean(b.evidence)) - Number(Boolean(a.evidence)));
  const completed = records.filter((record) => record.status === "Completed").length;
  const documents = records.filter((record) => record.evidence).length;
  return <AtlasPage>
    <AtlasHero eyebrow="Certificates & training" title={provider} description={<p>{descriptions[provider]}</p>} stats={[
      { label: "Course records", value: records.length, detail: provider },
      { label: "Completed", value: completed, detail: `${records.length - completed} pending` },
      { label: "Documents", value: documents, detail: documents ? "Originals available" : "None attached" },
    ]} />
    <AtlasSectionHeading title={provider === "IBM" ? "Planned courses" : "Course archive"} action={`${completed} completed`} />
    <TrainingRecords records={records} />
  </AtlasPage>;
}
