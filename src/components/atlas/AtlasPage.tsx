import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import AtlasHeroVisual, { type AtlasVisualVariant } from "./AtlasHeroVisual";
import styles from "./AtlasPage.module.css";

export const atlasStyles = styles;

export type AtlasTone = "violet" | "ice" | "green" | "red" | "cyan";

export type AtlasStat = {
  label: string;
  value: ReactNode;
  detail?: string;
  icon?: ReactNode;
};

type AtlasPageProps = {
  children: ReactNode;
  tone?: AtlasTone;
  className?: string;
};

export function AtlasPage({ children, tone = "violet", className }: AtlasPageProps) {
  return (
    <div className={`${styles.page}${className ? ` ${className}` : ""}`} data-tone={tone}>
      <div className={styles.skyWash} aria-hidden="true" />
      <div className={styles.shell}>{children}</div>
    </div>
  );
}

type AtlasHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  action?: { label: string; href: string };
  stats?: readonly AtlasStat[];
  constellationCaption?: string;
  compact?: boolean;
  visual?: AtlasVisualVariant;
};

export function AtlasHero({
  eyebrow,
  title,
  description,
  action,
  stats,
  constellationCaption = "Ambition, discipline, and the long climb to mastery.",
  compact = false,
  visual = "capricorn",
}: AtlasHeroProps) {
  const external = action?.href.startsWith("http");

  return (
    <section className={`${styles.hero}${compact ? ` ${styles.heroCompact}` : ""}`} data-visual={visual}>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}><Sparkles aria-hidden="true" />{eyebrow}</p>
        <h1 className={styles.heroTitle}>{title}</h1>
        <div className={styles.heroDescription}>{description}</div>
        {action ? (
          <Link
            className={styles.heroAction}
            href={action.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            {action.label}<ArrowRight aria-hidden="true" />
          </Link>
        ) : null}
      </div>

      <div className={styles.orbitalStage} data-visual={visual} aria-hidden="true">
        <div className={styles.heroOrbit} />
        <div className={styles.heroOrbitFine} />
        <span className={styles.smallMoon} />
        <div className={styles.heroLens} data-visual={visual}>
          <AtlasHeroVisual variant={visual} />
        </div>
      </div>

      {stats?.length ? <AtlasStatRail stats={stats} /> : null}
    </section>
  );
}

export function AtlasStatRail({ stats }: { stats: readonly AtlasStat[] }) {
  return (
    <div
      className={styles.statsRail}
      aria-label="Page statistics"
      style={{ "--stat-count": Math.min(stats.length, 4) } as CSSProperties}
    >
      {stats.map((stat, index) => (
        <div className={styles.stat} key={`${stat.label}-${index}`}>
          {stat.icon ? <span className={styles.statIcon}>{stat.icon}</span> : <i className={styles.statStar} aria-hidden="true" />}
          <span className={styles.statCopy}>
            <small>{stat.label}</small>
            <strong>{stat.value}</strong>
            {stat.detail ? <em>{stat.detail}</em> : null}
          </span>
        </div>
      ))}
    </div>
  );
}

export function AtlasSectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  action?: ReactNode;
}) {
  return (
    <header className={styles.sectionHeading}>
      <div>{eyebrow ? <span className={styles.sectionEyebrow}>{eyebrow}</span> : null}<h2>{title}</h2></div>
      {action ? <div className={styles.sectionAction}>{action}</div> : null}
    </header>
  );
}

export function AtlasSurface({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return <section className={`${styles.surface}${className ? ` ${className}` : ""}`} style={style}>{children}</section>;
}

type AtlasRowProps = {
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  href?: string;
  icon?: ReactNode;
  trailing?: ReactNode;
  className?: string;
};

export function AtlasRow({ title, description, meta, href, icon, trailing, className }: AtlasRowProps) {
  const content = (
    <>
      <span className={styles.rowStar} aria-hidden="true" />
      {icon ? <span className={styles.rowIcon}>{icon}</span> : null}
      <span className={styles.rowCopy}>
        <strong>{title}</strong>
        {description ? <small>{description}</small> : null}
      </span>
      {meta ? <span className={styles.rowMeta}>{meta}</span> : null}
      {trailing ? <span className={styles.rowTrailing}>{trailing}</span> : null}
      {href ? <ArrowRight className={styles.rowArrow} aria-hidden="true" /> : null}
    </>
  );
  const rowClass = `${styles.row}${className ? ` ${className}` : ""}`;

  return href ? (
    <Link href={href} className={rowClass} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
      {content}
    </Link>
  ) : <div className={rowClass}>{content}</div>;
}

export function AtlasDetails({
  label,
  children,
  count,
}: {
  label: string;
  children: ReactNode;
  count?: number;
}) {
  return (
    <details className={styles.details}>
      <summary>{label}{typeof count === "number" ? ` (${count})` : ""}<span aria-hidden="true" /></summary>
      <div className={styles.detailsContent}>{children}</div>
    </details>
  );
}
