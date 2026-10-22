import Image from "next/image";
import { SiteFooter } from "@/components/copper/site-footer";
import { SiteHeader } from "@/components/copper/site-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  formatMemory,
  formatNotesHours,
  formatUsd,
  getPlans,
  getPrivacySummary,
  getProducts,
} from "@/lib/copper/catalog";

const productAlt: Record<string, string> = {
  "copper-home": "Copper Home smart speaker",
  "copper-notes": "Copper Notes pocket recorder",
};

const lifestyleAlt: Record<string, { alt: string; caption: string }> = {
  "copper-home-desert-light": {
    alt: "Copper Home smart speaker glowing in warm desert light",
    caption: "Copper Home brings calm, helpful answers to every room.",
  },
  "copper-notes-stone-desk": {
    alt: "Copper Notes recorder resting on a stone desk",
    caption: "Copper Notes keeps every meeting and lecture organized.",
  },
  "copper-notes-golden-hour": {
    alt: "Copper Notes recorder clipped on in golden-hour light",
    caption: "Clip it on and capture ideas wherever the day takes you.",
  },
};

function lifestyleKey(src: string) {
  return src.split("/").pop()?.replace(".png", "") ?? src;
}

export default function Home() {
  const products = getProducts();
  const plans = getPlans();
  const privacy = getPrivacySummary();
  const free = plans.find((plan) => plan.id === "free");
  const plus = plans.find((plan) => plan.id === "copper-plus");

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section
          data-testid="hero"
          id="top"
          className="bg-secondary text-secondary-foreground"
        >
          <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
            <div className="flex flex-col items-start gap-6">
              <h1 className="text-4xl font-bold md:text-5xl">
                Raw ideas, refined into answers you can trust.
              </h1>
              <p className="text-lg">From raw ideas to refined answers.</p>
              <Button asChild size="lg">
                <a href="#products">See products</a>
              </Button>
            </div>
            <div className="grid grid-cols-2 items-end gap-4">
              {products.map((product) => (
                <Image
                  key={product.id}
                  src={product.cutout}
                  alt={productAlt[product.id] ?? product.name}
                  width={600}
                  height={600}
                  priority
                  className="h-auto w-full"
                />
              ))}
            </div>
          </div>
        </section>

        <section
          data-testid="products"
          id="products"
          className="scroll-mt-16 py-16"
        >
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-8 text-3xl font-bold">Meet the Copper family</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {products.map((product) => (
                <Card
                  key={product.id}
                  data-testid="product-card"
                  data-product={product.id}
                >
                  <CardHeader>
                    <Image
                      src={product.cutout}
                      alt={productAlt[product.id] ?? product.name}
                      width={600}
                      height={600}
                      className="mx-auto h-auto w-full max-w-xs"
                    />
                    <CardTitle className="text-2xl font-bold">
                      {product.name}
                    </CardTitle>
                    <CardDescription>
                      {product.type} · {formatUsd(product.priceUsd)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="flex list-disc flex-col gap-2 pl-5">
                      {product.features.map((feature) => (
                        <li key={feature.name}>
                          <span className="font-semibold">{feature.name}.</span>{" "}
                          {feature.description}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          data-testid="showcase"
          id="showcase"
          className="bg-secondary text-secondary-foreground scroll-mt-16 py-16"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4">
            <h2 className="text-3xl font-bold">Made for life in Arizona</h2>
            {products
              .flatMap((product) => product.lifestyle)
              .map((src, index) => {
                const info = lifestyleAlt[lifestyleKey(src)];
                return (
                  <figure
                    key={src}
                    className={
                      "grid items-center gap-6 md:grid-cols-2 " +
                      (index % 2 === 1 ? "md:[&>img]:order-2" : "")
                    }
                  >
                    <Image
                      src={src}
                      alt={info?.alt ?? "Copper product in an Arizona setting"}
                      width={1200}
                      height={800}
                      className="h-auto w-full rounded-lg"
                    />
                    <figcaption className="text-xl">
                      {info?.caption ?? "Copper fits right into your day."}
                    </figcaption>
                  </figure>
                );
              })}
          </div>
        </section>

        <section
          data-testid="plus-pricing"
          id="plus"
          className="scroll-mt-16 py-16"
        >
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-8 text-3xl font-bold">Free or Copper Plus</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {free && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                      {free.name}
                    </CardTitle>
                    <CardDescription>
                      {formatUsd(free.monthlyUsd)}/month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="flex list-disc flex-col gap-2 pl-5">
                      <li>Memory kept for {formatMemory(free.memoryDays)}</li>
                      <li>
                        Notes recording:{" "}
                        {formatNotesHours(free.notesHoursPerMonth)}
                      </li>
                      <li>
                        Refined answers:{" "}
                        {free.refinedAnswers ? "Included" : "Not included"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              )}
              {plus && (
                <Card className="border-primary ring-primary border-2 ring-2">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                      {plus.name}
                    </CardTitle>
                    <CardDescription>
                      {formatUsd(plus.monthlyUsd)}/month or{" "}
                      {formatUsd(plus.annualUsd)}/year
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="flex list-disc flex-col gap-2 pl-5">
                      <li>Memory kept for {formatMemory(plus.memoryDays)}</li>
                      <li>
                        Notes recording:{" "}
                        {formatNotesHours(plus.notesHoursPerMonth)}
                      </li>
                      <li>
                        Refined answers:{" "}
                        {plus.refinedAnswers ? "Included" : "Not included"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        <section
          data-testid="privacy-summary"
          id="privacy"
          className="bg-secondary text-secondary-foreground scroll-mt-16 py-16"
        >
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="mb-4 text-3xl font-bold">
              How Copper handles your recordings
            </h2>
            <p className="mb-6">
              Our {privacy.policy} privacy policy, in plain language.
            </p>
            <ul className="flex list-disc flex-col gap-3 pl-5">
              {privacy.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
