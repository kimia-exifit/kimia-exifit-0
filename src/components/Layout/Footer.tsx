import React, { useEffect, useRef, useState } from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import anime from 'animejs';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animate footer sections
            anime({
              targets: footerRef.current?.querySelectorAll('.footer-section'),
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              delay: anime.stagger(100),
              easing: 'easeOutExpo'
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const handleSocialHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    anime({
      targets: e.currentTarget,
      scale: 1.1,
      translateY: -3,
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  const handleSocialLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    anime({
      targets: e.currentTarget,
      scale: 1,
      translateY: 0,
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    anime({
      targets: e.currentTarget,
      translateX: 5,
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    anime({
      targets: e.currentTarget,
      translateX: 0,
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  return (
    <footer ref={footerRef} className="relative mb-4 mx-4 sm:mx-6 lg:mx-8" style={{ marginTop: '15px' }}>
      <div className="blur-sheet rounded-3xl">
        <div className="container mx-auto px-8 sm:px-12 lg:px-16 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2 footer-section" style={{ opacity: 0 }}>
              <div className="flex items-center space-x-2 space-x-reverse mb-6">
                <Heart className="w-8 h-8 text-purple-500" />
                <span className="text-xl font-black bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
                  مدیریت سلامت نقره‌ای
                </span>
              </div>
              <p className="text-gray-800 mb-8 leading-relaxed font-semibold text-lg">
                ما متعهد به ارائه بهترین خدمات فناوری اطلاعات در حوزه سلامت هستیم. 
                با تیمی متخصص و تجربه چندین ساله، راه‌حل‌های نوآورانه و کارآمد برای صنعت سلامت ارائه می‌دهیم.
              </p>
              <div className="flex space-x-4 space-x-reverse">
                {[
                  { Icon: Facebook, href: 'https://facebook.com/silverhealth' },
                  { Icon: Twitter, href: 'https://twitter.com/silverhealth' },
                  { Icon: Instagram, href: 'https://instagram.com/silverhealth' },
                  { Icon: Linkedin, href: 'https://linkedin.com/company/silverhealth' }
                ].map(({ Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={handleSocialHover}
                    onMouseLeave={handleSocialLeave}
                    className="w-12 h-12 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl flex items-center justify-center text-gray-700 hover:text-purple-600 hover:bg-white/40 transition-all duration-200"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section" style={{ opacity: 0 }}>
              <h3 className="text-lg font-black mb-6 text-purple-600">دسترسی سریع</h3>
              <ul className="space-y-3">
                {[
                  { label: 'خانه', href: '/' },
                  { label: 'محصولات', href: '/products' },
                  { label: 'رویدادها', href: '/events' },
                  { label: 'تماس با ما', href: '/contact' }
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onMouseEnter={handleLinkHover}
                      onMouseLeave={handleLinkLeave}
                      className="text-gray-800 hover:text-purple-600 transition-colors duration-200 font-semibold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section" style={{ opacity: 0 }}>
              <h3 className="text-lg font-black mb-6 text-purple-600">اطلاعات تماس</h3>
              <div className="space-y-4">
                <div 
                  className="flex items-center space-x-3 space-x-reverse text-gray-800"
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  <MapPin className="w-5 h-5 text-purple-500 flex-shrink-0" />
                  <span className="text-sm font-semibold">تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
                </div>
                <div 
                  className="flex items-center space-x-3 space-x-reverse text-gray-800"
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  <Phone className="w-5 h-5 text-purple-500 flex-shrink-0" />
                  <span className="text-sm font-semibold" dir="ltr">+98 21 1234 5678</span>
                </div>
                <div 
                  className="flex items-center space-x-3 space-x-reverse text-gray-800"
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  <Mail className="w-5 h-5 text-purple-500 flex-shrink-0" />
                  <span className="text-sm font-semibold" dir="ltr">info@silverhealth.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-300/50 mt-12 pt-8 text-center footer-section" style={{ opacity: 0 }}>
            <p className="text-gray-700 text-sm font-semibold">
              © {currentYear} مدیریت سلامت نقره‌ای. تمامی حقوق محفوظ است.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;