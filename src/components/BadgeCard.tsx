import { motion } from 'framer-motion';
import { GitBadge, RARITY_CONFIG } from '@/data/badges';

interface BadgeCardProps {
  badge: GitBadge;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-20 h-20',
  md: 'w-28 h-28',
  lg: 'w-36 h-36',
};

const iconSizes = {
  sm: 'text-2xl',
  md: 'text-4xl',
  lg: 'text-5xl',
};

export const BadgeCard = ({ badge, onClick, size = 'md' }: BadgeCardProps) => {
  const rarity = RARITY_CONFIG[badge.rarity];
  const isLocked = !badge.earned;

  return (
    <motion.button
      onClick={onClick}
      whileHover={badge.earned ? { scale: 1.1, y: -4 } : { scale: 1.02 }}
      whileTap={badge.earned ? { scale: 0.95 } : {}}
      className={`
        relative flex flex-col items-center justify-center rounded-xl border-2 p-2 transition-all cursor-pointer
        bg-gradient-to-br ${rarity.bgGradient} ${rarity.borderColor}
        ${badge.earned ? rarity.glowClass : 'opacity-40 grayscale'}
        ${sizeClasses[size]}
      `}
    >
      {badge.rarity === 'legendary' && badge.earned && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/20 via-transparent to-accent/10 animate-pulse-glow" />
      )}
      <span className={`${iconSizes[size]} ${isLocked ? 'blur-sm' : ''} relative z-10`}>
        {isLocked ? '🔒' : badge.icon}
      </span>
      <span className={`text-[10px] font-mono font-semibold mt-1 text-center leading-tight relative z-10 ${
        badge.earned ? 'text-foreground' : 'text-muted-foreground'
      }`}>
        {badge.name}
      </span>
      {badge.earned && (
        <span className={`text-[8px] font-mono mt-0.5 uppercase tracking-wider ${
          badge.rarity === 'legendary' ? 'text-accent' :
          badge.rarity === 'epic' ? 'text-neon-purple' :
          badge.rarity === 'rare' ? 'text-primary' :
          badge.rarity === 'uncommon' ? 'text-neon-green' :
          'text-muted-foreground'
        }`}>
          {rarity.label}
        </span>
      )}
    </motion.button>
  );
};
