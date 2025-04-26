import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import leaves from '../../images/cover/leaves.png';
import moon from '../../images/cover/moon.png';
import bird from '../../images/cover/bird.png';
import children from '../../images/cover/children.png';
import mountains from '../../images/cover/mountain.png';
import pose from '../../images/cover/pose.jpg';
import VinylCarousel3D from './Vynal';
import TourSection from './TourSection';
import ParallaxScene from './Night';
import ArtistVideosSection from './VideosSection';
import ArtistGallerySection from './GallerySection';
import Footer from './FooterSection';
import Header from './HeaserSection';
import SolarSystemFramer from './SolarSystemFramer';



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


<ParallaxScene />

      <TourSection tourDates={tourDates} moon={moon} />

      <VinylCarousel3D />

      <SolarSystemFramer />

      <ArtistVideosSection />

      <ArtistGallerySection />

      <section className="relative w-full min-h-screen bg-black text-white overflow-hidden">
  {/* Background Image of Artist */}
  <img
  src={pose}
  alt="Artist wearing merch"
  className="w-full h-[100vh] md:h-screen object-cover object-center opacity-80"
/>


  {/* Overlay Items */}
  <div className="absolute inset-0 w-full h-full">
    
    {/* Hoodie Hotspot */}
    <div className="absolute left-[40%] top-[30%] group">
      <div className="w-4 h-4 bg-blue-500 rounded-full cursor-pointer shadow-lg group-hover:scale-110 transition"></div>
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-blue-900 bg-opacity-90 p-4 rounded-lg shadow-lg text-sm w-48">
          <h3 className="font-bold text-white">Bluebird Hoodie</h3>
          <p className="text-blue-300">$89.00</p>
        </div>
      </div>
    </div>

    {/* Hat Hotspot */}
    <div className="absolute left-[50%] top-[20%] group">
      <div className="w-4 h-4 bg-blue-500 rounded-full cursor-pointer shadow-lg group-hover:scale-110 transition"></div>
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-blue-900 bg-opacity-90 p-4 rounded-lg shadow-lg text-sm w-48">
          <h3 className="font-bold text-white">Tour Cap</h3>
          <p className="text-blue-300">$39.00</p>
        </div>
      </div>
    </div>

    {/* Pants Hotspot */}
    <div className="absolute left-[42%] top-[60%] group">
      <div className="w-4 h-4 bg-blue-500 rounded-full cursor-pointer shadow-lg group-hover:scale-110 transition"></div>
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-blue-900 bg-opacity-90 p-4 rounded-lg shadow-lg text-sm w-48">
          <h3 className="font-bold text-white">Performance Joggers</h3>
          <p className="text-blue-300">$69.00</p>
        </div>
      </div>
    </div>

  </div>
</section>


      <Footer />
    </>
  );
};

export default LandingPage;
