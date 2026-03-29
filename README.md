# AISB Student Internship Portal

A full-stack web application for American International School of Budapest (AISB) students to discover, search, and apply to internship opportunities. Built with Next.js, Tailwind CSS, Prisma, and SQLite.

## Features

- **Homepage** — Hero section, how-it-works steps, featured internships, partner company grid, animated counters
- **Browse Internships** — Search, filter by field/location/duration, sort options
- **Internship Detail** — Full description, requirements, deadline countdown, company sidebar, apply CTA
- **Company Listings** — Grid of partner companies with open position counts
- **Company Detail** — Company profile with all current internship openings
- **Application Flow** — Multi-step form (personal info, CV upload, cover letter, review & submit)
- **Admin Dashboard** — Login-protected; manage internships (add/edit/delete), view applications, analytics

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 with AISB brand tokens
- **Database**: SQLite via Prisma ORM + better-sqlite3 adapter
- **Auth**: NextAuth.js with credential-based login
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Setup

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repo
git clone <repo-url>
cd aisb-internship-portal

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database with sample data
npx tsx prisma/seed.ts

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Admin Access

- **URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Email**: `admin@aisb.hu`
- **Password**: `admin123`

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout with Navbar & Footer
│   ├── globals.css                 # Tailwind config with AISB brand tokens
│   ├── internships/
│   │   ├── page.tsx                # Browse internships with filters
│   │   ├── InternshipFilters.tsx   # Client-side filter component
│   │   └── [id]/page.tsx           # Internship detail page
│   ├── companies/
│   │   ├── page.tsx                # Company listings grid
│   │   └── [id]/page.tsx           # Company detail page
│   ├── apply/
│   │   └── [internshipId]/
│   │       ├── page.tsx            # Application page
│   │       └── ApplicationForm.tsx # Multi-step application form
│   ├── admin/
│   │   ├── page.tsx                # Admin dashboard (protected)
│   │   ├── AdminDashboard.tsx      # Dashboard client component
│   │   └── login/page.tsx          # Admin login page
│   └── api/
│       ├── auth/[...nextauth]/     # NextAuth API route
│       ├── internships/            # CRUD API for internships
│       ├── companies/              # Companies API
│       └── applications/           # Applications API
├── components/
│   ├── Navbar.tsx                  # Sticky navigation with frosted glass
│   ├── Footer.tsx                  # Dark footer with AISB info
│   ├── InternshipCard.tsx          # Reusable internship card
│   ├── AnimatedSection.tsx         # Scroll-triggered fade-in wrapper
│   └── Counter.tsx                 # Animated number counter
├── lib/
│   ├── prisma.ts                   # Prisma client singleton
│   ├── auth.ts                     # NextAuth configuration
│   └── utils.ts                    # Utility functions (cn, formatDate, etc.)
└── generated/prisma/               # Generated Prisma client
```

## Database

The app uses SQLite for easy local development. The database file is at `dev.db` in the project root.

### Seeded Data

The seed script populates the database with 18 real internship opportunities from the AISB internship contacts list, including companies like:

- InterContinental Budapest (Hospitality)
- Dentons (Law)
- UNLEASH.ai (Media & Events)
- Four Seasons Hotel Budapest (Hospitality)
- Budapest Business Journal (Journalism)
- Mercedes-Benz Manufacturing Hungary (Automotive)
- Ferrari Budapest (Automotive)
- And more...

## AISB Brand Design System

The app uses the official AISB color palette and typography to match aisb.hu:

- **Primary accent**: `#84246d` (Magenta)
- **Secondary accent**: `#e74771` (Pink)
- **Headings**: Borna font family (bold, clean, modern)
- **Body**: Pockota font family (warm, readable)
- **Layout**: Frosted glass navbar, alternating section backgrounds, rounded cards with subtle shadows
