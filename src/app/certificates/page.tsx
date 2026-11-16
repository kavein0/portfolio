import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { AtlasHero, AtlasPage, AtlasRow, AtlasSectionHeading, AtlasSurface } from "@/components/atlas/AtlasPage";
import { completedTraining, trainingProviders } from "@/lib/completed-training";

export const metadata: Metadata = {
  title: "Certificates & training | Yevhenii Voronianskyi",
  description: "Completed courses, learning paths and challenges from Basel LEARN, IBM, TryHackMe, EC-Council and picoCTF.",
};

export default function CertificatesPage() {
  return (
    <AtlasPage>
      <AtlasHero
        eyebrow="Training archive"
        title="Certificates & training"
        description={<p>Completed courses, learning paths and challenges. These completion records were added by the portfolio owner; supporting documents have not been attached yet.</p>}
        stats={[
          { label: "Completed", value: completedTraining.length, detail: "Training records" },
          { label: "Providers", value: trainingProviders.length, detail: "Learning platforms" },
        ]}
      />
      <nav className="rf-training-links" aria-label="Training providers">
        {trainingProviders.map((provider, index) => <a key={provider} href={`#provider-${index}`}>{provider}</a>)}
        <Link href="/cisco">Cisco certificates ↗</Link>
        <Link href="/htb-academy">HTB Academy ↗</Link>
        <Link href="/learning-matrix">Learning Matrix ↗</Link>
      </nav>
      {trainingProviders.map((provider, index) => {
        const records = completedTraining.filter((record) => record.provider === provider);
        return <section key={provider} id={`provider-${index}`} className="rf-training-section">
          <AtlasSectionHeading title={provider} action={`${records.length} completed`} />
          <AtlasSurface>
            {records.map((record) => <AtlasRow key={record.name} title={record.name} description={record.kind} meta="Completed" trailing="Evidence pending" icon={<CheckCircle2 aria-hidden="true" />} />)}
          </AtlasSurface>
        </section>;
      })}
    </AtlasPage>
  );
}
