import JobCard from "./JobCard";

const COLUMNS = ['Applied', 'Interview', 'Offer', 'Rejected'];

const MOCK_JOBS = [
  { id: 1, company: "Google", position: "Frontend Developer", date: "Apr 27", status: "Applied" },
  { id: 2, company: "Meta", position: "Fullstack Developer", date: "Apr 25", status: "Interview" },
  { id: 3, company: "Netflix", position: "Backend Developer", date: "Apr 20", status: "Offer" },
];

export default function KanbanBoard() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {COLUMNS.map((column) => (
        <div key={column} className='bg-muted rounded-lg p-4'>
          <h2 className="font-semibold mb-4">{column}</h2>
          <div className="flex flex-col gap-2">
            {MOCK_JOBS.filter((job)=> job.status === column).map((job) => (
              <JobCard
                key={job.id}
                company={job.company}
                position={job.position}
                date={job.date}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}