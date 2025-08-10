# Quistra - Q&A Platform

A modern, SEO-optimized Questions & Answers platform built with Astro and Tailwind CSS.

## Features

- 🚀 **SEO Optimized** - Built with Astro for maximum performance and search engine visibility
- 📱 **Responsive Design** - Mobile-first design that works on all devices
- 🎨 **Modern UI** - Clean, professional interface inspired by popular Q&A platforms
- ⚡ **Fast Loading** - Static site generation for lightning-fast page loads
- 🏷️ **Tag System** - Organize questions with tags
- 👥 **User Profiles** - Author information and reputation system
- 📊 **Vote System** - Upvote/downvote questions and answers
- ✅ **Accepted Answers** - Mark best answers for easy identification

## Tech Stack

- **Framework**: Astro
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Fonts**: Inter
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd qa
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:4321`

### Build for Production

```bash
npm run build
```

The built site will be in the `dist/` directory.

## Project Structure

```
/
├── public/
│   ├── avatars/          # User avatar images
│   └── favicon.svg       # Site favicon
├── src/
│   ├── components/       # Reusable components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── QuestionCard.astro
│   │   └── Sidebar.astro
│   ├── data/            # Static data
│   │   └── questions.js # Questions and answers data
│   ├── layouts/         # Page layouts
│   │   └── BaseLayout.astro
│   ├── pages/           # Route pages
│   │   ├── index.astro  # Homepage
│   │   └── questions/   # Question pages
│   └── styles/          # Global styles
│       └── global.css
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind configuration
└── package.json
```

## Customization

### Adding Questions

Edit `/src/data/questions.js` to add new questions and answers. Each question should have:

- Unique ID and slug
- Title and content
- Author information
- Vote counts, answer counts, view counts
- Tags array
- Creation date

### Styling

The site uses Tailwind CSS for styling. Key color scheme:

- Primary: Coral (#ff6b6b)
- Background: Gray-50
- Text: Gray-900/700/600

Customize colors in `tailwind.config.mjs`.

### SEO Configuration

Update the site URL and metadata in:
- `astro.config.mjs` - Site URL for sitemap generation
- `src/layouts/BaseLayout.astro` - Default meta tags

## Performance Features

- **Static Site Generation**: Pre-rendered HTML for fast loading
- **Image Optimization**: Optimized images with proper alt tags
- **Semantic HTML**: Proper heading hierarchy and semantic elements
- **Meta Tags**: Complete Open Graph and Twitter Card support
- **Sitemap**: Automatically generated XML sitemap
- **Minification**: CSS and HTML minification in production

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for your own Q&A platform!
