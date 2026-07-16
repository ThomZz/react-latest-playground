import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.container}>
      <h1>About</h1>
      <p>
        A simple React playground to test out React with its new features and
        libraries. It is built with React, TypeScript, React Router, and
        TanStack Query for server state management / caching.
      </p>
    </section>
  );
}
