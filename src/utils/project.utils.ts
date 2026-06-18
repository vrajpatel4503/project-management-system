export const progressBarColor = (progress: number) => {
  if (progress >= 100) return "bg-emerald-500";
  if (progress >= 60) return "bg-emerald-500";
  if (progress >= 30) return "bg-amber-500";
  return "bg-indigo-500";
};

export const avatarPalette = [
  "bg-indigo-100 text-indigo-700",
  "bg-teal-100 text-teal-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-purple-100 text-purple-700",
  "bg-emerald-100 text-emerald-700",
];

export const avatarColor = (index: number) =>
  avatarPalette[index % avatarPalette.length];
