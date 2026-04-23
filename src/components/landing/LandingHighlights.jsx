const steps = [
  {
    title: "Escucha activa",
    description: "NEURA detecta el tono emocional de tus palabras y capta señales de estrés, cansancio o claridad mental.",
    icon: "hearing",
  },
  {
    title: "Respuesta personalizada",
    description: "Ajusta el lenguaje, la energía y la profundidad de la ayuda según cómo te sientes en ese momento.",
    icon: "forum",
  },
  {
    title: "Acompañamiento continuo",
    description: "Aprende de tus conversaciones para darte apoyo más útil, humano y consistente cada día.",
    icon: "neurology",
  },
];

const features = [
  {
    title: "Detecta emociones",
    description: "Interpreta el subtexto emocional en cada conversación para responder con más empatía y precisión.",
    icon: "psychology",
    accent: "text-primary",
  },
  {
    title: "Privacidad total",
    description: "Tus conversaciones se tratan con cuidado y se diseñan para priorizar control, confianza y seguridad.",
    icon: "shield_lock",
    accent: "text-tertiary",
  },
  {
    title: "Se adapta a ti",
    description: "Cambia su tono y su forma de ayudarte según tu energía, tu contexto y tu forma de pensar.",
    icon: "tune",
    accent: "text-secondary",
  },
  {
    title: "Apoyo en tiempo real",
    description: "Puedes usarlo como espacio de descarga, claridad mental o impulso para retomar el foco.",
    icon: "bolt",
    accent: "text-primary",
  },
];

const plans = [
  {
    name: "Explorar",
    price: "Gratis",
    description: "Para probar la experiencia emocional de NEURA.",
    points: "Chat demo, respuestas guiadas y primeros insights.",
    highlight: false,
  },
  {
    name: "NEURA Plus",
    price: "Próximamente",
    description: "Para usuarios que quieren acompañamiento continuo.",
    points: "Memoria contextual, seguimiento y experiencias personalizadas.",
    highlight: true,
  },
  {
    name: "Equipos",
    price: "A medida",
    description: "Para marcas o proyectos centrados en bienestar digital.",
    points: "Integraciones, analítica de uso y soporte de implementación.",
    highlight: false,
  },
];

export default function LandingHighlights({ onOpenChat, onStart }) {
  return (
    <>
      <section id="como-funciona" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Cómo funciona
            </span>
            <h2 className="mt-6 text-4xl md:text-6xl font-black font-headline leading-tight">
              Una experiencia de apoyo que se siente cercana desde el primer mensaje.
            </h2>
            <p className="mt-5 text-lg text-on-surface-variant leading-8">
              Diseñamos NEURA para que la conversación no se sienta fría ni genérica. Empieza escuchando, sigue acompañando y aprende contigo.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.title}
                className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-surface-variant/70 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.2)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-background/80 text-primary">
                  <span className="material-symbols-outlined text-[28px]">{step.icon}</span>
                </div>
                <h3 className="text-2xl font-bold font-headline">{step.title}</h3>
                <p className="mt-4 text-on-surface-variant leading-7">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="caracteristicas" className="py-24 md:py-28 bg-surface-container/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-12">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-black font-headline">Lo que hace diferente a NEURA</h2>
              <p className="mt-4 text-lg text-on-surface-variant">
                Un sistema emocional, visual y conversacional pensado para crear confianza desde el primer contacto.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenChat}
              className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition hover:border-primary/40 hover:bg-primary/15"
            >
              Probar el chat
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {features.map((feature, index) => (
              <article
                key={feature.title}
                className={`relative overflow-hidden rounded-[1.75rem] border border-outline-variant/20 bg-surface-variant p-8 min-h-[250px] ${
                  index < 2 ? "md:col-span-2" : "md:col-span-2"
                }`}
              >
                <div className={`mb-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-background/70 ${feature.accent}`}>
                  <span className="material-symbols-outlined text-[28px]">{feature.icon}</span>
                </div>
                <h3 className="text-2xl font-bold font-headline mb-3">{feature.title}</h3>
                <p className="max-w-xl text-on-surface-variant leading-7">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <span className="text-tertiary font-headline font-bold uppercase tracking-[0.3em] text-sm">Diseñada para acompañar</span>
            <h2 className="mt-5 text-4xl md:text-6xl font-black font-headline leading-tight">
              La IA no tiene que sonar distante para ser útil.
            </h2>
            <p className="mt-6 text-lg text-on-surface-variant leading-8">
              NEURA combina sensibilidad emocional, claridad práctica y una interfaz enfocada en bajar fricción. Menos ruido. Más presencia.
            </p>
            <div className="mt-8 rounded-[1.5rem] border border-tertiary/20 bg-tertiary/8 p-6">
              <p className="text-on-surface font-medium">
                "Acompañante emocional que detecta cómo te sientes y te ayuda a estar mejor."
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_top,_rgba(189,157,255,0.2),_transparent_60%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/8 bg-[linear-gradient(160deg,rgba(34,38,47,0.95),rgba(11,14,20,0.95))] p-6 shadow-[0_40px_100px_rgba(0,0,0,0.35)]">
              <img
                className="h-[420px] w-full rounded-[2rem] object-cover"
                src="/images/Gemini_Generated_Image_ls4dpnls4dpnls4d.png"
                alt="Visual abstracto representando la inteligencia emocional de NEURA"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="precios" className="py-24 md:py-32 bg-surface-container-low/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-4xl md:text-5xl font-black font-headline">Precios pensados para crecer contigo</h2>
            <p className="mt-5 text-lg text-on-surface-variant">
              Puedes empezar hoy y evolucionar a una experiencia más profunda cuando lo necesites.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-[2rem] border p-8 md:p-10 ${
                  plan.highlight
                    ? "border-primary/30 bg-[linear-gradient(180deg,rgba(138,76,252,0.16),rgba(22,26,33,0.95))] shadow-[0_25px_80px_rgba(138,76,252,0.18)]"
                    : "border-white/8 bg-surface-variant/80"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-bold font-headline">{plan.name}</h3>
                  {plan.highlight && (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      Recomendado
                    </span>
                  )}
                </div>
                <p className="mt-6 text-3xl font-black font-headline">{plan.price}</p>
                <p className="mt-4 text-on-surface-variant leading-7">{plan.description}</p>
                <p className="mt-6 text-sm leading-6 text-on-surface">{plan.points}</p>
                <button
                  type="button"
                  onClick={plan.name === "Explorar" ? onOpenChat : onStart}
                  className={`mt-8 w-full rounded-full px-5 py-3.5 font-semibold transition ${
                    plan.highlight
                      ? "bg-white text-background hover:opacity-90"
                      : "border border-white/10 bg-transparent text-white hover:border-primary/30 hover:bg-white/5"
                  }`}
                >
                  {plan.name === "Explorar" ? "Abrir demo" : "Solicitar acceso"}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
