"use client";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
}

export default function Loader({ size = "md" }: LoaderProps) {
  const sizeClass = {
    sm: "h-6 w-6 border-2",
    md: "h-10 w-10 border-[3px]",
    lg: "h-14 w-14 border-4",
  };

  return (
    <div
      className={`${sizeClass[size]} animate-spin rounded-full border-primary border-t-transparent`}
    />
  );
}
