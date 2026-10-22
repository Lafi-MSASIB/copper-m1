import Image from "next/image";
import { SiteFooter } from "@/components/copper/site-footer";
import { SiteHeader } from "@/components/copper/site-header";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/copper/catalog";

const heroAlt: Record<string, string> = {
  "copper-home": "Copper Home smart speaker",
  "copper-notes": "Copper Notes pocket recorder",
};

export default function Home() {
  const products = getProducts();

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
                  alt={heroAlt[product.id] ?? product.name}
                  width={600}
                  height={600}
                  priority
                  className="h-auto w-full"
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
