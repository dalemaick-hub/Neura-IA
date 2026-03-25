export default function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-low mt-16">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-on-surface-variant text-sm">NEURA — La IA que te entiende.</p>
        <p className="text-on-surface-variant text-sm">
          Creada por <span className="text-primary font-semibold">Gustavo D. Quintero</span>.
        </p>
      </div>
    </footer>
  );
}

