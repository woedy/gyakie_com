import desktopImage from '../../images/cover/midnight_cover.jpg';
import mobileImage from '../../images/cover/midnight_cover_mobile.jpg';

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Mobile Image */}
      <img
        src={mobileImage}
        alt="Artist wearing merch - mobile"
        className="w-full h-screen object-cover object-center opacity-80 md:hidden"
      />

      {/* Desktop Image */}
      <img
        src={desktopImage}
        alt="Artist wearing merch - desktop"
        className="w-full h-screen object-cover object-center opacity-80 hidden md:block"
      />
    </section>
  );
};

export default HeroSection;
