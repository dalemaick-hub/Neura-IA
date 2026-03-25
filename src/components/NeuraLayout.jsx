export default function NeuraLayout({ children }) {
  return (
    <div className="min-h-screen bg-metal bg-gradient-to-b from-[#0f0c14] via-[#1a1622] to-[#0f0c14] text-white relative overflow-hidden pt-16">
      <img
        src="/images/Gemini_Generated_Image_ls4dpnls4dpnls4d.png"
        className="absolute opacity-[0.05] w-[760px] -top-32 -right-40 rotate-12 pointer-events-none select-none mix-blend-soft-light blur-[1px]"
        alt=""
        aria-hidden="true"
        style={{ filter: "grayscale(1) contrast(1.15) brightness(1.05)" }}
      />
      {children}
    </div>
  );
}
