import "./Home.css";

function HomePage() {
  return (
    <main className="Home">
      <div className="ticker">
        <p>minimalistic time management</p>
        <p>made simple.</p>
      </div>
      <div className="intro">
        <h3>resist.</h3>
        <p>fight back against the allure of false productivity.</p>
      </div>
      {/* <article className="daily-quote">
        <div className="daily-quote-heading">
          <h3>your daily inspiration</h3>
        </div>
        <figure>
          <q>
            In the midst of winter, I found there was, within me, an invincible
            summer. And that makes me happy. For it says that no matter how hard
            the world pushes against me, within me, there&apos;s something
            stronger &mdash; something better, pushing right back.
          </q>
          <figcaption>&mdash; Albert Camus</figcaption>
        </figure>
      </article> */}
    </main>
  );
}

export default HomePage;
