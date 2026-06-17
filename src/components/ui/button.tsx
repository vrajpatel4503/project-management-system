// import React from "react";

// export type ButtonVariant = "default" | "outline" | "ghost";
// export type ButtonSize = "sm" | "md" | "lg";

// export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: ButtonVariant;
//   size?: ButtonSize;
// }

// export function Button({
//   children,
//   className = "",
//   variant = "default",
//   size = "md",
//   ...props
// }: ButtonProps) {
//   const base =
//     "inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

//   const variants: Record<ButtonVariant, string> = {
//     default: "bg-indigo-600 text-white hover:bg-indigo-700",
//     outline: "border border-gray-300 text-gray-900 hover:bg-gray-100",
//     ghost: "text-gray-700 hover:bg-gray-100",
//   };

//   const sizes: Record<ButtonSize, string> = {
//     sm: "h-8 px-3 text-xs",
//     md: "h-10 px-4 text-sm",
//     lg: "h-12 px-6 text-base",
//   };

//   return (
//     <button
//       {...props}
//       className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
//     >
//       {children}
//     </button>
//   );
// }
