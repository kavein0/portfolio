import type { Metadata } from "next";
import CryptoHackClient from "./CryptoHackClient";

export const metadata: Metadata = {
  title: "CryptoHack | Євгеній Воронянський",
  description:
    "CryptoHack profile progress, completed cryptography courses, level, and experience evidence.",
};

export default function CryptoHackPage() {
  return <CryptoHackClient />;
}
