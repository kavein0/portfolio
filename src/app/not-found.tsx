import Link from "next/link";
import styles from "./Status.module.css";

export default function NotFound() {
  return (
    <div className={styles.state}>
      <div className={styles.errorLens}>
        <p className={styles.errorEyebrow}>Uncharted coordinate · ♑</p>
        <h1>This star is not in the atlas</h1>
        <p className={styles.errorMessage}>
          The requested page does not exist, but the verified archive is still within reach.
        </p>
        <div className={styles.stateActions}>
          <Link href="/" className={styles.retry}>Return home</Link>
          <Link href="/stats" className={styles.retry}>Open the archive</Link>
        </div>
      </div>
    </div>
  );
}
