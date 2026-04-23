"use client";

import dynamic from "next/dynamic";

const CyberBackground = dynamic(
  () => import("@/components/CyberBackground"),
  { ssr: false }
);

export default function CyberBackgroundWrapper() {
  return <CyberBackground />;
}
