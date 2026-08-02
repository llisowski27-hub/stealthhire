import Image from "next/image";

type Source = {
  name: string;
  src: string;
};

/**
 * Platforms whose public data feeds a profile. These are the rights
 * holders' own marks, shown to describe an integration — not to suggest
 * any of them endorses StealthHire.
 */
const SOURCES: readonly Source[] = [
  { name: "GitHub", src: "/logos/github.svg" },
  { name: "Stack Overflow", src: "/logos/stackoverflow.svg" },
  { name: "Kaggle", src: "/logos/kaggle.svg" },
  { name: "Hugging Face", src: "/logos/huggingface.svg" },
  { name: "arXiv", src: "/logos/arxiv.svg" },
  { name: "Medium", src: "/logos/medium.svg" },
];

/** Logo strip naming the public sources a profile is assembled from. */
export function SourceLogos() {
  return (
    <section
      aria-labelledby="sources-heading"
      className="border-b border-edge"
    >
      <div className="mx-auto w-full max-w-content px-6 py-10">
        <h2
          id="sources-heading"
          className="text-center font-mono text-xs text-muted"
        >
          profiles assembled from
        </h2>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {SOURCES.map((source) => (
            <li key={source.name} className="flex items-center gap-2.5">
              <Image
                src={source.src}
                alt=""
                width={24}
                height={24}
                className="size-6 opacity-75"
              />
              <span className="text-sm text-muted">{source.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
