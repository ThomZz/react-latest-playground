import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.container}>
      <h1>About</h1>
      <p>
        A web app that display NHL teams, game logs, players and stats. The main goal of the app is to test and play
        around with React, its new features and libraries. It is built with React, TypeScript, React Router, and
        TanStack Query for server state management / caching.
      </p>
    </section>
  );
}
