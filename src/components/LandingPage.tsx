import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cindyAvatar from "@/assets/cindy-avatar.png";

const bubbles = [
  { label: "🍵 matcha", color: "bg-bubble-matcha", delay: 0.8, x: -120, y: -180 },
  { label: "🚀 startup", color: "bg-bubble-startup", delay: 1.1, x: 10, y: -220 },
  { label: "✨ 23 y/o delusion", color: "bg-bubble-delusion", delay: 1.4, x: 130, y: -170 },
  { label: "🗽 nyc", color: "bg-bubble-nyc", delay: 1.7, x: -80, y: -260 },
  { label: "🎓 harvard grad", color: "bg-bubble-harvard", delay: 2.0, x: 80, y: -280 },
];

const LandingPage = () => {
  const [entered, setEntered] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center overflow-hidden relative">
      {/* Soft ambient circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div
            key="welcome"
            className="flex flex-col items-center relative z-10"
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.5 } }}
          >
            {/* Welcome text */}
            <motion.h1
              className="text-4xl md:text-6xl font-display text-foreground mb-8 text-center italic"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              welcome to cindy's home
            </motion.h1>

            {/* Avatar + Bubbles container */}
            <motion.div
              className="relative mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Thought bubbles */}
              {bubbles.map((bubble, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${bubble.color} text-foreground px-4 py-2 rounded-full text-sm font-body font-medium whitespace-nowrap shadow-sm`}
                  style={{
                    left: `calc(50% + ${bubble.x}px)`,
                    top: `calc(50% + ${bubble.y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -8, 0],
                  }}
                  transition={{
                    opacity: { delay: bubble.delay, duration: 0.4 },
                    scale: { delay: bubble.delay, duration: 0.4, type: "spring" },
                    y: {
                      delay: bubble.delay + 0.4,
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    },
                  }}
                >
                  {bubble.label}
                  {/* Little connector dots */}
                  <motion.div
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-muted"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: bubble.delay + 0.2 }}
                  />
                  <motion.div
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-muted"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: bubble.delay + 0.3 }}
                  />
                </motion.div>
              ))}

              {/* Avatar */}
              <img
                src={cindyAvatar}
                alt="Cindy's avatar - a cozy illustration"
                className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-lg"
              />
            </motion.div>

            {/* Enter button */}
            <motion.button
              onClick={() => setEntered(true)}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-body font-medium text-lg hover:opacity-90 transition-opacity shadow-md cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              enter world ✿
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="inside"
            className="flex flex-col items-center z-10 px-6"
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
              hi, i'm cindy 🌸
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground font-body text-center max-w-md mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              harvard grad · building cool things · matcha enthusiast · dreaming big in nyc
            </motion.p>
            <motion.div
              className="flex gap-4 flex-wrap justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {["about", "projects", "thoughts"].map((item) => (
                <span
                  key={item}
                  className="bg-secondary text-secondary-foreground px-6 py-2 rounded-full font-body text-sm font-medium"
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
