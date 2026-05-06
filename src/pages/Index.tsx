import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const WEDDING_IMAGE = "https://cdn.poehali.dev/projects/c8aeb29e-8053-47c0-8be8-41c4a813dc78/files/27717a16-50d3-444a-90e0-0dbd3813c59f.jpg";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const Ornament = () => (
  <div className="flex items-center justify-center gap-4 my-2">
    <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
    <span className="text-gold text-lg">✦</span>
    <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
  </div>
);

const FlowerDivider = () => (
  <div className="flex items-center justify-center gap-3 my-1">
    <span className="text-gold/50 text-sm">❧</span>
    <span className="text-gold text-base">✾</span>
    <span className="text-gold/50 text-sm">❧</span>
  </div>
);

export default function Index() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-ivory font-body text-charcoal overflow-x-hidden">
      {/* Corner decorations */}
      <div className="fixed top-0 left-0 w-24 h-24 pointer-events-none z-10">
        <svg viewBox="0 0 96 96" fill="none" className="w-full h-full opacity-30">
          <path d="M4 4 L4 40 Q4 4 40 4 Z" stroke="#C9A84C" strokeWidth="1" fill="none"/>
          <path d="M4 4 L4 24 Q4 4 24 4" stroke="#C9A84C" strokeWidth="0.5" fill="none" strokeDasharray="2,3"/>
        </svg>
      </div>
      <div className="fixed top-0 right-0 w-24 h-24 pointer-events-none z-10">
        <svg viewBox="0 0 96 96" fill="none" className="w-full h-full opacity-30">
          <path d="M92 4 L92 40 Q92 4 56 4 Z" stroke="#C9A84C" strokeWidth="1" fill="none"/>
          <path d="M92 4 L92 24 Q92 4 72 4" stroke="#C9A84C" strokeWidth="0.5" fill="none" strokeDasharray="2,3"/>
        </svg>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-20 flex justify-center py-4 bg-ivory/80 backdrop-blur-sm border-b border-gold/20">
        <div className="flex gap-6 md:gap-8">
          {[["hero", "Главная"], ["date", "Дата"], ["program", "Программа"], ["gallery", "Галерея"], ["contacts", "Контакты"]].map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="font-nav text-xs tracking-[0.2em] uppercase text-charcoal/60 hover:text-gold transition-colors duration-300"
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative pt-16 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,_#f5e6c8_0%,_transparent_60%)] pointer-events-none" />

        <div className="text-center max-w-2xl relative z-10">
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(-20px)",
              transition: "opacity 1.2s ease 200ms, transform 1.2s ease 200ms",
            }}
          >
            <p className="font-nav text-xs tracking-[0.4em] uppercase text-gold mb-6">
              Свадебное приглашение
            </p>
          </div>

          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "scale(1)" : "scale(0.95)",
              transition: "opacity 1.4s ease 400ms, transform 1.4s ease 400ms",
            }}
          >
            <h1 className="font-display text-7xl md:text-9xl text-charcoal leading-none mb-2">
              Александр
            </h1>
            <div className="flex items-center justify-center gap-6 my-4">
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-gold/60" />
              <span className="font-display text-4xl text-gold italic">&amp;</span>
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-gold/60" />
            </div>
            <h1 className="font-display text-7xl md:text-9xl text-charcoal leading-none mb-8">
              Екатерина
            </h1>
          </div>

          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 1.2s ease 900ms",
            }}
          >
            <Ornament />
            <p className="font-body text-charcoal/60 text-sm tracking-[0.15em] mt-6 uppercase">
              Просим вас разделить с нами этот особенный день
            </p>
            <button
              onClick={() => scrollTo("date")}
              className="mt-10 inline-flex items-center gap-3 border border-gold/50 text-gold hover:bg-gold hover:text-ivory px-8 py-3 text-xs tracking-[0.3em] uppercase font-nav transition-all duration-500"
            >
              Подробности
              <Icon name="ChevronDown" size={14} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-gold/20 text-6xl select-none pointer-events-none">
          ❀
        </div>
      </section>

      {/* Date & Venue Section */}
      <section id="date" className="py-28 px-6 bg-parchment relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="max-w-4xl mx-auto text-center">
          <RevealSection>
            <p className="font-nav text-xs tracking-[0.4em] uppercase text-gold mb-4">Дата и место</p>
            <FlowerDivider />
            <h2 className="font-display text-5xl md:text-6xl text-charcoal mt-6 mb-10">
              Когда и где
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { icon: "Calendar", label: "Дата торжества", value: "14 сентября 2026", sub: "Воскресенье" },
              { icon: "Clock", label: "Начало церемонии", value: "16:00", sub: "Сбор гостей с 15:30" },
              { icon: "MapPin", label: "Место проведения", value: "Усадьба Архангельское", sub: "Московская область" },
            ].map(({ icon, label, value, sub }, i) => (
              <RevealSection key={i} delay={i * 150}>
                <div className="flex flex-col items-center p-8 border border-gold/25 bg-ivory/60 relative hover:border-gold/60 transition-all duration-500">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-parchment px-3">
                    <Icon name={icon} size={18} className="text-gold" fallback="Calendar" />
                  </div>
                  <p className="font-nav text-[10px] tracking-[0.3em] uppercase text-gold/70 mt-3 mb-3">{label}</p>
                  <p className="font-display text-2xl text-charcoal mb-1">{value}</p>
                  <p className="font-body text-xs text-charcoal/50 tracking-wider">{sub}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </section>

      {/* Program Section */}
      <section id="program" className="py-28 px-6 bg-ivory relative">
        <div className="max-w-3xl mx-auto text-center">
          <RevealSection>
            <p className="font-nav text-xs tracking-[0.4em] uppercase text-gold mb-4">Программа</p>
            <FlowerDivider />
            <h2 className="font-display text-5xl md:text-6xl text-charcoal mt-6 mb-16">
              День торжества
            </h2>
          </RevealSection>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent hidden md:block" />

            {[
              { time: "15:30", title: "Сбор гостей", desc: "Встреча и приветствие гостей, фуршет" },
              { time: "16:00", title: "Выездная церемония", desc: "Торжественная регистрация брака в окружении природы" },
              { time: "17:00", title: "Фотосессия", desc: "Прогулка по усадьбе, памятные снимки" },
              { time: "18:00", title: "Банкет", desc: "Праздничный ужин, тосты и поздравления" },
              { time: "22:00", title: "Танцы до утра", desc: "Живая музыка и зажигательные танцы" },
            ].map(({ time, title, desc }, i) => (
              <RevealSection key={i} delay={i * 100} className={`flex items-start gap-8 mb-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} text-left`}>
                  <p className="font-display text-3xl text-gold mb-1">{time}</p>
                  <p className="font-nav text-sm tracking-[0.1em] uppercase text-charcoal mb-2">{title}</p>
                  <p className="font-body text-charcoal/55 text-sm leading-relaxed">{desc}</p>
                </div>
                <div className="relative flex-shrink-0 hidden md:flex items-center justify-center w-10">
                  <div className="w-3 h-3 rounded-full bg-gold border-2 border-ivory ring-1 ring-gold/50 z-10" />
                </div>
                <div className="flex-1 hidden md:block" />
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-28 px-6 bg-parchment relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="max-w-5xl mx-auto text-center">
          <RevealSection>
            <p className="font-nav text-xs tracking-[0.4em] uppercase text-gold mb-4">Галерея</p>
            <FlowerDivider />
            <h2 className="font-display text-5xl md:text-6xl text-charcoal mt-6 mb-16">
              Наш день
            </h2>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="col-span-2 row-span-2 relative overflow-hidden group" style={{ height: "420px" }}>
                <img
                  src={WEDDING_IMAGE}
                  alt="Wedding"
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {[
                "Место венчания",
                "Цветочное убранство",
                "Детали торжества",
                "Момент счастья",
              ].map((label, i) => (
                <div key={i} className="relative overflow-hidden group" style={{ height: "200px" }}>
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #f0e6d0 0%, #e8d5b0 100%)" }}
                  >
                    <div className="text-center">
                      <div className="text-gold/40 text-3xl mb-2">❀</div>
                      <p className="font-nav text-[10px] tracking-[0.25em] uppercase text-charcoal/40">{label}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 border border-gold/20 group-hover:border-gold/50 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-28 px-6 bg-ivory">
        <div className="max-w-3xl mx-auto text-center">
          <RevealSection>
            <p className="font-nav text-xs tracking-[0.4em] uppercase text-gold mb-4">Контакты</p>
            <FlowerDivider />
            <h2 className="font-display text-5xl md:text-6xl text-charcoal mt-6 mb-6">
              Есть вопросы?
            </h2>
            <p className="font-body text-charcoal/55 text-sm leading-relaxed max-w-lg mx-auto mb-16">
              Для любых вопросов об организации торжества обращайтесь к нашим координаторам
            </p>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              { role: "Организатор торжества", name: "Мария Иванова", phone: "+7 (999) 123-45-67", email: "maria@wedding.ru", icon: "Crown" },
              { role: "Координатор мероприятия", name: "Дмитрий Петров", phone: "+7 (999) 765-43-21", email: "dmitry@wedding.ru", icon: "Star" },
            ].map(({ role, name, phone, email, icon }, i) => (
              <RevealSection key={i} delay={i * 200}>
                <div className="border border-gold/25 p-8 bg-parchment/50 hover:border-gold/60 transition-all duration-500 text-center">
                  <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-4">
                    <Icon name={icon} size={18} className="text-gold" fallback="Star" />
                  </div>
                  <p className="font-nav text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-3">{role}</p>
                  <p className="font-display text-2xl text-charcoal mb-4">{name}</p>
                  <div className="space-y-2">
                    <a href={`tel:${phone}`} className="flex items-center justify-center gap-2 text-charcoal/60 hover:text-gold transition-colors duration-300 text-sm">
                      <Icon name="Phone" size={13} />
                      <span className="font-body tracking-wide">{phone}</span>
                    </a>
                    <a href={`mailto:${email}`} className="flex items-center justify-center gap-2 text-charcoal/60 hover:text-gold transition-colors duration-300 text-sm">
                      <Icon name="Mail" size={13} />
                      <span className="font-body tracking-wide">{email}</span>
                    </a>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={400}>
            <Ornament />
            <p className="font-display text-3xl text-charcoal mt-8 mb-3">
              Будем рады видеть вас
            </p>
            <p className="font-body text-gold text-sm tracking-[0.2em]">
              Александр &amp; Екатерина
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-charcoal text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-12 bg-gold/30" />
          <span className="text-gold/60 text-sm">✦</span>
          <div className="h-px w-12 bg-gold/30" />
        </div>
        <p className="font-display text-2xl text-gold/80 mb-1">14.09.2026</p>
        <p className="font-nav text-[10px] tracking-[0.4em] uppercase text-white/25 mt-3">
          Александр &amp; Екатерина
        </p>
      </footer>
    </div>
  );
}