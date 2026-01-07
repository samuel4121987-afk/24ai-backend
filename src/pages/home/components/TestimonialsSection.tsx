import { motion } from 'framer-motion';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'DevOps Engineer',
      company: 'TechCorp',
      image: 'https://readdy.ai/api/search-image?query=professional%20asian%20woman%20software%20engineer%20in%20modern%20office%20with%20confident%20smile%20wearing%20business%20casual%20attire%20with%20tech%20background&width=400&height=400&seq=test1&orientation=squarish',
      quote: 'This AI control system has revolutionized how we manage our remote infrastructure. The real-time monitoring is incredible.',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'IT Director',
      company: 'Global Systems Inc',
      image: 'https://readdy.ai/api/search-image?query=professional%20hispanic%20male%20IT%20director%20in%20modern%20tech%20office%20with%20friendly%20expression%20wearing%20business%20attire%20with%20computer%20screens%20background&width=400&height=400&seq=test2&orientation=squarish',
      quote: 'The natural language commands save us hours every day. Security is top-notch, and the latency is unbelievably low.',
      rating: 5
    },
    {
      name: 'Emily Watson',
      role: 'Systems Administrator',
      company: 'CloudNet Solutions',
      image: 'https://readdy.ai/api/search-image?query=professional%20caucasian%20woman%20systems%20administrator%20with%20glasses%20in%20tech%20workspace%20with%20warm%20smile%20wearing%20professional%20attire%20with%20server%20room%20background&width=400&height=400&seq=test3&orientation=squarish',
      quote: 'Best remote control solution we\'ve ever used. The AI understands context perfectly and executes commands flawlessly.',
      rating: 5
    },
    {
      name: 'David Kim',
      role: 'CTO',
      company: 'StartupHub',
      image: 'https://readdy.ai/api/search-image?query=professional%20asian%20male%20CTO%20executive%20in%20modern%20startup%20office%20with%20confident%20expression%20wearing%20smart%20casual%20attire%20with%20innovation%20lab%20background&width=400&height=400&seq=test4&orientation=squarish',
      quote: 'We deployed this across 50+ machines. The installation was smooth, and our team was productive within hours.',
      rating: 5
    },
    {
      name: 'Lisa Anderson',
      role: 'Security Analyst',
      company: 'SecureOps',
      image: 'https://readdy.ai/api/search-image?query=professional%20caucasian%20woman%20cybersecurity%20analyst%20in%20security%20operations%20center%20with%20focused%20expression%20wearing%20professional%20attire%20with%20monitoring%20screens%20background&width=400&height=400&seq=test5&orientation=squarish',
      quote: 'The encryption and security features exceed our enterprise requirements. Highly recommended for sensitive operations.',
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4"
          >
            <i className="ri-vip-diamond-line"></i>
            TRUSTED WORLDWIDE
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black text-gray-900 mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Loved by Remote Teams &amp; IT Professionals
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Row 1 - 3 cards */}
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-yellow-400"></i>
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </div>

        {/* Row 2 - 2 cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.slice(3, 5).map((testimonial, index) => (
            <motion.div
              key={index + 3}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-white"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white/30"
                />
                <div>
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-white/90">{testimonial.role}</p>
                  <p className="text-xs text-white/70">{testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-yellow-300"></i>
                ))}
              </div>

              <p className="text-white/95 leading-relaxed text-lg">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}