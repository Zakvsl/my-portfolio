import { motion } from "framer-motion";
import { skills } from "../data/skills";
import { useLanguage } from "../context/LanguageContext";

export const Skills = () => {
  const { t } = useLanguage();
  const categories = {
    frontend: skills.filter((s) => s.category === "frontend"),
    backend: skills.filter((s) => s.category === "backend"),
    tools: skills.filter((s) => s.category === "tools"),
    design: skills.filter((s) => s.category === "design"),
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark dark:text-white mb-4 font-display">
            {t.skills.title}{" "}
            <span className="text-secondary">{t.skills.titleHighlight}</span>
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {Object.entries(categories).map(([category, categorySkills]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-primary-dark dark:text-white capitalize font-display">
                {category}
              </h3>

              <div className="grid grid-cols-3 gap-6">
                {categorySkills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="flex flex-col items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-primary hover:bg-secondary/10 dark:hover:bg-secondary/10 transition-all duration-300 group cursor-pointer"
                    >
                      <Icon className="text-4xl text-secondary group-hover:text-secondary-light transition-colors" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                        {skill.name}
                      </span>

                      {/* Skill Level Bar */}
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            delay: index * 0.1 + 0.3,
                            duration: 0.8,
                          }}
                          className="h-full bg-gradient-to-r from-secondary to-accent-orange"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
