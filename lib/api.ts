const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = {
  applications: {
    getAll: () =>
      fetch(`${API_URL}/applications`).then((r) => r.json()),
    
    create: (data: { company: string; position: string; location?: string }) =>
      fetch(`${API_URL}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),

    update: (id: string, data: object) =>
      fetch(`${API_URL}/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),

    remove: (id: string) =>
      fetch(`${API_URL}/applications/${id}`, {
        method: "DELETE",
      }),
  },
};