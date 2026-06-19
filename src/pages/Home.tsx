import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <section>
      <h1>Home</h1>
      <p>
        A minimal React + TypeScript + React Router starter, built with Vite.
      </p>
      <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
      <p className="hint">
        Edit <code>src/pages/Home.tsx</code> and save to start playing.
      </p>
    </section>
  )
}
