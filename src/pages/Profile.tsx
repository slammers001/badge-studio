import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowLeft, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { BadgeCard } from '@/components/BadgeCard';
import { BadgeDetail } from '@/components/BadgeDetail';
import { BannerEditor } from '@/components/BannerEditor';
import { type GitBadge, type BadgeCategory, CATEGORY_CONFIG } from '@/data/badges';

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  bio: string | null;
}

interface GitHubRepo {
  name: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  updated_at: string;
}

interface GitHubEvent {
  type: string;
  created_at: string;
}

function generateBadges(user: GitHubUser, repos: GitHubRepo[], events: GitHubEvent[]): GitBadge[] {
  const badges: GitBadge[] = [];
  const languages = new Set(repos.map(r => r.language).filter(Boolean));
  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const ownRepos = repos.filter(r => !r.fork);
  const pushEvents = events.filter(e => e.type === 'PushEvent');
  const prEvents = events.filter(e => e.type === 'PullRequestEvent');
  const issueEvents = events.filter(e => e.type === 'IssuesEvent');
  const accountAge = (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365);

  // Commits
  badges.push({
    id: 'first-commit', name: 'Commit Ninja', description: 'Made your first commit',
    icon: '/badges/commit.png', category: 'commits', rarity: 'common', earned: pushEvents.length > 0,
  });
  badges.push({
    id: 'commit-ninja', name: 'Mean Merge Machine', description: '10+ push events recently',
    icon: '/badges/merge.png', category: 'commits', rarity: 'uncommon', earned: pushEvents.length >= 10,
  });
  badges.push({
    id: 'streak-master', name: 'Streak Master', description: '20+ recent push events',
    icon: '/badges/streak.png', category: 'commits', rarity: 'rare', earned: pushEvents.length >= 20,
  });
  badges.push({
    id: 'midnight-coder', name: 'Midnight Coder', description: 'Active late-night coder',
    icon: '/badges/latenight.png', category: 'commits', rarity: 'epic',
    earned: events.some(e => { const h = new Date(e.created_at).getHours(); return h >= 0 && h < 5; }),
  });
  badges.push({
    id: 'night-owl', name: 'Night Owl', description: 'Account older than 3 years',
    icon: '/badges/nightowl.png', category: 'commits', rarity: 'legendary', earned: accountAge >= 3,
  });

  // Languages
  badges.push({
    id: 'typescript', name: 'TypeScript Tamer', description: 'Used TypeScript in repos',
    icon: '/badges/typescript.png', category: 'languages', rarity: 'uncommon', earned: languages.has('TypeScript'),
  });
  badges.push({
    id: 'python', name: 'Python Pro', description: 'Used Python in repos',
    icon: '/badges/python.png', category: 'languages', rarity: 'rare', earned: languages.has('Python'),
  });
  badges.push({
    id: 'ruby', name: 'Ruby Ranger', description: 'Used Ruby in repos',
    icon: '/badges/ruby.png', category: 'languages', rarity: 'epic', earned: languages.has('Ruby'),
  });
  badges.push({
    id: 'java', name: 'Java Master', description: 'Used Java in repos',
    icon: '/badges/java.png', category: 'languages', rarity: 'legendary', earned: languages.has('Java'),
  });
  badges.push({
    id: 'style-guru', name: 'Style Guru', description: 'Used CSS/SCSS in repos',
    icon: '/badges/stylesheet.png', category: 'languages', rarity: 'uncommon', earned: languages.has('CSS') || languages.has('SCSS'),
  });

  // Projects
  badges.push({
    id: 'opensource', name: 'Open Source Hero', description: 'A repo with 10+ stars',
    icon: '/badges/opensource.png', category: 'projects', rarity: 'rare', earned: repos.some(r => r.stargazers_count >= 10),
  });
  badges.push({
    id: 'solo-builder', name: 'Solo Builder', description: '5+ owned repositories',
    icon: '/badges/solobuilder.png', category: 'projects', rarity: 'uncommon', earned: ownRepos.length >= 5,
  });
  badges.push({
    id: 'deep-learner', name: 'Deep Learning Guru', description: '10+ public repositories',
    icon: '/badges/deeplearning.png', category: 'projects', rarity: 'common', earned: user.public_repos >= 10,
  });
  badges.push({
    id: 'personal-demo', name: 'Viral Creator', description: 'Total 50+ stars across repos',
    icon: '/badges/personaldemo.png', category: 'projects', rarity: 'legendary', earned: totalStars >= 50,
  });

  // Achievements
  badges.push({
    id: 'first-pr', name: 'First PR', description: 'Opened a pull request',
    icon: '/badges/firstpr.png', category: 'achievements', rarity: 'common', earned: prEvents.length > 0,
  });
  badges.push({
    id: 'code-reviewer', name: 'Code Reviewer', description: '5+ PR events recently',
    icon: '/badges/codereviewer.png', category: 'achievements', rarity: 'rare', earned: prEvents.length >= 5,
  });
  badges.push({
    id: 'bug-squasher', name: 'Bug Squasher', description: 'Active in issues',
    icon: '/badges/bugsquasher.png', category: 'achievements', rarity: 'epic', earned: issueEvents.length >= 3,
  });
  badges.push({
    id: 'hackathon', name: 'Hackathon Champ', description: '5+ languages used',
    icon: '/badges/hackathonchamp.png', category: 'achievements', rarity: 'legendary', earned: languages.size >= 5,
  });

  return badges;
}

