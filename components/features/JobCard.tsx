"use-client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { api } from "@/lib/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type JobCardProps = {
  id: string;
  company: string;
  position: string;
  date: string;
  status: string
}

const STATUSES = ["Applied", "Interview", "Offer", "Rejected"];

export default function JobCard({ id, company, position, date, status }: JobCardProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newStatus: string) => api.applications.update(id, { status: newStatus }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] })
  })

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">{position}</CardTitle>
        <p className="text-xs text-muted-foreground">{company}</p>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{date}</p>
        <Select value={status} onValueChange={(value: string) => mutation.mutate(value)}>         <SelectTrigger className="h-7 text-xs">
          <SelectValue />
        </SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent></Select>
      </CardContent>
    </Card>
  )
}