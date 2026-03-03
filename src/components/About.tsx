import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";

export const About = () => {
  const { t } = useLanguage();
  const skills = [
    "Web Development",
    "Basic Ethical Hacking",
    "Problem Solving",
    "Machine Learning",
    "Teamwork",
    "Management Project",
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark dark:text-white mb-4 font-display">
            {t.about.title}{" "}
            <span className="text-secondary">{t.about.titleHighlight}</span>
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-secondary to-accent-orange rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-300" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-secondary shadow-2xl">
                <img
                  src="/image.png"
                  alt="M Dimas Nurzaky"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-primary-dark dark:text-white font-display">
              Hi, I'm Dimas Nurzaky
            </h3>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I'm a passionate web developer focused on building modern,
              interactive, and responsive web applications. I have experience
              working with Laravel (PHP) and React, and a growing interest in
              Machine Learning.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              With a strong foundation in both frontend and backend
              technologies, I love bringing creative ideas to life through code.
              I'm always eager to learn new technologies and take on challenging
              projects.
            </p>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-3 pt-4">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 bg-secondary/20 text-secondary dark:bg-secondary/10 dark:text-secondary-light rounded-full text-sm font-medium"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* CTA Button */}
            <motion.a
              href="/cv.pdf"
              download="cv.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary-dark text-primary-dark font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-secondary/50 mt-6"
            >
              <FiDownload size={20} />
              {t.about.downloadCv}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
