import AddApplicationDialog from "@/components/features/AddApplicationDialog";
import KanbanBoard from "@/components/features/KanbanBoard";

export default function ApplicationsPage
  () {
  return (
    <main className="p-8">
      <div className='flex items-center justify-between mb-8'>
        <h1 className="text-2xl font-bold">Applications</h1>
        <AddApplicationDialog />
      </div>
      <KanbanBoard />
    </main>
  )
}