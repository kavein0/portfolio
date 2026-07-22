import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Circle, ExternalLink, Table2 } from "lucide-react";
import {
  AtlasHero,
  AtlasPage,
  AtlasSectionHeading,
  atlasStyles,
} from "@/components/atlas/AtlasPage";
import {
  certifications,
  htbAcademyModules,
  thmRooms,
  type Certification,
  type HTBAcademyModule,
  type TryHackMeRoom,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Learning Matrix | Євгеній Воронянський",
  description:
    "Structured cybersecurity, cryptology, and digital forensics learning tables with completed items matched against the portfolio.",
};

type Evidence = {
  title: string;
  url: string;
};

type MatrixItem = {
  title: string;
  aliases?: string[];
  fallbackEvidence?: Evidence;
};

type MatrixSection = {
  provider: string;
  items: MatrixItem[];
};

type MatrixCategory = {
  title: string;
  description: string;
  sections: MatrixSection[];
};

const picoEvidence: Evidence = { title: "PicoCTF page", url: "/picoctf" };
const cryptohackEvidence: Evidence = {
  title: "CryptoHack page",
  url: "/cryptohack",
};

const picoCompleted = [
  "interencdec",
  "Mod 26",
  "The Numbers",
  "13",
  "rsa_oracle",
  "Custom encryption",
  "C3",
  "Vigenere",
];

const cryptohackCompleted = [
  "Introduction to CryptoHack",
  "Modular Arithmetic",
  "Symmetric Cryptography",
  "Public-Key Cryptography",
  "Elliptic Curves",
];

