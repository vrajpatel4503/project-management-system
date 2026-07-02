export const capitalize = (text?: string | null) => {
    if(!text) return ""
    return text.charAt(0).toUpperCase() + text.slice(1)
}

// use in employeeTable.tsx
export const formatLabel = (value: string) => {
  return value
    .split("_")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join(" ");
};