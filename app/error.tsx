"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container">
      <div className="card empty">
        <h1>Cette page n’a pas pu être chargée.</h1>
        <p>Vos données enregistrées restent dans ce navigateur.</p>
        <button onClick={reset}>Réessayer</button>
      </div>
    </div>
  );
}
