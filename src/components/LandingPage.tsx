import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cindyAvatar from "@/assets/cindy-avatar.png";
import nycSkyline from "@/assets/nyc-skyline.png";

const thoughts = [
  { label: "matcha", delay: 0.8, x: -60, y: -20 },
  { label: "startup", delay: 1.0, x: 0, y: -38 },
  { label: "delulu era", delay: 1.2, x: 58, y: -18 },
  { label: "nyc", delay: 1.4, x: -25, y: -50 },
  { label: "harvard", delay: 1.6, x: 35, y: -48 },
];

const Sparkle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute w-[2px] h-[2px] rounded-full bg-foreground/30"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{ opacity: [0, 0.7, 0], scale: [0, 1.5, 0] }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 3 + 2,
      ease: "easeInOut",
    }}
  />
);

const LandingPage = () => {
  const [entered, setEntered] = useState(false);
  const [sparkles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 60,
      delay: Math.random() * 5,
    }))
  );

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden relative">
      {/* NYC skyline backdrop — faint pencil drawing */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={nycSkyline}
          alt=""
          className="w-full h-full object-cover object-center opacity-[0.07]"
        />
        {sparkles.map((s) => (
          <Sparkle key={s.id} delay={s.delay} x={s.x} y={s.y} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div
            key="welcome"
            className="flex-1 flex flex-col items-center justify-center relative z-10 px-6"
            exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.4 } }}
          >
            {/* Welcome text */}
            <motion.h1
              className="text-3xl md:text-5xl font-display text-foreground text-center italic mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              welcome to cindy's home
            </motion.h1>

            {/* Circle avatar with thought cloud */}
            <div className="relative mb-10">
              {/* Thought cloud — wispy background */}
              <motion.div
                className="absolute rounded-full bg-foreground/[0.03] blur-lg z-0"
                style={{
                  left: "50%",
                  top: "-30px",
                  width: "200px",
                  height: "90px",
                  transform: "translateX(-50%)",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              />

              {/* Thought words */}
              {thoughts.map((t, i) => (
                <motion.span
                  key={i}
                  className="absolute text-foreground/80 text-[11px] md:text-sm font-body italic whitespace-nowrap z-10 font-medium"
                  style={{
                    left: `calc(50% + ${t.x}px)`,
                    top: `${t.y}px`,
                  }}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{
                    opacity: 0.85,
                    y: [0, -3, 0],
                  }}
                  transition={{
                    opacity: { delay: t.delay, duration: 0.4 },
                    y: {
                      delay: t.delay + 0.4,
                      duration: 2.5 + i * 0.3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    },
                  }}
                >
                  {t.label}
                </motion.span>
              ))}

              {/* Connector dots */}
              <motion.div
                className="absolute w-1.5 h-1.5 rounded-full bg-foreground/10 z-10"
                style={{ left: "50%", top: "-8px", transform: "translateX(-50%)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              />
              <motion.div
                className="absolute w-1 h-1 rounded-full bg-foreground/8 z-10"
                style={{ left: "calc(50% + 5px)", top: "-2px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
              />

              {/* Circle avatar */}
              <motion.div
                className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-border bg-background"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <img
                  src={cindyAvatar}
                  alt="Cindy — notion style avatar"
                  className="w-full h-full object-cover object-top scale-125"
                />
              </motion.div>
            </div>

            {/* Enter button */}
            <motion.button
              onClick={() => setEntered(true)}
              className="bg-foreground text-background px-7 py-2.5 rounded-full font-body font-medium text-sm tracking-wide hover:opacity-80 transition-opacity cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.5 }}
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
