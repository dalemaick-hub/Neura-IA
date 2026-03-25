export default function NeuraLayout({ children }) {
  return (
    <div className="min-h-screen bg-metal bg-gradient-to-b from-[#0f0c14] via-[#1a1622] to-[#0f0c14] text-white relative overflow-hidden pt-16">
      <img
        src="/images/neura-logo.png"
        className="absolute opacity-[0.04] w-[600px] -top-20 -right-20 rotate-12 pointer-events-none select-none"
        alt=""
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

