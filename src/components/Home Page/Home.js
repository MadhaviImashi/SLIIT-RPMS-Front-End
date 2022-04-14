import React from 'react';
import About from './About/About';
import HomeCarousel from './Carousel/Carousel';
import Notice from './Notice/Notice';
import Footer from '../../shared/Footer/Footer';

const Home = () => {
  return (
    <div>
      <HomeCarousel />
      <About />
      <Notice />
      <Footer />
    </div>
  );
};

export default Home;
