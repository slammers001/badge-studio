import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-3xl"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/5 mb-8 glow-cyan"
        >
          <Github className="w-5 h-5 text-primary" />
          <span className="text-sm font-mono text-primary">GitHub Badge Studio</span>
        </motion.div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
          <span className="text-foreground">Your code.</span>
          <br />
          <span className="text-primary text-glow-cyan">Your badges.</span>
          <br />
          <span className="text-foreground">Your </span>
          <span className="text-accent text-glow-gold">legacy.</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 font-display">
          Transform your GitHub contributions into collectible, glowing badges. 
          Build your developer identity.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 rounded-xl font-display font-semibold text-primary-foreground bg-primary glow-cyan transition-all"
          >
            <Github className="inline w-5 h-5 mr-2 -mt-0.5" />
            Connect GitHub
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 rounded-xl font-display font-semibold text-foreground border border-border bg-card hover:border-primary/30 transition-all"
          >
            View Demo ↓
          </motion.button>
        </div>

        {/* Floating badge previews */}
        <div className="mt-16 flex items-center justify-center gap-6">
          {['/badges/commit.png', '/badges/streak.png', '/badges/opensource.png', '/badges/merge.png', '/badges/hackathonchamp.png'].map((icon, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.3, ease: 'easeInOut' }}
              className={`p-3 rounded-xl border ${
                i === 4 ? 'border-accent/40 glow-gold' :
                i === 2 ? 'border-primary/40 glow-cyan' :
                i === 1 ? 'border-neon-magenta/40 glow-magenta' :
                'border-border'
              } bg-card`}
            >
              <img src={icon} alt="" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
