export const STATUSES = ["applied", "interview", "offer", "rejected"] as const;

export const STATUS_COLORS: Record<string, string> = {
  applied: "text-blue-500",
  interview: "text-yellow-500",
  offer: "text-green-500",
  rejected: "text-red-500",
};

export const COLUMNS = STATUSES;
