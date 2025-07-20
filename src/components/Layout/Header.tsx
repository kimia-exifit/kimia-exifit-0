import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { anime } from 'animejs';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initial header animation
    anime({
      targets: headerRef.current,
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 600,
      easing: 'easeOutExpo'
    });
  }, []);

  useEffect(() => {
    // Mobile menu animation
    if (isMenuOpen && mobileMenuRef.current) {
      anime({
        targets: mobileMenuRef.current,
        opacity: [0, 1],
        height: [0, 'auto'],
        duration: 300,
        easing: 'easeOutQuad'
      });

      // Animate menu items
      anime({
        targets: mobileMenuRef.current.querySelectorAll('a'),
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 200,
        delay: anime.stagger(50, {start: 100}),
        easing: 'easeOutQuad'
      });
    }
  }, [isMenuOpen]);

  const navItems = [
    { path: '/', label: 'خانه' },
    { path: '/products', label: 'محصولات' },
    { path: '/events', label: 'رویدادها' },
    { path: '/contact', label: 'تماس با ما' }
  ];

  const handleLogoHover = (e: React.MouseEvent<HTMLDivElement>) => {
    anime({
      targets: e.currentTarget,
      scale: 1.05,
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  const handleLogoLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    anime({
      targets: e.currentTarget,
      scale: 1,
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-4 z-50 mb-4"
      style={{
        left: '30px',
        right: '30px',
        maxWidth: 'calc(100vw - 60px)',
        opacity: 0
      }}
    >
      <div className="blur-sheet rounded-2xl shadow-xl max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 lg:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 space-x-reverse flex-shrink-0 logo-link">
              <div
                className="flex items-center space-x-2 space-x-reverse focus:outline-none"
                onMouseEnter={handleLogoHover}
                onMouseLeave={handleLogoLeave}
              >
                <Heart className="w-6 h-6 text-purple-500" />
                <span className="text-base sm:text-lg lg:text-xl font-black bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent whitespace-nowrap">
                  مدیریت سلامت نقره‌ای
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2 space-x-reverse">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative text-sm font-black transition-all duration-300 whitespace-nowrap px-4 py-2 rounded-xl min-w-[80px] text-center ${
                    location.pathname === item.path
                      ? 'text-purple-600 bg-white/20 backdrop-blur-xl'
                      : 'text-gray-800 hover:text-purple-600 hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-2xl bg-white/20 backdrop-blur-xl hover:bg-white/30 transition-all duration-200 flex-shrink-0 flex items-center justify-center"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav
              ref={mobileMenuRef}
              className="md:hidden bg-white/15 backdrop-blur-md rounded-2xl mt-4 mb-2 mx-2 overflow-hidden shadow-2xl border border-white/20"
              style={{ opacity: 0, height: 0 }}
            >
              <div className="py-4">
                {navItems.map((item, index) => (
                  <div
                    key={item.path}
                    className="mx-3 mb-2 last:mb-0"
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 text-sm font-black transition-all duration-200 focus:outline-none rounded-xl text-center ${
                        location.pathname === item.path
                          ? 'text-purple-600 bg-white/20 backdrop-blur-xl'
                          : 'text-gray-800 hover:text-purple-600 hover:bg-white/10'
                      }`}
                      style={{ opacity: 0 }}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;