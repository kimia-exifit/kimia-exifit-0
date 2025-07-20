import React, { useEffect, useRef, useState } from 'react';
import { anime } from 'animejs';
import { Calendar, Clock, MapPin, ExternalLink, Users, Sparkles } from 'lucide-react';
import { events } from '../data/events';

const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
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

    // Events animation with intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            anime({
              targets: eventsRef.current?.children,
              opacity: [0, 1],
              translateY: [50, 0],
              duration: 800,
              delay: anime.stagger(150),
              easing: 'easeOutExpo'
            });

            // Animate note section
            anime({
              targets: noteRef.current,
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 600,
              delay: 1000,
              easing: 'easeOutExpo'
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (eventsRef.current) {
      observer.observe(eventsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    anime({
      targets: e.currentTarget,
      scale: 1.02,
      translateY: -8,
      duration: 300,
      easing: 'easeOutQuad'
    });
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    anime({
      targets: e.currentTarget,
      scale: 1,
      translateY: 0,
      duration: 300,
      easing: 'easeOutQuad'
    });
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    anime({
      targets: e.currentTarget,
      scale: 1.05,
      translateY: -3,
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
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
              <span className="text-gray-800 font-black">رویدادهای علمی</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-6 leading-tight text-gray-800">
              رویدادهای آینده
            </h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-semibold">
              به برنامه‌های آموزشی و علمی ما بپیوندید
            </p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-4" style={{ marginTop: '15px' }}>
        <div className="blur-sheet rounded-3xl mx-4 sm:mx-6 lg:mx-8">
          <div className="container mx-auto px-8 sm:px-12 lg:px-16 py-8">
            <div ref={eventsRef} className="space-y-8">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className="group"
                  style={{ opacity: 0 }}
                  onMouseEnter={handleCardHover}
                  onMouseLeave={handleCardLeave}
                >
                  <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-200 min-h-[320px]">
                    <div className="lg:flex">
                      {/* Event Image */}
                      <div className="lg:w-1/3 h-64 lg:h-80 relative overflow-hidden flex-shrink-0">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-6 left-6 bg-gradient-to-r from-purple-500 to-emerald-500 text-white px-4 py-2 rounded-full font-black">
                          رویداد {index + 1}
                        </div>
                      </div>

                      {/* Event Content */}
                      <div className="lg:w-2/3 p-6 flex flex-col justify-between min-h-0">
                        <div className="flex-grow">
                          <h3 className="text-xl lg:text-2xl font-black text-gray-800 mb-4 group-hover:text-purple-600 transition-colors line-clamp-2">
                            {event.title}
                          </h3>
                        
                          <p className="text-gray-700 mb-6 leading-relaxed text-base font-semibold line-clamp-3">
                            {event.description}
                          </p>

                          {/* Event Details */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="flex items-center space-x-3 space-x-reverse">
                              <Calendar className="w-5 h-5 text-purple-500" />
                              <div>
                                <p className="font-black text-gray-800 text-sm">تاریخ</p>
                                <p className="text-gray-700 font-semibold text-sm">{event.date}</p>
                              </div>
                            </div>
                          
                            <div className="flex items-center space-x-3 space-x-reverse">
                              <Clock className="w-5 h-5 text-purple-500" />
                              <div>
                                <p className="font-black text-gray-800 text-sm">زمان</p>
                                <p className="text-gray-700 font-semibold text-sm">{event.time}</p>
                              </div>
                            </div>
                          
                            <div className="flex items-center space-x-3 space-x-reverse">
                              <MapPin className="w-5 h-5 text-purple-500" />
                              <div>
                                <p className="font-black text-gray-800 text-sm">مکان</p>
                                <p className="text-gray-700 font-semibold text-sm line-clamp-1">{event.location}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse flex-shrink-0">
                          <a
                            href={event.registrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={handleButtonHover}
                            onMouseLeave={handleButtonLeave}
                            className="flex items-center justify-center space-x-2 space-x-reverse bg-gradient-to-r from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-600 text-white px-5 py-2.5 rounded-2xl font-black text-sm transition-all duration-200 whitespace-nowrap"
                          >
                            <Users className="w-5 h-5" />
                            <span>ثبت‌نام در رویداد</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          
                          <button
                            onMouseEnter={handleButtonHover}
                            onMouseLeave={handleButtonLeave}
                            onClick={() => setSelectedEvent(event.id)}
                            className="flex items-center justify-center space-x-2 space-x-reverse bg-white/30 backdrop-blur-md border border-white/40 text-gray-700 hover:text-purple-600 px-5 py-2.5 rounded-2xl font-black text-sm transition-all duration-200 whitespace-nowrap"
                          >
                            <span>اطلاعات کامل</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Future Events Note */}
            <div ref={noteRef} className="mt-16 text-center" style={{ opacity: 0 }}>
              <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl p-6 max-w-2xl mx-auto">
                <h3 className="text-xl font-black text-gray-800 mb-4">
                  رویدادهای بیشتر در راه است
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed font-semibold text-base">
                  برای اطلاع از جدیدترین رویدادها و برنامه‌های آموزشی، در خبرنامه ما عضو شوید
                </p>
                <button
                  onMouseEnter={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                  className="bg-gradient-to-r from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-600 text-white px-8 py-3 rounded-2xl font-black text-base transition-all duration-200"
                >
                  عضویت در خبرنامه
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white/90 backdrop-blur-md border border-white/40 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const event = events.find(e => e.id === selectedEvent);
              if (!event) return null;

              return (
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      {event.title}
                    </h2>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {event.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><strong>تاریخ:</strong> {event.date}</div>
                      <div><strong>زمان:</strong> {event.time}</div>
                      <div className="col-span-2"><strong>مکان:</strong> {event.location}</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 space-x-reverse">
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                    >
                      بستن
                    </button>
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold text-center hover:bg-orange-600 transition-colors"
                    >
                      ثبت‌نام
                    </a>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;