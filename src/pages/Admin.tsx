import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSave,
  FiX,
  FiLogIn,
  FiLogOut,
  FiArrowLeft,
  FiFolder,
  FiAward,
  FiUpload,
  FiImage,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { db, auth, storage } from "../lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  writeBatch,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import type { User } from "firebase/auth";
import type { Project } from "../data/projects";
import { projects as staticProjects } from "../data/projects";
import type { Achievement } from "../data/achievements";
import { defaultAchievements } from "../data/achievements";

type Tab = "projects" | "achievements";

export const Admin = () => {
  const { t } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("projects");

  // Data states
  const [projects, setProjects] = useState<(Project & { docId?: string })[]>(
    [],
  );
  const [achievements, setAchievements] = useState<
    (Achievement & { docId?: string })[]
  >([]);

  // Edit states
  const [editingProject, setEditingProject] = useState<
    (Partial<Project> & { docId?: string }) | null
  >(null);
  const [editingAchievement, setEditingAchievement] = useState<
    (Partial<Achievement> & { docId?: string }) | null
  >(null);
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auth listener
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch data
  useEffect(() => {
    if (!user) return;
    fetchProjects();
    fetchAchievements();
  }, [user]);

  const fetchProjects = async () => {
    if (!db) return;
    try {
      const q = query(collection(db, "projects"), orderBy("id", "asc"));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        // Seed Firestore with static projects data
        await seedProjects();
        return;
      }
      const data = snapshot.docs.map((d) => ({
        docId: d.id,
        ...(d.data() as Project),
      }));
      setProjects(data);
    } catch {
      // Firebase not configured
    }
  };

  const seedProjects = async () => {
    if (!db) return;
    try {
      const batch = writeBatch(db);
      for (const project of staticProjects) {
        const ref = doc(collection(db, "projects"));
        batch.set(ref, { ...project });
      }
      await batch.commit();
      // Re-fetch after seeding
      const q = query(collection(db, "projects"), orderBy("id", "asc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((d) => ({
        docId: d.id,
        ...(d.data() as Project),
      }));
      setProjects(data);
    } catch (err) {
      console.error("Seed projects error:", err);
    }
  };

  const fetchAchievements = async () => {
    if (!db) return;
    try {
      const q = query(collection(db, "achievements"), orderBy("date", "desc"));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        // Seed Firestore with default achievements data
        await seedAchievements();
        return;
      }
      const data = snapshot.docs.map((d) => ({
        docId: d.id,
        ...(d.data() as Achievement),
      }));
      setAchievements(data);
    } catch {
      // Firebase not configured
    }
  };

  const seedAchievements = async () => {
    if (!db) return;
    try {
      const batch = writeBatch(db);
      for (const achievement of defaultAchievements) {
        const ref = doc(collection(db, "achievements"));
        batch.set(ref, { ...achievement });
      }
      await batch.commit();
      // Re-fetch after seeding
      const q = query(collection(db, "achievements"), orderBy("date", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((d) => ({
        docId: d.id,
        ...(d.data() as Achievement),
      }));
      setAchievements(data);
    } catch (err) {
      console.error("Seed achievements error:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (!auth) {
      setLoginError("Firebase not configured.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setLoginError("Invalid email or password.");
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
  };

  // Image upload handler
  const handleImageUpload = async (file: File) => {
    if (!storage) return;
    setUploading(true);
    setUploadProgress(0);
    try {
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const storageRef = ref(storage, `projects/${timestamp}_${safeName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setEditingProject((prev) =>
            prev ? { ...prev, image: downloadURL } : prev,
          );
          setUploading(false);
          setUploadProgress(0);
        },
      );
    } catch (err) {
      console.error("Upload error:", err);
      setUploading(false);
    }
  };

  // Project CRUD
  const saveProject = async () => {
    if (!editingProject || !db) return;
    try {
      if (editingProject.docId) {
        const { docId, ...data } = editingProject;
        await updateDoc(doc(db, "projects", docId), data);
      } else {
        await addDoc(collection(db, "projects"), {
          ...editingProject,
          id: Date.now(),
        });
      }
      setEditingProject(null);
      setIsAdding(false);
      fetchProjects();
    } catch (err) {
      console.error("Save project error:", err);
    }
  };

  const deleteProject = async (docId: string) => {
    if (!db || !window.confirm(t.admin.confirmDelete)) return;
    try {
      await deleteDoc(doc(db, "projects", docId));
      fetchProjects();
    } catch (err) {
      console.error("Delete project error:", err);
    }
  };

  // Achievement CRUD
  const saveAchievement = async () => {
    if (!editingAchievement || !db) return;
    try {
      if (editingAchievement.docId) {
        const { docId, ...data } = editingAchievement;
        await updateDoc(doc(db, "achievements", docId), data);
      } else {
        await addDoc(collection(db, "achievements"), {
          ...editingAchievement,
          id: Date.now().toString(),
        });
      }
      setEditingAchievement(null);
      setIsAdding(false);
      fetchAchievements();
    } catch (err) {
      console.error("Save achievement error:", err);
    }
  };

  const deleteAchievement = async (docId: string) => {
    if (!db || !window.confirm(t.admin.confirmDelete)) return;
    try {
      await deleteDoc(doc(db, "achievements", docId));
      fetchAchievements();
    } catch (err) {
      console.error("Delete achievement error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-primary-dark flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Login Form
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-primary-dark flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-primary rounded-xl p-8 shadow-lg w-full max-w-md"
        >
          <h1 className="text-2xl font-bold text-primary-dark dark:text-white mb-2 text-center font-display">
            {t.admin.login}
          </h1>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full mb-6" />

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.admin.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-primary-dark border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-secondary focus:outline-none transition-colors text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.admin.password}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-primary-dark border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-secondary focus:outline-none transition-colors text-gray-900 dark:text-white"
              />
            </div>

            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary-dark text-primary-dark font-semibold rounded-lg transition-all"
            >
              <FiLogIn size={18} />
              {t.admin.signIn}
            </motion.button>
          </form>

          <Link
            to="/"
            className="block text-center mt-4 text-sm text-gray-500 hover:text-secondary transition-colors"
          >
            <FiArrowLeft className="inline mr-1" size={14} />
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  // Admin Panel
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-primary-dark pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-secondary hover:text-secondary-dark mb-2 transition-colors font-medium text-sm"
            >
              <FiArrowLeft size={16} />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-primary-dark dark:text-white font-display">
              {t.admin.title}
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-red-500 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors"
          >
            <FiLogOut size={16} />
            {t.admin.signOut}
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => {
              setActiveTab("projects");
              setIsAdding(false);
              setEditingProject(null);
              setEditingAchievement(null);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === "projects"
                ? "bg-secondary text-primary-dark"
                : "bg-white dark:bg-primary text-gray-600 dark:text-gray-400 hover:bg-secondary/10"
            }`}
          >
            <FiFolder size={16} />
            {t.admin.projects}
          </button>
          <button
            onClick={() => {
              setActiveTab("achievements");
              setIsAdding(false);
              setEditingProject(null);
              setEditingAchievement(null);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === "achievements"
                ? "bg-secondary text-primary-dark"
                : "bg-white dark:bg-primary text-gray-600 dark:text-gray-400 hover:bg-secondary/10"
            }`}
          >
            <FiAward size={16} />
            {t.admin.achievements}
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-primary-dark dark:text-white">
                {t.admin.projects}
              </h2>
              <button
                onClick={() => {
                  setIsAdding(true);
                  setEditingProject({
                    title: "",
                    description: "",
                    image: "",
                    techStack: [],
                    liveUrl: "",
                    githubUrl: "",
                  });
                }}
                className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary-dark text-primary-dark rounded-lg text-sm font-medium transition-colors"
              >
                <FiPlus size={16} />
                {t.admin.add}
              </button>
            </div>

            {/* Project Form */}
            <AnimatePresence>
              {editingProject && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white dark:bg-primary rounded-xl p-6 shadow-lg overflow-hidden"
                >
                  <h3 className="text-lg font-bold text-primary-dark dark:text-white mb-4">
                    {isAdding ? t.admin.add : t.admin.edit}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      value={editingProject.title || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          title: e.target.value,
                        })
                      }
                      placeholder="Title"
                      className="px-4 py-2 bg-gray-50 dark:bg-primary-dark border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-secondary focus:outline-none text-gray-900 dark:text-white text-sm"
                    />

                    {/* Image: URL input + Upload */}
                    <div className="space-y-2">
                      <input
                        value={editingProject.image || ""}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            image: e.target.value,
                          })
                        }
                        placeholder="Image URL (or upload below)"
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-primary-dark border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-secondary focus:outline-none text-gray-900 dark:text-white text-sm"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file);
                          }}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploading}
                          className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-primary-dark border border-gray-300 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 hover:border-secondary hover:text-secondary transition-colors disabled:opacity-50"
                        >
                          <FiUpload size={14} />
                          {uploading
                            ? `Uploading ${uploadProgress}%`
                            : "Upload Image"}
                        </button>
                        {editingProject.image && (
                          <div className="flex items-center gap-2">
                            <img
                              src={editingProject.image}
                              alt="Preview"
                              className="w-8 h-8 object-cover rounded border border-gray-300 dark:border-gray-600"
                            />
                            <span className="text-xs text-green-500 flex items-center gap-1">
                              <FiImage size={12} /> Image set
                            </span>
                          </div>
                        )}
                      </div>
                      {uploading && (
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <div
                            className="bg-secondary h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      )}
                    </div>
                    <input
                      value={editingProject.liveUrl || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          liveUrl: e.target.value,
                        })
                      }
                      placeholder="Live URL"
                      className="px-4 py-2 bg-gray-50 dark:bg-primary-dark border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-secondary focus:outline-none text-gray-900 dark:text-white text-sm"
                    />
                    <input
                      value={editingProject.githubUrl || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          githubUrl: e.target.value,
                        })
                      }
                      placeholder="GitHub URL"
                      className="px-4 py-2 bg-gray-50 dark:bg-primary-dark border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-secondary focus:outline-none text-gray-900 dark:text-white text-sm"
                    />
                    <textarea
                      value={editingProject.description || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          description: e.target.value,
                        })
                      }
                      placeholder="Description"
                      rows={3}
                      className="md:col-span-2 px-4 py-2 bg-gray-50 dark:bg-primary-dark border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-secondary focus:outline-none text-gray-900 dark:text-white text-sm resize-none"
                    />
                    <input
                      value={(editingProject.techStack || []).join(", ")}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          techStack: e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      placeholder="Tech Stack (comma-separated)"
                      className="md:col-span-2 px-4 py-2 bg-gray-50 dark:bg-primary-dark border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-secondary focus:outline-none text-gray-900 dark:text-white text-sm"
                    />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={saveProject}
                      className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary-dark text-primary-dark rounded-lg text-sm font-medium transition-colors"
                    >
                      <FiSave size={16} />
                      {t.admin.save}
                    </button>
                    <button
                      onClick={() => {
                        setEditingProject(null);
                        setIsAdding(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg text-sm transition-colors"
                    >
                      <FiX size={16} />
                      {t.admin.cancel}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Project List */}
            <div className="space-y-3">
              {projects.map((project) => (
                <div
                  key={project.docId}
                  className="bg-white dark:bg-primary rounded-xl p-4 shadow flex items-center gap-4"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-16 h-16 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-primary-dark dark:text-white text-sm">
                      {project.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingProject(project);
                        setIsAdding(false);
                      }}
                      className="p-2 text-gray-400 hover:text-secondary transition-colors"
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      onClick={() =>
                        project.docId && deleteProject(project.docId)
                      }
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No projects found. Add one to get started, or configure
                  Firebase.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-primary-dark dark:text-white">
                {t.admin.achievements}
              </h2>
              <button
                onClick={() => {
                  setIsAdding(true);
                  setEditingAchievement({
                    title: "",
                    issuer: "",
                    date: "",
                    description: "",
                    type: "certification",
                    credentialUrl: "",
                  });
                }}
                className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary-dark text-primary-dark rounded-lg text-sm font-medium transition-colors"
              >
                <FiPlus size={16} />
                {t.admin.add}
              </button>
            </div>

            {/* Achievement Form */}
            <AnimatePresence>
              {editingAchievement && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white dark:bg-primary rounded-xl p-6 shadow-lg overflow-hidden"
                >
                  <h3 className="text-lg font-bold text-primary-dark dark:text-white mb-4">
                    {isAdding ? t.admin.add : t.admin.edit}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      value={editingAchievement.title || ""}
                      onChange={(e) =>
                        setEditingAchievement({
                          ...editingAchievement,
                          title: e.target.value,
                        })
                      }
                      placeholder="Title"
                      className="px-4 py-2 bg-gray-50 dark:bg-primary-dark border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-secondary focus:outline-none text-gray-900 dark:text-white text-sm"
                    />
                    <input
                      value={editingAchievement.issuer || ""}
                      onChange={(e) =>
                        setEditingAchievement({
                          ...editingAchievement,
                          issuer: e.target.value,
                        })
                      }
                      placeholder="Issuer"
                      className="px-4 py-2 bg-gray-50 dark:bg-primary-dark border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-secondary focus:outline-none text-gray-900 dark:text-white text-sm"
                    />
                    <input
                      value={editingAchievement.date || ""}
                      onChange={(e) =>
                        setEditingAchievement({
                          ...editingAchievement,
                          date: e.target.value,
                        })
                      }
                      placeholder="Date (e.g., 2025)"
                      className="px-4 py-2 bg-gray-50 dark:bg-primary-dark border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-secondary focus:outline-none text-gray-900 dark:text-white text-sm"
                    />
                    <select
                      value={editingAchievement.type || "certification"}
                      onChange={(e) =>
                        setEditingAchievement({
                          ...editingAchievement,
                          type: e.target.value as Achievement["type"],
                        })
                      }
                      className="px-4 py-2 bg-gray-50 dark:bg-primary-dark border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-secondary focus:outline-none text-gray-900 dark:text-white text-sm"
                    >
                      <option value="certification">Certification</option>
                      <option value="achievement">Achievement</option>
                      <option value="award">Award</option>
                    </select>
                    <input
                      value={editingAchievement.credentialUrl || ""}
                      onChange={(e) =>
                        setEditingAchievement({
                          ...editingAchievement,
                          credentialUrl: e.target.value,
                        })
                      }
                      placeholder="Credential URL"
                      className="px-4 py-2 bg-gray-50 dark:bg-primary-dark border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-secondary focus:outline-none text-gray-900 dark:text-white text-sm"
                    />
                    <textarea
                      value={editingAchievement.description || ""}
                      onChange={(e) =>
                        setEditingAchievement({
                          ...editingAchievement,
                          description: e.target.value,
                        })
                      }
                      placeholder="Description"
                      rows={3}
                      className="md:col-span-2 px-4 py-2 bg-gray-50 dark:bg-primary-dark border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-secondary focus:outline-none text-gray-900 dark:text-white text-sm resize-none"
                    />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={saveAchievement}
                      className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary-dark text-primary-dark rounded-lg text-sm font-medium transition-colors"
                    >
                      <FiSave size={16} />
                      {t.admin.save}
                    </button>
                    <button
                      onClick={() => {
                        setEditingAchievement(null);
                        setIsAdding(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg text-sm transition-colors"
                    >
                      <FiX size={16} />
                      {t.admin.cancel}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Achievement List */}
            <div className="space-y-3">
              {achievements.map((item) => (
                <div
                  key={item.docId}
                  className="bg-white dark:bg-primary rounded-xl p-4 shadow flex items-center gap-4"
                >
                  <div className="p-3 bg-secondary/20 rounded-lg shrink-0">
                    <FiAward className="text-secondary text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-primary-dark dark:text-white text-sm">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.issuer} - {item.date}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingAchievement(item);
                        setIsAdding(false);
                      }}
                      className="p-2 text-gray-400 hover:text-secondary transition-colors"
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      onClick={() =>
                        item.docId && deleteAchievement(item.docId)
                      }
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {achievements.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No achievements found. Add one to get started, or configure
                  Firebase.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
