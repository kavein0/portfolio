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
        <p className={styles.errorEyebrow}>Unable to load this page</p>
        <h1>Let’s try that again.</h1>
        <p className={styles.errorMessage}>
          The page could not be loaded. Please try again in a moment.
        </p>
        <button onClick={reset} className={styles.retry}>Try again</button>
      </div>
    </div>
  );
}
