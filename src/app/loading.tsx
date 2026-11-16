import styles from "./Status.module.css";

export default function Loading() {
  return (
    <div className={styles.state}>
      <div className={styles.loadingGroup} role="status" aria-live="polite">

        <p className={styles.label}>Loading portfolio…</p>
      </div>
    </div>
  );
}
