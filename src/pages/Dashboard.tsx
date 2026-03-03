import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiGithub,
  FiStar,
  FiUsers,
  FiBookOpen,
  FiArrowLeft,
  FiCode,
  FiActivity,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { Navbar } from "../components/Navbar";

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  name: string;
  bio: string;
  html_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  updated_at: string;
}

const GITHUB_USERNAME = "Zakvsl";

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  PHP: "#4F5D95",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  "C++": "#f34b7d",
  Kotlin: "#A97BFF",
};

export const Dashboard = () => {
  const { t } = useLanguage();
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [languages, setLanguages] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
          ),
        ]);
        const userData = await userRes.json();
        const reposData: GitHubRepo[] = await reposRes.json();

        setUser(userData);
        setRepos(reposData.slice(0, 6));
        setTotalStars(
          reposData.reduce((acc, r) => acc + r.stargazers_count, 0),
        );

        const langCount: Record<string, number> = {};
        reposData.forEach((r) => {
          if (r.language) {
            langCount[r.language] = (langCount[r.language] || 0) + 1;
          }
        });
        setLanguages(langCount);
      } catch (err) {
        console.error("Failed to fetch GitHub data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGitHub();
  }, []);

  const totalLangRepos = Object.values(languages).reduce((a, b) => a + b, 0);

  const statCards = user
    ? [
        {
          icon: FiBookOpen,
          label: t.dashboard.totalRepos,
          value: user.public_repos,
        },
        {
          icon: FiStar,
          label: t.dashboard.totalStars,
          value: totalStars,
        },
        {
          icon: FiUsers,
          label: t.dashboard.followers,
          value: user.followers,
        },
        {
          icon: FiUsers,
          label: t.dashboard.following,
          value: user.following,
        },
      ]
    : [];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-primary-dark pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-secondary hover:text-secondary-dark mb-8 transition-colors font-medium"
          >
            <FiArrowLeft size={20} />
            Back to Home
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary-dark dark:text-white mb-4 font-display">
              {t.dashboard.title}
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
            <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.dashboard.subtitle}
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* GitHub Profile Card */}
              {user && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-primary rounded-xl p-6 shadow-lg mb-8 flex flex-col sm:flex-row items-center gap-6"
                >
                  <img
                    src={user.avatar_url}
                    alt={user.name}
                    className="w-20 h-20 rounded-full border-3 border-secondary"
                  />
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl font-bold text-primary-dark dark:text-white">
                      {user.name || GITHUB_USERNAME}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {user.bio || "Developer"}
                    </p>
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-secondary hover:text-secondary-dark text-sm font-medium transition-colors"
                    >
                      <FiGithub size={16} />@{GITHUB_USERNAME}
                    </a>
                  </div>
                </motion.div>
              )}

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {statCards.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-white dark:bg-primary rounded-xl p-5 shadow-lg text-center"
                  >
                    <stat.icon className="text-secondary text-2xl mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary-dark dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* GitHub Contributions Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-primary rounded-xl p-6 shadow-lg mb-8"
              >
                <h3 className="text-xl font-bold text-primary-dark dark:text-white mb-4 flex items-center gap-2">
                  <FiActivity className="text-secondary" />
                  {t.dashboard.githubTitle}
                </h3>
                <div className="overflow-x-auto">
                  <img
                    src={`https://ghchart.rshah.org/5dd3d3/${GITHUB_USERNAME}`}
                    alt="GitHub Contributions"
                    className="w-full max-w-3xl mx-auto"
                  />
                </div>
              </motion.div>

              {/* Language Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-primary rounded-xl p-6 shadow-lg mb-8"
              >
                <h3 className="text-xl font-bold text-primary-dark dark:text-white mb-4 flex items-center gap-2">
                  <FiCode className="text-secondary" />
                  {t.dashboard.statsTitle}
                </h3>
                <div className="space-y-3">
                  {Object.entries(languages)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 8)
                    .map(([lang, count]) => {
                      const pct = Math.round((count / totalLangRepos) * 100);
                      return (
                        <div key={lang} className="flex items-center gap-3">
                          <span className="w-24 text-sm text-gray-700 dark:text-gray-300 font-medium">
                            {lang}
                          </span>
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="h-full rounded-full"
                              style={{
                                backgroundColor:
                                  languageColors[lang] || "#5dd3d3",
                              }}
                            />
                          </div>
                          <span className="w-12 text-sm text-gray-500 dark:text-gray-400 text-right">
                            {pct}%
                          </span>
                        </div>
                      );
                    })}
                </div>
              </motion.div>

              {/* Recent Repos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white dark:bg-primary rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-primary-dark dark:text-white mb-4 flex items-center gap-2">
                  <FiBookOpen className="text-secondary" />
                  Recent Repositories
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {repos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-gray-50 dark:bg-primary-dark rounded-lg hover:bg-secondary/10 dark:hover:bg-secondary/10 transition-all border border-gray-100 dark:border-gray-800"
                    >
                      <h4 className="font-semibold text-primary-dark dark:text-white text-sm">
                        {repo.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {repo.description || "No description"}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {repo.language && (
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block"
                              style={{
                                backgroundColor:
                                  languageColors[repo.language] || "#999",
                              }}
                            />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <FiStar size={12} />
                          {repo.stargazers_count}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
