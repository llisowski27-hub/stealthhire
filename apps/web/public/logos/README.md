# Institution logos

Drop brand assets here and reference them from
`src/components/marketing/candidate-archetypes.ts` via each credential's
`logoSrc` (e.g. `logoSrc: "/logos/example.svg"`). Without a `logoSrc`, the
card falls back to a monogram tile.

## Before adding an asset

1. **Get it from the rights holder.** Most institutions publish a brand or
   media page with approved SVG/PNG files and usage rules. Use those files —
   do not trace a logo by hand or screenshot one; both produce an inaccurate
   mark and ignore the usage terms.
2. **Check what the usage rules allow.** Brand guidelines usually permit
   referring to an organisation factually, and usually prohibit any use that
   suggests partnership, sponsorship, or endorsement.
3. **Mind the context.** A logo shown on a real candidate's profile
   describes that person's actual affiliation. The same logo on an
   illustrative marketing profile implies the organisation is connected to
   StealthHire, which is a different claim and the one that draws
   complaints. For marketing surfaces, prefer logos of organisations that
   have agreed to be listed.

## Format

- SVG preferred; PNG at 2x otherwise.
- Square-ish aspect; the slot renders at 28px inside a 40px tile.
- Monochrome or light-on-dark versions read best against `--surface-3`.
