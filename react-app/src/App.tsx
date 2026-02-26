import './App.css'

function App(): React.JSX.Element {
  return (
    <section className="home-page">
      <h1>Sillon</h1>
      <p>
        Bienvenue dans l&apos;underground du vinyle. Explore les albums,
        découvre les artistes et prépare les pages clients/ventes des prochaines
        phases.
      </p>
      <div className="home-links">
        <a className="home-link" href="/vinyls">
          Voir les vinyles
        </a>
        <a className="home-link" href="/artists">
          Voir les artistes
        </a>
        <a className="home-link" href="/clients">
          Voir les clients
        </a>
      </div>
    </section>
  )
}

export default App
