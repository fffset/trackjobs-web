"use client";

import { useQuery } from "@tanstack/react-query";
import JobCard from "./JobCard";
import { api } from "@/lib/api";

const COLUMNS = ['Applied', 'Interview', 'Offer', 'Rejected'];

type Application = {
  id: number;
  company: string;
  position: string;
  location: string;
  status: string;
  createdAt: string;
}

export default function KanbanBoard() {
  const { data: applications, isLoading, error } = useQuery({
    queryKey: ["applications"],
    queryFn: api.applications.getAll,
  })

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>
  if (error) return <p className="text-red-500">Something went wrong.</p>
  return (
    <div className="grid grid-cols-4 gap-4">
      {COLUMNS.map((column) => (
        <div key={column} className='bg-muted rounded-lg p-4'>
          <h2 className="font-semibold mb-4">{column}</h2>
          <div className="flex flex-col gap-2">
            {applications?.filter((app: Application) => app.status === column).map((app: Application) => (
              <JobCard
                key={app.id}
                company={app.company}
                position={app.position}
                date={new Date(app.createdAt).toLocaleDateString()}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}