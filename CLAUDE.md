# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Floria's Wonderland is a personal website built with Next.js 15, featuring a portfolio, blog, interactive components, and database-backed features. The site includes forum/messaging functionality, a lab/projects section, travel logs, and experimental features.

## Development Commands

```bash
# Development
yarn dev                    # Start development server
yarn predev                 # Generate Ant Design CSS (runs automatically before dev)

# Build & Production
yarn build                  # Build for production
yarn prebuild              # Generate Ant Design CSS for production
yarn start                  # Start production server

# Code Quality
yarn lint                   # ESLint code linting
yarn typecheck             # TypeScript type checking

# Testing
yarn test                   # Run Jest unit tests
yarn test:watch            # Run Jest in watch mode
yarn test:e2e              # Run Playwright end-to-end tests
yarn test:e2e:ui           # Run Playwright with UI
yarn test:e2e:debug        # Debug Playwright tests

# Utilities
yarn img:opt               # Optimize images using scripts/optimize-images.mjs
```

## Architecture

### Frontend Structure
- **Next.js App Router**: Uses the modern app directory structure
- **Components**: Reusable UI components in `/src/components/`
- **Pages**: Route-based pages in `/src/app/` with nested layouts
- **Styling**: Tailwind CSS + Ant Design + SCSS modules
- **State Management**: React hooks + SWR for data fetching
- **Rich Text**: TipTap editor for content creation

### Backend Structure
- **API Routes**: RESTful APIs in `/src/app/api/`
- **Database**: MongoDB with Mongoose ODM
- **Models**: Database schemas in `/src/app/api/*/models/`
- **Connection**: Centralized database connection in `/src/app/api/lib/mongoose.js`

### Key Features
1. **Blog System**: Markdown-based blog with TOC and syntax highlighting
2. **Forum/Letters**: Message threading system with rich text editing
3. **Lab**: Project showcase with CRUD operations
4. **Interactive Elements**: 3D scenes, maps, animations
5. **Travel**: Geographic content with Mapbox integration

### Route Structure
```
/                    # Homepage with navigation cards
/blog               # Blog listing and articles
/letters            # Message/forum system
/lab                # Projects showcase
/about              # Personal information
/forum              # Discussion threads
/space              # 3D interactive scene
/tools              # Utility tools
/dance              # Dance-related content
/travel             # Travel logs (hidden route)
```

### Database Collections
- **Lab**: Project/experiment entries
- **Message**: Forum/letter threading system
- **Github**: Integration for repository data

### Environment Setup
- Requires `.env.local` with `MONGODB_URI`
- Optional: Mapbox tokens for map features
- GitHub integration for repository data

### Build Process
- **Pre-build**: Ant Design CSS extraction via `scripts/genAntdCss.tsx`
- **Image Optimization**: Custom script for asset optimization
- **Bundle Analysis**: Available via `ANALYZE=true yarn build`

### Testing Strategy
- **Unit Tests**: Jest with React Testing Library
- **E2E Tests**: Playwright for full user flows
- **Type Safety**: Strict TypeScript configuration

### Development Notes
- Uses Yarn 4.2.2 as package manager
- Husky pre-commit hooks with lint-staged
- Component library: Ant Design v5 with React 19 compatibility patch
- Font: Delius Google Font for branding
- Background: Custom parallax and 3D elements for visual appeal

## Git Workflow
- Main branch: `main`
- Development branch: `dev`
- Conventional commits enforced via commitlint