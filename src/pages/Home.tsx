import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Skills } from "../components/Skills";
import { Projects } from "../components/Projects";
import { Achievements } from "../components/Achievements";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { ChatBot } from "../components/ChatBot";

export const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
      <ChatBot />
    </>
  );
};
