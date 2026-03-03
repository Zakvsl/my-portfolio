import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX, FiSun, FiMoon, FiGlobe } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/useTheme";
import { useLanguage } from "../context/LanguageContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { lang, t, toggleLanguage } = useLanguage();
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sectionItems = [
    { name: t.nav.about, href: "#about" },
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.achievements, href: "#achievements" },
    { name: t.nav.contact, href: "#contact" },
  ];

  const pageItems = [
    { name: t.nav.dashboard, to: "/dashboard" },
    { name: t.nav.chatroom, to: "/chatroom" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-primary-dark/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/"
              className="text-2xl font-bold text-primary-dark dark:text-white font-display"
            >
              <span className="text-secondary">Z</span>aky
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {isHome &&
              sectionItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-800 dark:text-gray-200 hover:text-secondary dark:hover:text-secondary font-medium transition-colors uppercase text-sm tracking-wider"
                >
                  {item.name}
                </motion.a>
              ))}

            {pageItems.map((item) => (
              <motion.div key={item.name} whileHover={{ scale: 1.1 }}>
                <Link
                  to={item.to}
                  className={`font-medium transition-colors uppercase text-sm tracking-wider ${
                    location.pathname === item.to
                      ? "text-secondary"
                      : "text-gray-800 dark:text-gray-200 hover:text-secondary dark:hover:text-secondary"
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-secondary/20 hover:bg-secondary/30 text-secondary transition-colors text-sm font-semibold"
              title={
                lang === "en"
                  ? "Switch to Bahasa Indonesia"
                  : "Switch to English"
              }
            >
              <FiGlobe size={16} />
              {lang === "en" ? "EN" : "ID"}
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-secondary/20 hover:bg-secondary/30 text-secondary transition-colors"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-semibold"
            >
              <FiGlobe size={14} />
              {lang === "en" ? "EN" : "ID"}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-secondary/20 text-secondary"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary-dark dark:text-white"
            >
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        className="md:hidden overflow-hidden bg-white dark:bg-primary-dark shadow-lg"
      >
        <div className="px-4 py-6 space-y-4">
          {isHome &&
            sectionItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="block text-gray-800 dark:text-gray-200 hover:text-secondary dark:hover:text-secondary font-medium transition-colors uppercase text-sm tracking-wider"
              >
                {item.name}
              </a>
            ))}

          {pageItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={`block font-medium transition-colors uppercase text-sm tracking-wider ${
                location.pathname === item.to
                  ? "text-secondary"
                  : "text-gray-800 dark:text-gray-200 hover:text-secondary dark:hover:text-secondary"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};
