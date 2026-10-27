import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/rules')({
  head: () => ({ meta: [{ title: 'Rules | South Park Debating' }] }),
  component: Rules,
})

function Rules() {
  return <main id="main" className="list-page">
    <h1>Rules</h1>
    <div className="rules-sections">
      <section className="rules-section" aria-labelledby="definitions">
        <h2 id="definitions">Definitions</h2>
        <ul>
          <li>The first proposition speaker defines the motion by setting out a policy model, not dictionary definitions.</li>
          <li>The definition must fit the spirit of the motion, must change the status quo, and can’t be tautological or truistic.</li>
          <li>Opposition must accept any reasonable definition, even an unexpected or narrow one, and is heavily penalized for redefining it.</li>
          <li>A definition may be challenged only if (1) none was given, (2) it can’t be opposed, or (3) it strays significantly from the motion. The challenge must be explained and a fair replacement given.</li>
          <li>Only the first opposition speaker may challenge. Later speakers may not add to the definition beyond small practical patches.</li>
        </ul>
      </section>
      <section className="rules-section" aria-labelledby="opposition">
        <h2 id="opposition">Opposition</h2>
        <ul>
          <li>A counter-proposal is never required. If given, it must be substantially different from the proposition’s case.</li>
          <li>The opposition case must not be inconsistent.</li>
        </ul>
      </section>
      <section className="rules-section" aria-labelledby="speakers">
        <h2 id="speakers">Speakers</h2>
        <ul>
          <li>Third speakers must add a new extension and must not contradict their own side.</li>
          <li>Fourth speakers summarize and must not introduce new arguments.</li>
        </ul>
      </section>
      <section className="rules-section" aria-labelledby="points-of-information">
        <h2 id="points-of-information">Points of information</h2>
        <ul>
          <li>Not allowed in the first or last minute of a speech.</li>
          <li>About 15 seconds each. The speaker may accept or decline and should take one or two.</li>
          <li>Badgering, and offering points by phrases other than “point of information,” are penalized.</li>
        </ul>
      </section>
    </div>
  </main>
}
