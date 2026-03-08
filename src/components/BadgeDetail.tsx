import { motion } from 'framer-motion';
import { GitBadge, RARITY_CONFIG, CATEGORY_CONFIG } from '@/data/badges';

interface BadgeDetailProps {
  badge: GitBadge;
  onClose: () => void;
}

export const BadgeDetail = ({ badge, onClose }: BadgeDetailProps) => {
  const rarity = RARITY_CONFIG[badge.rarity];
  const category = CATEGORY_CONFIG[badge.category];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className={`
          relative w-full max-w-sm rounded-2xl border-2 p-8 text-center
          bg-gradient-to-br from-card to-background
          ${rarity.borderColor} ${badge.earned ? rarity.glowClass : ''}
        `}
      >
        {badge.rarity === 'legendary' && badge.earned && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/10 via-transparent to-accent/5 animate-pulse-glow" />
        )}

        <div className="relative z-10">
          <motion.div
            animate={badge.earned ? { y: [0, -6, 0] } : {}}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="text-7xl mb-4"
          >
            {badge.earned ? badge.icon : '🔒'}
          </motion.div>

          <h3 className={`text-xl font-display font-bold mb-1 ${badge.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
            {badge.name}
          </h3>

          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest mb-3 ${
            badge.rarity === 'legendary' ? 'bg-accent/20 text-accent' :
            badge.rarity === 'epic' ? 'bg-neon-purple/20 text-neon-purple' :
            badge.rarity === 'rare' ? 'bg-primary/20 text-primary' :
            badge.rarity === 'uncommon' ? 'bg-neon-green/20 text-neon-green' :
            'bg-muted text-muted-foreground'
          }`}>
            {rarity.label}
          </span>

          <p className="text-sm text-muted-foreground mb-4">{badge.description}</p>

          <div className="flex items-center justify-center gap-2 text-xs font-mono text-muted-foreground">
            <span>{category.icon}</span>
            <span>{category.label}</span>
          </div>

          {!badge.earned && (
            <p className="mt-4 text-xs font-mono text-muted-foreground/60 italic">
              Keep coding to unlock this badge!
            </p>
          )}
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors text-lg"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
};
