
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = {
  applications: {
    getAll: () =>
      fetch(`${API_URL}/applications`, {
        credentials: "include",
      }).then((r) => r.json()),

    create: (data: { company: string; position: string; location?: string }) =>
      fetch(`${API_URL}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      }).then((r) => r.json()),

    update: (id: string, data: object) =>
      fetch(`${API_URL}/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      }).then((r) => r.json()),

    remove: (id: string) =>
      fetch(`${API_URL}/applications/${id}`, {
        method: "DELETE",
        credentials: "include",
      }),
  },
  ai: {
    analyzeCV: (data: { cv: string; jobDescription: string }) =>
      fetch(`${API_URL}/ai/analyze-cv`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      }).then((r) => r.json()),

    generateCoverLetter: async (
      data: { cv: string; jobDescription: string },
      onChunk: (text: string) => void
    ) => {
      const res = await fetch(`${API_URL}/ai/cover-letter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) return;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const text = line.replace("data: ", "");
            if (text !== "[DONE]") {
              onChunk(text);
            }
          }
        }
      }
    },
  },
};