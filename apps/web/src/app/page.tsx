import { ComponentGallery } from "@/components/dev/component-gallery";
import { TokenGallery } from "@/components/dev/token-gallery";

/**
 * Temporary design-system review page. Replaced by the real product
 * surface once feature work begins.
 */
export default function Home() {
  return (
    <main className="flex-1 w-full max-w-content mx-auto px-6 py-16 md:py-24">
      <header className="mb-16">
        <p className="text-sm font-mono text-muted mb-4">stealthhire</p>
        <h1 className="text-4xl font-semibold tracking-tight mb-4">
          Proof over resume.
        </h1>
        <p className="text-lg text-muted max-w-prose">
          Talent intelligence connecting hiring managers directly with
          professionals through verified performance data.
        </p>
      </header>

      <TokenGallery />
      <ComponentGallery />
    </main>
  );
}
