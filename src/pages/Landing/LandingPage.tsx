import { useState } from 'react';

import moon from '../../images/cover/moon.png';
import pose from '../../images/cover/pose.jpg';
import TourSection from './TourSection';
import ArtistVideosSection from './VideosSection';
import ArtistGallerySection from './GallerySection';
import Footer from './FooterSection';
import Header from './HeaderSection';
import VinylSolarSystemSection from './VynalSolar';
import HeroSection from './HeroPage';
import ShopSection from './Shop';

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const tourDates = [
    {
      city: 'London',
      venue: 'All Points East',
      date: 'April 20, 2025',
      status: 'Sold Out',
    },
    {
      city: 'Paris',
      venue: 'Accor Arena',
      date: 'April 25, 2025',
      status: 'Tickets Available',
    },
    {
      city: 'Berlin',
      venue: 'Mercedes-Benz Arena',
      date: 'April 30, 2025',
      status: 'Few Left',
    },
  ];

  // Audio
  // useEffect(() => {
  //   const audio = new Audio('/path/to/ambient-sound.mp3');
  //   audio.loop = true;
  //   audio.volume = 0.3;

  //   const playAudio = () => {
  //     if (confirm('Play ambient background sound?')) {
  //       audio.play();
  //     }
  //   };

  //   window.addEventListener('scroll', playAudio, { once: true });
  //   return () => {
  //     audio.pause();
  //     window.removeEventListener('scroll', playAudio);
  //   };
  // }, []);

  return (
    <>
      <Header />

      <HeroSection />

      <TourSection tourDates={tourDates} moon={moon} />

      <VinylSolarSystemSection />

      <ArtistVideosSection />

      <ArtistGallerySection />

      <ShopSection />

      <Footer />
    </>
  );
};

export default LandingPage;
