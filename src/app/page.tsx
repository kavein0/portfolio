import Explorer from "@/components/rainfall/Explorer";
import {portfolioOverview} from "@/lib/portfolio-overview";
import Link from "next/link";
import HomeSections, {RecordIcon} from "@/components/rainfall/HomeSections";

export const revalidate = 900;
export default async function Home() {
  const {platforms,recent}=await portfolioOverview();
  return (
    <div className="rf-home">
      <section className="rf-hero" id="achievements"><div className="rf-shell">
        <div className="rf-intro"><h1>Yevhenii<br/>Voronianskyi</h1><div><h2>Cybersecurity Student &amp; Researcher</h2><p>Digital forensics, security practice and automation.</p><Link href="#about">About me ↗</Link></div></div>
        <Explorer platforms={platforms}/>
        <nav className="rf-training-links rf-home-training" aria-label="More achievements"><Link href="/certificates">Certificates &amp; training ↗</Link><Link href="/learning-matrix">Learning Matrix ↗</Link></nav>
      </div></section>
      {recent.length>0&&<section className="rf-recent"><div className="rf-shell"><header><h2>Recent achievements</h2><Link href="/stats">View all ↗</Link></header>{recent.map(x=><Link className="rf-event" href={x.href} key={x.id}><RecordIcon/><span><strong>{x.title}</strong><small>{x.platform}</small></span><span className="rf-event-kind">{x.kind}</span><time>{x.date.slice(0,10)}</time><span>↗</span></Link>)}</div></section>}
      <HomeSections />
    </div>
  );
}
