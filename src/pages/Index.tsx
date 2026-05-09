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
            <span className="font-stamp text-xs text-ink/50 tracking-widest uppercase">Дело № 20-08/2026</span>
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
                  <FieldRow label="Исх. №" value="20-08/2026-БРК" />
                  <FieldRow label="Дата выдачи:" value="01 мая 2026 г." />
                  <FieldRow label="Кому:" value="Уважаемый(-ая) гость" />
                  <FieldRow label="Адрес вручения:" value="по месту нахождения" />
                </div>

                <DashedLine />

                <p className="font-doc text-sm text-ink leading-7 mt-4">
                  Настоящим уведомляем Вас о том, что{" "}
                  <strong className="underline decoration-dotted underline-offset-4">«20» августа 2026 года</strong>{" "}
                  в Отделе записи актов гражданского состояния состоится открытое заседание по делу{" "}
                  <strong>№ 20-08/2026-БРК</strong> по вопросу официального оформления союза граждан:
                </p>

                <div className="mt-6 border-2 border-ink/30 p-6 bg-ink/[0.03] text-center">
                  <p className="font-stamp text-3xl md:text-4xl tracking-[0.1em] text-ink mb-2">
                    Боваев Вадим
                  </p>
                  <p className="font-doc text-ink/50 text-sm tracking-widest mb-2">и</p>
                  <p className="font-stamp text-3xl md:text-4xl tracking-[0.1em] text-ink">
                    Ванке Елизавета
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
                  <FieldRow label="Дата проведения:" value="20 августа 2026 года (четверг)" />
                  <FieldRow label="Время начала:" value="15:30 (явка с 15:00)" />
                  <FieldRow label="Регистрация:" value="Отдел ЗАГС Приморского района" />
                  <FieldRow label="Адрес банкета:" value="Приморское ш., 450" />
                  <FieldRow label="Председатель:" value="Боваев Вадим, гражданин" />
                  <FieldRow label="Ответчик:" value="Ванке Елизавета, гражданка" />
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
                      { time: "15:00", item: "Сбор гостей", status: "обязательно" },
                      { time: "15:30", item: "Официальная часть. Торжественная регистрация брака", status: "ключевое" },
                      { time: "16:00", item: "Фотодокументирование. Прогулка по территории", status: "рекомендовано" },
                      { time: "18:00", item: "Банкетное слушание. Тосты, речи, прения сторон", status: "обязательно" },
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

          {/* SECTION 4 — Дресс-код */}
          <section id="evidence" className="mt-6">
            <Reveal delay={100}>
              <div className="bg-paper border-2 border-ink/20 p-8 md:p-10 shadow-[4px_4px_0_rgba(0,0,0,0.08)]">
                <h2 className="font-stamp text-2xl tracking-[0.2em] text-ink mb-2">
                  ДРЕСС-КОД
                </h2>
                <p className="font-doc text-xs text-ink/40 tracking-widest uppercase mb-2">
                  Приложение № 1 к повестке · Форма одежды участников
                </p>
                <SolidLine />

                <p className="font-doc text-sm text-ink/70 leading-7 mt-5 mb-6">
                  Настоящим предписывается явиться на заседание в соответствии
                  с утверждённой цветовой палитрой. Несоблюдение формы одежды
                  не является основанием для отказа в участии, однако принимается
                  во внимание при фотодокументировании.
                </p>

                {/* Цветовая палитра */}
                <div className="mb-8">
                  <p className="font-doc text-xs text-ink/40 tracking-[0.3em] uppercase mb-4">§ 1. Утверждённая цветовая палитра</p>
                  <div className="grid grid-cols-5 gap-4">
                    {[
                      { hex: "#111111", name: "Чёрный" },
                      { hex: "#FFFFFF", name: "Белый" },
                      { hex: "#B8A99A", name: "Тауп" },
                      { hex: "#A8C4E0", name: "Голубой" },
                      { hex: "#1B2A4A", name: "Тёмно-синий" },
                    ].map(({ hex, name }) => (
                      <div key={hex} className="flex flex-col items-center gap-2">
                        <div
                          className="w-full aspect-square rounded-full border border-ink/15 shadow-inner"
                          style={{ backgroundColor: hex }}
                        />
                        <p className="font-doc text-[10px] text-ink/40 text-center leading-tight tracking-wide">{name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <DashedLine />

                {/* Образы */}
                <div>
                  <p className="font-doc text-xs text-ink/40 tracking-[0.3em] uppercase mb-4">§ 2. Примеры образов (вещественные доказательства)</p>

                  <p className="font-doc text-[10px] text-ink/40 tracking-[0.2em] uppercase mb-3">Женские образы</p>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { src: "https://cdn.poehali.dev/projects/c8aeb29e-8053-47c0-8be8-41c4a813dc78/bucket/63203637-8e5d-447b-91f2-4014f65326c4.jpg", label: "Образ №1", desc: "Пиджак + белая юбка" },
                      { src: "https://cdn.poehali.dev/projects/c8aeb29e-8053-47c0-8be8-41c4a813dc78/bucket/168703be-877d-4574-9314-9090dac2acec.jpg", label: "Образ №2", desc: "Голубой оверсайз-блейзер" },
                      { src: "https://cdn.poehali.dev/projects/c8aeb29e-8053-47c0-8be8-41c4a813dc78/bucket/015554b4-4b96-45b6-8219-12821af4bd65.jpg", label: "Образ №3", desc: "Синяя блуза + белые брюки" },
                    ].map(({ src, label, desc }, i) => (
                      <div key={i} className="border border-ink/15 overflow-hidden group">
                        <div className="aspect-[3/4] overflow-hidden">
                          <img src={src} alt={label} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-2 border-t border-ink/10">
                          <p className="font-stamp text-xs text-ink/50 tracking-wider">{label}</p>
                          <p className="font-doc text-[9px] text-ink/30 mt-0.5 leading-tight">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="font-doc text-[10px] text-ink/40 tracking-[0.2em] uppercase mb-3">Мужские образы</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { src: "https://cdn.poehali.dev/projects/c8aeb29e-8053-47c0-8be8-41c4a813dc78/bucket/254c3ac0-a4d1-4e0b-935e-264f50a90c9a.jpg", label: "Образ №4", desc: "Тёмно-синяя рубашка + белые брюки" },
                      { src: "https://cdn.poehali.dev/projects/c8aeb29e-8053-47c0-8be8-41c4a813dc78/bucket/9ce70ac2-3904-4057-b987-dc7e564f404e.jpg", label: "Образ №5", desc: "Голубая рубашка + чёрные брюки" },
                      { src: "https://cdn.poehali.dev/projects/c8aeb29e-8053-47c0-8be8-41c4a813dc78/bucket/09b139b8-cef4-42b4-ab22-d67041eedc67.jpg", label: "Образ №6", desc: "Тёмно-синий костюм + белая рубашка" },
                    ].map(({ src, label, desc }, i) => (
                      <div key={i} className="border border-ink/15 overflow-hidden group">
                        <div className="aspect-[3/4] overflow-hidden">
                          <img src={src} alt={label} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-2 border-t border-ink/10">
                          <p className="font-stamp text-xs text-ink/50 tracking-wider">{label}</p>
                          <p className="font-doc text-[9px] text-ink/30 mt-0.5 leading-tight">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <DashedLine />
                <p className="font-doc text-xs text-ink/40 italic">
                  * Белый цвет — исключительная прерогатива стороны ответчика.
                  Явка в белом расценивается как нарушение регламента.
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
                    { role: "Со стороны истца", name: "Боваев Вадим", title: "Жених", phone: "+7 (999) 123-45-67", email: "vadim@wedding.ru" },
                    { role: "Со стороны ответчика", name: "Ванке Елизавета", title: "Невеста", phone: "+7 (999) 765-43-21", email: "elizaveta@wedding.ru" },
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
                    <p className="font-stamp text-sm text-ink/60">Боваев Вадим & Ванке Елизавета</p>
                    <p className="font-doc text-[10px] text-ink/30 mt-1">«20» августа 2026 г.</p>
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
                Документ имеет юридическую силу любви · Дело № 20-08/2026-БРК
              </p>
            </Reveal>
          </footer>

        </div>
      </div>
    </div>
  );
}