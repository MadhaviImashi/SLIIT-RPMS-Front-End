import React from 'react';
import About from './About/About';
import HomeCarousel from './Carousel/Carousel';
import Notice from './Notice/Notice';
import Question from './Question/Question';
import Footer from '../../shared/Footer/Footer';

const Home = () => {
  return (
    <div>
      <HomeCarousel />
      <About />
      <Notice />
      <Question />
      <Footer />
    </div>
  );
};

export default Home;
