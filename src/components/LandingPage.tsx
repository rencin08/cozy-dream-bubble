import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cindyAvatar from "@/assets/cindy-avatar.png";
import nycSkyline from "@/assets/nyc-skyline.png";

const title = "welcome to cindy's home";
const journalLines = [
  "mar 2, 2026 — couldn't sleep again",
  "been thinking about that startup idea...",
  "nyc looks so pretty from my window rn",
  "maybe i should make some matcha ☁",
];

const Sparkle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute w-[2px] h-[2px] rounded-full bg-accent/50"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
    transition={{
      duration: 2.5,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 4 + 2,
      ease: "easeInOut",
    }}
  />
);

const TypewriterText = ({
  text,
  delay = 0,
  className = "",
  onComplete,
}: {
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timer = setTimeout(
        () => setDisplayed(text.slice(0, displayed.length + 1)),
        60 + Math.random() * 40
      );
      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [displayed, started, text, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {started && displayed.length < text.length && (
        <motion.span
          className="inline-block w-[2px] h-[1em] bg-foreground/60 ml-[1px] align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
    </span>
  );
};

const LandingPage = () => {
  const [entered, setEntered] = useState(false);
  const [titleDone, setTitleDone] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [sparkles] = useState(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 25,
      delay: Math.random() * 6,
    }))
  );

  useEffect(() => {
    if (titleDone) {
      const t = setTimeout(() => setShowButton(true), 2800);
      return () => clearTimeout(t);
    }
  }, [titleDone]);

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden relative">
      {/* NYC skyline — dreamy backdrop across full page */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src={nycSkyline}
          alt=""
          className="w-full h-[60%] object-cover object-bottom opacity-[0.12]"
        />
        {sparkles.map((s) => (
          <Sparkle key={s.id} delay={s.delay} x={s.x} y={s.y} />
        ))}
      </div>

      {/* Very subtle notebook lines — just a few in the lower area */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute left-[15%] right-[15%] h-[1px] bg-foreground"
            style={{ top: `${55 + i * 4}%` }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div
            key="welcome"
            className="flex-1 flex flex-col items-center justify-center relative z-10 px-6"
            exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
          >
            {/* Journal page content */}
            <div className="max-w-md w-full flex flex-col items-center">
              {/* Title — typewriter */}
              <h1 className="text-3xl md:text-5xl font-handwriting text-foreground text-center mb-8 min-h-[3rem]">
                <TypewriterText
                  text={title}
                  delay={0.5}
                  onComplete={() => setTitleDone(true)}
                />
              </h1>

              {/* Avatar — circle */}
              <motion.div
                className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border border-border mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 200 }}
              >
                <img
                  src={cindyAvatar}
                  alt="Cindy"
                  className="w-full h-full object-cover object-top scale-[1.3]"
                />
              </motion.div>

              {/* Journal scribbles — appear after title */}
              {titleDone && (
                <div className="space-y-1.5 text-center">
                  {journalLines.map((line, i) => (
                    <motion.p
                      key={i}
                      className="text-sm md:text-base font-handwriting text-muted-foreground"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 0.7, x: 0 }}
                      transition={{ delay: i * 0.5, duration: 0.4 }}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>
              )}

              {/* Enter button */}
              <AnimatePresence>
                {showButton && (
                  <motion.button
                    onClick={() => setEntered(true)}
                    className="mt-10 font-handwriting text-lg text-foreground border-b border-foreground/30 pb-0.5 hover:border-foreground/60 transition-colors cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    turn the page →
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
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
                  className="border border-border text-foreground px-5 py-2 rounded-full font-body text-sm cursor-pointer hover:bg-secondary transition-colors"
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
