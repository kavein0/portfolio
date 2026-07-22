import {
  AtlasDetails,
  AtlasHero,
  AtlasPage,
  AtlasRow,
  AtlasSectionHeading,
  AtlasSurface,
} from "@/components/atlas/AtlasPage";
import { certifications } from "@/lib/data";
import { Award, Calendar, Link2, Network } from "lucide-react";

const certificateListUrl = "https://docs.google.com/document/d/1rDxT5uOPnRjDArVh8_8i-XTaQ_8xMxK-iMHaLFArj34/edit?usp=sharing";

function CertificateRows({ start = 0 }: { start?: number }) {
  return certifications.slice(start).map((certificate) => (
    <AtlasRow
      key={certificate.name}
      title={certificate.name}
      description={certificate.issuer}
      meta={certificate.date}
      trailing={certificate.url ? "View certificate" : "Record only"}
      href={certificate.url}
      icon={<Award aria-hidden="true" />}
    />
  ));
}

export default function CiscoPage() {
  const linkedCertificates = certifications.filter((certificate) => certificate.url).length;
  const remainingCertificates = Math.max(0, certifications.length - 10);

  return (
    <AtlasPage tone="ice">
      <AtlasHero
        visual="cisco"
        eyebrow="Cisco NetAcad"
        title="Cisco Networking Academy Certifications"
        description={
          <p>My academic achievements and specialized training completed through Cisco NetAcad.</p>
        }
        action={{ label: "View Certificate List", href: certificateListUrl }}
        constellationCaption="Cisco NetAcad courses and verified certificates."
        stats={[
          { label: "Certifications Completed", value: certifications.length, icon: <Award aria-hidden="true" /> },
          { label: "Linked Credentials", value: linkedCertificates, detail: "Credly records", icon: <Link2 aria-hidden="true" /> },
          { label: "Training Window", value: "24–26", detail: "2024 to 2026", icon: <Calendar aria-hidden="true" /> },
          { label: "Issuer", value: "Cisco", detail: "Networking Academy", icon: <Network aria-hidden="true" /> },
        ]}
      />

      <AtlasSectionHeading
        eyebrow="Certificates"
        title="Certificate List"
        action={`${certifications.length} completed`}
      />
      <AtlasSurface>
        {certifications.slice(0, 10).map((certificate) => (
          <AtlasRow
            key={certificate.name}
            title={certificate.name}
            description={certificate.issuer}
            meta={certificate.date}
            trailing={certificate.url ? "View certificate" : "Record only"}
            href={certificate.url}
            icon={<Award aria-hidden="true" />}
          />
        ))}
        {remainingCertificates ? (
          <AtlasDetails label="Reveal remaining certificates" count={remainingCertificates}>
            <CertificateRows start={10} />
          </AtlasDetails>
        ) : null}
      </AtlasSurface>
    </AtlasPage>
  );
}
