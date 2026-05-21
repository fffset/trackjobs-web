# TrackJobs

A full-stack job application tracker that helps you manage and organize your job search process with a Kanban-style board.

## Live Demo

[https://trackjobs-web.vercel.app](https://trackjobs-web.vercel.app)

> Backend spins down after inactivity on free tier. First request may take ~30 seconds.

## Tech Stack

- **Framework:** Next.js 15 + TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **State Management:** TanStack Query + Zustand
- **Auth:** JWT with httpOnly cookies + Refresh Token

## Features

- Kanban board with status management (Applied, Interview, Offer, Rejected)
- Add, update, and delete job applications
- Dashboard with application statistics
- Secure authentication (register/login/logout) with Remember Me
- **Claude AI-powered CV analysis** — paste your CV and job description, get a compatibility score, strengths, weaknesses, and recommendations
- Responsive design

## Coming Soon

- Cover letter generation
- Job listing compatibility score

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/fffset/trackjobs-web
cd trackjobs-web
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Running Locally

```bash
npm run dev
```

App will be available at `http://localhost:3000`

> Make sure the [TrackJobs API](https://github.com/fffset/trackjobs-api) is running locally.

## Deployment

Deployed on [Vercel](https://vercel.com). Backend hosted on [Render](https://render.com).