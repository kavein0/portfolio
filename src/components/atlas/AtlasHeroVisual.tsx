import CapricornConstellation from "./CapricornConstellation";
import styles from "./AtlasPage.module.css";

export type AtlasVisualVariant =
  | "capricorn"
  | "tryhackme"
  | "hackthebox"
  | "academy"
  | "cisco"
  | "picoctf"
  | "cryptohack"
  | "matrix"
  | "stats";

const visualLabels: Record<AtlasVisualVariant, string> = {
  capricorn: "CONSTELLATION / OBSERVATORY",
  tryhackme: "TRYHACKME / FIELD PATH",
  hackthebox: "HACK THE BOX / LAB ORBIT",
  academy: "HTB ACADEMY / LEARNING PATH",
  cisco: "CISCO / VERIFIED NETWORK",
  picoctf: "PICOCTF / CIPHER LAB",
  cryptohack: "CRYPTOHACK / KEYSPACE",
  matrix: "LEARNING MATRIX / ROUTE MAP",
  stats: "CYBER STATS / SIGNAL MAP",
};

function NetworkVisual() {
  return (
    <div className={styles.networkVisual}>
      <svg className={styles.visualSvg} viewBox="0 0 560 560">
        <g className={styles.networkLinks}>
          <path d="M280 151 164 242 213 386 356 405 421 270 280 151Z" />
          <path d="M164 242 421 270M213 386 280 151M356 405 164 242" />
        </g>
        <g className={styles.networkNodes}>
          <circle cx="280" cy="151" r="7" />
          <circle cx="164" cy="242" r="6" />
          <circle cx="421" cy="270" r="8" />
          <circle cx="213" cy="386" r="6" />
          <circle cx="356" cy="405" r="7" />
        </g>
        <g className={styles.ciscoMark} transform="translate(213 226)">
          <rect x="0" y="25" width="7" height="24" rx="3.5" />
          <rect x="16" y="14" width="7" height="46" rx="3.5" />
          <rect x="32" y="3" width="7" height="68" rx="3.5" />
          <rect x="48" y="12" width="7" height="50" rx="3.5" />
          <rect x="64" y="25" width="7" height="24" rx="3.5" />
          <rect x="80" y="13" width="7" height="48" rx="3.5" />
          <rect x="96" y="2" width="7" height="70" rx="3.5" />
          <rect x="112" y="15" width="7" height="44" rx="3.5" />
          <rect x="128" y="25" width="7" height="24" rx="3.5" />
        </g>
      </svg>
      <div className={styles.microLedger}>
        <span><i />Networking foundations <b>verified</b></span>
        <span><i />Cybersecurity practice <b>verified</b></span>
        <span><i />Credential archive <b>linked</b></span>
      </div>
    </div>
  );
}

function ShieldVisual() {
  return (
    <svg className={styles.visualSvg} viewBox="0 0 560 560">
      <g className={styles.radarRings}>
        <circle cx="280" cy="280" r="177" />
        <circle cx="280" cy="280" r="132" />
        <path d="M280 103V457M103 280H457" />
      </g>
      <path className={styles.shieldMark} d="M280 151 388 190v83c0 77-43 127-108 158-65-31-108-81-108-158v-83l108-39Z" />
      <path className={styles.shieldCut} d="m236 282 31 31 61-73" />
      <g className={styles.signalNodes}>
        <circle cx="155" cy="171" r="7" /><circle cx="421" cy="256" r="6" />
        <circle cx="184" cy="401" r="5" /><circle cx="390" cy="403" r="7" />
      </g>
    </svg>
  );
}

function CubeVisual({ academy = false }: { academy?: boolean }) {
  return (
    <svg className={styles.visualSvg} viewBox="0 0 560 560">
      <g className={styles.cubeOrbit}>
        <ellipse cx="280" cy="280" rx="202" ry="91" />
        <ellipse cx="280" cy="280" rx="202" ry="91" transform="rotate(60 280 280)" />
      </g>
      <g className={styles.cubeMark}>
        <path d="m280 149 122 69-122 69-122-69 122-69Z" />
        <path d="m158 218 122 69v135l-122-70V218Z" />
        <path d="m402 218-122 69v135l122-70V218Z" />
        {academy ? <path d="m230 279 50 29 50-29v58l-50 29-50-29v-58Z" /> : null}
      </g>
      <g className={styles.signalNodes}>
        <circle cx="95" cy="261" r="6" /><circle cx="452" cy="167" r="5" />
        <circle cx="422" cy="406" r="7" />
      </g>
    </svg>
  );
}

