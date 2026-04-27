import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type JobCardProps = {
  company: string;
  position: string;
  date: string;
}

export default function JobCard({ company, position, date }: JobCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">{position}</CardTitle>
        <p className="text-xs text-muted-foreground">{company}</p>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{date}</p>
      </CardContent>
    </Card>
  )
}