
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const refreshToken = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
};

const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const res = await fetch(url, { ...options, credentials: "include" });

  if (res.status === 401) {
    const refreshed = await refreshToken();
    if (refreshed) {
      return fetch(url, { ...options, credentials: "include" });
    }
    window.location.href = "/login";
  }

  return res;
};

export const api = {
  applications: {
    getAll: () =>
      fetchWithAuth(`${API_URL}/applications`).then((r) => r.json()),

    create: (data: { company: string; position: string; location?: string }) =>
      fetchWithAuth(`${API_URL}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),

    update: (id: string, data: object) =>
      fetchWithAuth(`${API_URL}/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),

    remove: (id: string) =>
      fetchWithAuth(`${API_URL}/applications/${id}`, {
        method: "DELETE",
      }),
  },
  ai: {
    analyzeCV: (data: { cv: string; jobDescription: string }) =>
      fetchWithAuth(`${API_URL}/ai/analyze-cv`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),

    generateCoverLetter: async (
      data: { cv: string; jobDescription: string },
      onChunk: (text: string) => void
    ) => {
      const res = await fetchWithAuth(`${API_URL}/ai/cover-letter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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