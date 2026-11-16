import ArchiveNav from "@/components/rainfall/ArchiveNav";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, FileText } from "lucide-react";
import styles from "../rainfall/Archive.module.css";

export const atlasStyles = styles;

export type AtlasStat = {
  label: string;
  value: ReactNode;
  detail?: string;
  icon?: ReactNode;
};

type AtlasPageProps = {
  children: ReactNode;
  className?: string;
};

export function AtlasPage({ children, className }: AtlasPageProps) {
  return (
    <div className={`${styles.page}${className ? ` ${className}` : ""}`}>
      <div className={`rf-archive-shell ${styles.shell}`}>
        <nav className="rf-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/#achievements">Achievements</Link></nav>
        <div className="rf-archive-layout"><ArchiveNav mode="desktop"/><div className="rf-archive-content"><ArchiveNav mode="mobile"/>{children}</div></div>
        <div className={styles.archiveBottom}><Link href="/#achievements">← Back to platforms</Link><Link href="/certificates">Certificates &amp; training ↗</Link></div>
      </div>
    </div>
  );
}

type AtlasHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  action?: { label: string; href: string };
  stats?: readonly AtlasStat[];
};

export function AtlasHero({
  eyebrow,
  title,
  description,
  action,
  stats,
}: AtlasHeroProps) {
  const external = action?.href.startsWith("http");

  return (
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.heroTitle}>{title}</h1>
        <div className={styles.heroDescription}>{description}</div>
        {action ? (
          <Link
            className={styles.heroAction}
            href={action.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            {action.label}<ArrowUpRight aria-hidden="true" />
          </Link>
        ) : null}
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
          {stat.icon ? <span className={styles.statIcon}>{stat.icon}</span> : null}
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
      <span className={styles.rowIcon}>{icon ?? <FileText aria-hidden="true" />}</span>
      <span className={styles.rowCopy}>
        <strong>{title}</strong>
        {description ? <small>{description}</small> : null}
      </span>
      {meta ? <span className={styles.rowMeta}>{meta}</span> : null}
      {trailing ? <span className={styles.rowTrailing}>{trailing}</span> : null}
      {href ? <ArrowUpRight className={styles.rowArrow} aria-hidden="true" /> : null}
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
      <summary>{label}{typeof count === "number" ? ` (${count})` : ""}<ChevronDown aria-hidden="true" /></summary>
      <div className={styles.detailsContent}>{children}</div>
    </details>
  );
}
