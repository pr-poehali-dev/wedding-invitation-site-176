import { useEffect, useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const BG_TEXTURE = "https://cdn.poehali.dev/projects/c8aeb29e-8053-47c0-8be8-41c4a813dc78/files/1e2a1ade-9b46-4c41-bd48-3bbcec701bdd.jpg";

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
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

const GoldLine = () => (
  <div className="flex items-center gap-3 my-6">
    <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #C9A84C)" }} />
    <div className="w-1 h-1 rounded-full" style={{ background: "#C9A84C" }} />
    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C9A84C" }} />
    <div className="w-1 h-1 rounded-full" style={{ background: "#C9A84C" }} />
    <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #C9A84C)" }} />
  </div>
);

const ThinLine = () => (
  <div className="h-px my-5" style={{ background: "rgba(201,168,76,0.25)" }} />
);

const FieldRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-end gap-3 mb-4">
    <span className="font-doc text-xs tracking-widest uppercase flex-shrink-0" style={{ color: "#C9A84C", minWidth: "140px" }}>{label}</span>
    <div className="flex-1 border-b pb-0.5" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
      <span className="font-doc text-sm text-white/80 tracking-wide">{value}</span>
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
      className="min-h-screen font-doc"
      style={{
        backgroundImage: `url(${BG_TEXTURE})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundColor: "#0f1932",
      }}
    >
      <div className="min-h-screen" style={{ background: "rgba(10, 18, 40, 0.82)" }}>

        {/* NAV */}
        <header className="sticky top-0 z-30 backdrop-blur-md border-b" style={{ borderColor: "rgba(201,168,76,0.15)", background: "rgba(10,18,40,0.9)" }}>
          <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
            <span className="font-stamp text-xs tracking-[0.3em] uppercase" style={{ color: "rgba(201,168,76,0.5)" }}>
              В &amp; Е · 20.08.2026
            </span>
            <div className="flex gap-6">
              {[["notice","Повестка"],["hearing","Заседание"],["schedule","Регламент"],["evidence","Дресс-код"],["contacts","Явка"]].map(([id, label]) => (
                <button key={id} onClick={() => scrollTo(id)}
                  className="font-doc text-xs tracking-widest uppercase transition-colors hidden md:block"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#C9A84C")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 md:px-6 py-16 space-y-6">

          {/* SECTION 1 — Шапка */}
          <section id="notice">
            <Reveal>
              <div className="relative p-8 md:p-14" style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(201,168,76,0.3)",
                boxShadow: "0 0 60px rgba(0,0,0,0.4), inset 0 0 60px rgba(201,168,76,0.02)"
              }}>
                {/* Угловые декоры */}
                {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-6 h-6`} style={{
                    borderTop: i < 2 ? "2px solid #C9A84C" : "none",
                    borderBottom: i >= 2 ? "2px solid #C9A84C" : "none",
                    borderLeft: i % 2 === 0 ? "2px solid #C9A84C" : "none",
                    borderRight: i % 2 === 1 ? "2px solid #C9A84C" : "none",
                  }} />
                ))}

                {/* Монограмма */}
                <div className="text-center mb-8">
                  <div className="inline-flex flex-col items-center gap-2">
                    <div className="relative">
                      <span className="font-stamp text-5xl md:text-6xl tracking-widest select-none" style={{ color: "#C9A84C", letterSpacing: "0.15em" }}>
                        В &amp; Е
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="h-px w-12" style={{ background: "rgba(201,168,76,0.4)" }} />
                      <p className="font-stamp text-[9px] tracking-[0.5em] uppercase" style={{ color: "rgba(201,168,76,0.6)" }}>
                        Отдел ЗАГС Приморского района
                      </p>
                      <div className="h-px w-12" style={{ background: "rgba(201,168,76,0.4)" }} />
                    </div>
                  </div>
                </div>

                <GoldLine />

                <div className="text-center my-10">
                  <h1 className="font-stamp tracking-[0.5em] text-white" style={{ fontSize: "clamp(2.5rem, 10vw, 5.5rem)" }}>
                    {typed}<span className="animate-pulse" style={{ color: "#C9A84C" }}>|</span>
                  </h1>
                  <p className="font-doc text-xs mt-4 tracking-[0.35em] uppercase" style={{ color: "rgba(201,168,76,0.7)" }}>
                    о вызове на слушание по делу о заключении брака
                  </p>
                </div>

                <GoldLine />

                <div className="mt-8">
                  <FieldRow label="Исх. №" value="20-08/2026-БРК" />
                  <FieldRow label="Дата выдачи:" value="01 мая 2026 г." />
                  <FieldRow label="Кому:" value="Уважаемый(-ая) гость" />
                  <FieldRow label="Адрес вручения:" value="по месту нахождения" />
                </div>

                <ThinLine />

                <p className="font-doc text-sm leading-8 mt-2" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Настоящим уведомляем Вас о том, что{" "}
                  <span className="text-white font-semibold" style={{ borderBottom: "1px solid rgba(201,168,76,0.5)", paddingBottom: "1px" }}>«20» августа 2026 года</span>{" "}
                  в Отделе записи актов гражданского состояния состоится открытое заседание по делу{" "}
                  <span className="text-white">№ 20-08/2026-БРК</span> по вопросу официального оформления союза граждан:
                </p>

                <div className="mt-8 py-8 px-6 text-center relative" style={{ border: "1px solid rgba(201,168,76,0.25)" }}>
                  <div className="absolute -top-px left-1/2 -translate-x-1/2 px-4" style={{ background: "rgba(10,18,40,0.9)" }}>
                    <span className="font-doc text-[9px] tracking-[0.4em] uppercase" style={{ color: "rgba(201,168,76,0.5)" }}>стороны дела</span>
                  </div>
                  <p className="font-stamp text-3xl md:text-4xl text-white mb-3" style={{ letterSpacing: "0.08em" }}>
                    Боваев Вадим
                  </p>
                  <div className="flex items-center justify-center gap-4 my-3">
                    <div className="h-px w-16" style={{ background: "rgba(201,168,76,0.3)" }} />
                    <span className="font-stamp text-lg" style={{ color: "#C9A84C" }}>&amp;</span>
                    <div className="h-px w-16" style={{ background: "rgba(201,168,76,0.3)" }} />
                  </div>
                  <p className="font-stamp text-3xl md:text-4xl text-white" style={{ letterSpacing: "0.08em" }}>
                    Ванке Елизавета
                  </p>
                </div>

                <p className="font-doc text-sm leading-8 mt-8" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Ваше <span className="text-white/80">присутствие обязательно</span>. Неявка без уважительной причины
                  расценивается как неуважение к торжеству и влечёт лишение права на{" "}
                  <span style={{ borderBottom: "1px dotted rgba(201,168,76,0.5)", paddingBottom: "1px", color: "rgba(255,255,255,0.7)" }}>бесплатный банкет</span>.
                </p>

                <div className="flex justify-end mt-10">
                  <div className="text-right">
                    <p className="font-doc text-xs mb-8" style={{ color: "rgba(255,255,255,0.25)" }}>Подпись уполномоченного лица:</p>
                    <div className="w-48 h-px mb-1" style={{ background: "rgba(201,168,76,0.25)" }} />
                    <p className="font-doc text-xs" style={{ color: "rgba(201,168,76,0.4)" }}>М.П.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* SECTION 2 — Сведения */}
          <section id="hearing">
            <Reveal delay={100}>
              <div className="relative p-8 md:p-10" style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(201,168,76,0.3)",
                boxShadow: "0 0 40px rgba(0,0,0,0.3)"
              }}>
                {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-5 h-5`} style={{
                    borderTop: i < 2 ? "2px solid rgba(201,168,76,0.5)" : "none",
                    borderBottom: i >= 2 ? "2px solid rgba(201,168,76,0.5)" : "none",
                    borderLeft: i % 2 === 0 ? "2px solid rgba(201,168,76,0.5)" : "none",
                    borderRight: i % 2 === 1 ? "2px solid rgba(201,168,76,0.5)" : "none",
                  }} />
                ))}

                <h2 className="font-stamp text-2xl tracking-[0.25em] text-white mb-1">СВЕДЕНИЯ О ЗАСЕДАНИИ</h2>
                <div className="h-px mb-6" style={{ background: "rgba(201,168,76,0.25)" }} />

                <div className="mt-4">
                  <FieldRow label="Дата проведения:" value="20 августа 2026 года (четверг)" />
                  <FieldRow label="Время начала:" value="15:30 (явка с 15:00)" />
                  <FieldRow label="Регистрация:" value="Отдел ЗАГС Приморского района" />
                  <FieldRow label="Адрес банкета:" value="Приморское ш., 450" />
                  <FieldRow label="Председатель:" value="Боваев Вадим, гражданин" />
                  <FieldRow label="Ответчик:" value="Ванке Елизавета, гражданка" />
                  <FieldRow label="Характер дела:" value="Добровольное и по обоюдному согласию" />
                </div>

                <GoldLine />

                <div className="grid grid-cols-3 gap-4 mt-2">
                  {[
                    { num: "01", text: "Прибыть по указанному адресу" },
                    { num: "02", text: "Иметь при себе праздничное настроение" },
                    { num: "03", text: "Подготовить поздравительную речь" },
                  ].map(({ num, text }) => (
                    <div key={num} className="text-center p-4" style={{ border: "1px solid rgba(201,168,76,0.15)" }}>
                      <p className="font-stamp text-3xl mb-2" style={{ color: "rgba(201,168,76,0.2)" }}>{num}</p>
                      <p className="font-doc text-xs leading-5" style={{ color: "rgba(255,255,255,0.5)" }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          {/* SECTION 3 — Регламент */}
          <section id="schedule">
            <Reveal delay={100}>
              <div className="relative p-8 md:p-10" style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(201,168,76,0.3)",
                boxShadow: "0 0 40px rgba(0,0,0,0.3)"
              }}>
                {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-5 h-5`} style={{
                    borderTop: i < 2 ? "2px solid rgba(201,168,76,0.5)" : "none",
                    borderBottom: i >= 2 ? "2px solid rgba(201,168,76,0.5)" : "none",
                    borderLeft: i % 2 === 0 ? "2px solid rgba(201,168,76,0.5)" : "none",
                    borderRight: i % 2 === 1 ? "2px solid rgba(201,168,76,0.5)" : "none",
                  }} />
                ))}

                <h2 className="font-stamp text-2xl tracking-[0.25em] text-white mb-1">РЕГЛАМЕНТ ЗАСЕДАНИЯ</h2>
                <div className="h-px mb-6" style={{ background: "rgba(201,168,76,0.25)" }} />

                <table className="w-full mt-2 border-collapse">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
                      <th className="font-doc text-xs tracking-widest uppercase text-left py-2 w-24" style={{ color: "rgba(201,168,76,0.5)" }}>Время</th>
                      <th className="font-doc text-xs tracking-widest uppercase text-left py-2" style={{ color: "rgba(201,168,76,0.5)" }}>Пункт повестки</th>
                      <th className="font-doc text-xs tracking-widest uppercase text-right py-2 hidden md:table-cell" style={{ color: "rgba(201,168,76,0.5)" }}>Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { time: "15:00", item: "Сбор гостей", status: "обязательно" },
                      { time: "15:30", item: "Официальная часть. Торжественная регистрация брака", status: "ключевое" },
                      { time: "16:00", item: "Фотодокументирование. Прогулка по территории", status: "рекомендовано" },
                      { time: "18:00", item: "Банкетное слушание. Тосты, речи, прения сторон", status: "обязательно" },
                    ].map(({ time, item, status }, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <td className="font-stamp text-xl py-4 pr-4" style={{ color: "#C9A84C" }}>{time}</td>
                        <td className="font-doc text-sm py-4 leading-5" style={{ color: "rgba(255,255,255,0.7)" }}>{item}</td>
                        <td className="py-4 text-right hidden md:table-cell">
                          <span className="font-doc text-[10px] tracking-widest uppercase px-2 py-0.5" style={{ color: "rgba(201,168,76,0.5)", border: "1px solid rgba(201,168,76,0.2)" }}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className="font-doc text-xs mt-6 italic" style={{ color: "rgba(255,255,255,0.2)" }}>
                  * Администрация оставляет за собой право изменить порядок пунктов по согласованию сторон.
                </p>
              </div>
            </Reveal>
          </section>

          {/* SECTION 4 — Дресс-код */}
          <section id="evidence">
            <Reveal delay={100}>
              <div className="relative p-8 md:p-10" style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(201,168,76,0.3)",
                boxShadow: "0 0 40px rgba(0,0,0,0.3)"
              }}>
                {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-5 h-5`} style={{
                    borderTop: i < 2 ? "2px solid rgba(201,168,76,0.5)" : "none",
                    borderBottom: i >= 2 ? "2px solid rgba(201,168,76,0.5)" : "none",
                    borderLeft: i % 2 === 0 ? "2px solid rgba(201,168,76,0.5)" : "none",
                    borderRight: i % 2 === 1 ? "2px solid rgba(201,168,76,0.5)" : "none",
                  }} />
                ))}

                <h2 className="font-stamp text-2xl tracking-[0.25em] text-white mb-1">ДРЕСС-КОД</h2>
                <p className="font-doc text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(201,168,76,0.5)" }}>
                  Приложение № 1 · Форма одежды участников
                </p>
                <div className="h-px mb-6" style={{ background: "rgba(201,168,76,0.25)" }} />

                <p className="font-doc text-sm leading-8 mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Настоящим предписывается явиться на заседание в соответствии
                  с утверждённой цветовой палитрой. Несоблюдение формы одежды
                  не является основанием для отказа в участии, однако принимается
                  во внимание при фотодокументировании.
                </p>

                {/* Палитра */}
                <p className="font-doc text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: "rgba(201,168,76,0.5)" }}>§ 1. Утверждённая цветовая палитра</p>
                <div className="grid grid-cols-5 gap-4 mb-10">
                  {[
                    { hex: "#111111", name: "Чёрный" },
                    { hex: "#FFFFFF", name: "Белый" },
                    { hex: "#B8A99A", name: "Тауп" },
                    { hex: "#A8C4E0", name: "Голубой" },
                    { hex: "#1B2A4A", name: "Тёмно-синий" },
                  ].map(({ hex, name }) => (
                    <div key={hex} className="flex flex-col items-center gap-2">
                      <div
                        className="w-full aspect-square rounded-full"
                        style={{ backgroundColor: hex, border: "1px solid rgba(201,168,76,0.2)", boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
                      />
                      <p className="font-doc text-[10px] text-center" style={{ color: "rgba(255,255,255,0.35)" }}>{name}</p>
                    </div>
                  ))}
                </div>

                <ThinLine />

                {/* Образы женские */}
                <p className="font-doc text-[10px] tracking-[0.35em] uppercase mb-4 mt-6" style={{ color: "rgba(201,168,76,0.5)" }}>§ 2. Женские образы</p>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { src: "https://cdn.poehali.dev/projects/c8aeb29e-8053-47c0-8be8-41c4a813dc78/bucket/63203637-8e5d-447b-91f2-4014f65326c4.jpg", label: "Образ №1", desc: "Пиджак + белая юбка" },
                    { src: "https://cdn.poehali.dev/projects/c8aeb29e-8053-47c0-8be8-41c4a813dc78/bucket/168703be-877d-4574-9314-9090dac2acec.jpg", label: "Образ №2", desc: "Голубой оверсайз-блейзер" },
                    { src: "https://cdn.poehali.dev/projects/c8aeb29e-8053-47c0-8be8-41c4a813dc78/bucket/015554b4-4b96-45b6-8219-12821af4bd65.jpg", label: "Образ №3", desc: "Синяя блуза + белые брюки" },
                  ].map(({ src, label, desc }, i) => (
                    <div key={i} className="overflow-hidden group" style={{ border: "1px solid rgba(201,168,76,0.2)" }}>
                      <div className="aspect-[3/4] overflow-hidden">
                        <img src={src} alt={label} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      <div className="p-3" style={{ borderTop: "1px solid rgba(201,168,76,0.15)", background: "rgba(0,0,0,0.2)" }}>
                        <p className="font-stamp text-xs tracking-wider" style={{ color: "rgba(201,168,76,0.7)" }}>{label}</p>
                        <p className="font-doc text-[10px] mt-0.5 leading-tight" style={{ color: "rgba(255,255,255,0.35)" }}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Образы мужские */}
                <p className="font-doc text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: "rgba(201,168,76,0.5)" }}>§ 3. Мужские образы</p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { src: "https://cdn.poehali.dev/projects/c8aeb29e-8053-47c0-8be8-41c4a813dc78/bucket/254c3ac0-a4d1-4e0b-935e-264f50a90c9a.jpg", label: "Образ №4", desc: "Тёмно-синяя рубашка + белые брюки" },
                    { src: "https://cdn.poehali.dev/projects/c8aeb29e-8053-47c0-8be8-41c4a813dc78/bucket/9ce70ac2-3904-4057-b987-dc7e564f404e.jpg", label: "Образ №5", desc: "Голубая рубашка + чёрные брюки" },
                    { src: "https://cdn.poehali.dev/projects/c8aeb29e-8053-47c0-8be8-41c4a813dc78/bucket/09b139b8-cef4-42b4-ab22-d67041eedc67.jpg", label: "Образ №6", desc: "Тёмно-синий костюм + белая рубашка" },
                  ].map(({ src, label, desc }, i) => (
                    <div key={i} className="overflow-hidden group" style={{ border: "1px solid rgba(201,168,76,0.2)" }}>
                      <div className="aspect-[3/4] overflow-hidden">
                        <img src={src} alt={label} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      <div className="p-3" style={{ borderTop: "1px solid rgba(201,168,76,0.15)", background: "rgba(0,0,0,0.2)" }}>
                        <p className="font-stamp text-xs tracking-wider" style={{ color: "rgba(201,168,76,0.7)" }}>{label}</p>
                        <p className="font-doc text-[10px] mt-0.5 leading-tight" style={{ color: "rgba(255,255,255,0.35)" }}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <ThinLine />
                <p className="font-doc text-xs italic" style={{ color: "rgba(255,255,255,0.2)" }}>
                  * Белый цвет — исключительная прерогатива стороны ответчика. Явка в белом расценивается как нарушение регламента.
                </p>
              </div>
            </Reveal>
          </section>

          {/* SECTION 5 — Явка и связь */}
          <section id="contacts">
            <Reveal delay={100}>
              <div className="relative p-8 md:p-10" style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(201,168,76,0.3)",
                boxShadow: "0 0 40px rgba(0,0,0,0.3)"
              }}>
                {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-5 h-5`} style={{
                    borderTop: i < 2 ? "2px solid rgba(201,168,76,0.5)" : "none",
                    borderBottom: i >= 2 ? "2px solid rgba(201,168,76,0.5)" : "none",
                    borderLeft: i % 2 === 0 ? "2px solid rgba(201,168,76,0.5)" : "none",
                    borderRight: i % 2 === 1 ? "2px solid rgba(201,168,76,0.5)" : "none",
                  }} />
                ))}

                <h2 className="font-stamp text-2xl tracking-[0.25em] text-white mb-1">ЯВКА И СВЯЗЬ</h2>
                <div className="h-px mb-6" style={{ background: "rgba(201,168,76,0.25)" }} />

                <p className="font-doc text-sm leading-7 mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
                  По всем вопросам, связанным с настоящим делом, просим обращаться
                  к уполномоченным представителям сторон:
                </p>

                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    { role: "Со стороны истца", name: "Боваев Вадим", title: "Жених", phone: "+7 (999) 123-45-67", email: "vadim@wedding.ru" },
                    { role: "Со стороны ответчика", name: "Ванке Елизавета", title: "Невеста", phone: "+7 (999) 765-43-21", email: "elizaveta@wedding.ru" },
                  ].map(({ role, name, title, phone, email }, i) => (
                    <div key={i} className="p-5" style={{ border: "1px solid rgba(201,168,76,0.2)" }}>
                      <p className="font-doc text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "rgba(201,168,76,0.5)" }}>{role}</p>
                      <p className="font-stamp text-xl text-white mb-1">{name}</p>
                      <p className="font-doc text-xs italic mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>{title}</p>
                      <div className="space-y-2">
                        <a href={`tel:${phone}`} className="flex items-center gap-2 transition-colors group/link" style={{ color: "rgba(255,255,255,0.45)" }}>
                          <Icon name="Phone" size={12} />
                          <span className="font-doc text-sm group-hover/link:text-white transition-colors">{phone}</span>
                        </a>
                        <a href={`mailto:${email}`} className="flex items-center gap-2 transition-colors group/link" style={{ color: "rgba(255,255,255,0.45)" }}>
                          <Icon name="Mail" size={12} />
                          <span className="font-doc text-sm group-hover/link:text-white transition-colors">{email}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <GoldLine />

                <p className="font-doc text-sm mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Прошу подтвердить получение настоящей повестки и своё участие в заседании:
                </p>

                {!confirmed ? (
                  <button
                    onClick={() => setConfirmed(true)}
                    className="w-full py-4 font-stamp text-xl tracking-[0.25em] uppercase transition-all duration-500"
                    style={{ border: "1px solid rgba(201,168,76,0.4)", color: "rgba(201,168,76,0.8)", background: "transparent" }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "rgba(201,168,76,0.1)";
                      e.currentTarget.style.color = "#C9A84C";
                      e.currentTarget.style.borderColor = "#C9A84C";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "rgba(201,168,76,0.8)";
                      e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
                    }}
                  >
                    ✓ Явку подтверждаю
                  </button>
                ) : (
                  <div className="w-full py-4 text-center" style={{ border: "1px solid rgba(201,168,76,0.3)" }}>
                    <span className="font-stamp text-xl tracking-[0.25em] uppercase" style={{ color: "#C9A84C" }}>
                      ✓ Явка подтверждена
                    </span>
                  </div>
                )}

                <div className="flex items-end justify-between mt-12">
                  <div>
                    <p className="font-doc text-xs mb-2" style={{ color: "rgba(255,255,255,0.2)" }}>Исполнитель:</p>
                    <p className="font-stamp text-sm" style={{ color: "rgba(201,168,76,0.6)" }}>Боваев Вадим & Ванке Елизавета</p>
                    <p className="font-doc text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>«20» августа 2026 г.</p>
                  </div>
                  <div className="opacity-30 select-none">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center relative"
                      style={{ border: "2px solid rgba(201,168,76,0.6)" }}
                    >
                      <div className="absolute inset-1.5 rounded-full" style={{ border: "1px solid rgba(201,168,76,0.3)" }} />
                      <p className="font-stamp text-[8px] tracking-wider text-center leading-tight" style={{ color: "rgba(201,168,76,0.8)" }}>
                        ЗАГС<br/>М.П.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* Footer */}
          <footer className="pb-12 text-center pt-4">
            <Reveal delay={200}>
              <div className="flex items-center gap-4 justify-center">
                <div className="h-px flex-1" style={{ background: "rgba(201,168,76,0.15)" }} />
                <p className="font-stamp text-xs tracking-[0.4em] uppercase" style={{ color: "rgba(201,168,76,0.3)" }}>
                  В &amp; Е · Документ имеет юридическую силу любви
                </p>
                <div className="h-px flex-1" style={{ background: "rgba(201,168,76,0.15)" }} />
              </div>
            </Reveal>
          </footer>

        </div>
      </div>
    </div>
  );
}
