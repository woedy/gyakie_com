// components/Hotspot.jsx

const Hotspot = ({
  title,
  price,
  positions = {}, // Responsive left/top values
}) => {
  const {
    base = { left: 'left-[10%]', top: 'top-[30%]' } /* Mobile */,
    sm = { left: 'sm:left-[14%]', top: 'sm:top-[35%]' } /* Tablet */,
    md = { left: 'md:left-[10%]', top: 'md:top-[30%]' } /* Desktop */,
    lg = { left: 'lg:left-[8%]', top: 'lg:top-[28%]' } /* Large */,
    xl = { left: 'xl:left-[10%]', top: 'xl:top-[37%]' } /* Extra Large */,
  } = positions;

  const className = `
      absolute 
      ${base.left} ${base.top}
      ${sm.left} ${sm.top}
      ${md.left} ${md.top}
      ${lg.left} ${lg.top}
      ${xl.left} ${xl.top}
      group cursor-pointer
    `;

  return (
    <div className={className}>
      {/* Hotspot Dot */}
      <div className="relative w-5 h-5">
        <div className="absolute inset-0 bg-blue-500 rounded-full shadow-xl group-hover:scale-110 transition-transform duration-300"></div>
        <div className="absolute inset-0 animate-ping bg-blue-400 opacity-75 rounded-full"></div>
      </div>

      {/* Tooltip */}
      <div className="absolute left-8 sm:left-10 md:left-12 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-blue-900 bg-opacity-90 p-4 rounded-lg shadow-lg text-sm w-48">
          <h3 className="font-bold text-white">{title}</h3>
          <p className="text-blue-300">{price}</p>
        </div>
      </div>
    </div>
  );
};

export default Hotspot;
