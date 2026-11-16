import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { AtlasHero, AtlasPage, AtlasRow, AtlasSectionHeading, AtlasSurface } from "@/components/atlas/AtlasPage";
import { completedTraining, trainingProviders, trainingProviderLinks } from "@/lib/completed-training";

export const metadata: Metadata = {
  title: "Certificates & training | Yevhenii Voronianskyi",
  description: "Completed courses, learning paths and challenges from Basel LEARN, Great Learning Academy, TryHackMe, EC-Council and picoCTF.",
};

export default function CertificatesPage() {
  return (
    <AtlasPage>
      <AtlasHero
        eyebrow="Training archive"
        title="Certificates & training"
        description={<p>Completed courses, learning paths and challenges, organised by platform. Attached documents can be viewed on each platform&apos;s archive page.</p>}
        stats={[
          { label: "Completed", value: completedTraining.length, detail: "Training records" },
          { label: "Providers", value: trainingProviders.length, detail: "Learning platforms" },
          { label: "Documents", value: completedTraining.filter((record) => record.evidence).length, detail: "Original certificates" },
        ]}
      />
      <nav className="rf-training-links" aria-label="Training providers">
        {trainingProviders.map((provider) => <Link key={provider} href={trainingProviderLinks[provider]}>{provider} ↗</Link>)}
        <Link href="/ibm">IBM · planned ↗</Link>
        <Link href="/cisco">Cisco certificates ↗</Link>
        <Link href="/htb-academy">HTB Academy ↗</Link>
        <Link href="/learning-matrix">Learning Matrix ↗</Link>
      </nav>
      {trainingProviders.map((provider, index) => {
        const records = completedTraining.filter((record) => record.provider === provider);
        return <section key={provider} id={`provider-${index}`} className="rf-training-section">
          <AtlasSectionHeading title={provider} action={<Link href={trainingProviderLinks[provider]}>{records.length} completed · Open archive ↗</Link>} />
          <AtlasSurface>
            {records.map((record) => <AtlasRow key={record.name} title={record.name} description={record.kind} meta="Completed" trailing={record.evidence ? "View certificate" : "Evidence pending"} href={record.evidence ? `${trainingProviderLinks[provider]}#certificate-${record.evidence.number}` : trainingProviderLinks[provider]} icon={<CheckCircle2 aria-hidden="true" />} />)}
          </AtlasSurface>
        </section>;
      })}
    </AtlasPage>
  );
}
