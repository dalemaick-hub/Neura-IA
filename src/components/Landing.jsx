import React, { useState } from "react";
import LandingFooter from "./landing/LandingFooter";
import LandingHero from "./landing/LandingHero";
import LandingHighlights from "./landing/LandingHighlights";
import LandingNav from "./landing/LandingNav";

const Landing = ({ onStart }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-background text-on-surface font-body min-h-screen overflow-x-hidden selection:bg-primary/30">
      <LandingNav
        onStart={onStart}
        open={open}
        onToggleMenu={() => setOpen((value) => !value)}
        onCloseMenu={() => setOpen(false)}
      />
      <LandingHero onStart={onStart} />
      <LandingHighlights />
      <LandingFooter />
    </div>
  );
};

export default Landing;
