import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MenuIcon,
  XIcon,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
} from 'lucide-react'; // Changed to lucide-react

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        // arbitrary value, adjust as needed
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Mobile menu animation variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-blue-900/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Hamburger Toggle (Mobile only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex space-x-4 md:space-x-6">
            <li>
              <a
                href="#about"
                className="hover:text-blue-200 transition-colors duration-200"
              >
                Tour
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-blue-200 transition-colors duration-200"
              >
                Music
              </a>
            </li>
            <li>
              <a
                href="#impact"
                className="hover:text-blue-200 transition-colors duration-200"
              >
                Videos
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-blue-200 transition-colors duration-200"
              >
                Store
              </a>
            </li>
            <li>
              <a
                href="#more"
                className="hover:text-blue-200 transition-colors duration-200"
              >
                More
              </a>
            </li>
          </ul>
        </nav>

        {/* Logo Section */}
        <a href="/" className="flex items-center">
          <span className="font-bold text-lg md:text-xl ml-2 text-white">
            Gyakie
          </span>
        </a>

        {/* Social Links (Desktop) */}
        <nav className="hidden md:block">
          <ul className="flex space-x-4 md:space-x-6">
            <li>
              <a
                href="#" // Replace with actual Facebook link
                className="text-white hover:text-blue-200 transition-colors duration-200"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </li>
            <li>
              <a
                href="#" // Replace with actual Twitter link
                className="text-white hover:text-blue-200 transition-colors duration-200"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </li>
            <li>
              <a
                href="#" // Replace with actual Youtube link.
                className="text-white hover:text-blue-200 transition-colors duration-200"
                aria-label="Youtube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </li>
            <li>
              <a
                href="#" // Replace with actual Instagram link.
                className="text-white hover:text-blue-200 transition-colors duration-200"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-blue-900/90 backdrop-blur-md"
          >
            <ul className="flex flex-col space-y-2 px-4 pb-4">
              <li>
                <a
                  href="#about"
                  className="block py-2 text-white hover:text-blue-200 transition-colors duration-200"
                >
                  Tour
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="block py-2 text-white hover:text-blue-200 transition-colors duration-200"
                >
                  Music
                </a>
              </li>
              <li>
                <a
                  href="#impact"
                  className="block py-2 text-white hover:text-blue-200 transition-colors duration-200"
                >
                  Videos
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="block py-2 text-white hover:text-blue-200 transition-colors duration-200"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="#more"
                  className="block py-2 text-white hover:text-blue-200 transition-colors duration-200"
                >
                  More
                </a>
              </li>
              <li className="mt-2 flex space-x-4">
                <a
                  href="#" // Replace with actual Facebook link
                  className="text-white hover:text-blue-200 transition-colors duration-200"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a
                  href="#" // Replace with actual Twitter link
                  className="text-white hover:text-blue-200 transition-colors duration-200"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a
                  href="#" // Replace with actual Youtube link.
                  className="text-white hover:text-blue-200 transition-colors duration-200"
                  aria-label="Youtube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a
                  href="#" // Replace with actual Instagram link.
                  className="text-white hover:text-blue-200 transition-colors duration-200"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
