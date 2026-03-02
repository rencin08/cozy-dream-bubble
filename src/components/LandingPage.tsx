import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cindyAvatar from "@/assets/cindy-avatar.png";
import nycSkyline from "@/assets/nyc-skyline.png";

const title = "welcome to cindy's home";

const Sparkle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute w-[2px] h-[2px] rounded-full bg-foreground/25"
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
  onComplete,
}: {
  text: string;
  delay?: number;
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
        65 + Math.random() * 35
      );
      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [displayed, started, text, onComplete]);

  return (
    <span>
      {displayed}
      {started && displayed.length < text.length && (
        <motion.span
          className="inline-block w-[2px] h-[0.85em] bg-foreground/50 ml-[1px] align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
    </span>
  );
};

const LandingPage = () => {
  const [entered, setEntered] = useState(false);
  const [titleDone, setTitleDone] = useState(false);
  const [sparkles] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 40,
      delay: Math.random() * 6,
    }))
  );

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden relative">
      {/* NYC skyline — anchored to very bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden h-[35%]">
        <img
          src={nycSkyline}
          alt=""
          className="w-full absolute bottom-0 left-0 opacity-[0.22]"
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
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            {/* Avatar — circle */}
            <motion.div
              className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border border-border mb-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            >
              <img
                src={cindyAvatar}
                alt="Cindy"
                className="w-full h-full object-cover object-top scale-[1.3]"
              />
            </motion.div>

            {/* Title — typewriter */}
            <h1 className="text-3xl md:text-5xl font-display text-foreground text-center mb-12 italic min-h-[3rem]">
              <TypewriterText
                text={title}
                delay={0.4}
                onComplete={() => setTitleDone(true)}
              />
            </h1>

            {/* Enter button */}
            <AnimatePresence>
              {titleDone && (
                <motion.button
                  onClick={() => setEntered(true)}
                  className="text-sm font-body text-muted-foreground border-b border-muted-foreground/30 pb-0.5 hover:text-foreground hover:border-foreground/50 transition-colors cursor-pointer tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  enter world →
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="inside"
            className="flex-1 flex flex-col items-center justify-center z-10 px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.h2
              className="text-3xl md:text-5xl font-display text-foreground mb-4 text-center italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              hi, i'm cindy
            </motion.h2>
            <motion.p
              className="text-sm text-muted-foreground font-body text-center max-w-sm mb-10 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              harvard grad · building startups · matcha · nyc
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
                  className="border border-border text-foreground px-5 py-2 rounded-full font-body text-xs tracking-wide cursor-pointer hover:bg-secondary transition-colors"
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
