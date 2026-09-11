"use client";
import { copy } from "@/data/copy";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Grid2X2,
  List,
  ShieldCheck,
} from "lucide-react";
import { PageHeader, EmptyState } from "@/components/ui";
import { LambCard } from "./lamb-card";
import { useStore } from "@/lib/store";
import { farms } from "@/data/mock";
import { money } from "@/lib/format";
export function Marketplace() {
  const { state } = useStore();
  const [q, setQ] = useState("");
  const [breed, setBreed] = useState("");
  const [region, setRegion] = useState("");
  const [max, setMax] = useState(1000);
  const [sort, setSort] = useState("recommended");
  const [view, setView] = useState("grid");
  const [fav, setFav] = useState(false);
  const [filter, setFilter] = useState(false);
  const rows = state.lambs
    .filter(
      (l) =>
        l.status === copy.t0289 &&
        (!breed || l.breed === breed) &&
        (!region ||
          farms.find((f) => f.id === l.farmId)?.location === region) &&
        l.price <= max &&
        (!fav || state.favorites.includes(l.id)) &&
        `${l.name} ${l.breed} ${farms.find((f) => f.id === l.farmId)?.name}`
          .toLowerCase()
          .includes(q.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : sort === "weight"
            ? a.weight - b.weight
            : 0,
    );
  return (
    <div className="container">
      <PageHeader
        eyebrow={copy.t0405}
        title={copy.t0406}
        description={copy.t0407}
      />
      <div className="trust-row">
        <span>
          <ShieldCheck size={17} />
          {copy.t0408}
        </span>
        <span>{copy.t0409}</span>
        <span>{copy.t0410}</span>
        <span>{copy.t0411}</span>
      </div>
      <div className="market-layout">
        <aside className={`filters card ${filter ? "expanded" : ""}`}>
          <h3>
            <SlidersHorizontal size={18} />
            {copy.t0412}
          </h3>
          <label>
            {copy.t0302}
            <select value={breed} onChange={(e) => setBreed(e.target.value)}>
              <option value="">{copy.t0189}</option>
              {[copy.t0190, copy.t0191, copy.t0303].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            {copy.t0186}
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="">{copy.t0413}</option>
              {farms.map((f) => (
                <option key={f.id}>{f.location}</option>
              ))}
            </select>
          </label>
          <label>
            {copy.t0414}
            <b>{money(max)}</b>
            <input
              aria-label={copy.t0415}
              type="range"
              min="400"
              max="1000"
              step="25"
              value={max}
              onChange={(e) => setMax(+e.target.value)}
            />
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={fav}
              onChange={(e) => setFav(e.target.checked)}
            />
            {copy.t0416}
          </label>
          <button
            className="text-button"
            onClick={() => {
              setBreed("");
              setRegion("");
              setMax(1000);
              setFav(false);
              setQ("");
            }}
          >
            {copy.t0417}
          </button>
          <div className="filter-note">
            <ShieldCheck size={24} />
            <b>{copy.t0418}</b>
            <p>{copy.t0419}</p>
            <small>{copy.t0420}</small>
          </div>
        </aside>
        <section>
          <div className="market-toolbar">
            <div className="search">
              <Search size={18} />
              <input
                aria-label={copy.t0421}
                placeholder={copy.t0422}
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <button className="mobile-only" onClick={() => setFilter(!filter)}>
              {copy.t0423}
            </button>
            <select
              aria-label={copy.t0424}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="recommended">{copy.t0425}</option>
              <option value="low">{copy.t0426}</option>
              <option value="high">{copy.t0427}</option>
              <option value="weight">{copy.t0428}</option>
            </select>
            <div className="view-toggle">
              <button
                aria-label={copy.t0429}
                aria-pressed={view === "grid"}
                onClick={() => setView("grid")}
              >
                <Grid2X2 size={18} />
              </button>
              <button
                aria-label={copy.t0430}
                aria-pressed={view === "list"}
                onClick={() => setView("list")}
              >
                <List size={18} />
              </button>
            </div>
          </div>
          <p className="results">
            {rows.length}
            {copy.t0431}
            <span>{copy.t0432}</span>
          </p>
          {rows.length ? (
            <div className={`lamb-grid ${view === "list" ? "list-view" : ""}`}>
              {rows.map((l) => (
                <LambCard key={l.id} lamb={l} />
              ))}
            </div>
          ) : (
            <EmptyState title={copy.t0433} description={copy.t0434} />
          )}
        </section>
      </div>
    </div>
  );
}
