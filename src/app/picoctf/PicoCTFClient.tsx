import EvidencePanel from "@/components/EvidencePanel";
import {
  AtlasPage,
  AtlasHero,
  AtlasRow,
  AtlasSectionHeading,
  AtlasSurface,
  atlasStyles,
} from "@/components/atlas/AtlasPage";
import { Binary, CheckCircle2, LockKeyhole } from "lucide-react";

const picoChallenges = [
  { name: "interencdec", difficulty: "Easy" },
  { name: "Mod 26", difficulty: "Easy" },
  { name: "The Numbers", difficulty: "Easy" },
  { name: "13", difficulty: "Easy" },
  { name: "rsa_oracle", difficulty: "Medium" },
  { name: "Custom encryption", difficulty: "Medium" },
  { name: "C3", difficulty: "Medium" },
  { name: "Vigenere", difficulty: "Medium" },
] as const;

export default function PicoCTFClient() {
  const easyCount = picoChallenges.filter(({ difficulty }) => difficulty === "Easy").length;
  const mediumCount = picoChallenges.length - easyCount;

  return (
    <AtlasPage tone="ice">
      <AtlasHero
        visual="picoctf"
        eyebrow="CyLab Academy / cryptography"
        title="PicoCTF Challenges"
        description={<p>Completed cryptography challenges with profile evidence from CyLab Academy.</p>}
        action={{ label: "View profile", href: "https://learn.cylabacademy.org/users/Lareine" }}
        stats={[
          { label: "Completed", value: picoChallenges.length, detail: "verified challenges", icon: <CheckCircle2 /> },
          { label: "Easy", value: easyCount, detail: "foundation orbit", icon: <Binary /> },
          { label: "Medium", value: mediumCount, detail: "deeper cryptography", icon: <LockKeyhole /> },
        ]}
        constellationCaption="A measured course through classical and applied cryptography."
      />

      <AtlasSectionHeading
        eyebrow="Cryptography / solved archive"
        title="Solved challenges"
        action={<span>08 entries</span>}
      />
      <AtlasSurface>
        {picoChallenges.map((challenge, index) => (
          <AtlasRow
            key={challenge.name}
            title={challenge.name}
            description="CyLab Academy · completed"
            meta={challenge.difficulty}
            trailing={String(index + 1).padStart(2, "0")}
          />
        ))}
      </AtlasSurface>

      <AtlasSectionHeading
        eyebrow="Verification / source material"
        title="Progress evidence"
        action={<span>02 captures</span>}
      />
      <AtlasSurface>
        <div className={atlasStyles.detailsContent} style={{ display: "grid", gap: 12, paddingTop: 0 }}>
          <EvidencePanel
            title="Challenge list"
            description="Completed cryptography challenge overview."
            image="/picoctf/challenges.png"
            alt="CyLab cryptography challenge list showing eight PicoCTF challenges"
            width={1720}
            height={914}
          />
          <EvidencePanel
            title="Profile and completion summary"
            description="Profile statistics and challenge completion chart."
            image="/picoctf/profile.png"
            alt="CyLab profile for Larein showing eight completed challenges"
            width={1720}
            height={914}
          />
        </div>
      </AtlasSurface>
    </AtlasPage>
  );
}