function CipherVisual({ pico = false }: { pico?: boolean }) {
  const ticks = Array.from({ length: 16 }, (_, index) => index);
  return (
    <svg className={styles.visualSvg} viewBox="0 0 560 560">
      <g className={styles.cipherWheel}>
        <circle cx="280" cy="280" r="184" />
        <circle cx="280" cy="280" r="139" />
        {ticks.map((tick) => (
          <line key={tick} x1="280" y1="84" x2="280" y2="105" transform={`rotate(${tick * 22.5} 280 280)`} />
        ))}
      </g>
      {pico ? (
        <g className={styles.keyMark}>
          <circle cx="231" cy="251" r="54" />
          <path d="m268 289 111 111m-45-66 27-27m-3 69 27-27" />
        </g>
      ) : (
        <g className={styles.lockMark}>
          <rect x="198" y="256" width="164" height="135" rx="35" />
          <path d="M232 256v-38c0-64 96-64 96 0v38" />
          <circle cx="280" cy="319" r="13" />
          <path d="M280 332v27" />
        </g>
      )}
      <text className={styles.cipherText} x="280" y="463" textAnchor="middle">{pico ? "101 / CTF / 011" : "A / E / K / P"}</text>
    </svg>
  );
}

function MatrixVisual() {
  return (
    <div className={styles.matrixVisual}>
      <svg className={styles.visualSvg} viewBox="0 0 560 560">
        <g className={styles.matrixGrid}>
          {Array.from({ length: 7 }, (_, index) => <line key={`v-${index}`} x1={130 + index * 50} y1="132" x2={130 + index * 50} y2="430" />)}
          {Array.from({ length: 7 }, (_, index) => <line key={`h-${index}`} x1="130" y1={132 + index * 50} x2="430" y2={132 + index * 50} />)}
        </g>
        <path className={styles.matrixRoute} d="M143 382 194 330 244 350 294 245 347 265 413 164" />
        <g className={styles.networkNodes}>
          <circle cx="143" cy="382" r="7" /><circle cx="194" cy="330" r="6" />
          <circle cx="244" cy="350" r="6" /><circle cx="294" cy="245" r="7" />
          <circle cx="347" cy="265" r="6" /><circle cx="413" cy="164" r="8" />
        </g>
      </svg>
      <div className={styles.matrixKey}><span>evidence</span><b>mapped</b><span>route</span><b>active</b></div>
    </div>
  );
}

function StatsVisual() {
  return (
    <svg className={styles.visualSvg} viewBox="0 0 560 560">
      <g className={styles.statsRings}>
        <circle cx="280" cy="280" r="177" pathLength="100" />
        <circle cx="280" cy="280" r="137" pathLength="100" />
        <circle cx="280" cy="280" r="97" pathLength="100" />
      </g>
      <g className={styles.statsBars}>
        <rect x="220" y="262" width="24" height="92" rx="12" />
        <rect x="268" y="214" width="24" height="140" rx="12" />
        <rect x="316" y="242" width="24" height="112" rx="12" />
      </g>
      <g className={styles.signalNodes}>
        <circle cx="151" cy="159" r="7" /><circle cx="419" cy="185" r="6" />
        <circle cx="430" cy="385" r="7" /><circle cx="145" cy="397" r="5" />
      </g>
    </svg>
  );
}

export default function AtlasHeroVisual({ variant }: { variant: AtlasVisualVariant }) {
  let visual;

  switch (variant) {
    case "cisco": visual = <NetworkVisual />; break;
    case "tryhackme": visual = <ShieldVisual />; break;
    case "hackthebox": visual = <CubeVisual />; break;
    case "academy": visual = <CubeVisual academy />; break;
    case "picoctf": visual = <CipherVisual pico />; break;
    case "cryptohack": visual = <CipherVisual />; break;
    case "matrix": visual = <MatrixVisual />; break;
    case "stats": visual = <StatsVisual />; break;
    default: visual = <CapricornConstellation />;
  }

  return (
    <>
      <span className={styles.lensRefraction} aria-hidden="true" />
      <div className={styles.heroVisual} data-visual={variant}>{visual}</div>
      <span className={styles.lensLabel}>{visualLabels[variant]}</span>
    </>
  );
}
