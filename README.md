<img width="2240" height="748" alt="slammers001-github-banner" src="https://github.com/user-attachments/assets/13c0dce2-d658-45be-8299-6fcad3dd17d9" />

# GitHub Badge Studio

Transform your GitHub contributions into collectible, glowing badges. Build your developer identity and showcase your coding achievements in a beautiful, interactive way.

## ✨ Features

- **Badge Generation**: Automatically generates badges based on your GitHub activity including commits, languages used, projects, and achievements
- **Interactive Badge Collection**: View and explore your earned badges with detailed descriptions and rarity levels
- **Banner Editor**: Create custom banners featuring your profile and earned badges
- **Real-time GitHub Data**: Fetches live data from GitHub API to analyze your contributions
- **Responsive Design**: Beautiful UI that works seamlessly on desktop and mobile devices
- **Animated Interactions**: Smooth animations and transitions using Framer Motion

## 🏆 Badge Categories

- **Commits**: Recognition for your coding consistency and dedication
- **Languages**: Celebrate your programming language diversity
- **Projects**: Showcase your repository achievements and impact
- **Achievements**: Highlight your contributions to the open-source community

Each badge has different rarity levels: Common, Uncommon, Rare, Epic, and Legendary.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd code-canvas

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Usage

1. Open the application in your browser
2. Enter a GitHub username to view their badge collection
3. Explore earned badges and create custom banners
4. Share your developer identity with the world

## 🛠️ Technologies Used

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: shadcn/ui components with Radix UI primitives
- **Routing**: React Router DOM
- **State Management**: TanStack Query for server state
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Testing**: Vitest with React Testing Library

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── BadgeCard.tsx   # Badge display component
│   ├── BadgeDetail.tsx # Badge detail modal
│   ├── BannerEditor.tsx # Banner creation tool
│   └── HeroSection.tsx # Landing page hero
├── pages/              # Route components
│   ├── Index.tsx       # Home page
│   ├── Profile.tsx     # User badge profile
│   └── NotFound.tsx    # 404 page
├── data/               # Static data and types
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## 🔧 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint
```

## 🌐 API Integration

This application uses the GitHub REST API to fetch user data:

- User profile information
- Repository data and statistics
- Activity events and contributions

Note: GitHub API has rate limits. For extensive use, consider authenticating with GitHub tokens.

## 🎨 Customization

### Adding New Badges

To add new badge types, modify the `generateBadges` function in `src/pages/Profile.tsx`:

```typescript
badges.push({
  id: 'unique-badge-id',
  name: 'Badge Name',
  description: 'Badge description',
  icon: '/badges/badge-icon.png',
  category: 'category-name',
  rarity: 'rare', // common | uncommon | rare | epic | legendary
  earned: yourConditionLogic,
});
```

### Styling

The application uses Tailwind CSS with custom themes. Modify `tailwind.config.ts` to adjust colors, fonts, and animations.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

Created by [@slammers001](https://github.com/slammers001)

---

Transform your GitHub journey into a visual story of growth and achievement. 🚀
