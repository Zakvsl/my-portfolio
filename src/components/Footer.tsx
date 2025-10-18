import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiMail,
  FiArrowUp,
} from "react-icons/fi";

export const Footer = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      // Show button only when scrolled down more than 300px
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }

      // Hide button while scrolling
      setIsScrolling(true);

      // Clear previous timer
      clearTimeout(scrollTimer);

      // Show button after user stops scrolling (500ms delay)
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: FiGithub, href: "https://github.com/Zakvsl", label: "GitHub" },
    {
      icon: FiLinkedin,
      href: "www.linkedin.com/in/muhamad-dimas-nurzaky-119802251",
      label: "LinkedIn",
    },
    {
      icon: FiInstagram,
      href: "https://www.instagram.com/dmsnurzaky",
      label: "Instagram",
    },
    { icon: FiMail, href: "mailto:dndimas77@gmail.com", label: "Email" },
  ];

  return (
    <footer className="bg-primary-dark text-white py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 font-display">
              <span> M Dimas Nurzaky</span>
              <span className="text-secondary">.</span>
            </h3>
            <p className="text-gray-400">
              Building digital experiences with passion and creativity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "Skills", "Projects", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-secondary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-primary hover:bg-secondary/20 rounded-lg transition-colors group"
                  aria-label={label}
                >
                  <Icon className="text-xl text-gray-400 group-hover:text-secondary transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 flex justify-center items-center">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} M Dimas Nurzaky. All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll to Top Button - Only shows when scroll stops */}
      <AnimatePresence>
        {showScrollButton && !isScrolling && (
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 p-4 bg-secondary hover:bg-secondary-dark rounded-full shadow-lg hover:shadow-secondary/50 transition-all z-40"
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: 1,
              y: [0, -10, 0], // Bounce animation
            }}
            exit={{ opacity: 0, y: 100 }}
            transition={{
              opacity: { duration: 0.3 },
              y: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            aria-label="Scroll to top"
          >
            <FiArrowUp className="text-primary-dark text-xl" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};
