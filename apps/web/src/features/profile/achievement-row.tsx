"use client";

import { Button } from "@/components/ui/button";
import { Field, fieldDescriptionIds } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import {
  ACHIEVEMENT_TYPES,
  type Achievement,
  type AchievementErrors,
} from "./schema";

const TYPE_LABELS: Record<Achievement["type"], string> = {
  olympiad: "Olympiad",
  hackathon: "Hackathon",
  competition: "Competition",
  certification: "Certification",
  publication: "Publication",
  project: "Project",
};

type AchievementRowProps = {
  /** Position, used only for the human-readable label. */
  index: number;
  value: Achievement;
  errors?: AchievementErrors;
  onChange: (value: Achievement) => void;
  onRemove: () => void;
};

/** One editable accolade entry (type, title, year, optional link). */
export function AchievementRow({
  index,
  value,
  errors,
  onChange,
  onRemove,
}: AchievementRowProps) {
  // Derived from the achievement's identity rather than its position, so a
  // label/control association cannot follow a row that has moved.
  const idBase = `achievement-${value.id}`;
  return (
    <fieldset className="rounded-lg border border-edge bg-surface-1 p-4">
      <legend className="sr-only">Achievement {index + 1}</legend>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${idBase}-type`} label="Type">
          <select
            id={`${idBase}-type`}
            value={value.type}
            onChange={(event) =>
              onChange({
                ...value,
                type: event.target.value as Achievement["type"],
              })
            }
            className={cn(
              "h-10 w-full rounded-md border border-edge bg-surface-1 px-3",
              "text-sm text-foreground transition-colors hover:border-surface-3",
            )}
          >
            {ACHIEVEMENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {TYPE_LABELS[type]}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id={`${idBase}-title`}
          label="Title"
          error={errors?.title}
        >
          <Input
            id={`${idBase}-title`}
            value={value.title}
            invalid={Boolean(errors?.title)}
            placeholder="e.g. IMO Silver Medal, ETHGlobal winner"
            aria-describedby={fieldDescriptionIds(`${idBase}-title`, {
              error: Boolean(errors?.title),
            })}
            onChange={(event) =>
              onChange({ ...value, title: event.target.value })
            }
          />
        </Field>
        <Field id={`${idBase}-year`} label="Year" error={errors?.year}>
          <Input
            id={`${idBase}-year`}
            value={value.year}
            invalid={Boolean(errors?.year)}
            inputMode="numeric"
            placeholder="2024"
            aria-describedby={fieldDescriptionIds(`${idBase}-year`, {
              error: Boolean(errors?.year),
            })}
            onChange={(event) =>
              onChange({ ...value, year: event.target.value })
            }
          />
        </Field>
        <Field id={`${idBase}-link`} label="Link" error={errors?.link}>
          <Input
            id={`${idBase}-link`}
            value={value.link}
            invalid={Boolean(errors?.link)}
            placeholder="https://…"
            aria-describedby={fieldDescriptionIds(`${idBase}-link`, {
              error: Boolean(errors?.link),
            })}
            onChange={(event) =>
              onChange({ ...value, link: event.target.value })
            }
          />
        </Field>
      </div>
      <div className="mt-3 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          aria-label={`Remove achievement ${index + 1}`}
        >
          Remove
        </Button>
      </div>
    </fieldset>
  );
}
