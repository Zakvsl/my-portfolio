import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiUser, FiMessageSquare, FiSend } from "react-icons/fi";
// import emailjs from 'emailjs-com';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Replace with your EmailJS credentials
      // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_PUBLIC_KEY')

      // Simulating email send for demo
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark dark:text-white mb-4 font-display">
            Get In <span className="text-secondary">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
          <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? Feel free to reach
            out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <FiUser className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-primary border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-secondary focus:outline-none transition-colors text-gray-900 dark:text-white"
                />
              </div>

              <div className="relative">
                <FiMail className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-primary border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-secondary focus:outline-none transition-colors text-gray-900 dark:text-white"
                />
              </div>

              <div className="relative">
                <FiMessageSquare className="absolute left-4 top-4 text-gray-400" />
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={5}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-primary border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-secondary focus:outline-none transition-colors text-gray-900 dark:text-white resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary-dark text-primary-dark font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-secondary/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  "Sending..."
                ) : (
                  <>
                    <FiSend size={20} />
                    Send Message
                  </>
                )}
              </motion.button>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-500 text-center font-medium"
                >
                  Message sent successfully! 🎉
                </motion.p>
              )}

              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-center font-medium"
                >
                  Oops! Something went wrong. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary-dark dark:text-white font-display">
                Let's Connect
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions.
              </p>
            </div>

            <div className="space-y-4">
              <motion.a
                href="mailto:dimas@example.com"
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-primary rounded-lg hover:bg-secondary/10 dark:hover:bg-secondary/10 transition-all group"
              >
                <div className="p-3 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
                  <FiMail className="text-secondary text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-primary-dark dark:text-white">
                    Email
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    dimas@example.com
                  </p>
                </div>
              </motion.a>

              <motion.a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-primary rounded-lg hover:bg-secondary/10 dark:hover:bg-secondary/10 transition-all group"
              >
                <div className="p-3 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
                  <FiMessageSquare className="text-secondary text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-primary-dark dark:text-white">
                    WhatsApp
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    +62 812-3456-7890
                  </p>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
