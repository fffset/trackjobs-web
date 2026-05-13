# TrackJobs

A full-stack job application tracker that helps you manage and organize your job search process with a Kanban-style board.

## Tech Stack

- **Framework:** Next.js 15 + TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **State Management:** TanStack Query
- **Auth:** JWT with httpOnly cookies

## Features

- Kanban board with drag-and-drop status management
- Add, update, and delete job applications
- Dashboard with application statistics
- Secure authentication (register/login/logout)
- Remember Me functionality
- Responsive design

## Coming Soon

- Claude AI integration for CV analysis
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

## Screenshots

_Coming soon_