import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs';
import { Play, ChevronDown, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initial animations
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 800
    });

    timeline
      .add({
        targets: heroRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600
      })
      .add({
        targets: badgeRef.current,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 400
      }, '-=400')
      .add({
        targets: titleRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600
      }, '-=200')
      .add({
        targets: subtitleRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600
      }, '-=400')
      .add({
        targets: buttonsRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600
      }, '-=400');
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: 'smooth'
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-4" style={{ marginTop: '15px' }}>
      {/* Hero Content */}
      <div className="blur-sheet rounded-3xl mx-4 sm:mx-6 lg:mx-8 max-w-5xl w-full relative">
        <div
          ref={heroRef}
          className="relative z-10 text-center px-6 sm:px-8 lg:px-12 py-12 lg:py-16 pb-20"
          style={{ opacity: 0 }}
        >
          <div
            ref={badgeRef}
            className="inline-flex items-center space-x-2 space-x-reverse bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-4 py-2 mb-6"
            style={{ opacity: 0 }}
          >
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-gray-800 font-black">نوآوری در سلامت دیجیتال</span>
          </div>

          <h1
            ref={titleRef}
            className="text-3xl sm:text-4xl lg:text-6xl font-black mb-6 leading-tight"
            style={{ opacity: 0 }}
          >
            <span className="bg-gradient-to-r from-purple-600 via-gray-800 to-emerald-600 bg-clip-text text-transparent">
              مدیریت سلامت
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-gray-800 to-purple-600 bg-clip-text text-transparent">
              نقره‌ای
            </span>
          </h1>

          <div
            ref={subtitleRef}
            className="mb-8"
            style={{ opacity: 0 }}
          >
            <p className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-600 mb-4">
              تیم حرفه‌ای، خدمات حرفه‌ای
            </p>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-semibold">
              ما با بهره‌گیری از جدیدترین فناوری‌ها و تیمی متخصص، 
              راه‌حل‌های نوآورانه در حوزه فناوری اطلاعات سلامت ارائه می‌دهیم
            </p>
          </div>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 sm:space-x-reverse"
            style={{ opacity: 0 }}
          >
            <Link to="/products">
              <button
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
                className="group bg-gradient-to-r from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-base shadow-2xl transition-all duration-200 flex items-center space-x-3 space-x-reverse"
              >
                <span>مشاهده محصولات</span>
                <Play className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <Link to="/contact">
              <button
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
                className="bg-white/20 backdrop-blur-xl border border-white/30 text-gray-800 px-8 py-4 rounded-2xl font-black text-base hover:bg-white/30 transition-all duration-200"
              >
                تماس با ما
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;