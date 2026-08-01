type TokenSwatch = {
  name: string;
  swatchClassName: string;
};

const COLOR_TOKENS: readonly TokenSwatch[] = [
  { name: "background", swatchClassName: "bg-background" },
  { name: "background-raised", swatchClassName: "bg-background-raised" },
  { name: "surface-1", swatchClassName: "bg-surface-1" },
  { name: "surface-2", swatchClassName: "bg-surface-2" },
  { name: "surface-3", swatchClassName: "bg-surface-3" },
  { name: "accent", swatchClassName: "bg-accent" },
  { name: "accent-hover", swatchClassName: "bg-accent-hover" },
  { name: "accent-soft", swatchClassName: "bg-accent-soft" },
  { name: "foreground", swatchClassName: "bg-foreground" },
  { name: "muted", swatchClassName: "bg-muted" },
  { name: "edge", swatchClassName: "bg-edge" },
  { name: "success", swatchClassName: "bg-success" },
  { name: "warning", swatchClassName: "bg-warning" },
  { name: "danger", swatchClassName: "bg-danger" },
];

/**
 * Dev-only visual review surface for the color tokens. Renders every
 * token so palette changes are reviewable at a glance.
 */
export function TokenGallery() {
  return (
    <section aria-labelledby="tokens-heading">
      <h2 id="tokens-heading" className="text-xl font-medium mb-6">
        Design tokens
      </h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {COLOR_TOKENS.map((token) => (
          <li
            key={token.name}
            className="rounded-md border border-edge bg-surface-1 p-3"
          >
            <div
              className={`h-12 rounded-sm border border-edge ${token.swatchClassName}`}
              aria-hidden="true"
            />
            <p className="mt-2 text-xs font-mono text-muted">{token.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
