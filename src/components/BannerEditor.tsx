import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Type, Move, RotateCcw, Download } from 'lucide-react';
import { type GitBadge, RARITY_CONFIG } from '@/data/badges';

interface BannerBadge {
  badge: GitBadge;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  scale: number;
}

interface BannerConfig {
  bgColor1: string;
  bgColor2: string;
  bgAngle: number;
  usernameColor: string;
  usernameX: number; // percentage
  usernameY: number; // percentage
  usernameFontSize: number;
  showAvatar: boolean;
}

const PRESET_COLORS = [
  '#0a0a1a', '#1a0a2e', '#0a1a2e', '#1a2e0a', '#2e0a1a', '#2e1a0a',
  '#00e5ff', '#ff00e5', '#e5ff00', '#00ff88', '#8800ff', '#ff8800',
  '#1e1e2e', '#2d2b55', '#0d1117', '#161b22', '#21262d', '#30363d',
];

interface BannerEditorProps {
  username: string;
  displayName: string;
  avatarUrl: string;
  badges: GitBadge[];
}

export const BannerEditor = ({ username, displayName, avatarUrl, badges }: BannerEditorProps) => {
  const earnedBadges = badges.filter(b => b.earned);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'background' | 'username' | 'badges'>('background');

  const [config, setConfig] = useState<BannerConfig>({
    bgColor1: '#0a0a1a',
    bgColor2: '#1a0a2e',
    bgAngle: 135,
    usernameColor: '#00e5ff',
    usernameX: 50,
    usernameY: 15,
    usernameFontSize: 28,
    showAvatar: true,
  });

  const [bannerBadges, setBannerBadges] = useState<BannerBadge[]>(() => {
    const cols = Math.min(earnedBadges.length, 6);
    const startX = 50 - ((cols - 1) * 10) / 2;
    return earnedBadges.map((badge, i) => ({
      badge,
      x: startX + (i % cols) * 10,
      y: 40 + Math.floor(i / cols) * 18,
      scale: 1,
    }));
  });

  const [dragging, setDragging] = useState<{ type: 'badge' | 'username'; index?: number } | null>(null);

  const handlePointerDown = useCallback((type: 'badge' | 'username', index?: number) => {
    setDragging({ type, index });
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(5, Math.min(95, ((e.clientY - rect.top) / rect.height) * 100));

    if (dragging.type === 'username') {
      setConfig(c => ({ ...c, usernameX: x, usernameY: y }));
    } else if (dragging.type === 'badge' && dragging.index !== undefined) {
      setBannerBadges(prev => prev.map((b, i) => i === dragging.index ? { ...b, x, y } : b));
    }
  }, [dragging]);

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  const resetLayout = () => {
    const cols = Math.min(earnedBadges.length, 6);
    const startX = 50 - ((cols - 1) * 10) / 2;
    setBannerBadges(earnedBadges.map((badge, i) => ({
      badge,
      x: startX + (i % cols) * 10,
      y: 40 + Math.floor(i / cols) * 18,
      scale: 1,
    })));
    setConfig(c => ({ ...c, usernameX: 50, usernameY: 15 }));
  };

  const tabs = [
    { id: 'background' as const, label: 'Background', icon: Palette },
    { id: 'username' as const, label: 'Username', icon: Type },
    { id: 'badges' as const, label: 'Badges', icon: Move },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-foreground">Banner Editor</h2>
        <div className="flex gap-2">
          <button onClick={resetLayout} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono border border-border bg-card text-muted-foreground hover:text-foreground transition-colors">
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>
      </div>

      {/* Banner Canvas */}
      <div
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full rounded-2xl border-2 border-border overflow-hidden select-none"
        style={{
          aspectRatio: '3 / 1',
          background: `linear-gradient(${config.bgAngle}deg, ${config.bgColor1}, ${config.bgColor2})`,
          cursor: dragging ? 'grabbing' : 'default',
        }}
      >
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

        {/* Avatar */}
        {config.showAvatar && (
          <div
            className="absolute w-[8%] aspect-square rounded-full border-2 overflow-hidden pointer-events-none"
            style={{
              left: `${config.usernameX - 12}%`,
              top: `${config.usernameY - 2}%`,
              transform: 'translate(-50%, -50%)',
              borderColor: config.usernameColor,
            }}
          >
            <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Username */}
        <div
          className="absolute font-display font-bold whitespace-nowrap"
          style={{
            left: `${config.usernameX}%`,
            top: `${config.usernameY}%`,
            transform: 'translate(-50%, -50%)',
            color: config.usernameColor,
            fontSize: `${config.usernameFontSize}px`,
            textShadow: `0 0 20px ${config.usernameColor}44`,
            cursor: dragging?.type === 'username' ? 'grabbing' : 'grab',
          }}
          onPointerDown={(e) => { e.preventDefault(); handlePointerDown('username'); }}
        >
          @{username}
        </div>

        {/* Badges */}
        {bannerBadges.map((bb, i) => (
          <div
            key={bb.badge.id}
            className="absolute"
            style={{
              left: `${bb.x}%`,
              top: `${bb.y}%`,
              transform: `translate(-50%, -50%) scale(${bb.scale})`,
              cursor: dragging?.type === 'badge' && dragging.index === i ? 'grabbing' : 'grab',
            }}
            onPointerDown={(e) => { e.preventDefault(); handlePointerDown('badge', i); }}
          >
            <div className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center bg-black/40 backdrop-blur-sm ${RARITY_CONFIG[bb.badge.rarity].borderColor}`}>
              <img src={bb.badge.icon} alt={bb.badge.name} className="w-10 h-10 object-contain" />
            </div>
          </div>
        ))}

        {/* Drag hint */}
        {!dragging && (
          <div className="absolute bottom-2 right-3 text-[10px] font-mono text-white/30">
            Drag to reposition
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-border">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-mono transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary/10 text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === 'background' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-muted-foreground mb-2 block">Color 1</label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_COLORS.map(c => (
                    <button
                      key={`c1-${c}`}
                      onClick={() => setConfig(p => ({ ...p, bgColor1: c }))}
                      className={`w-8 h-8 rounded-lg border-2 transition-all ${config.bgColor1 === c ? 'border-primary scale-110' : 'border-border'}`}
                      style={{ background: c }}
                    />
                  ))}
                  <input
                    type="color"
                    value={config.bgColor1}
                    onChange={e => setConfig(p => ({ ...p, bgColor1: e.target.value }))}
                    className="w-8 h-8 rounded-lg border-2 border-border cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-mono text-muted-foreground mb-2 block">Color 2</label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_COLORS.map(c => (
                    <button
                      key={`c2-${c}`}
                      onClick={() => setConfig(p => ({ ...p, bgColor2: c }))}
                      className={`w-8 h-8 rounded-lg border-2 transition-all ${config.bgColor2 === c ? 'border-primary scale-110' : 'border-border'}`}
                      style={{ background: c }}
                    />
                  ))}
                  <input
                    type="color"
                    value={config.bgColor2}
                    onChange={e => setConfig(p => ({ ...p, bgColor2: e.target.value }))}
                    className="w-8 h-8 rounded-lg border-2 border-border cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-mono text-muted-foreground mb-2 block">Gradient Angle: {config.bgAngle}°</label>
                <input
                  type="range" min={0} max={360} value={config.bgAngle}
                  onChange={e => setConfig(p => ({ ...p, bgAngle: Number(e.target.value) }))}
                  className="w-full accent-primary"
                />
              </div>
            </div>
          )}

          {activeTab === 'username' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-muted-foreground mb-2 block">Text Color</label>
                <div className="flex flex-wrap gap-2">
                  {['#00e5ff', '#ff00e5', '#e5ff00', '#00ff88', '#ffffff', '#ff8800', '#8800ff', '#ff4444'].map(c => (
                    <button
                      key={c}
                      onClick={() => setConfig(p => ({ ...p, usernameColor: c }))}
                      className={`w-8 h-8 rounded-lg border-2 transition-all ${config.usernameColor === c ? 'border-primary scale-110' : 'border-border'}`}
                      style={{ background: c }}
                    />
                  ))}
                  <input
                    type="color"
                    value={config.usernameColor}
                    onChange={e => setConfig(p => ({ ...p, usernameColor: e.target.value }))}
                    className="w-8 h-8 rounded-lg border-2 border-border cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-mono text-muted-foreground mb-2 block">Font Size: {config.usernameFontSize}px</label>
                <input
                  type="range" min={14} max={48} value={config.usernameFontSize}
                  onChange={e => setConfig(p => ({ ...p, usernameFontSize: Number(e.target.value) }))}
                  className="w-full accent-primary"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-xs font-mono text-muted-foreground">Show Avatar</label>
                <button
                  onClick={() => setConfig(p => ({ ...p, showAvatar: !p.showAvatar }))}
                  className={`w-10 h-6 rounded-full transition-colors ${config.showAvatar ? 'bg-primary' : 'bg-muted'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-foreground transition-transform mx-1 ${config.showAvatar ? 'translate-x-4' : ''}`} />
                </button>
              </div>
              <p className="text-xs font-mono text-muted-foreground/60">Drag the username on the banner to reposition it</p>
            </div>
          )}

          {activeTab === 'badges' && (
            <div className="space-y-4">
              <p className="text-xs font-mono text-muted-foreground/60">Drag badges on the banner to reposition them. Use the scale slider to resize.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {bannerBadges.map((bb, i) => (
                  <div key={bb.badge.id} className="flex items-center gap-2 p-2 rounded-lg border border-border bg-background">
                    <img src={bb.badge.icon} alt={bb.badge.name} className="w-8 h-8 object-contain" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-mono text-foreground truncate">{bb.badge.name}</p>
                      <input
                        type="range" min={0.5} max={2} step={0.1} value={bb.scale}
                        onChange={e => setBannerBadges(prev => prev.map((b, j) => j === i ? { ...b, scale: Number(e.target.value) } : b))}
                        className="w-full accent-primary h-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
