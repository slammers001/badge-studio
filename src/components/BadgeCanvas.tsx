import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeCard } from './BadgeCard';
import { BadgeDetail } from './BadgeDetail';
import { SAMPLE_BADGES, CATEGORY_CONFIG, type BadgeCategory, type GitBadge } from '@/data/badges';

export const BadgeCanvas = () => {
  const [activeCategory, setActiveCategory] = useState<BadgeCategory | 'all'>('all');
  const [selectedBadge, setSelectedBadge] = useState<GitBadge | null>(null);

  const categories = Object.entries(CATEGORY_CONFIG) as [BadgeCategory, typeof CATEGORY_CONFIG[BadgeCategory]][];
  const filteredBadges = activeCategory === 'all'
    ? SAMPLE_BADGES
    : SAMPLE_BADGES.filter(b => b.category === activeCategory);

  const earnedCount = SAMPLE_BADGES.filter(b => b.earned).length;

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Stats bar */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Badge Collection
          </h2>
          <p className="text-sm font-mono text-muted-foreground mt-1">
            <span className="text-primary">{earnedCount}</span> / {SAMPLE_BADGES.length} badges earned
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
          <span className="text-xs font-mono text-muted-foreground">Rarity:</span>
          <span className="text-xs text-muted-foreground">Common</span>
          <span className="text-xs text-neon-green">Uncommon</span>
          <span className="text-xs text-primary">Rare</span>
          <span className="text-xs text-neon-purple">Epic</span>
          <span className="text-xs text-accent">Legendary</span>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm font-mono transition-all border ${
            activeCategory === 'all'
              ? 'bg-primary/10 border-primary/40 text-primary glow-cyan'
              : 'bg-card border-border text-muted-foreground hover:border-primary/20'
          }`}
        >
          All Badges
        </button>
        {categories.map(([key, config]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-4 py-2 rounded-lg text-sm font-mono transition-all border ${
              activeCategory === key
                ? 'bg-primary/10 border-primary/40 text-primary glow-cyan'
                : 'bg-card border-border text-muted-foreground hover:border-primary/20'
            }`}
          >
            {config.icon} {config.label}
          </button>
        ))}
      </div>

      {/* Badge grid */}
      <div className="relative bg-canvas bg-grid rounded-2xl border border-border p-8 min-h-[400px]">
        <motion.div
          layout
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-items-center"
        >
          <AnimatePresence mode="popLayout">
            {filteredBadges.map((badge, i) => (
              <motion.div
                key={badge.id}
                layout
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ delay: i * 0.03, type: 'spring', stiffness: 300, damping: 25 }}
              >
                <BadgeCard
                  badge={badge}
                  size="md"
                  onClick={() => setSelectedBadge(badge)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Badge detail modal */}
      <AnimatePresence>
        {selectedBadge && (
          <BadgeDetail badge={selectedBadge} onClose={() => setSelectedBadge(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};
