import Link from "next/link";
import styles from "./Status.module.css";

export default function NotFound() {
  return (
    <div className={styles.state}>
      <div className={styles.errorLens}>
        <p className={styles.errorEyebrow}>404 · Page not found</p>
        <h1>Nothing here tonight.</h1>
        <p className={styles.errorMessage}>
          This address does not lead to a page. You can return home or browse the achievement archive.
        </p>
        <div className={styles.stateActions}>
          <Link href="/" className={styles.retry}>Return home</Link>
          <Link href="/certificates" className={styles.retry}>Browse achievements</Link>
        </div>
      </div>
    </div>
  );
}
