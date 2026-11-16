"use client";

import { useState } from "react";
import { CheckCircle2, Circle, FileText, Search } from "lucide-react";
import EvidencePanel from "@/components/EvidencePanel";
import type { CompletedTraining } from "@/lib/completed-training";

export type TrainingRecord = Omit<CompletedTraining, "status" | "provider"> & {
  status: "Completed" | "Pending";
  provider: string;
};

export default function TrainingRecords({ records }: { records: TrainingRecord[] }) {
  const [query, setQuery] = useState("");
  const [evidence, setEvidence] = useState("all");
  const visible = records.filter((record) => record.name.toLowerCase().includes(query.trim().toLowerCase()) && (
    evidence === "all" || (evidence === "attached" ? Boolean(record.evidence) : !record.evidence)
  ));

  return <>
    <div className="rf-training-tools">
      <label><span>Find a course</span><span className="rf-training-search"><Search aria-hidden="true" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search courses…" /></span></label>
      <label>Evidence<select value={evidence} onChange={(event) => setEvidence(event.target.value)}><option value="all">All records</option><option value="attached">With documents</option><option value="pending">Without documents</option></select></label>
    </div>
    <p className="rf-training-count" aria-live="polite">{visible.length} of {records.length} records</p>
    <div className="rf-training-records">
      {visible.map((record) => <article key={record.name} className="rf-training-record" id={record.evidence ? `certificate-${record.evidence.id}` : undefined}>
        <header><FileText aria-hidden="true" /><div><h2>{record.name}</h2><p>{record.provider} · {record.kind}</p></div><span className="rf-training-status">{record.status === "Completed" ? <CheckCircle2 aria-hidden="true" /> : <Circle aria-hidden="true" />}{record.status}</span></header>
        {record.evidence ? <>
          {record.evidence.issuedOn || record.evidence.number || record.evidence.durationHours ? <dl className="rf-training-document-meta">{record.evidence.issuedOn ? <div><dt>Issued</dt><dd><time dateTime={record.evidence.issuedOn}>{record.evidence.issuedOn}</time></dd></div> : null}{record.evidence.number ? <div><dt>Certificate number</dt><dd>{record.evidence.number}</dd></div> : null}{record.evidence.durationHours ? <div><dt>Duration</dt><dd>{record.evidence.durationHours} {record.evidence.durationHours === 1 ? "hour" : "hours"}</dd></div> : null}</dl> : null}
          {record.evidence.sourceNote ? <p className="rf-training-source-note">{record.evidence.sourceNote}</p> : null}
          <EvidencePanel title={`${record.name} — certificate`} description="View the supplied document or download the original PNG." image={record.evidence.imageUrl} alt={`${record.provider} certificate for ${record.name}${record.evidence.number ? `, number ${record.evidence.number}` : ""}`} width={record.evidence.width} height={record.evidence.height} downloadUrl={record.evidence.originalUrl} />
        </> : <p className="rf-training-pending">{record.status === "Completed" ? "Completed · Evidence pending" : "Not completed yet"}</p>}
      </article>)}
      {!visible.length ? <div className="rf-training-empty"><p>No courses match these filters.</p><button onClick={() => { setQuery(""); setEvidence("all"); }}>Clear filters</button></div> : null}
    </div>
  </>;
}
