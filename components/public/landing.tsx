"use client";
import { copy } from "@/data/copy";

import { ArrowRight, ShieldCheck, Activity, MapPin, Leaf } from "lucide-react";
import { ButtonLink, Photo, Badge } from "@/components/ui";
import { LambCard } from "@/components/marketplace/lamb-card";
import { useStore } from "@/lib/store";
export function Landing() {
  const { state } = useStore();
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <div className="eyebrow">
            <span />
            {copy.t0452}
          </div>
          <h1>
            {copy.t0453}
            <br />
            {copy.t0454}
            <br />
            <em>{copy.t0455}</em>
          </h1>
          <p>{copy.t0456}</p>
          <div className="hero-actions">
            <ButtonLink href="/marketplace">
              {copy.t0457}
              <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink secondary href="/how-it-works">
              {copy.t0458}
            </ButtonLink>
          </div>
          <div className="hero-proof">
            <ShieldCheck size={20} />
            <span>
              {copy.t0459}
              <i>{copy.t0343}</i>
              {copy.t0460}
              <i>{copy.t0343}</i>
              {copy.t0461}
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <Photo large />
          <div className="hero-caption">
            <div>
              <Badge gold>{copy.t0462}</Badge>
              <h3>
                {copy.t0463}
                <br />
                {copy.t0464}
              </h3>
              <span>
                <MapPin size={14} />
                {copy.t0465}
              </span>
            </div>
            <div className="mini-growth">
              <Activity size={21} />
              <small>{copy.t0466}</small>
              <b>{copy.t0467}</b>
              <span>{copy.t0468}</span>
            </div>
          </div>
        </div>
      </section>
      <div className="brand-band">
        <span>{copy.t0469}</span>
        <Leaf size={20} />
        <span>{copy.t0470}</span>
        <Leaf size={20} />
        <span>{copy.t0471}</span>
      </div>
      <section className="container section">
        <div className="section-heading">
          <div className="eyebrow">{copy.t0472}</div>
          <h2>
            {copy.t0473}
            <br />
            {copy.t0474}
          </h2>
        </div>
        <div className="steps">
          {[
            ["01", copy.t0475, copy.t0476],
            ["02", copy.t0477, copy.t0478],
            ["03", copy.t0479, copy.t0480],
            ["04", copy.t0481, copy.t0482],
          ].map(([n, t, p]) => (
            <div key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="pale-section">
        <div className="container section">
          <div className="section-heading row">
            <div>
              <div className="eyebrow">{copy.t0483}</div>
              <h2>{copy.t0484}</h2>
            </div>
            <ButtonLink href="/marketplace" secondary>
              {copy.t0485}
              <ArrowRight size={16} />
            </ButtonLink>
          </div>
          <div className="lamb-grid featured">
            {state.lambs
              .filter((l) => l.status === copy.t0289)
              .slice(0, 3)
              .map((l) => (
                <LambCard lamb={l} key={l.id} />
              ))}
          </div>
          <small>{copy.t0486}</small>
        </div>
      </section>
      <section className="container section">
        <div className="farmer-banner">
          <div>
            <div className="eyebrow">{copy.t0487}</div>
            <h2>
              {copy.t0488}
              <br />
              {copy.t0489}
            </h2>
            <p>{copy.t0490}</p>
            <ButtonLink secondary href="/for-farmers">
              {copy.t0491}
              <ArrowRight size={17} />
            </ButtonLink>
          </div>
          <Leaf size={110} strokeWidth={0.7} />
        </div>
      </section>
    </>
  );
}
