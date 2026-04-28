"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { api } from "@/lib/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";

type JobCardProps = {
  id: string;
  company: string;
  position: string;
  date: string;
  status: string
}

const STATUSES = ["applied", "interview", "offer", "rejected"];

export default function JobCard({ id, company, position, date, status }: JobCardProps) {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (newStatus: string) => api.applications.update(id, { status: newStatus }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] })
  })

  const deleteMutation = useMutation({
    mutationFn: () => api.applications.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] })
  })

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-sm font-semibold">{position}</CardTitle>
            <p className="text-xs text-muted-foreground">{company}</p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='ghost' size='icon' className="h-6 w-6 text-muted-foreground hover:text-red-500">x</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>This will permanently delete the application for <strong>{position}</strong> at <strong>{company}</strong>.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={() => deleteMutation.mutate()}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{date}</p>
        <Select value={status} onValueChange={(value: string) => updateMutation.mutate(value)}>         <SelectTrigger className="h-7 text-xs">
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