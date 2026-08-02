import type { Metadata } from "next";
import { ComponentGallery } from "@/components/dev/component-gallery";
import { TokenGallery } from "@/components/dev/token-gallery";

export const metadata: Metadata = {
  title: "Design system",
};

/** Internal design-system review page (tokens + component gallery). */
export default function DesignPage() {
  return (
    <main className="flex-1 w-full max-w-content mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight mb-10">
        Design system
      </h1>
      <TokenGallery />
      <ComponentGallery />
    </main>
  );
}
