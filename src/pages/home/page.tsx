import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import HeroSection from './components/HeroSection';
import AccessRequestModal from './components/AccessRequestModal';
import FeaturesGrid from './components/FeaturesGrid';
import InstallationGuide from './components/InstallationGuide';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function HomePage() {
  const [showAccessModal, setShowAccessModal] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection onRequestAccess={() => setShowAccessModal(true)} />
      <FeaturesGrid />
      <InstallationGuide onRequestAccess={() => setShowAccessModal(true)} />
      <TestimonialsSection />
      <CTASection onRequestAccess={() => setShowAccessModal(true)} />
      <Footer />
      
      {showAccessModal && (
        <AccessRequestModal onClose={() => setShowAccessModal(false)} />
      )}
      
      {/* Owner Access Button */}
      <a
        href="/owner-test"
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-orange-500/50 transition-all hover:scale-110 z-50 cursor-pointer group"
        title="Owner Testing Dashboard"
      >
        <i className="ri-settings-3-line text-2xl text-white"></i>
        <div className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Owner Testing
        </div>
      </a>
    </div>
  );
}