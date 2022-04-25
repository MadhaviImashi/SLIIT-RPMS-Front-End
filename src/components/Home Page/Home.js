import React from 'react';
import About from './About/About';
import Question from './Question/Question';
import Nav from '../Header/Header';
import Hero from '../Home Page/Hero/Hero';
import Footer from '../../shared/Footer/Footer';

const Home = () => {
  const [load, setload] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setload(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="App" id={load ? 'no-scroll' : 'scroll'}>
        <Nav />
        <section id="#home">
          <Hero />
        </section>
        <section id="#about">
          <About />
        </section>
        <section id="#qa">
          <Question />
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
