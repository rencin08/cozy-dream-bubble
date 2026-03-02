import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cindyAvatar from "@/assets/cindy-avatar.png";
import nycSkyline from "@/assets/nyc-skyline.png";

const bubbles = [
  { label: "🍵 matcha", delay: 0.8, x: -55, y: -55 },
  { label: "🚀 startup", delay: 1.1, x: 5, y: -75 },
  { label: "✨ delulu", delay: 1.4, x: 60, y: -50 },
  { label: "🗽 nyc", delay: 1.7, x: -30, y: -90 },
  { label: "🎓 harvard", delay: 2.0, x: 40, y: -85 },
];

// Sparkle component for the bridge
const Sparkle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-foreground/60"
    style={{ left: `${x}%`, top: `${y}%` }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 3 + 1,
      ease: "easeInOut",
    }}
  />
);

const LandingPage = () => {
  const [entered, setEntered] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    const s = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 15 + Math.random() * 50,
      delay: Math.random() * 4,
    }));
    setSparkles(s);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden relative">
      {/* === NYC Skyline window backdrop — upper portion === */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Window frame */}
        <div className="absolute top-0 left-0 right-0 h-[55%] overflow-hidden">
          {/* Skyline image */}
          <img
            src={nycSkyline}
            alt="NYC skyline pencil drawing"
            className="w-full h-full object-cover object-bottom opacity-20"
          />
          {/* Sparkles on the bridge */}
          {sparkles.map((s) => (
            <Sparkle key={s.id} delay={s.delay} x={s.x} y={s.y} />
          ))}
          {/* Window pane lines */}
          <div className="absolute inset-0 border-b-4 border-border" />
          <div className="absolute top-0 bottom-0 left-1/2 w-[3px] bg-border" />
          <div className="absolute left-0 right-0 top-1/2 h-[3px] bg-border" />
        </div>

        {/* Warm gradient below window = bedroom wall/floor */}
        <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-secondary/60 to-background" />
      </div>

      {/* === Main content === */}
      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div
            key="welcome"
            className="flex-1 flex flex-col items-center justify-end pb-16 md:pb-24 relative z-10"
            exit={{ opacity: 0, y: -30, transition: { duration: 0.5 } }}
          >
            {/* Welcome text — top area */}
            <motion.h1
              className="text-3xl md:text-5xl font-display text-foreground mb-8 text-center italic absolute top-[12%] md:top-[10%]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              welcome to cindy's home
            </motion.h1>

            {/* Avatar with thought bubbles */}
            <div className="relative">
              {/* Thought bubbles — small, near the head */}
              {bubbles.map((bubble, i) => (
                <motion.span
                  key={i}
                  className="absolute bg-card border border-border text-foreground px-2.5 py-1 rounded-full text-[11px] font-body font-medium whitespace-nowrap shadow-sm z-20"
                  style={{
                    left: `calc(72% + ${bubble.x}px)`,
                    top: `calc(25% + ${bubble.y}px)`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -4, 0],
                  }}
                  transition={{
                    opacity: { delay: bubble.delay, duration: 0.3 },
                    scale: { delay: bubble.delay, duration: 0.3, type: "spring", stiffness: 300 },
                    y: {
                      delay: bubble.delay + 0.3,
                      duration: 2.5 + i * 0.3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    },
                  }}
                >
                  {bubble.label}
                </motion.span>
              ))}

              {/* Small connector dots */}
              <motion.div
                className="absolute w-1.5 h-1.5 rounded-full bg-border z-20"
                style={{ left: "72%", top: "28%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.6 }}
              />
              <motion.div
                className="absolute w-1 h-1 rounded-full bg-border z-20"
                style={{ left: "70%", top: "32%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.7 }}
              />

              {/* Avatar */}
              <motion.img
                src={cindyAvatar}
                alt="Cindy — notion style silhouette on bed"
                className="w-72 h-48 md:w-[420px] md:h-72 object-contain"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              />
            </div>

            {/* Enter button */}
            <motion.button
              onClick={() => setEntered(true)}
              className="mt-8 bg-foreground text-background px-7 py-2.5 rounded-full font-body font-medium text-sm tracking-wide hover:opacity-80 transition-opacity shadow-sm cursor-pointer"
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
