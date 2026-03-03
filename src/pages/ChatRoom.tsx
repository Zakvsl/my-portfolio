import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiArrowLeft, FiLogOut, FiUser } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { Navbar } from "../components/Navbar";
import { db, auth } from "../lib/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import type { User } from "firebase/auth";

interface ChatMessage {
  id: string;
  text: string;
  uid: string;
  displayName: string;
  photoURL: string;
  createdAt: { seconds: number } | null;
}

export const ChatRoom = () => {
  const { t } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auth state listener
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

  // Listen to messages
  useEffect(() => {
    if (!db) return;
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "asc"),
      limit(100),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ChatMessage[];
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const signInWithGoogle = async () => {
    if (!auth) return;
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Google sign-in error:", err);
    }
  };

  const signInWithGithub = async () => {
    if (!auth) return;
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("GitHub sign-in error:", err);
    }
  };

  const handleSignOut = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const messageText = newMessage.trim();
    setNewMessage("");

    if (!db) return;
    try {
      await addDoc(collection(db, "messages"), {
        text: messageText,
        uid: user.uid,
        displayName: user.displayName || "Anonymous",
        photoURL: user.photoURL || "",
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  const formatTime = (timestamp: { seconds: number } | null) => {
    if (!timestamp) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 dark:bg-primary-dark flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-primary-dark pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary-dark dark:text-white mb-4 font-display">
              {t.chatroom.title}
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.chatroom.subtitle}
            </p>
          </motion.div>

          {!user ? (
            /* Sign In Card */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-primary rounded-xl p-8 shadow-lg text-center max-w-md mx-auto"
            >
              <FiUser className="text-secondary text-5xl mx-auto mb-4" />
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {t.chatroom.signIn}
              </p>
              <div className="space-y-3">
                <button
                  onClick={signInWithGoogle}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white dark:bg-primary-dark border-2 border-gray-200 dark:border-gray-700 hover:border-secondary rounded-lg transition-all font-medium text-gray-700 dark:text-gray-300"
                >
                  <FcGoogle size={22} />
                  {t.chatroom.signInGoogle}
                </button>
                <button
                  onClick={signInWithGithub}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all font-medium"
                >
                  <FaGithub size={22} />
                  {t.chatroom.signInGithub}
                </button>
              </div>
            </motion.div>
          ) : (
            /* Chat Area */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-primary rounded-xl shadow-lg overflow-hidden"
            >
              {/* User Info Bar */}
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                      <FiUser className="text-secondary" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-primary-dark dark:text-white">
                    {user.displayName || "Anonymous"}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                  <FiLogOut size={16} />
                  {t.chatroom.signOut}
                </button>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-12">
                    {t.chatroom.noMessages}
                  </p>
                ) : (
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => {
                      const isOwn = msg.uid === user.uid;
                      return (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex items-start gap-3 ${isOwn ? "flex-row-reverse" : ""}`}
                        >
                          {msg.photoURL ? (
                            <img
                              src={msg.photoURL}
                              alt={msg.displayName}
                              className="w-8 h-8 rounded-full shrink-0"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                              <FiUser size={14} className="text-secondary" />
                            </div>
                          )}
                          <div
                            className={`max-w-[70%] ${isOwn ? "text-right" : ""}`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`text-xs font-semibold ${isOwn ? "text-secondary" : "text-gray-700 dark:text-gray-300"}`}
                              >
                                {msg.displayName}
                              </span>
                              <span className="text-xs text-gray-400">
                                {formatTime(msg.createdAt)}
                              </span>
                            </div>
                            <div
                              className={`px-4 py-2 rounded-2xl text-sm ${
                                isOwn
                                  ? "bg-secondary text-primary-dark rounded-tr-sm"
                                  : "bg-gray-100 dark:bg-primary-dark text-gray-800 dark:text-gray-200 rounded-tl-sm"
                              }`}
                            >
                              {msg.text}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={sendMessage}
                className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex gap-3"
              >
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={t.chatroom.placeholder}
                  className="flex-1 px-4 py-2 bg-gray-50 dark:bg-primary-dark border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-secondary focus:outline-none transition-colors text-gray-900 dark:text-white text-sm"
                />
                <motion.button
                  type="submit"
                  disabled={!newMessage.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-secondary hover:bg-secondary-dark text-primary-dark rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiSend size={18} />
                </motion.button>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};
