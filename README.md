# DreamNest

A full-stack real estate platform where users explore properties for sale or rent and registered members can list, manage, and promote their own properties.

## Tech Stack

**Frontend** — Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, DaisyUI 5, Framer Motion, Lucide React, Recharts  
**Backend** — Express 5, TypeScript, MongoDB (native driver v6), JWT authentication, bcryptjs

## Features

### Property Exploration
- Browse properties with advanced search, filter (category, type, price range), and sort controls
- Paginated results with live property count
- Detailed property view with image gallery, overview stats, amenities, reviews, and sticky inquiry sidebar

### Authentication
- JWT-based login and registration
- Protected routes with dedicated 401 (Unauthorized) and 403 (Forbidden) pages

### Property Management
- Authenticated users can add new properties via a validated multi-field form
- Manage listings through a responsive table (desktop) or card layout (mobile) with View, Edit, and Delete actions
- Inline delete confirmation modal

### Landing Page
- Auto-rotating hero slider
- Featured properties section (fetches latest 4 listings from the API)
- Services, categories (with live property counts from aggregation), statistics, testimonials, blog, newsletter, and FAQ sections

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with 9 content sections |
| `/explore` | Browse & filter all properties |
| `/properties/[id]` | Full property detail |
| `/items/add` | Submit a new property listing (protected) |
| `/items/manage` | View / edit / delete your listings (protected) |
| `/items/edit/[id]` | Edit an existing listing (protected) |
| `/login` | Sign in |
| `/register` | Create an account |
| `/about` | About the platform |
| `/contact` | Contact form |
| `/faq` | Frequently asked questions |
| `/blog` | Blog listing |
| `/unauthorized` | 401 — Sign in required |
| `/forbidden` | 403 — Access denied |

## Getting Started

### Prerequisites
- Node.js 20+
- MongoDB instance (local or Atlas)

### 1. Clone the repository

```bash
git clone <repo-url>
cd dreamnest-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Run the backend

The backend lives in `../dreamnest-server`. From that directory:

```bash
npm install
npm run dev   # starts on port 5000
```

### 5. Run the client

```bash
npm run dev   # starts on port 3000
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── about/
│   ├── blog/
│   ├── contact/
│   ├── explore/
│   ├── faq/
│   ├── forbidden/
│   ├── items/        # add / manage / edit [id]
│   ├── login/
│   ├── properties/   # [id] detail page
│   ├── register/
│   └── unauthorized/
├── components/       # Reusable UI & section components
│   ├── home/         # Landing page sections
│   ├── layout/       # Navbar, Footer
│   ├── properties/   # PropertyCard, filters, pagination
│   └── ui/           # Button, Card, Input, Badge, Skeleton, ConfirmModal, etc.
├── context/          # AuthContext (JWT)
└── lib/              # API client helpers
```
