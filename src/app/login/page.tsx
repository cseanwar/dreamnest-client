"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

function RegistrationSuccessMessage() {
  const searchParams = useSearchParams();
  if (searchParams.get("registered") !== "true") return null;
  return (
    <div className="alert alert-success mb-4 rounded-field text-sm">
      <span>Account created successfully! Please sign in.</span>
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, demoLogin } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDemo() {
    setIsLoading(true);
    setError("");
    try {
      await demoLogin();
      router.push("/");
    } catch {
      setError("Demo login failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md">
        <div className="card bg-white shadow-xl rounded-box p-8">
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-heading text-navy">DreamNest</Link>
            <p className="text-gray mt-2">Welcome back</p>
          </div>

          <Suspense fallback={null}>
            <RegistrationSuccessMessage />
          </Suspense>

          {error && (
            <div className="alert alert-error mb-4 rounded-field text-sm">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
              Sign In
            </Button>
          </form>

          <div className="divider text-gray text-sm my-6">or</div>

          <Button variant="outline" className="w-full" onClick={handleDemo} isLoading={isLoading}>
            Demo Login
          </Button>

          <p className="text-center text-sm text-gray mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-gold font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
