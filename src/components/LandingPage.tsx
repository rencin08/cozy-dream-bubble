import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cindyAvatar from "@/assets/cindy-avatar.png";
import nycSkyline from "@/assets/nyc-skyline.png";

const thoughts = [
  { label: "matcha", delay: 0.8, x: -50, y: -48 },
  { label: "startup", delay: 1.1, x: 8, y: -68 },
  { label: "delulu era", delay: 1.4, x: 55, y: -42 },
  { label: "nyc", delay: 1.7, x: -25, y: -82 },
  { label: "harvard", delay: 2.0, x: 35, y: -78 },
];

const Sparkle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute w-[3px] h-[3px] rounded-full bg-foreground/40"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{
      opacity: [0, 0.8, 0],
      scale: [0, 1.8, 0],
    }}
    transition={{
      duration: 2.2,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 3 + 1.5,
      ease: "easeInOut",
    }}
  />
);

const LandingPage = () => {
  const [entered, setEntered] = useState(false);
  const [sparkles] = useState(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: 8 + Math.random() * 84,
      y: 20 + Math.random() * 45,
      delay: Math.random() * 5,
    }))
  );

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden relative">
      {/* === Dreamy sky gradient behind the skyline === */}
      <div className="absolute top-0 left-0 right-0 h-[55%] bg-gradient-to-b from-sky via-rose to-background" />

      {/* === NYC skyline visible through window === */}
      <div className="absolute top-0 left-0 right-0 h-[55%] overflow-hidden pointer-events-none">
        <img
          src={nycSkyline}
          alt="NYC skyline pencil drawing"
          className="w-full h-full object-cover object-bottom opacity-30 mix-blend-multiply"
        />
        {/* Sparkles */}
        {sparkles.map((s) => (
          <Sparkle key={s.id} delay={s.delay} x={s.x} y={s.y} />
        ))}
        {/* Subtle window sill at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-foreground/10 rounded-t-sm" />
        {/* Thin vertical window divider */}
        <div className="absolute top-[10%] bottom-3 left-1/2 w-[2px] bg-foreground/8" />
      </div>

      {/* === Bedroom warmth — bottom half === */}
      <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-muted/50 to-transparent pointer-events-none" />

      {/* === Content === */}
      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div
            key="welcome"
            className="flex-1 flex flex-col items-center justify-end pb-16 md:pb-24 relative z-10"
            exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
          >
            {/* Title */}
            <motion.h1
              className="text-3xl md:text-5xl font-display text-foreground mb-6 text-center italic absolute top-[12%] md:top-[10%] drop-shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              welcome to cindy's home
            </motion.h1>

            {/* Avatar + thought cloud */}
            <div className="relative">
              {/* Thought cloud — small text near head, no emojis */}
              {thoughts.map((t, i) => (
                <motion.span
                  key={i}
                  className="absolute text-foreground/70 text-[10px] md:text-xs font-body italic whitespace-nowrap z-20"
                  style={{
                    left: `calc(70% + ${t.x}px)`,
                    top: `calc(22% + ${t.y}px)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.7, 0.5, 0.7],
                    y: [0, -3, 0],
                  }}
                  transition={{
                    opacity: { delay: t.delay, duration: 0.5 },
                    y: {
                      delay: t.delay + 0.5,
                      duration: 3 + i * 0.4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    },
                  }}
                >
                  {t.label}
                </motion.span>
              ))}

              {/* Wispy cloud shape behind the thought words */}
              <motion.div
                className="absolute rounded-[50%] bg-foreground/[0.04] blur-md z-10"
                style={{
                  left: "calc(70% - 70px)",
                  top: "calc(22% - 95px)",
                  width: "160px",
                  height: "80px",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              />

              {/* Small thought connector dots */}
              <motion.div
                className="absolute w-1.5 h-1.5 rounded-full bg-foreground/15 z-20"
                style={{ left: "70%", top: "25%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              />
              <motion.div
                className="absolute w-1 h-1 rounded-full bg-foreground/10 z-20"
                style={{ left: "68%", top: "29%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              />

              {/* Avatar */}
              <motion.img
                src={cindyAvatar}
                alt="Cindy — notion style silhouette"
                className="w-72 h-48 md:w-[420px] md:h-72 object-contain"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              />
            </div>

            {/* Enter button */}
            <motion.button
              onClick={() => setEntered(true)}
              className="mt-8 bg-foreground text-background px-7 py-2.5 rounded-full font-body font-medium text-sm tracking-wide hover:opacity-80 transition-opacity cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              enter world →
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="inside"
            className="flex-1 flex flex-col items-center justify-center z-10 px-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2
              className="text-3xl md:text-5xl font-display text-foreground mb-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              hi, i'm cindy
            </motion.h2>
            <motion.p
              className="text-base text-muted-foreground font-body text-center max-w-md mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              harvard grad · building startups · matcha enthusiast · dreaming big in nyc
            </motion.p>
            <motion.div
              className="flex gap-3 flex-wrap justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {["about", "projects", "thoughts"].map((item) => (
                <span
                  key={item}
                  className="border border-border text-foreground px-5 py-2 rounded-full font-body text-sm"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
