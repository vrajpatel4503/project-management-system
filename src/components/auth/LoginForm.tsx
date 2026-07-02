"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { loginUser } from "@/lib/firebase/auth/auth.services";
import { FirebaseError } from "firebase/app";

import { QUICK_LOGINS } from "@/data/auth-data";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(3, "Enter your password"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // ----- On submit -----
  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);

      const user = await loginUser(data.email, data.password);

      const token = await user.getIdToken();

      console.log("Token:", token);

      toast.success("Login Successful");

      router.push("/dashboard");
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log("Firebase Code:", error.code);
        switch (error.code) {
          case "auth/invalid-credential":
            toast.error("Invalid email or password");
            break;

          default:
            toast.error("Login failed");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ----- use for quickFill for admin, manager, qa, employee ------
  const quickFill = (email: string) => {
    setValue("email", email, { shouldValidate: true });
  };

  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-background text-foreground">
      {/* LEFT PANEL */}
      <section className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-primary text-primary-foreground">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold">SevenSquare</span>
        </div>

        <div className="max-w-md">
          <h2 className="text-4xl font-bold">
            The operating system for modern teams.
          </h2>
          <p className="mt-4 opacity-80">
            Plan projects, ship faster, and stay aligned. SevenSquare brings
            clarity to your team&apos;s day.
          </p>
        </div>

        <p className="text-xs opacity-70">
          © SevenSquare Inc · Internal use only
        </p>
      </section>

      {/* RIGHT PANEL */}
      <section className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your workspace.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                {...register("email")}
                disabled={isLoading}
                className="w-full mt-1 px-3 py-2 rounded-lg border bg-card focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {errors.email && (
                <p className="text-xs text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium">Password</label>

              <div className="relative mt-1">
                <input
                  type={show ? "text" : "password"}
                  {...register("password")}
                  disabled={isLoading}
                  className="w-full px-3 py-2 rounded-lg border bg-card focus:outline-none focus:ring-2 focus:ring-ring pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-2 top-2.5 text-muted-foreground"
                >
                  {show ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-xs text-destructive mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              Sign in
            </button>
          </form>

          {/* QUICK LOGIN */}
          <div className="mt-6">
            <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">
              Quick Sign In
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {QUICK_LOGINS.map((q) => (
                <button
                  key={q.label}
                  type="button"
                  onClick={() => quickFill(q.email)}
                  className="rounded-lg border bg-card p-4 text-left transition-all hover:bg-muted hover:border-primary"
                >
                  <p className="font-medium">{q.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground truncate">
                    {q.email}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Accounts created by Admin/Manager
          </p>
        </div>
      </section>
    </main>
  );
}
