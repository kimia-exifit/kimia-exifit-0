import React, { useEffect, useState, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { Mail, Phone, MapPin, Clock, Send, User, MessageSquare, Sparkles } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    document.title = 'مدیریت سلامت نقره‌ای';
  }, []);

  useEffect(() => {
    // Hero animation
    anime({
      targets: heroRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      easing: 'easeOutExpo'
    });

    // Contact content animation with intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animate contact info cards
            anime({
              targets: contactInfoRef.current?.querySelectorAll('.contact-card'),
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 600,
              delay: anime.stagger(100),
              easing: 'easeOutExpo'
            });

            // Animate form
            anime({
              targets: formRef.current,
              opacity: [0, 1],
              translateX: [30, 0],
              duration: 800,
              delay: 200,
              easing: 'easeOutExpo'
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contactInfoRef.current) {
      observer.observe(contactInfoRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "تلفن تماس",
      content: "+98 21 1234 5678",
      subtitle: "پاسخگویی ۲۴ ساعته"
    },
    {
      icon: Mail,
      title: "ایمیل",
      content: "info@silverhealth.com",
      subtitle: "پاسخ در کمتر از ۲۴ ساعت"
    },
    {
      icon: MapPin,
      title: "آدرس",
      content: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
      subtitle: "ساختمان تجاری نقره‌ای، طبقه ۸"
    },
    {
      icon: Clock,
      title: "ساعات کاری",
      content: "شنبه تا چهارشنبه: ۸ الی ۱۷",
      subtitle: "پنج‌شنبه: ۸ الی ۱۳"
    }
  ];

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    anime({
      targets: e.currentTarget,
      scale: 1.03,
      translateX: 8,
      duration: 300,
      easing: 'easeOutQuad'
    });
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    anime({
      targets: e.currentTarget,
      scale: 1,
      translateX: 0,
      duration: 300,
      easing: 'easeOutQuad'
    });
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    anime({
      targets: e.currentTarget,
      scale: 1.05,
      translateY: -3,
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    anime({
      targets: e.currentTarget,
      scale: 1,
      translateY: 0,
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24 pb-4" style={{ marginTop: '15px' }}>
        <div className="blur-sheet rounded-3xl mx-4 sm:mx-6 lg:mx-8 max-w-5xl w-full relative">
          <div
            ref={heroRef}
            className="relative z-10 text-center px-6 sm:px-8 lg:px-12 py-12 lg:py-16"
            style={{ opacity: 0 }}
          >
            <div className="inline-flex items-center space-x-2 space-x-reverse bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-gray-800 font-black">ارتباط با ما</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-6 leading-tight text-gray-800">
              تماس با ما
            </h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-semibold">
              آماده پاسخگویی به سوالات و ارائه مشاوره تخصصی هستیم
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-4" style={{ marginTop: '15px' }}>
        <div className="blur-sheet rounded-3xl mx-4 sm:mx-6 lg:mx-8">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div ref={contactInfoRef}>
                <h2 className="text-2xl font-black text-gray-800 mb-6">
                  اطلاعات تماس
                </h2>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="group contact-card"
                      style={{ opacity: 0 }}
                      onMouseEnter={handleCardHover}
                      onMouseLeave={handleCardLeave}
                    >
                      <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl p-6 hover:shadow-2xl transition-all duration-200">
                        <div className="flex items-start space-x-4 space-x-reverse">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                            <info.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-black text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                              {info.title}
                            </h3>
                            <p className="text-gray-700 font-bold mb-2 text-base">
                              {info.content}
                            </p>
                            <p className="text-gray-600 font-semibold text-sm">
                              {info.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map Placeholder */}
                <div className="mt-6 bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl p-6 contact-card" style={{ opacity: 0 }}>
                  <h3 className="text-lg font-black text-gray-800 mb-4">
                    موقعیت ما
                  </h3>
                  <div className="h-48 bg-gradient-to-br from-purple-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                    <p className="text-gray-700 font-bold text-base">نقشه موقعیت مکانی</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div ref={formRef} style={{ opacity: 0 }}>
                <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl p-6">
                  <h2 className="text-2xl font-black text-gray-800 mb-6">
                    فرم تماس
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="flex items-center space-x-2 space-x-reverse text-gray-800 font-black mb-2 text-sm">
                          <User className="w-5 h-5 text-purple-500" />
                          <span>نام و نام خانوادگی</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 font-semibold text-sm"
                          required
                        />
                      </div>

                      <div className="group">
                        <label className="flex items-center space-x-2 space-x-reverse text-gray-800 font-black mb-2 text-sm">
                          <Mail className="w-5 h-5 text-purple-500" />
                          <span>ایمیل</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 font-semibold text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="flex items-center space-x-2 space-x-reverse text-gray-800 font-black mb-2 text-sm">
                          <Phone className="w-5 h-5 text-purple-500" />
                          <span>شماره تماس</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 font-semibold text-sm"
                        />
                      </div>

                      <div className="group">
                        <label className="text-gray-800 font-black mb-2 block text-sm">
                          موضوع
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 font-semibold text-sm"
                          required
                        >
                          <option value="">انتخاب موضوع</option>
                          <option value="consultation">مشاوره محصولات</option>
                          <option value="support">پشتیبانی فنی</option>
                          <option value="partnership">همکاری</option>
                          <option value="other">سایر</option>
                        </select>
                      </div>
                    </div>

                    <div className="group">
                      <label className="text-gray-800 font-black mb-2 block text-sm">
                        پیام شما
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 resize-none font-semibold text-sm"
                        placeholder="پیام خود را بنویسید..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      onMouseEnter={handleButtonHover}
                      onMouseLeave={handleButtonLeave}
                      className="w-full bg-gradient-to-r from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-600 text-white py-3 rounded-2xl font-black text-base flex items-center justify-center space-x-2 space-x-reverse transition-all duration-200"
                    >
                      <Send className="w-6 h-6" />
                      <span>ارسال پیام</span>
                    </button>
                  </form>
                </div>

                {/* Newsletter Signup */}
                <div className="mt-6 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-3xl p-6 text-white">
                  <h3 className="text-xl font-black mb-4">
                    عضویت در خبرنامه
                  </h3>
                  <p className="mb-6 text-purple-100 font-semibold text-base">
                    از آخرین اخبار و رویدادها مطلع شوید
                  </p>
                  <div className="flex space-x-4 space-x-reverse">
                    <input
                      type="email"
                      placeholder="آدرس ایمیل شما"
                      className="flex-1 px-4 py-3 bg-white/20 border border-white/20 rounded-2xl text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/50 font-semibold text-sm"
                    />
                    <button
                      onMouseEnter={handleButtonHover}
                      onMouseLeave={handleButtonLeave}
                      className="bg-white text-purple-600 px-6 py-3 rounded-2xl font-black text-sm hover:bg-gray-100 transition-colors"
                    >
                      عضویت
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;