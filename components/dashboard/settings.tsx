"use client";
import { copy, formatCopy } from "@/data/copy";

import { useState } from "react";
import { PageHeader, Modal, ButtonLink, EmptyState } from "@/components/ui";
import { useStore, uid } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Upload } from "@/components/farmer/forms";
import type { Role } from "@/types";
export function Settings({ role }: { role: Role }) {
  const { state, update, notify } = useStore();
  const [reset, setReset] = useState(false);
  return (
    <>
      <PageHeader
        eyebrow={copy.t0145}
        title={
          role === "farmer"
            ? copy.t0146
            : role === "admin"
              ? copy.t0147
              : copy.t0148
        }
        description={copy.t0149}
      />
      <form
        className="stack"
        onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          update((s) => ({
            ...s,
            user: {
              ...s.profiles[role],
              name: String(f.get("name")),
              email: String(f.get("email")),
              phone: String(f.get("phone")),
              address: String(f.get("address")),
            },
            profiles: {
              ...s.profiles,
              [role]: {
                ...s.profiles[role],
                name: String(f.get("name")),
                email: String(f.get("email")),
                phone: String(f.get("phone")),
                address: String(f.get("address")),
              },
            },
            locale: String(f.get("locale")),
            careNotifications: f.has("careNotifications"),
          }));
          localStorage.setItem(
            "kharoufi-preferences",
            JSON.stringify(Object.fromEntries(f)),
          );
          notify(copy.t0150);
        }}
      >
        <section className="card">
          <h2>{copy.t0151}</h2>
          <div className="form-grid">
            <label>
              {copy.t0050}
              <input
                required
                name="name"
                defaultValue={state.profiles[role].name}
              />
            </label>
            <label>
              {copy.t0051}
              <input
                required
                type="email"
                name="email"
                defaultValue={state.profiles[role].email}
              />
            </label>
            <label>
              {copy.t0152}
              <input name="phone" defaultValue={state.profiles[role].phone} />
            </label>
            <label>
              {copy.t0085}
              <input
                name="address"
                defaultValue={state.profiles[role].address}
              />
            </label>
          </div>
        </section>
        <section className="card">
          <h2>{copy.t0153}</h2>
          <div className="form-grid">
            <label>
              {copy.t0154}
              <select name="locale" defaultValue={state.locale}>
                <option value="FR">{copy.t0155}</option>
                <option value="EN">{copy.t0156}</option>
                <option value="AR">{copy.t0157}</option>
                <option value="AEB">{copy.t0158}</option>
              </select>
            </label>
            <label className="check">
              <input name="careNotifications" type="checkbox" defaultChecked={state.careNotifications} />
              {copy.t0159}
            </label>
          </div>
          <div className="info-box">{copy.t0160}</div>
        </section>
        {role === "farmer" && (
          <section className="card">
            <h2>{copy.t0161}</h2>
            <p>{copy.t0162}</p>
            <ButtonLink secondary href="/farmer/onboarding">
              {copy.t0163}
            </ButtonLink>
          </section>
        )}
        <div className="wide-actions">
          <button className="primary" type="submit">
            {copy.t0164}
          </button>
          <button
            type="button"
            className="danger"
            onClick={() => setReset(true)}
          >
            {copy.t0165}
          </button>
        </div>
      </form>
      {reset && (
        <Modal title={copy.t0166} onClose={() => setReset(false)}>
          <p>{copy.t0167}</p>
          <div className="wide-actions">
            <button onClick={() => setReset(false)}>{copy.t0168}</button>
            <button
              className="danger"
              onClick={() => {
                localStorage.removeItem("kharoufi-demo-v1");
                localStorage.removeItem("kharoufi-preferences");
                window.location.href = "/";
              }}
            >
              {copy.t0169}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
export function Onboarding({ farmer = false }: { farmer?: boolean }) {
  const { update, notify } = useStore();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [photo, setPhoto] = useState("");
  const [values, setValues] = useState<Record<string, string>>({});
  const titles = farmer
    ? [copy.t0161, copy.t0170, copy.t0171, copy.t0172]
    : [copy.t0173, copy.t0174, copy.t0175, copy.t0172];
  return (
    <>
      <PageHeader
        eyebrow={farmer ? copy.t0176 : copy.t0177}
        title={copy.t0178}
        description={copy.t0179}
      />
      <div className="tabs">
        {titles.map((t, i) => (
          <button
            key={t}
            onClick={() => {
              if (i < step) setStep(i);
            }}
            disabled={i > step}
            aria-pressed={step === i}
          >
            {i + 1}
            {copy.t0180}
            {t}
          </button>
        ))}
      </div>
      <form
        key={step}
        className="card stack"
        onSubmit={(e) => {
          e.preventDefault();
          const data = Object.fromEntries(
            new FormData(e.currentTarget),
          ) as Record<string, string>;
          const next = { ...values, ...data };
          setValues(next);
          if (step < 3) {
            setStep(step + 1);
            return;
          }
          update((s) => ({
            ...s,
            onboarded: true,
            ...(farmer
              ? {
                  verifications: [
                    ...s.verifications,
                    {
                      id: uid(),
                      farm: next.farm || copy.t0181,
                      location: next.region || copy.t0182,
                      status: copy.t0120,
                      notes: formatCopy(copy.t0183, [
                        photo ? "Photo jointe en aperçu local." : "",
                      ]),
                    },
                  ],
                }
              : {}),
          }));
          localStorage.setItem(
            farmer
              ? "kharoufi-farm-onboarding"
              : "kharoufi-customer-onboarding",
            JSON.stringify(next),
          );
          notify(farmer ? copy.t0184 : copy.t0150);
          router.push(farmer ? "/farmer" : "/marketplace");
        }}
      >
        <h2>{titles[step]}</h2>
        {step === 0 &&
          (farmer ? (
            <div className="form-grid">
              <label>
                {copy.t0185}
                <input name="farm" required defaultValue={values.farm} />
              </label>
              <label>
                {copy.t0186}
                <input
                  name="region"
                  required
                  defaultValue={values.region ?? copy.t0182}
                />
              </label>
              <label className="full">
                {copy.t0187}
                <textarea
                  name="description"
                  required
                  defaultValue={values.description}
                />
              </label>
            </div>
          ) : (
            <div className="form-grid">
              <label>
                {copy.t0188}
                <select name="breed">
                  <option>{copy.t0189}</option>
                  <option>{copy.t0190}</option>
                  <option>{copy.t0191}</option>
                </select>
              </label>
              <label>
                {copy.t0192}
                <select name="mode">
                  <option>{copy.t0015}</option>
                  <option>{copy.t0014}</option>
                </select>
              </label>
            </div>
          ))}
        {step === 1 &&
          (farmer ? (
            <>
              <label>
                {copy.t0193}
                <input
                  name="document"
                  required
                  defaultValue={values.document}
                  placeholder={copy.t0194}
                />
              </label>
              <Upload label={copy.t0195} onPhoto={setPhoto} />
              <p>{copy.t0196}</p>
            </>
          ) : (
            <label>
              {copy.t0197}
              <input
                name="city"
                required
                defaultValue={values.city ?? copy.t0198}
              />
            </label>
          ))}
        {step === 2 && (
          <>
            <div className="info-box">{copy.t0199}</div>
            <label className="check">
              <input type="checkbox" required />{" "}
              {farmer ? copy.t0200 : copy.t0201}
            </label>
          </>
        )}
        {step === 3 && (
          <>
            <p>{farmer ? copy.t0202 : copy.t0203}</p>
            <div className="info-box">
              {Object.entries(values).map(([k, v]) => (
                <div key={k}>{v}</div>
              ))}
            </div>
          </>
        )}
        <div className="wide-actions">
          {step > 0 && (
            <button type="button" onClick={() => setStep(step - 1)}>
              {copy.t0204}
            </button>
          )}
          <button className="primary" type="submit">
            {step === 3 ? (farmer ? copy.t0205 : copy.t0206) : copy.t0207}
          </button>
        </div>
      </form>
    </>
  );
}
export function Notifications() {
  const { state, update } = useStore();
  return (
    <>
      <PageHeader
        title={copy.t0208}
        description={copy.t0209}
        action={
          <button
            onClick={() =>
              update((s) => ({
                ...s,
                notifications: s.notifications.map((n) => ({
                  ...n,
                  read: true,
                })),
              }))
            }
          >
            {copy.t0210}
          </button>
        }
      />
      {state.notifications.length ? (
        <div className="notice-list">
          {state.notifications.map((n) => (
            <div className="card" key={n.id}>
              <a
                href={n.href}
                onClick={() =>
                  update((s) => ({
                    ...s,
                    notifications: s.notifications.map((x) =>
                      x.id === n.id ? { ...x, read: true } : x,
                    ),
                  }))
                }
              >
                {n.title}
                <small>{n.read ? copy.t0211 : copy.t0212}</small>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title={copy.t0213} description={copy.t0214} />
      )}
    </>
  );
}