async function fetchGitHubData(username: string) {
  const headers: HeadersInit = { Accept: 'application/vnd.github.v3+json' };

  const [userRes, reposRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, { headers }),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers }),
    fetch(`https://api.github.com/users/${username}/events?per_page=100`, { headers }),
  ]);

  if (!userRes.ok) throw new Error(userRes.status === 404 ? 'User not found' : 'Failed to fetch');

  const user: GitHubUser = await userRes.json();
  const repos: GitHubRepo[] = reposRes.ok ? await reposRes.json() : [];
  const events: GitHubEvent[] = eventsRes.ok ? await eventsRes.json() : [];

  return { user, repos, events };
}

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [selectedBadge, setSelectedBadge] = useState<GitBadge | null>(null);
  const [activeCategory, setActiveCategory] = useState<BadgeCategory | 'all'>('all');
  const [showBanner, setShowBanner] = useState(true);

  const { data, isLoading, error } = useQuery({
    queryKey: ['github', username],
    queryFn: () => fetchGitHubData(username!),
    enabled: !!username,
    retry: false,
  });

  const badges = data ? generateBadges(data.user, data.repos, data.events) : [];
  const earnedCount = badges.filter(b => b.earned).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="w-full max-w-6xl mx-auto px-4 py-6 flex items-center gap-4">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Change user
        </button>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
            <Github className="w-10 h-10 text-primary" />
          </motion.div>
          <p className="text-muted-foreground font-mono text-sm">Scanning @{username}'s GitHub...</p>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <p className="text-destructive font-mono text-lg">{(error as Error).message}</p>
          <button onClick={() => navigate('/')} className="px-6 py-2 rounded-xl font-display font-semibold text-primary-foreground bg-primary">
            Try another username
          </button>
        </div>
      )}

      {data && (
        <div className="w-full max-w-6xl mx-auto px-4 pb-16">
          {/* Profile header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-6 mb-10">
            <img src={data.user.avatar_url} alt={data.user.login} className="w-20 h-20 rounded-full border-2 border-primary/40 glow-cyan" />
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">{data.user.name || data.user.login}</h1>
              <a href={data.user.html_url} target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-primary hover:underline flex items-center gap-1">
                @{data.user.login} <ExternalLink className="w-3 h-3" />
              </a>
              {data.user.bio && <p className="text-sm text-muted-foreground mt-1 max-w-md">{data.user.bio}</p>}
            </div>
          </motion.div>

          {/* Banner toggle */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setShowBanner(true)}
              className={`px-5 py-2.5 rounded-lg text-sm font-mono transition-all border ${showBanner ? 'bg-primary/10 border-primary/40 text-primary glow-cyan' : 'bg-card border-border text-muted-foreground hover:border-primary/20'}`}
            >
              ✨ Banner Editor
            </button>
            <button
              onClick={() => setShowBanner(false)}
              className={`px-5 py-2.5 rounded-lg text-sm font-mono transition-all border ${!showBanner ? 'bg-primary/10 border-primary/40 text-primary glow-cyan' : 'bg-card border-border text-muted-foreground hover:border-primary/20'}`}
            >
              Badge Collection
            </button>
          </div>

          {showBanner ? (
            <BannerEditor
              username={data.user.login}
              displayName={data.user.name || data.user.login}
              avatarUrl={data.user.avatar_url}
              badges={badges}
            />
          ) : (
          <>

          {/* Stats */}
          <div className="mb-8">
            <h2 className="text-2xl font-display font-bold text-foreground">Badge Collection</h2>
            <p className="text-sm font-mono text-muted-foreground mt-1">
              <span className="text-primary">{earnedCount}</span> / {badges.length} badges earned
            </p>
          </div>

          {/* Badge grid */}
          <div className="relative bg-canvas bg-grid rounded-2xl border border-border p-8 min-h-[400px]">
            <motion.div layout className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-items-center">
              <AnimatePresence mode="popLayout">
                {filteredBadges.map((badge, i) => (
                  <motion.div key={badge.id} layout initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ delay: i * 0.03, type: 'spring', stiffness: 300, damping: 25 }}>
                    <BadgeCard badge={badge} size="md" onClick={() => setSelectedBadge(badge)} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          <AnimatePresence>
            {selectedBadge && <BadgeDetail badge={selectedBadge} onClose={() => setSelectedBadge(null)} />}
          </AnimatePresence>
          </>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;