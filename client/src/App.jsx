import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdsPage from './pages/AdsPage';
import RoommatesPage from './pages/RoommatesPage';
import AdDetailPage from './pages/AdDetailPage';
import CreateAdPage from './pages/CreateAdPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import SafetyPage from './pages/SafetyPage';
import TipsPage from './pages/TipsPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import CookiePage from './pages/CookiePage';
import './index.css';

console.log({ Navbar, Footer, HomePage, AdsPage, CreateAdPage, HowItWorksPage, ChatPage, LoginPage, RegisterPage });

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function ChatLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/ads" element={<Layout><AdsPage /></Layout>} />
          <Route path="/ads/new" element={<PrivateRoute><Layout><CreateAdPage /></Layout></PrivateRoute>} />
          <Route path="/roommates" element={<Layout><RoommatesPage /></Layout>} />
          <Route path="/ads/:id" element={<Layout><AdDetailPage /></Layout>} />
          <Route path="/how-it-works" element={<Layout><HowItWorksPage /></Layout>} />
          <Route path="/messages" element={<PrivateRoute><ChatLayout><ChatPage /></ChatLayout></PrivateRoute>} />
          <Route path="/messages/:userId" element={<PrivateRoute><ChatLayout><ChatPage /></ChatLayout></PrivateRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<PrivateRoute><Layout><ProfilePage /></Layout></PrivateRoute>} />
          <Route path="/safety" element={<Layout><SafetyPage /></Layout>} />
          <Route path="/tips" element={<Layout><TipsPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
          <Route path="/terms" element={<Layout><TermsPage /></Layout>} />
          <Route path="/privacy" element={<Layout><PrivacyPage /></Layout>} />
          <Route path="/cookies" element={<Layout><CookiePage /></Layout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}