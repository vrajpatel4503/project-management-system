// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// type UserRole = "admin" | "manager" | "employee";

// type AuthUser = {
//   email: string;
//   role: UserRole;
// };

// type AuthState = {
//   user: AuthUser | null;
//   isLoggedIn: boolean;
//   login: (
//     email: string,
//     password: string,
//   ) => {
//     ok: boolean;
//     error?: string;
//   };
//   logout: () => void;
// };


// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       user: null,
//       isLoggedIn: false,

//       login: (email, password) => {
//         const user = mockUsers.find(
//           (u) => u.email === email && u.password === password,
//         );

//         if (!user) {
//           return {
//             ok: false,
//             error: "Invalid email or password",
//           };
//         }

//         set({
//           user: {
//             email: user.email,
//             role: user.role,
//           },
//           isLoggedIn: true,
//         });

//         return { ok: true };
//       },

//       logout: () => {
//         set({
//           user: null,
//           isLoggedIn: false,
//         });
//       },
//     }),
//     {
//       name: "auth-storage",
//     },
//   ),
// );
