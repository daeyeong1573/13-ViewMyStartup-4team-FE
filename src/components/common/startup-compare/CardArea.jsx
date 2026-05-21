import styles from "./CardArea.module.css";

export default function CardArea({ children, header, label, actionButton }) {
  return (
    <>
      <div className={styles.cardHeader}>
        <h2 className={styles.headerText}>{header}</h2>
        {actionButton}
      </div>
      <section className={styles.cardArea} aria-label={label}>
        {children}
      </section>
    </>
  );
}
