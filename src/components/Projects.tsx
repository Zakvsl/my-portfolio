import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { projects as staticProjects } from "../data/projects";
import type { Project } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";
import { db, isFirebaseConfigured } from "../lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const Projects = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>(staticProjects);

  useEffect(() => {
    if (!isFirebaseConfigured || !db) return;
    const fetchProjects = async () => {
      try {
        const q = query(collection(db!, "projects"), orderBy("id", "asc"));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const data = snapshot.docs.map((doc) => ({
            id: doc.data().id,
            title: doc.data().title,
            description: doc.data().description,
            image: doc.data().image,
            techStack: doc.data().techStack,
            liveUrl: doc.data().liveUrl,
            githubUrl: doc.data().githubUrl,
          })) as Project[];
          setProjects(data);
        }
      } catch {
        // Use static data if Firebase fails
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark dark:text-white mb-4 font-display">
            {t.projects.title}{" "}
            <span className="text-secondary">{t.projects.titleHighlight}</span>
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white dark:bg-primary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-primary-dark dark:text-white font-display">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-secondary/20 dark:bg-secondary/10 text-secondary text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary-dark text-primary-dark font-medium rounded-lg transition-colors text-sm"
                    >
                      <FiExternalLink size={16} />
                      {t.projects.viewLive}
                    </motion.a>
                  )}

                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary-dark font-medium rounded-lg transition-all text-sm"
                    >
                      <FiGithub size={16} />
                      {t.projects.viewCode}
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
