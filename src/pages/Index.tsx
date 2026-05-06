import { useEffect, useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const BG_TEXTURE = "https://cdn.poehali.dev/projects/c8aeb29e-8053-47c0-8be8-41c4a813dc78/files/eecdf07c-d426-4865-b77a-8f2ab7281089.jpg";

function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

const Stamp = ({ text, color = "red", angle = -12 }: { text: string; color?: "red" | "blue"; angle?: number }) => (
  <div
    className="inline-block border-4 px-4 py-1 font-stamp text-2xl tracking-widest uppercase select-none"
    style={{
      transform: `rotate(${angle}deg)`,
      borderColor: color === "red" ? "#c0392b" : "#1a3a6b",
      color: color === "red" ? "#c0392b" : "#1a3a6b",
      opacity: 0.75,
      textShadow: "1px 1px 0px rgba(0,0,0,0.1)",
      fontFamily: "'Special Elite', monospace",
      letterSpacing: "0.15em",
    }}
  >
    {text}
  </div>
);

const DashedLine = () => (
  <div className="border-t-2 border-dashed border-ink/25 my-4" />
);

const SolidLine = () => (
  <div className="border-t border-ink/40 my-2" />
);

const FieldRow = ({ label, value, underline = true }: { label: string; value: string; underline?: boolean }) => (
  <div className="flex items-end gap-2 mb-3">
    <span className="font-doc text-sm text-ink/70 whitespace-nowrap flex-shrink-0">{label}</span>
    <div className={`flex-1 ${underline ? "border-b border-ink/40" : ""} pb-0.5`}>
      <span className="font-doc text-sm text-ink font-semibold tracking-wide">{value}</span>
    </div>
  </div>
);

export default function Index() {
  const [typed, setTyped] = useState("");
  const fullText = "ПОВЕСТКА";
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTyped(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen font-doc text-ink"
      style={{
        backgroundImage: `url(${BG_TEXTURE})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundColor: "#f2ead8",
      }}
    >
      {/* Overlay */}
      <div className="min-h-screen" style={{ background: "rgba(242, 234, 210, 0.88)" }}>

        {/* NAV — номер дела */}
        <header className="sticky top-0 z-30 border-b-2 border-ink/30 bg-paper/90 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto px-6 py-2 flex items-center justify-between">
            <span className="font-stamp text-xs text-ink/50 tracking-widest uppercase">Дело № 14-09/2026</span>
            <div className="flex gap-6">
              {[["notice","Повестка"],["hearing","Заседание"],["schedule","Регламент"],["evidence","Материалы"],["contacts","Явка"]].map(([id, label]) => (
                <button key={id} onClick={() => scrollTo(id)}
                  className="font-doc text-xs text-ink/50 hover:text-ink transition-colors tracking-wider uppercase hidden md:block">
                  {label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 space-y-0">

          {/* SECTION 1 — Официальная шапка */}
          <section id="notice">
            <Reveal>
              <div className="bg-paper border-2 border-ink/20 p-8 md:p-12 shadow-[4px_4px_0_rgba(0,0,0,0.08)] relative">

                {/* Штамп угловой */}
                <div className="absolute top-6 right-6 opacity-60">
                  <Stamp text="СРОЧНО" color="red" angle={8} />
                </div>

                {/* Герб / лого */}
                <div className="text-center mb-6">
                  <div className="inline-flex flex-col items-center gap-1">
                    <div className="text-5xl select-none">⚖️</div>
                    <p className="font-stamp text-[10px] tracking-[0.4em] uppercase text-ink/50 mt-1">
                      Российская Федерация
                    </p>
                    <p className="font-stamp text-[10px] tracking-[0.35em] uppercase text-ink/50">
                      Отдел ЗАГС Центрального района
                    </p>
                  </div>
                </div>

                <SolidLine />
                <SolidLine />

                <div className="text-center my-8">
                  <h1 className="font-stamp text-6xl md:text-8xl tracking-[0.3em] text-ink">
                    {typed}<span className="animate-pulse">_</span>
                  </h1>
                  <p className="font-doc text-sm text-ink/60 mt-3 tracking-widest uppercase">
                    о вызове на слушание по делу о заключении брака
                  </p>
                </div>

                <SolidLine />
                <SolidLine />

                <div className="mt-8 space-y-0">
                  <FieldRow label="Исх. №" value="14-09/2026-БРК" />
                  <FieldRow label="Дата выдачи:" value="01 мая 2026 г." />
                  <FieldRow label="Кому:" value="Уважаемый(-ая) гость" />
                  <FieldRow label="Адрес вручения:" value="по месту нахождения" />
                </div>

                <DashedLine />

                <p className="font-doc text-sm text-ink leading-7 mt-4">
                  Настоящим уведомляем Вас о том, что{" "}
                  <strong className="underline decoration-dotted underline-offset-4">«14» сентября 2026 года</strong>{" "}
                  в Отделе записи актов гражданского состояния состоится открытое заседание по делу{" "}
                  <strong>№ 14-09/2026-БРК</strong> по вопросу официального оформления союза граждан:
                </p>

                <div className="mt-6 border-2 border-ink/30 p-6 bg-ink/[0.03] text-center">
                  <p className="font-stamp text-3xl md:text-4xl tracking-[0.1em] text-ink mb-2">
                    Александр Смирнов
                  </p>
                  <p className="font-doc text-ink/50 text-sm tracking-widest mb-2">и</p>
                  <p className="font-stamp text-3xl md:text-4xl tracking-[0.1em] text-ink">
                    Екатерина Новикова
                  </p>
                </div>

                <p className="font-doc text-sm text-ink/70 leading-7 mt-6">
                  Ваше <strong>присутствие обязательно</strong>. Неявка без уважительной причины
                  расценивается как неуважение к торжеству и влечёт лишение права на{" "}
                  <span className="underline decoration-dotted underline-offset-2">бесплатный банкет</span>.
                </p>

                <div className="flex justify-end mt-8">
                  <div className="text-right">
                    <p className="font-doc text-xs text-ink/40 mb-6">Подпись уполномоченного лица:</p>
                    <div className="border-b border-ink/30 w-48 mb-1" />
                    <p className="font-doc text-xs text-ink/40">М.П.</p>
                  </div>
                </div>

              </div>
            </Reveal>
          </section>

          {/* SECTION 2 — Дата и место */}
          <section id="hearing" className="mt-6">
            <Reveal delay={100}>
              <div className="bg-paper border-2 border-ink/20 p-8 md:p-10 shadow-[4px_4px_0_rgba(0,0,0,0.08)] relative">
                <div className="absolute top-5 left-5 opacity-50">
                  <Stamp text="ПОДТВЕРЖДЕНО" color="blue" angle={-4} />
                </div>

                <h2 className="font-stamp text-2xl tracking-[0.2em] text-ink mb-2 mt-8">
                  СВЕДЕНИЯ О ЗАСЕДАНИИ
                </h2>
                <SolidLine />

                <div className="mt-6 space-y-0">
                  <FieldRow label="Дата проведения:" value="14 сентября 2026 года (воскресенье)" />
                  <FieldRow label="Время начала:" value="16:00 (явка с 15:30)" />
                  <FieldRow label="Адрес:" value="Усадьба Архангельское, Московская обл." />
                  <FieldRow label="Председатель:" value="Александр Смирнов, гражданин" />
                  <FieldRow label="Ответчик:" value="Екатерина Новикова, гражданка" />
                  <FieldRow label="Характер дела:" value="Добровольное и по обоюдному согласию" />
                </div>

                <DashedLine />

                <div className="grid grid-cols-3 gap-4 mt-4">
                  {[
                    { num: "01", text: "Прибыть по указанному адресу" },
                    { num: "02", text: "Иметь при себе праздничное настроение" },
                    { num: "03", text: "Подготовить поздравительную речь" },
                  ].map(({ num, text }) => (
                    <div key={num} className="border border-ink/20 p-4 text-center">
                      <p className="font-stamp text-3xl text-ink/20 mb-2">{num}</p>
                      <p className="font-doc text-xs text-ink/70 leading-5">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          {/* SECTION 3 — Регламент / Программа */}
          <section id="schedule" className="mt-6">
            <Reveal delay={100}>
              <div className="bg-paper border-2 border-ink/20 p-8 md:p-10 shadow-[4px_4px_0_rgba(0,0,0,0.08)]">
                <h2 className="font-stamp text-2xl tracking-[0.2em] text-ink mb-2">
                  РЕГЛАМЕНТ ЗАСЕДАНИЯ
                </h2>
                <SolidLine />

                <table className="w-full mt-6 border-collapse">
                  <thead>
                    <tr className="border-b-2 border-ink/30">
                      <th className="font-doc text-xs text-ink/50 tracking-widest uppercase text-left py-2 w-24">Время</th>
                      <th className="font-doc text-xs text-ink/50 tracking-widest uppercase text-left py-2">Пункт повестки</th>
                      <th className="font-doc text-xs text-ink/50 tracking-widest uppercase text-right py-2 hidden md:table-cell">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { time: "15:30", item: "Регистрация участников. Фуршет и сбор гостей", status: "обязательно" },
                      { time: "16:00", item: "Официальная часть. Торжественная регистрация брака", status: "ключевое" },
                      { time: "17:00", item: "Фотодокументирование. Прогулка по территории", status: "рекомендовано" },
                      { time: "18:00", item: "Банкетное слушание. Тосты, речи, прения сторон", status: "обязательно" },
                      { time: "22:00", item: "Свободные прения. Танцевальный регламент", status: "бессрочно" },
                    ].map(({ time, item, status }, i) => (
                      <tr key={i} className="border-b border-ink/15 hover:bg-ink/[0.02] transition-colors">
                        <td className="font-stamp text-lg text-ink py-3 pr-4">{time}</td>
                        <td className="font-doc text-sm text-ink/80 py-3 leading-5">{item}</td>
                        <td className="py-3 text-right hidden md:table-cell">
                          <span className="font-doc text-[10px] tracking-widest uppercase text-ink/40 border border-ink/20 px-2 py-0.5">
                            {status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className="font-doc text-xs text-ink/40 mt-6 italic">
                  * Администрация оставляет за собой право изменить порядок пунктов по согласованию сторон.
                </p>
              </div>
            </Reveal>
          </section>

          {/* SECTION 4 — Галерея / Материалы дела */}
          <section id="evidence" className="mt-6">
            <Reveal delay={100}>
              <div className="bg-paper border-2 border-ink/20 p-8 md:p-10 shadow-[4px_4px_0_rgba(0,0,0,0.08)]">
                <h2 className="font-stamp text-2xl tracking-[0.2em] text-ink mb-2">
                  МАТЕРИАЛЫ ДЕЛА
                </h2>
                <p className="font-doc text-xs text-ink/40 tracking-widest uppercase mb-2">Фотоприложения и вещественные доказательства</p>
                <SolidLine />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                  {[
                    { label: "Прил. №1", desc: "Место проведения" },
                    { label: "Прил. №2", desc: "Флористика" },
                    { label: "Прил. №3", desc: "Детали убранства" },
                    { label: "Прил. №4", desc: "Стороны дела" },
                  ].map(({ label, desc }, i) => (
                    <div key={i} className="border-2 border-dashed border-ink/20 aspect-square flex flex-col items-center justify-center text-center p-3 hover:border-ink/40 transition-colors cursor-pointer group">
                      <Icon name="FileImage" size={28} className="text-ink/20 group-hover:text-ink/40 transition-colors mb-2" />
                      <p className="font-stamp text-xs text-ink/40 tracking-wider">{label}</p>
                      <p className="font-doc text-[10px] text-ink/30 mt-1">{desc}</p>
                      <p className="font-doc text-[9px] text-ink/20 mt-2 uppercase tracking-wider">скоро</p>
                    </div>
                  ))}
                </div>

                <DashedLine />
                <p className="font-doc text-xs text-ink/40 italic">
                  Фотоматериалы будут приобщены к делу после проведения заседания.
                  Все приложения являются неотъемлемой частью настоящей повестки.
                </p>
              </div>
            </Reveal>
          </section>

          {/* SECTION 5 — Контакты / Явка */}
          <section id="contacts" className="mt-6">
            <Reveal delay={100}>
              <div className="bg-paper border-2 border-ink/20 p-8 md:p-10 shadow-[4px_4px_0_rgba(0,0,0,0.08)] relative">

                <h2 className="font-stamp text-2xl tracking-[0.2em] text-ink mb-2">
                  ЯВКА И СВЯЗЬ
                </h2>
                <SolidLine />

                <p className="font-doc text-sm text-ink/70 leading-7 mt-4 mb-6">
                  По всем вопросам, связанным с настоящим делом, просим обращаться
                  к уполномоченным представителям сторон:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { role: "Со стороны истца", name: "Мария Иванова", title: "Организатор торжества", phone: "+7 (999) 123-45-67", email: "maria@wedding.ru" },
                    { role: "Со стороны ответчика", name: "Дмитрий Петров", title: "Координатор мероприятия", phone: "+7 (999) 765-43-21", email: "dmitry@wedding.ru" },
                  ].map(({ role, name, title, phone, email }, i) => (
                    <div key={i} className="border border-ink/20 p-5">
                      <p className="font-doc text-[10px] tracking-[0.3em] uppercase text-ink/40 mb-3">{role}</p>
                      <p className="font-stamp text-xl text-ink mb-1">{name}</p>
                      <p className="font-doc text-xs text-ink/50 mb-4 italic">{title}</p>
                      <div className="space-y-2">
                        <a href={`tel:${phone}`} className="flex items-center gap-2 text-ink/60 hover:text-ink transition-colors">
                          <Icon name="Phone" size={12} />
                          <span className="font-doc text-sm">{phone}</span>
                        </a>
                        <a href={`mailto:${email}`} className="flex items-center gap-2 text-ink/60 hover:text-ink transition-colors">
                          <Icon name="Mail" size={12} />
                          <span className="font-doc text-sm">{email}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <DashedLine />

                {/* Подтверждение явки */}
                <div className="mt-4">
                  <p className="font-doc text-sm text-ink/70 mb-4">
                    Прошу подтвердить получение настоящей повестки и своё участие в заседании:
                  </p>
                  {!confirmed ? (
                    <button
                      onClick={() => setConfirmed(true)}
                      className="w-full border-2 border-ink/40 hover:bg-ink hover:text-paper transition-all duration-300 py-4 font-stamp text-xl tracking-[0.2em] uppercase group"
                    >
                      <span className="group-hover:opacity-100">✓ Явку подтверждаю</span>
                    </button>
                  ) : (
                    <div className="w-full border-2 border-ink/30 py-4 text-center relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Stamp text="ЯВКА ПОДТВЕРЖДЕНА" color="blue" angle={-2} />
                      </div>
                      <span className="font-stamp text-xl tracking-[0.2em] uppercase opacity-0">placeholder</span>
                    </div>
                  )}
                </div>

                {/* Подпись и печать */}
                <div className="flex items-end justify-between mt-10">
                  <div>
                    <p className="font-doc text-xs text-ink/40 mb-1">Исполнитель:</p>
                    <p className="font-stamp text-sm text-ink/60">Александр & Екатерина</p>
                    <p className="font-doc text-[10px] text-ink/30 mt-1">«14» сентября 2026 г.</p>
                  </div>
                  <div className="text-center opacity-40 select-none">
                    <div
                      className="w-20 h-20 rounded-full border-4 border-ink/60 flex items-center justify-center relative"
                      style={{ transform: "rotate(-15deg)" }}
                    >
                      <div className="absolute inset-2 rounded-full border border-ink/40" />
                      <p className="font-stamp text-[8px] tracking-wider text-ink/80 text-center leading-tight px-1">
                        ЗАГС<br/>М.П.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </Reveal>
          </section>

          {/* Footer */}
          <footer className="mt-6 pb-12 text-center">
            <Reveal delay={200}>
              <p className="font-doc text-xs text-ink/30 tracking-widest uppercase">
                Документ имеет юридическую силу любви · Дело № 14-09/2026-БРК
              </p>
            </Reveal>
          </footer>

        </div>
      </div>
    </div>
  );
}