const matrixCategories: MatrixCategory[] = [
  {
    title: "Cybersecurity",
    description:
      "General cybersecurity, networking, academy modules, and introductory certification tracks.",
    sections: [
      {
        provider: "Cisco Networking Academy",
        items: [
          { title: "Computer Hardware Basics" },
          { title: "Operating Systems Basics" },
          { title: "Основи мереж", aliases: ["Networking Basics"] },
          {
            title: "Мережеві пристрої та початкова конфігурація",
            aliases: ["Networking Devices and Initial Configuration"],
          },
          { title: "Network Addressing and Basic Troubleshooting" },
          { title: "Network Support and Security" },
          { title: "Початок роботи з Cisco Packet Tracer" },
          { title: "Exploring Networking with Cisco Packet Tracer" },
          {
            title: "Вступ до IoT та цифрової трансформації",
            aliases: ["Introduction to IoT"],
          },
          {
            title: "Exploring Internet of Things with Cisco Packet Tracer",
            aliases: ["Exploring IoT with Cisco Packet Tracer"],
          },
          {
            title: "Вступ до кібербезпеки",
            aliases: ["Introduction to Cybersecurity"],
          },
          { title: "Ethical Hacker" },
          { title: "Захист мережі", aliases: ["Network Defense"] },
          {
            title: "Управління загрозами у кібербезпеці",
            aliases: ["Cyber Threat Management"],
          },
          { title: "Безпека кінцевих вузлів", aliases: ["Endpoint Security"] },
        ],
      },
      {
        provider: "HTB Academy",
        items: [
          { title: "Setting Up" },
          { title: "Linux Fundamentals" },
          { title: "Windows Fundamentals" },
          { title: "MacOS Fundamentals" },
          { title: "Introduction to Networking" },
          { title: "Intro to Network Traffic Analysis" },
          { title: "Web Requests" },
          { title: "Introduction to Active Directory" },
          { title: "Introduction to Web Applications" },
          { title: "Security Incident Reporting" },
          { title: "Using the Metasploit Framework" },
          { title: "Attacking Web Applications with Ffuf" },
          { title: "Vulnerability Assessment" },
          { title: "File Inclusion" },
          { title: "File Transfers" },
          { title: "SQL Injection Fundamentals" },
          { title: "Brief Intro to Hardware Attacks" },
        ],
      },
      {
        provider: "IBM",
        items: [
          { title: "Кібербезпека" },
          { title: "Блокчейн" },
          { title: "Хмарні обчислення" },
          { title: "Штучний інтелект" },
        ],
      },
      {
        provider: "TryHackMe!",
        items: [
          { title: "Introduction to Cyber Security" },
          { title: "Pre Security" },
          { title: "Web Fundamentals" },
        ],
      },
      {
        provider: "Great Learning Academy",
        items: [
          { title: "Introduction to Ethical Hacking" },
          { title: "Become an Ethical Hacker" },
        ],
      },
      {
        provider: "EC-Council",
        items: [
          { title: "Cybersecurity for Small and Medium Size Business" },
          { title: "Make In-house Hacking and Pentesting Lab" },
          {
            title:
              "Comprehensive Guide to Industrial Cybersecurity with IEC 62443-3 Standards",
          },
          { title: "Introduction to Dark Web, Anonymity, and Cryptocurrency" },
          { title: "Android Bug Bounty Hunting: Hunt Like a Rat" },
          { title: "Cisco LABS Crash Course" },
          { title: "A Practical Introduction to Cloud Computing" },
          { title: "Build Your Own NetApp Storage Lab. for Free" },
          { title: "Introduction to SAN and NAS Storage" },
          { title: "SQL Injection Attacks" },
          { title: "Cybersecurity for Businesses - The Fundamental Edition" },
        ],
      },
      {
        provider: "PicoCTF",
        items: [
          { title: "Super SSH" },
          { title: "Local Authority" },
          { title: "dont-use-client-side" },
          { title: "Who are you?" },
          { title: "Big Zip" },
          { title: "Web Decode" },
        ],
      },
    ],
  },
  {
    title: "Cryptology",
    description:
      "CryptoHack courses, PicoCTF cryptography challenges, and TryHackMe cryptography rooms.",
    sections: [
      {
        provider: "CryptoHack",
        items: [
          {
            title: "INTRODUCTION TO CRYPTOHACK",
            aliases: ["Introduction to CryptoHack"],
          },
          { title: "MODULAR ARITHMETIC", aliases: ["Modular Arithmetic"] },
          {
            title: "SYMMETRIC CRYPTOGRAPHY",
            aliases: ["Symmetric Cryptography"],
          },
          {
            title: "PUBLIC-KEY CRYPTOGRAPHY",
            aliases: ["Public-Key Cryptography"],
          },
          { title: "ELLIPTIC CURVES", aliases: ["Elliptic Curves"] },
        ],
      },
      {
        provider: "PicoCTF",
        items: [
          { title: "interencdec" },
          { title: "mod 26", aliases: ["Mod 26"] },
          { title: "the numbers", aliases: ["The Numbers"] },
          { title: "Vigener", aliases: ["Vigenere"] },
          { title: "13" },
          { title: "rsa_oracle" },
          { title: "Custom encryption" },
          { title: "C3" },
        ],
      },
      {
        provider: "TryHackMe Cryptography",
        items: [
          { title: "Cryptography Basics" },
          { title: "Encryption - Crypto 101" },
          { title: "Introduction to Cryptography" },
          { title: "Introduction to CryptOps" },
          { title: "Breaking RSA" },
          { title: "Cicada-3301 Vol:1" },
          { title: "CyberChef: The Basics" },
          { title: "Cryptography Concepts" },
          { title: "Cryptography for Dummies" },
          { title: "Breaking Crypto the Simple Way" },
          { title: "Passwords - A Cracking Christmas" },
        ],
      },
    ],
  },
  {
    title: "Digital Forensics",
    description:
      "Digital forensics courses, labs, and PicoCTF forensic-style challenges from the provided table.",
    sections: [
      {
        provider: "Cyber 5W",
        items: [
          { title: "Prepare Your Forensic Environment" },
          { title: "Working with Virtual Hard Disk" },
          { title: "Linux Forensics Distributions" },
          {
            title: "Intro to Linux from a Forensics Perspective - Tsurugi Version",
          },
          {
            title: "Intro to Linux from a Forensics Perspective - Ubuntu Version",
          },
          { title: "Investigating Windows Recycle Bin" },
          { title: "Time Zone Conversions" },
          { title: "Investigating Windows Scheduled Tasks" },
          { title: "C5W-100 INTRODUCTION TO DIGITAL FORENSICS" },
        ],
      },
      {
        provider: "Council of Europe HELP eLearning platform",
        items: [{ title: "Cybercrime and Electronic Evidence" }],
      },
      {
        provider: "The Open University",
        items: [{ title: "Digital forensics" }],
      },
      {
        provider: "Alison",
        items: [{ title: "Diploma in Digital Forensic Investigation" }],
      },
      {
        provider: "Great Learning Academy",
        items: [{ title: "Cyber Forensics" }],
      },
      {
        provider: "Echothis Labs",
        items: [{ title: "CSI Linux Certified Investigator" }],
      },
      {
        provider: "PicoCTF",
        items: [
          { title: "Verify" },
          { title: "Scan Surprise" },
          { title: "information" },
          { title: "Secret of the Polyglot" },
          { title: "CanYouSee" },
          { title: "Glory of the Garden" },
        ],
      },
    ],
  },
];

const evidenceSources: Evidence[] = [
  ...certifications.map((certification: Certification) => ({
    title: certification.name,
    url: certification.url ?? "/cisco",
  })),
  ...htbAcademyModules.map((module: HTBAcademyModule) => ({
    title: module.name,
    url: module.url,
  })),
  ...thmRooms.map((room: TryHackMeRoom) => ({
    title: room.name,
    url: room.url ?? "/tryhackme",
  })),
  ...picoCompleted.map((title) => ({ title, url: picoEvidence.url })),
  ...cryptohackCompleted.map((title) => ({
    title,
    url: cryptohackEvidence.url,
  })),
];

function normalizeTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-zа-яіїєґ0-9]+/gi, " ")
    .trim();
}

function findEvidence(item: MatrixItem): Evidence | undefined {
  const candidates = [item.title, ...(item.aliases ?? [])].map(normalizeTitle);

  const matched = evidenceSources.find((source) =>
    candidates.includes(normalizeTitle(source.title)),
  );

  return matched ?? item.fallbackEvidence;
}

function isInternalUrl(url: string) {
  return url.startsWith("/");
}

