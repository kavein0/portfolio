import type { Metadata } from "next";
import PicoCTFClient from "./PicoCTFClient";

export const metadata: Metadata = {
  title: "PicoCTF | Євгеній Воронянський",
  description:
    "Completed PicoCTF cryptography challenges and learning progress.",
};

export default function PicoCTFPage() {
  return <PicoCTFClient />;
}
