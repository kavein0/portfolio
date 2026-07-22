"use client";

import { useEffect } from "react";
import styles from "./Status.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.state}>
      <div className={styles.errorLens}>
        <p className={styles.errorEyebrow}>Lost coordinate · ♑</p>
        <h1>Something drifted off course</h1>
        <p className={styles.errorMessage}>
          {error.message || "The atlas could not resolve this observation."}
        </p>
        <button onClick={reset} className={styles.retry}>Try again</button>
      </div>
    </div>
  );
}
