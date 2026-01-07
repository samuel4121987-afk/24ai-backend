import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccessRequestModalProps {
  onClose: () => void;
}

export default function AccessRequestModal({ onClose }: AccessRequestModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    useCase: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formBody = new URLSearchParams();
      formBody.append('email', formData.email);
      formBody.append('useCase', formData.useCase);
      formBody.append('message', formData.message);

      const response = await fetch('https://readdy.ai/api/form/d5epkbj07s2llnhdb67g', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D1117]/95 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-md"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer z-10"
          >
            <i className="ri-close-line text-xl"></i>
          </button>

          {/* Card */}
          <div className="relative bg-[#1C2128] rounded-3xl p-8 border-2 border-transparent bg-clip-padding"
            style={{
              backgroundImage: 'linear-gradient(#1C2128, #1C2128), linear-gradient(135deg, #00D4FF, #9333EA)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
          >
            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center">
                    <i className="ri-shield-check-line text-3xl text-white"></i>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Request Access</h2>
                  <p className="text-gray-400">Join the waitlist for AI-powered remote control</p>
                </div>

                {/* Form */}
                <form id="access-request-form" data-readdy-form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-[#21262D] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all text-sm"
                    />
                  </div>

                  {/* Use Case Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Use Case</label>
                    <select
                      name="useCase"
                      required
                      value={formData.useCase}
                      onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                      className="w-full px-4 py-3 bg-[#21262D] border border-gray-700 rounded-xl text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all cursor-pointer text-sm"
                    >
                      <option value="">Select your use case</option>
                      <option value="personal">Personal Use</option>
                      <option value="team">Team Collaboration</option>
                      <option value="enterprise">Enterprise Deployment</option>
                    </select>
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message (Optional)</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your use case..."
                      maxLength={500}
                      rows={4}
                      className="w-full px-4 py-3 bg-[#21262D] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none text-sm"
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-1">{formData.message.length}/500 characters</p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-[#00D4FF] to-[#0066FF] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="ri-loader-4-line animate-spin"></i>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Request Access Code
                        <i className="ri-send-plane-fill"></i>
                      </>
                    )}
                  </button>
                </form>

                {/* Bottom Notice */}
                <p className="text-xs text-gray-500 text-center mt-6">
                  Access codes sent to <strong className="text-cyan-400">247@247ai360.com</strong> for approval. You'll receive your unique code within 24 hours.
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
                >
                  <i className="ri-check-line text-4xl text-white"></i>
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3">Request Submitted!</h3>
                <p className="text-gray-400">
                  Your access request has been sent to our team. You'll receive an email with your access code within 24 hours.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}