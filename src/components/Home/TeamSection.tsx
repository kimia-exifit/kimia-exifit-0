import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { Users, Code, Heart, Brain, ChevronDown, ChevronUp } from 'lucide-react';

const TeamSection: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const departments = [
    {
      id: 'development',
      name: 'توسعه نرم‌افزار',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      members: [
        { name: 'مهندس علی کریمی', position: 'توسعه‌دهنده ارشد فول‌استک' },
        { name: 'مهندس سارا احمدی', position: 'توسعه‌دهنده فرانت‌اند' },
        { name: 'مهندس محمد رضایی', position: 'توسعه‌دهنده بک‌اند' },
        { name: 'مهندس فاطمه نوری', position: 'متخصص DevOps' }
      ]
    },
    {
      id: 'medical',
      name: 'تیم پزشکی',
      icon: Heart,
      color: 'from-red-500 to-pink-500',
      members: [
        { name: 'دکتر محمد احمدی', position: 'متخصص IT سلامت' },
        { name: 'دکتر فاطمه رضایی', position: 'متخصص طراحی سیستم‌های پزشکی' },
        { name: 'دکتر علی حسینی', position: 'مشاور پزشکی ارشد' },
        { name: 'دکتر مریم کریمی', position: 'متخصص تله‌طب' }
      ]
    },
    {
      id: 'ai',
      name: 'هوش مصنوعی',
      icon: Brain,
      color: 'from-purple-500 to-indigo-500',
      members: [
        { name: 'دکتر امیر صادقی', position: 'متخصص هوش مصنوعی پزشکی' },
        { name: 'مهندس زهرا محمدی', position: 'متخصص یادگیری ماشین' },
        { name: 'مهندس حسن علوی', position: 'متخصص پردازش تصویر پزشکی' },
        { name: 'مهندس نرگس فرهادی', position: 'متخصص تحلیل داده‌های سلامت' }
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animate header
            anime({
              targets: headerRef.current,
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 600,
              easing: 'easeOutExpo'
            });

            // Animate cards with stagger
            anime({
              targets: cardsRef.current?.children,
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 800,
              delay: anime.stagger(100, {start: 200}),
              easing: 'easeOutExpo'
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    anime({
      targets: e.currentTarget,
      translateY: -4,
      scale: 1.02,
      duration: 300,
      easing: 'easeOutQuad'
    });
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    anime({
      targets: e.currentTarget,
      translateY: 0,
      scale: 1,
      duration: 300,
      easing: 'easeOutQuad'
    });
  };

  const toggleDepartment = (departmentId: string) => {
    setSelectedDepartment(selectedDepartment === departmentId ? null : departmentId);
  };

  return (
    <section ref={sectionRef} className="py-4 relative" style={{ marginTop: '15px' }}>
      <div className="mx-4 sm:mx-6 lg:mx-8">
        <div className="blur-sheet rounded-3xl">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-8">
            {/* Section Header */}
            <div ref={headerRef} className="text-center mb-8" style={{ opacity: 0 }}>
              <div className="inline-flex items-center space-x-2 space-x-reverse bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-4 py-2 mb-4">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="text-gray-800 font-bold text-sm">تیم متخصص ما</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-black mb-4 text-gray-800">
                بخش‌های تخصصی
              </h2>
              <p className="text-base text-gray-700 max-w-2xl mx-auto font-bold">
                تیمی از بهترین متخصصان در سه بخش کلیدی
              </p>
            </div>

            {/* Departments Grid */}
            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {departments.map((department) => (
                <div
                  key={department.id}
                  className="group cursor-pointer"
                  style={{ opacity: 0 }}
                  onClick={() => toggleDepartment(department.id)}
                  onMouseEnter={handleCardHover}
                  onMouseLeave={handleCardLeave}
                >
                  <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl p-6 hover:shadow-lg transition-all duration-200 text-center">
                    {/* Department Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-r ${department.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <department.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Department Name */}
                    <h3 className="text-lg font-black text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                      {department.name}
                    </h3>
                    
                    {/* Member Count */}
                    <p className="text-gray-700 font-semibold text-sm mb-4">
                      {department.members.length} متخصص
                    </p>

                    {/* Expand Indicator */}
                    <div className="flex items-center justify-center">
                      {selectedDepartment === department.id ? (
                        <ChevronUp className="w-5 h-5 text-purple-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-purple-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Department Members */}
            {selectedDepartment && (
              <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl p-6 overflow-hidden">
                {(() => {
                  const department = departments.find(d => d.id === selectedDepartment);
                  if (!department) return null;

                  return (
                    <div>
                      <h3 className="text-xl font-black text-gray-800 mb-6 text-center">
                        اعضای تیم {department.name}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {department.members.map((member, index) => (
                          <div
                            key={index}
                            className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-4"
                          >
                            <h4 className="text-base font-black text-gray-800 mb-2">
                              {member.name}
                            </h4>
                            <p className="text-gray-700 font-semibold text-sm">
                              {member.position}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;