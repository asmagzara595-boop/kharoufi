"use client";
import { copy, formatCopy } from "@/data/copy";

import Link from "next/link";
import { Heart, MapPin, ArrowUpRight } from "lucide-react";
import { Photo, Badge } from "@/components/ui";
import { farms } from "@/data/mock";
import { useStore } from "@/lib/store";
import { age, money } from "@/lib/format";
import type { Lamb } from "@/types";
export function LambCard({ lamb, href }: { lamb: Lamb; href?: string }) {
  const { state, update } = useStore();
  const favorite = state.favorites.includes(lamb.id);
  const farm = farms.find((f) => f.id === lamb.farmId)!;
  return (
    <article className="lamb-card">
      <div className="card-media">
        <Link
          href={href ?? `/marketplace/${lamb.id}`}
          aria-label={`Voir ${lamb.name}`}
        >
          <Photo lamb={lamb} />
        </Link>
        <span className="media-badge">{lamb.status}</span>
        <button
          className={`favorite ${favorite ? "chosen" : ""}`}
          aria-label={`${favorite ? copy.t0366 : copy.t0367} ${lamb.name} des favoris`}
          aria-pressed={favorite}
          onClick={() =>
            update((s) => ({
              ...s,
              favorites: favorite
                ? s.favorites.filter((id) => id !== lamb.id)
                : [...s.favorites, lamb.id],
            }))
          }
        >
          <Heart size={18} fill={favorite ? copy.t0368 : "none"} />
        </button>
      </div>
      <div className="lamb-card-body">
        <div className="row">
          <small>{lamb.breed}</small>
          <Badge gold>{copy.t0369}</Badge>
        </div>
        <h3>
          <Link href={href ?? `/marketplace/${lamb.id}`}>
            {lamb.name} <span>{copy.t0370}</span>
          </Link>
        </h3>
        <p className="location">
          <MapPin size={14} />
          {farm.name}
          {copy.t0008}
          {farm.location}
        </p>
        <div className="lamb-specs">
          <div>
            <small>{copy.t0371}</small>
            <b>{age(lamb.birthDate)}</b>
          </div>
          <div>
            <small>{copy.t0372}</small>
            <b>
              {lamb.weight}
              {copy.t0373}
            </b>
          </div>
          <div>
            <small>{copy.t0304}</small>
            <b>{lamb.sex}</b>
          </div>
        </div>
        <div className="card-price">
          <div>
            <strong>{money(lamb.price)}</strong>
            <small>
              {copy.t0374}
              {money(lamb.careFee)}
              {copy.t0041}
            </small>
          </div>
          <Link
            className="arrow-button"
            aria-label={formatCopy(copy.t0375, [lamb.name])}
            href={href ?? `/marketplace/${lamb.id}`}
          >
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </div>
    </article>
  );
}
