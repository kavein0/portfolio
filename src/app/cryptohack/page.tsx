import type { Metadata } from "next";
import CryptoHackClient from "./CryptoHackClient";
import { cryptoHackSnapshot, fetchCryptoHackStats } from "@/lib/api/cryptohack";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "CryptoHack | Євгеній Воронянський",
  description:
    "CryptoHack profile progress, completed cryptography courses, level, and experience evidence.",
};

export default async function CryptoHackPage() {
  const stats = await fetchCryptoHackStats() ?? cryptoHackSnapshot;
  return <CryptoHackClient stats={stats} />;
}
