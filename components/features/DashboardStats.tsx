"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { STATUS_COLORS, STATUSES } from "@/lib/constants";

export default function DashboardStats() {
  const { data: applications, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: api.applications.getAll,
  });

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>

  const total = applications?.length || 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{total}</p>
          </CardContent>
        </Card>

        {STATUSES.map((status) => (
          <Card key={status}>
            <CardHeader className="pb-2">
              <CardTitle className={`text-sm capitalize ${STATUS_COLORS[status]}`}>{status}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {applications?.filter((app:{status:string}) => app.status.toLowerCase() === status.toLowerCase()).length || 0}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}