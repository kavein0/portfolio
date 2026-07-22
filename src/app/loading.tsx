import styles from "./Status.module.css";

export default function Loading() {
  return (
    <div className={styles.state}>
      <div className={styles.loadingGroup} role="status" aria-live="polite">
        <div className={styles.loadingLens} aria-hidden="true">♑</div>
        <p className={styles.label}>Aligning the atlas</p>
      </div>
    </div>
  );
}
