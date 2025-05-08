import mobileImage from '../../images/cover/shop2.jpg'; // <640px
import tabletImage from '../../images/cover/pose.jpg'; // 640px+
import desktopImage from '../../images/cover/pose.jpg'; // 768px+
import largeDesktopImage from '../../images/cover/pose.jpg'; // 1024px+
import Hotspot from './Components/Hotspot';

const ShopSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Mobile Image */}
      <img
        src={mobileImage}
        alt="Mobile merch image"
        className="w-full h-screen object-cover object-top opacity-80 block sm:hidden"
      />

      {/* Tablet Image */}
      <img
        src={tabletImage}
        alt="Tablet merch image"
        className="w-full h-screen object-cover object-top opacity-80 hidden sm:block md:hidden"
      />

      {/* Desktop Image */}
      <img
        src={desktopImage}
        alt="Desktop merch image"
        className="w-full h-screen object-cover object-top opacity-80 hidden md:block lg:hidden"
      />

      {/* Large Desktop Image */}
      <img
        src={largeDesktopImage}
        alt="Large desktop merch image"
        className="w-full h-screen object-cover object-top opacity-80 hidden lg:block"
      />

      {/* Overlay Items */}
      <div className="absolute inset-0 w-full h-full">
        <Hotspot
          title="Bluebird Jeans"
          price="$89.00"
          positions={{
            base: { left: 'left-[10%]', top: 'top-[30%]' },
            sm: { left: 'sm:left-[14%]', top: 'sm:top-[35%]' },
            md: { left: 'md:left-[10%]', top: 'md:top-[30%]' },
            lg: { left: 'lg:left-[8%]', top: 'lg:top-[28%]' },
            xl: { left: 'xl:left-[10%]', top: 'xl:top-[37%]' },
          }}
        />
        <Hotspot
          title="Bluebird Necklace"
          price="$89.00"
          positions={{
            base: { left: 'left-[55%]', top: 'top-[20%]' },
            sm: { left: 'sm:left-[14%]', top: 'sm:top-[35%]' },
            md: { left: 'md:left-[10%]', top: 'md:top-[30%]' },
            lg: { left: 'lg:left-[8%]', top: 'lg:top-[28%]' },
            xl: { left: 'xl:left-[84%]', top: 'xl:top-[85%]' },
          }}
        />
        <Hotspot
          title="Bluebird Top"
          price="$89.00"
          positions={{
            base: { left: 'left-[75%]', top: 'top-[70%]' },
            sm: { left: 'sm:left-[14%]', top: 'sm:top-[35%]' },
            md: { left: 'md:left-[10%]', top: 'md:top-[30%]' },
            lg: { left: 'lg:left-[8%]', top: 'lg:top-[28%]' },
            xl: { left: 'xl:left-[62%]', top: 'xl:top-[30%]' },
          }}
        />
        <Hotspot
          title="Bluebird Hair"
          price="$89.00"
          positions={{
            base: { left: 'left-[35%]', top: 'top-[85%]' },
            sm: { left: 'sm:left-[14%]', top: 'sm:top-[35%]' },
            md: { left: 'md:left-[10%]', top: 'md:top-[30%]' },
            lg: { left: 'lg:left-[8%]', top: 'lg:top-[28%]' },
            xl: { left: 'xl:left-[35%]', top: 'xl:top-[65%]' },
          }}
        />
      </div>
    </section>
  );
};

export default ShopSection;
