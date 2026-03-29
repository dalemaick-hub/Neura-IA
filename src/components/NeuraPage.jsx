import { Link } from "react-router-dom";
import NeuraLayout from "./NeuraLayout";

export function NeuraPage({ eyebrow, title, subtitle, children, cta }) {
  return (
    <NeuraLayout>
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 pb-20 pt-28 md:px-8 lg:pt-32">
        <section className="animate-fade space-y-6">
          {eyebrow ? <span className="neura-eyebrow">{eyebrow}</span> : null}
          <div className="max-w-4xl space-y-5">
            <h1 className="neura-title text-5xl md:text-6xl">{title}</h1>
            {subtitle ? (
              <p className="max-w-3xl text-lg leading-8 text-white/76 md:text-xl">
                {subtitle}
              </p>
            ) : null}
          </div>
          {cta ? <div className="flex flex-wrap gap-4 pt-2">{cta}</div> : null}
        </section>

        <div className="space-y-8">{children}</div>
      </main>
    </NeuraLayout>
  );
}

export function NeuraCard({ className = "", children }) {
  return <section className={`neura-card rounded-[2rem] p-8 ${className}`.trim()}>{children}</section>;
}

export function NeuraMetric({ value, label }) {
  return (
    <div className="neura-card rounded-[1.75rem] p-6 text-center">
      <div className="neura-title text-3xl md:text-4xl">{value}</div>
      <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/55">{label}</p>
    </div>
  );
}

export function NeuraBulletList({ items }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="neura-card rounded-[1.75rem] p-6 text-white/78">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function NeuraPrimaryLink({ to, children }) {
  return (
    <Link to={to} className="neura-button-primary">
      {children}
    </Link>
  );
}

export function NeuraSecondaryLink({ to, children }) {
  return (
    <Link to={to} className="neura-button-secondary">
      {children}
    </Link>
  );
}
