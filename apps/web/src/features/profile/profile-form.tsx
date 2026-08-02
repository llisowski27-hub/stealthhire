"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, fieldDescriptionIds } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { AchievementRow } from "./achievement-row";
import { loadDraft, saveDraft } from "./draft-storage";
import {
  EMPTY_ACHIEVEMENT,
  EMPTY_PROFILE,
  validateProfile,
  type ProfileDraft,
  type ProfileErrors,
} from "./schema";

type TextFieldName = Exclude<keyof ProfileDraft, "achievements">;

const TEXT_FIELDS: ReadonlyArray<{
  name: TextFieldName;
  label: string;
  placeholder: string;
  hint?: string;
}> = [
  { name: "firstName", label: "First name", placeholder: "Ada" },
  { name: "lastName", label: "Surname", placeholder: "Lovelace" },
  {
    name: "headline",
    label: "Headline",
    placeholder: "e.g. Backend engineer · distributed systems",
  },
  {
    name: "university",
    label: "University",
    placeholder: "e.g. University of Warsaw",
  },
  {
    name: "linkedinUrl",
    label: "LinkedIn URL",
    placeholder: "https://www.linkedin.com/in/…",
    hint: "We'll use this to import your career history later.",
  },
  {
    name: "githubUrl",
    label: "GitHub URL",
    placeholder: "https://github.com/…",
  },
];

/** Candidate profile builder. Saves a local draft until the backend exists. */
export function ProfileForm() {
  const { toast } = useToast();
  const [draft, setDraft] = useState<ProfileDraft>(EMPTY_PROFILE);
  const [errors, setErrors] = useState<ProfileErrors | undefined>();

  // Restore any local draft after mount. localStorage can't be read during
  // SSR, so this must happen post-hydration; the one-time extra render is
  // intentional.
  useEffect(() => {
    const stored = loadDraft();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only state restore
    if (stored) setDraft(stored);
  }, []);

  const setField = (name: TextFieldName, value: string) => {
    setDraft((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validation = validateProfile(draft);
    setErrors(validation);
    if (validation) {
      toast({
        title: "Please fix the highlighted fields",
        variant: "danger",
      });
      return;
    }
    const saved = saveDraft(draft);
    toast(
      saved
        ? {
            title: "Draft saved on this device",
            description:
              "Your profile will sync to your account once accounts launch.",
            variant: "success",
          }
        : {
            title: "Couldn't save the draft",
            description: "Local storage is unavailable in this browser.",
            variant: "danger",
          },
    );
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
      <section aria-labelledby="basics-heading">
        <h2 id="basics-heading" className="mb-4 text-lg font-medium">
          Basics
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {TEXT_FIELDS.map(({ name, label, placeholder, hint }) => (
            <Field
              key={name}
              id={name}
              label={label}
              hint={hint}
              error={errors?.[name]}
            >
              <Input
                id={name}
                value={draft[name]}
                placeholder={placeholder}
                invalid={Boolean(errors?.[name])}
                aria-describedby={fieldDescriptionIds(name, {
                  hint: Boolean(hint),
                  error: Boolean(errors?.[name]),
                })}
                onChange={(event) => setField(name, event.target.value)}
              />
            </Field>
          ))}
        </div>
      </section>

      <section aria-labelledby="achievements-heading">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="achievements-heading" className="text-lg font-medium">
            Achievements
          </h2>
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              setDraft((current) => ({
                ...current,
                achievements: [...current.achievements, EMPTY_ACHIEVEMENT],
              }))
            }
          >
            Add achievement
          </Button>
        </div>
        <p className="mb-4 text-sm text-muted">
          Olympiads, hackathons, competitions, certifications, publications —
          anything with proof behind it.
        </p>
        {draft.achievements.length === 0 ? (
          <p className="rounded-lg border border-dashed border-edge px-6 py-8 text-center text-sm text-muted">
            No achievements added yet.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {draft.achievements.map((achievement, index) => (
              <AchievementRow
                key={index}
                index={index}
                value={achievement}
                errors={errors?.achievements?.[index]}
                onChange={(next) =>
                  setDraft((current) => ({
                    ...current,
                    achievements: current.achievements.map((item, i) =>
                      i === index ? next : item,
                    ),
                  }))
                }
                onRemove={() =>
                  setDraft((current) => ({
                    ...current,
                    achievements: current.achievements.filter(
                      (_, i) => i !== index,
                    ),
                  }))
                }
              />
            ))}
          </div>
        )}
      </section>

      <div className="flex justify-end border-t border-edge pt-6">
        <Button type="submit" size="lg">
          Save profile
        </Button>
      </div>
    </form>
  );
}
