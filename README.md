# Programming Is Easy

A visual, interactive learning platform that teaches programming concepts through colorful lessons and a bank metaphor. No jargon. No boring tutorials. Just colorful, interactive lessons that make programming click.

## Stack

- **Framework**: [Astro](https://astro.build/) v6
- **UI**: [Svelte](https://svelte.dev/) v5
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **Auth & Data**: [Supabase](https://supabase.com/)
- **Animations**: [Lottie](https://airbnb.io/lottie/)
- **Hosting**: [Netlify](https://www.netlify.com/)

## Curriculum

The site is organized into five layers, presented through a bank metaphor:

1. **Concepts** - Variables, functions, data structures, control flow, OOP
2. **Syntax & Principles** - Code styles, naming, DRY, KISS, planning
3. **Languages & Tools** - TypeScript, Python, Go, C#, version control, CLI
4. **Build & Ship** - Choose a stack, databases, APIs, auth, deployment
5. **AI** - LLMs, copilots, chatbots, agentic AI

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Requires Node.js >= 22.12.0.

The dev server runs at `http://localhost:4321`.

## Project Structure

```
src/
  components/
    layout/       # Header, TopNav, Sidebar, MobileSidebar
    ui/           # ArchitectureDiagram, ProgressBar, etc.
  layouts/        # BaseLayout
  lib/            # Topics data, auth, Supabase client, mode toggle
  pages/          # Route pages (topics, languages, principles, etc.)
  styles/         # Global CSS
public/
  lottie/         # Animation JSON and video files
```
