import { copy } from "@/data/copy";
import { content } from "@/data/content";
import { ButtonLink, PageHeader } from "@/components/ui";
export function ContentPage({ slug }: { slug: string }) {
  const c = content[slug];
  return (
    <div className="content-page">
      <PageHeader eyebrow={copy.t0450} title={c.title} description={c.intro} />
      {c.sections.map(([t, p]) =>
        slug === "faq" ? (
          <details key={t}>
            <summary>{t}</summary>
            <p>{p}</p>
          </details>
        ) : (
          <section className="card" key={t}>
            <h2>{t}</h2>
            <p>{p}</p>
          </section>
        ),
      )}
      <ButtonLink href={slug === "for-farmers" ? "/register" : "/marketplace"}>
        {slug === "for-farmers" ? copy.t0451 : copy.t0113}
      </ButtonLink>
    </div>
  );
}
