"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";

type AnalysisResult = {
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
};

export default function CVAnalysisDialog() {
  const [open, setOpen] = useState(false);
  const [cv, setCv] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const mutation = useMutation({
    mutationFn: () => api.ai.analyzeCV({ cv, jobDescription }),
    onSuccess: (data: AnalysisResult) => {
      setResult(data);
    },
  });

  const handleClose = () => {
    setOpen(false);
    setResult(null);
    setCv("");
    setJobDescription("");
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-500";
    if (score >= 5) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Analyze CV</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>CV Analysis</DialogTitle>
        </DialogHeader>

        {!result ? (
          <div className="flex flex-col gap-4 mt-4">
            <div>
              <p className="text-sm font-medium mb-2">Your CV</p>
              <Textarea
                placeholder="Paste your CV here..."
                value={cv}
                onChange={(e) => setCv(e.target.value)}
                rows={6}
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Job Description</p>
              <Textarea
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={6}
              />
            </div>
            <Button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending || !cv || !jobDescription}
            >
              {mutation.isPending ? "Analyzing..." : "Analyze"}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-6 mt-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Compatibility Score</p>
              <p className={`text-6xl font-bold ${getScoreColor(result.score)}`}>
                {result.score}/10
              </p>
            </div>

            <div>
              <p className="font-semibold mb-2 text-green-600">💪 Strengths</p>
              <ul className="flex flex-col gap-2">
                {result.strengths.map((s, i) => (
                  <li key={i} className="text-sm bg-green-50 p-2 rounded-md">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2 text-red-600">⚠️ Weaknesses</p>
              <ul className="flex flex-col gap-2">
                {result.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm bg-red-50 p-2 rounded-md">
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2 text-blue-600">💡 Recommendations</p>
              <ul className="flex flex-col gap-2">
                {result.recommendations.map((r, i) => (
                  <li key={i} className="text-sm bg-blue-50 p-2 rounded-md">
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}