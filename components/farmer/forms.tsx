"use client";
import { copy, formatCopy } from "@/data/copy";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { PageHeader, ButtonLink, EmptyState } from "@/components/ui";
import { useStore, uid } from "@/lib/store";
import { DEMO_DATE, plans } from "@/data/mock";
import type { Breed, Lamb } from "@/types";
export function Upload({
  onPhoto,
  label = copy.t0283,
  required = false,
}: {
  onPhoto: (s: string) => void;
  label?: string;
  required?: boolean;
}) {
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  return (
    <div>
      <label>
        {label}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required={required}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            if (
              file.size > 1500000 ||
              !["image/jpeg", "image/png", "image/webp"].includes(file.type)
            ) {
              setError(copy.t0284);
              e.target.value = "";
              onPhoto("");
              setPreview("");
              return;
            }
            setError("");
            const reader = new FileReader();
            reader.onload = () => {
              setPreview(String(reader.result));
              onPhoto(String(reader.result));
            };
            reader.readAsDataURL(file);
          }}
        />
      </label>
      <small>{copy.t0285}</small>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      {preview && (
        <div className="photo-preview">
          <Image src={preview} fill unoptimized alt={copy.t0286} />
        </div>
      )}
    </div>
  );
}
export function LivestockForm({ id }: { id?: string }) {
  const { state, update, notify } = useStore();
  const old = state.lambs.find((l) => l.id === id);
  const router = useRouter();
  const [photo, setPhoto] = useState(old?.photo ?? "");
  const [error, setError] = useState("");
  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const birth = String(f.get("birth"));
    const days = (Date.parse(DEMO_DATE) - Date.parse(birth)) / 86400000;
    const weight = Number(f.get("weight"));
    if (days < 56 || days > 92) {
      setError(copy.t0287);
      return;
    }
    if (weight < 8 || weight > 35) {
      setError(copy.t0288);
      return;
    }
    const lambId = old?.id ?? uid();
    const record: Lamb = {
      id: lambId,
      name: String(f.get("name")).trim(),
      tag: String(f.get("tag")).trim(),
      breed: String(f.get("breed")) as Breed,
      birthDate: birth,
      sex: String(f.get("sex")) as Lamb["sex"],
      weight,
      expectedWeight: Number(f.get("expected")),
      price: Number(f.get("price")),
      careFee: plans.find((p) => p.id === f.get("plan"))!.monthly,
      farmId: old?.farmId ?? "f1",
      health: String(f.get("health")),
      status: old?.status ?? copy.t0289,
      feedingPlanId: String(f.get("plan")),
      weights: old?.weights ?? [{ date: DEMO_DATE, weight }],
      healthRecords: old?.healthRecords ?? [
        {
          id: uid(),
          date: DEMO_DATE,
          title: copy.t0290,
          notes: String(f.get("health")),
          vet: copy.t0291,
        },
      ],
      ...(photo ? { photo } : {}),
    };
    if (state.lambs.some((l) => l.tag === record.tag && l.id !== old?.id)) {
      setError(copy.t0292);
      return;
    }
    if (old && old.weight !== weight)
      record.weights = [...old.weights, { date: DEMO_DATE, weight }];
    update((s) => ({
      ...s,
      lambs: old
        ? s.lambs.map((l) => (l.id === id ? record : l))
        : [...s.lambs, record],
    }));
    notify(old ? copy.t0293 : copy.t0294);
    router.push(`/farmer/livestock/${lambId}`);
  }
  if (id && !old)
    return (
      <EmptyState
        title={copy.t0001}
        href="/farmer/livestock"
        label={copy.t0116}
      />
    );
  return (
    <>
      <PageHeader
        eyebrow={copy.t0139}
        title={old ? copy.t0295 : copy.t0296}
        description={copy.t0297}
      />
      <form onSubmit={save} className="stack">
        <section className="card">
          <h2>{copy.t0298}</h2>
          <div className="form-grid">
            <label>
              {copy.t0299}
              <input
                name="name"
                required
                maxLength={40}
                defaultValue={old?.name}
              />
            </label>
            <label>
              {copy.t0300}
              <input
                name="tag"
                required
                defaultValue={old?.tag}
                placeholder={copy.t0301}
              />
            </label>
            <label>
              {copy.t0302}
              <select name="breed" defaultValue={old?.breed}>
                {[copy.t0190, copy.t0191, copy.t0303].map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </label>
            <label>
              {copy.t0304}
              <select name="sex" defaultValue={old?.sex}>
                <option>{copy.t0305}</option>
                <option>{copy.t0306}</option>
              </select>
            </label>
            <label>
              {copy.t0307}
              <input
                name="birth"
                required
                type="date"
                min="2026-06-10"
                max="2026-07-16"
                defaultValue={old?.birthDate ?? "2026-07-02"}
              />
            </label>
            <label>
              {copy.t0308}
              <input
                name="weight"
                required
                type="number"
                min="8"
                max="35"
                step="0.1"
                defaultValue={old?.weight}
              />
            </label>
            <label>
              {copy.t0309}
              <input
                name="expected"
                required
                type="number"
                min="20"
                max="70"
                step="0.1"
                defaultValue={old?.expectedWeight ?? 42}
              />
            </label>
            <div className="info-box">{copy.t0310}</div>
          </div>
        </section>
        <section className="card">
          <h2>{copy.t0311}</h2>
          <div className="form-grid">
            <Upload onPhoto={setPhoto} />
            <label>
              {copy.t0312}
              <textarea
                name="health"
                required
                defaultValue={old?.health ?? copy.t0313}
              />
            </label>
          </div>
        </section>
        <section className="card">
          <h2>{copy.t0314}</h2>
          <div className="form-grid">
            <label>
              {copy.t0315}
              <input
                name="price"
                required
                type="number"
                min="1"
                max="10000"
                defaultValue={old?.price ?? 500}
              />
            </label>
            <label>
              {copy.t0086}
              <select
                name="plan"
                defaultValue={old?.feedingPlanId ?? "pasture"}
              >
                {plans.map((p) => (
                  <option value={p.id} key={p.id}>
                    {p.name}
                    {copy.t0008}
                    {p.monthly}
                    {copy.t0316}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>
        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}
        <div className="wide-actions">
          <button className="primary" type="submit">
            {old ? copy.t0317 : copy.t0318}
          </button>
          <ButtonLink secondary href="/farmer/livestock">
            {copy.t0168}
          </ButtonLink>
        </div>
      </form>
    </>
  );
}
export function CareForm() {
  const { state, update, notify } = useStore();
  const params = useSearchParams();
  const router = useRouter();
  const [lambId, setLamb] = useState(
    params.get("lamb") ?? state.lambs[0]?.id ?? "",
  );
  const [kind, setKind] = useState("weight");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");
  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const notes = String(f.get("notes"));
    const weight = Number(f.get("weight"));
    const date = String(f.get("date"));
    if (
      !lambId ||
      date > DEMO_DATE ||
      date < state.lambs.find((l) => l.id === lambId)!.birthDate
    ) {
      setError(copy.t0319);
      return;
    }
    if (kind === "weight" && (weight < 8 || weight > 70)) {
      setError(copy.t0320);
      return;
    }
    const title =
      kind === "weight"
        ? formatCopy(copy.t0321, [weight])
        : kind === "health"
          ? String(f.get("title"))
          : copy.t0322;
    const lamb = state.lambs.find((l) => l.id === lambId)!;
    // Future API: upload media to object storage, save the care record, and notify the reservation owner.
    update((s) => ({
      ...s,
      lambs: s.lambs.map((l) =>
        l.id !== lambId
          ? l
          : kind === "weight"
            ? {
                ...l,
                weight: date >= l.weights.at(-1)!.date ? weight : l.weight,
                weights: [...l.weights, { date, weight }].sort((a, b) =>
                  a.date.localeCompare(b.date),
                ),
              }
            : kind === "health"
              ? {
                  ...l,
                  health: String(f.get("status")),
                  healthRecords: [
                    {
                      id: uid(),
                      date,
                      title,
                      notes,
                      vet: String(f.get("vet")),
                    },
                    ...l.healthRecords,
                  ],
                }
              : l,
      ),
      updates: [
        { id: uid(), lambId, date, title, notes, ...(photo ? { photo } : {}) },
        ...s.updates,
      ],
      notifications: [
        {
          id: uid(),
          title: `${lamb.name} · ${title}`,
          href: `/customer/lambs/${lambId}/health`,
          read: false,
        },
        ...s.notifications,
      ],
    }));
    notify(copy.t0323);
    router.push(`/farmer/livestock/${lambId}`);
  }
  return (
    <>
      <PageHeader
        eyebrow={copy.t0324}
        title={copy.t0325}
        description={copy.t0326}
      />
      <form onSubmit={save} className="card stack">
        <div className="form-grid">
          <label>
            {copy.t0232}
            <select value={lambId} onChange={(e) => setLamb(e.target.value)}>
              {state.lambs.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                  {copy.t0008}
                  {l.tag}
                </option>
              ))}
            </select>
          </label>
          <label>
            {copy.t0227}
            <input
              type="date"
              name="date"
              required
              max={DEMO_DATE}
              defaultValue={DEMO_DATE}
            />
          </label>
        </div>
        <div className="tabs">
          {[
            ["weight", copy.t0327],
            ["health", copy.t0240],
            ["photo", copy.t0328],
          ].map(([v, n]) => (
            <button
              key={v}
              type="button"
              aria-pressed={kind === v}
              onClick={() => setKind(v)}
            >
              {n}
            </button>
          ))}
        </div>
        {kind === "weight" && (
          <label>
            {copy.t0329}
            <input
              name="weight"
              type="number"
              step="0.1"
              min="8"
              max="70"
              required
            />
          </label>
        )}
        {kind === "health" && (
          <div className="form-grid">
            <label>
              {copy.t0330}
              <input name="title" required placeholder={copy.t0331} />
            </label>
            <label>
              {copy.t0332}
              <input name="vet" required placeholder={copy.t0333} />
            </label>
            <label className="full">
              {copy.t0334}
              <select name="status">
                <option>{copy.t0313}</option>
                <option>{copy.t0335}</option>
                <option>{copy.t0336}</option>
              </select>
            </label>
          </div>
        )}
        <label>
          {copy.t0337}
          <textarea name="notes" required maxLength={2000} />
        </label>
        <Upload onPhoto={setPhoto} required={kind === "photo"} />
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <div>
          <button className="primary" type="submit">
            {copy.t0338}
          </button>
        </div>
      </form>
    </>
  );
}
