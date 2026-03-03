import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiAward, FiExternalLink, FiCalendar } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { db, isFirebaseConfigured } from "../lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { defaultAchievements } from "../data/achievements";
import type { Achievement } from "../data/achievements";

export const Achievements = () => {
  const { t } = useLanguage();
  const [achievements, setAchievements] =
    useState<Achievement[]>(defaultAchievements);

  useEffect(() => {
    if (!isFirebaseConfigured || !db) return;
    const fetchAchievements = async () => {
      try {
        const q = query(
          collection(db!, "achievements"),
          orderBy("date", "desc"),
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Achievement[];
          setAchievements(data);
        }
      } catch {
        // Use default data if Firebase is not configured
      }
    };
    fetchAchievements();
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "certification":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "award":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "achievement":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-secondary/20 text-secondary border-secondary/30";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "certification":
        return "Certification";
      case "award":
        return "Award";
      case "achievement":
        return "Achievement";
      default:
        return type;
    }
  };

  return (
    <section id="achievements" className="py-20 bg-gray-50 dark:bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark dark:text-white mb-4 font-display">
            {t.achievements.title}{" "}
            <span className="text-secondary">
              {t.achievements.titleHighlight}
            </span>
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
          <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.achievements.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {achievements.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-primary-dark rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary/20 rounded-lg shrink-0">
                  <FiAward className="text-secondary text-2xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${getTypeColor(item.type)}`}
                    >
                      {getTypeLabel(item.type)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <FiCalendar size={12} />
                      {item.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-primary-dark dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-secondary font-medium mb-2">
                    {item.issuer}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                  {item.credentialUrl && item.credentialUrl !== "#" && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 text-sm text-secondary hover:text-secondary-dark transition-colors font-medium"
                    >
                      View Credential <FiExternalLink size={14} />
                    </a>
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
