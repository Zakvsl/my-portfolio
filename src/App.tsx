import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { ChatRoom } from "./pages/ChatRoom";
import { Admin } from "./pages/Admin";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chatroom" element={<ChatRoom />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