function EvidenceLink({ evidence }: { evidence: Evidence }) {
  if (isInternalUrl(evidence.url)) {
    return (
      <Link
        href={evidence.url}
        className={atlasStyles.matrixEvidence}
      >
        Source <ExternalLink className="w-3 h-3" />
      </Link>
    );
  }

  return (
    <a
      href={evidence.url}
      target="_blank"
      rel="noopener noreferrer"
      className={atlasStyles.matrixEvidence}
    >
      Source <ExternalLink className="w-3 h-3" />
    </a>
  );
}

function MatrixTable({ category }: { category: MatrixCategory }) {
  const rows = category.sections.flatMap((section) =>
    section.items.map((item, index) => ({
      provider: section.provider,
      index: index + 1,
      item,
      evidence: findEvidence(item),
    })),
  );

  return (
    <section
      id={category.title.toLowerCase().replace(/\s+/g, "-")}
      className={atlasStyles.matrixSection}
    >
      <AtlasSectionHeading
        eyebrow={`${String(rows.length).padStart(2, "0")} observations`}
        title={category.title}
        action={<Table2 aria-hidden="true" />}
      />
      <p className={atlasStyles.matrixIntro}>{category.description}</p>

      <div className={`${atlasStyles.surface} ${atlasStyles.matrixSurface}`}>
        <div className={atlasStyles.matrixTableFrame}>
          <table className={atlasStyles.matrixTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>Provider</th>
                <th>Course / Room / Certificate</th>
                <th>Status</th>
                <th>Evidence</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ provider, index, item, evidence }, rowIndex) => {
                const isCompleted = Boolean(evidence);
                const isFirstProviderRow =
                  rowIndex === 0 || rows[rowIndex - 1].provider !== provider;

                return (
                  <tr key={`${provider}-${item.title}`}>
                    <td className={atlasStyles.matrixIndex}>
                      {index}
                    </td>
                    <td className={atlasStyles.matrixProvider}>
                      {isFirstProviderRow ? (
                        <span>{provider}</span>
                      ) : (
                        <span className="sr-only">{provider}</span>
                      )}
                    </td>
                    <td className={atlasStyles.matrixTitle}>
                      {item.title}
                    </td>
                    <td className={atlasStyles.matrixStatus}>
                      {isCompleted ? (
                        <span className={atlasStyles.matrixDone}>
                          <CheckCircle2 />
                          Done
                        </span>
                      ) : (
                        <span>
                          <Circle />
                          Pending
                        </span>
                      )}
                    </td>
                    <td>
                      {evidence ? (
                        <EvidenceLink evidence={evidence} />
                      ) : (
                        <span className={atlasStyles.matrixDash}>—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={atlasStyles.matrixMobile}>
        {rows.map(({ provider, index, item, evidence }) => {
          const isCompleted = Boolean(evidence);

          return (
            <article key={`${provider}-${item.title}`} className={atlasStyles.matrixMobileRow}>
              <div className={atlasStyles.matrixMobileTop}>
                <div>
                  <p className={atlasStyles.matrixMobileProvider}>
                    {provider} · {String(index).padStart(2, "0")}
                  </p>
                  <h3 className={atlasStyles.matrixMobileTitle}>
                    {item.title}
                  </h3>
                </div>
                {isCompleted ? (
                  <CheckCircle2 data-complete="true" aria-label="Completed" />
                ) : (
                  <Circle aria-label="Pending" />
                )}
              </div>
              <div className={atlasStyles.matrixMobileBottom}>
                <span>
                  {isCompleted ? "Completed" : "Pending"}
                </span>
                {evidence ? <EvidenceLink evidence={evidence} /> : null}
              </div>
            </article>
          );
        })}
        </div>
      </div>
    </section>
  );
}

export default function LearningMatrixPage() {
  const allRows = matrixCategories.flatMap((category) =>
    category.sections.flatMap((section) => section.items),
  );
  const completedCount = allRows.filter((item) => findEvidence(item)).length;
  const totalCount = allRows.length;
  const pendingCount = totalCount - completedCount;

  return (
    <AtlasPage tone="violet">
      <AtlasHero
        visual="matrix"
        eyebrow="Progress matrix"
        title="Learning Matrix"
        description={
          <p>
            Cybersecurity, cryptology, and digital forensics mapped against
            verified portfolio evidence.
          </p>
        }
        compact
        stats={[
          { label: "Total items", value: totalCount, detail: "Mapped observations" },
          { label: "Completed", value: completedCount, detail: "Evidence verified" },
          { label: "Pending", value: pendingCount, detail: "Next coordinates" },
        ]}
        constellationCaption="A long route made visible, one observation at a time."
      />

      <nav className={atlasStyles.matrixTabs} aria-label="Learning matrix categories">
        {matrixCategories.map((category) => (
          <a
            key={category.title}
            href={`#${category.title.toLowerCase().replace(/\s+/g, "-")}`}
            className={atlasStyles.matrixTab}
          >
            {category.title}
          </a>
        ))}
      </nav>

      {matrixCategories.map((category) => (
        <MatrixTable key={category.title} category={category} />
      ))}
    </AtlasPage>
  );
}
