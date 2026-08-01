import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Field, fieldDescriptionIds } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Dev-only visual review surface for the UI primitives. Not part of the
 * product; replaced when real feature surfaces exist.
 */
export function ComponentGallery() {
  return (
    <section aria-labelledby="components-heading" className="mt-20">
      <h2 id="components-heading" className="text-xl font-medium mb-6">
        Components
      </h2>

      <div className="flex flex-col gap-10">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button isLoading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button size="sm" variant="secondary">
            Small
          </Button>
          <Button size="lg">Large</Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 max-w-2xl">
          <Field id="g-email" label="Email" hint="Work email preferred">
            <Input
              id="g-email"
              type="email"
              placeholder="you@company.com"
              aria-describedby={fieldDescriptionIds("g-email", { hint: true })}
            />
          </Field>
          <Field id="g-name" label="Full name" error="This field is required">
            <Input
              id="g-name"
              invalid
              placeholder="Ada Lovelace"
              aria-describedby={fieldDescriptionIds("g-name", { error: true })}
            />
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Verified profile</CardTitle>
              <CardDescription>
                Multi-source talent intelligence.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted">
              Proof-of-skill portfolio aggregated from trusted sources.
            </CardContent>
            <CardFooter>
              <Button size="sm">View</Button>
              <Button size="sm" variant="ghost">
                Dismiss
              </Button>
            </CardFooter>
          </Card>

          <Card aria-busy="true">
            <CardContent className="flex flex-col gap-3">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-8 w-24 mt-2" />
            </CardContent>
          </Card>

          <EmptyState
            title="No candidates yet"
            description="Verified candidates will appear here."
            action={<Button size="sm">Invite</Button>}
          />
        </div>

        <ErrorState
          description="The candidate list failed to load."
          action={
            <Button size="sm" variant="secondary">
              Retry
            </Button>
          }
          className="max-w-2xl"
        />
      </div>
    </section>
  );
}
