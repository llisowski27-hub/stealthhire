import type { Metadata } from "next";
import { ToastProvider } from "@/components/ui/toast";
import { ProfileForm } from "@/features/profile/profile-form";

export const metadata: Metadata = {
  title: "Your profile",
};

export default function ProfilePage() {
  return (
    <main className="flex-1 w-full max-w-content mx-auto px-6 py-16">
      <header className="mb-10 max-w-prose">
        <h1 className="mb-3 text-3xl font-semibold tracking-tight">
          Build your verified profile
        </h1>
        <p className="text-muted">
          Tell us who you are and what you&apos;ve achieved. Every entry can
          be verified later — that&apos;s what makes it worth more than a
          resume.
        </p>
      </header>
      <ToastProvider>
        <ProfileForm />
      </ToastProvider>
    </main>
  );
}
