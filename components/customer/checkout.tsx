"use client";
import { copy, formatCopy } from "@/data/copy";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useStore, uid } from "@/lib/store";
import { plans, DEMO_DATE } from "@/data/mock";
import { quote, money, dateLabel } from "@/lib/format";
import {
  PageHeader,
  Photo,
  Pricing,
  ButtonLink,
  EmptyState,
} from "@/components/ui";
export function Checkout({
  id,
  confirmation = false,
}: {
  id: string;
  confirmation?: boolean;
}) {
  const { state, update, notify, ready } = useStore();
  const router = useRouter();
  const [purchase, setPurchase] = useState<"deposit" | "full">("deposit");
  const [planId, setPlan] = useState("pasture");
  const [mode, setMode] = useState<"delivery" | "pickup">("delivery");
  const [date, setDate] = useState("2027-01-10");
  const [address, setAddress] = useState(state.profiles.customer.address);
  const [name, setName] = useState(state.profiles.customer.name);
  const [email, setEmail] = useState(state.profiles.customer.email);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const lamb = state.lambs.find((l) => l.id === id);
  if (!ready)
    return (
      <div className="container">
        <div className="loading" />
      </div>
    );
  if (!lamb) return <EmptyState title={copy.t0001} href="/marketplace" />;
  const existing = state.orders.find((o) => o.lambId === id);
  const plan = plans.find((p) => p.id === planId)!;
  const cost = quote(lamb.price, plan.monthly, date, mode, purchase);
  if (confirmation) {
    if (!existing)
      return (
        <EmptyState
          title={copy.t0002}
          href={`/checkout/${id}`}
          label={copy.t0003}
        />
      );
    const delivery = state.deliveries.find(
      (d) => d.id === existing.deliveryId,
    )!;
    return (
      <div className="container">
        <div className="confirmation">
          <div className="success-icon">
            <CheckCircle2 size={36} />
          </div>
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            {copy.t0004}
          </div>
          <h1>
            {copy.t0005}
            {lamb.name}
            {copy.t0006}
          </h1>
          <p>{copy.t0007}</p>
          <section className="card">
            <div className="row">
              <h3>
                {lamb.name}
                {copy.t0008}
                {lamb.breed}
              </h3>
              <b>{money(existing.paid)}</b>
            </div>
            <p>
              {copy.t0009}
              {existing.id.slice(0, 8)}
              {copy.t0010}
            </p>
            <div className="pricing">
              <div>
                <span>{copy.t0011}</span>
                <b>{plans.find((p) => p.id === existing.planId)?.name}</b>
              </div>
              <div>
                <span>{copy.t0012}</span>
                <b>{dateLabel(delivery.date)}</b>
              </div>
              <div>
                <span>{copy.t0013}</span>
                <b>{delivery.mode === "pickup" ? copy.t0014 : copy.t0015}</b>
              </div>
              <div>
                <span>{copy.t0016}</span>
                <b>{money(existing.total - existing.paid)}</b>
              </div>
            </div>
          </section>
          <div className="hero-actions">
            <ButtonLink href={`/customer/lambs/${id}`}>
              {copy.t0017}
              <ArrowRight size={17} />
            </ButtonLink>
            <ButtonLink secondary href="/customer">
              {copy.t0018}
            </ButtonLink>
          </div>
        </div>
      </div>
    );
  }
  if (existing)
    return (
      <div className="container">
        <EmptyState
          title={copy.t0019}
          href={`/checkout/${id}/confirmation`}
          label={copy.t0020}
        />
      </div>
    );
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy || !lamb) return;
    if (
      !name.trim() ||
      !email.includes("@") ||
      (mode === "delivery" && !address.trim()) ||
      !date ||
      date <= DEMO_DATE
    ) {
      setError(copy.t0021);
      return;
    }
    setBusy(true);
    const orderId = uid(),
      deliveryId = uid();
    // Future API: atomically reserve availability, price the plan, and create an authenticated payment session.
    update((s) => ({
      ...s,
      user: { ...s.profiles.customer, name, email, address },
      profiles: {
        ...s.profiles,
        customer: { ...s.profiles.customer, name, email, address },
      },
      lambs: s.lambs.map((l) =>
        l.id === id ? { ...l, status: copy.t0022, feedingPlanId: planId } : l,
      ),
      orders: [
        ...s.orders,
        {
          id: orderId,
          lambId: id,
          customerId: "c1",
          planId,
          purchase,
          date: DEMO_DATE,
          months: cost.months,
          total: cost.total,
          paid: cost.paid,
          deliveryId,
          status: copy.t0023,
        },
      ],
      payments: [
        ...s.payments,
        {
          id: uid(),
          orderId,
          label: purchase === "deposit" ? copy.t0024 : copy.t0025,
          amount: cost.paid,
          status: copy.t0026,
          date: DEMO_DATE,
        },
        ...(cost.balance > 0
          ? [
              {
                id: uid(),
                orderId,
                label: copy.t0027,
                amount: cost.balance,
                status: copy.t0028,
                date,
              },
            ]
          : []),
      ],
      deliveries: [
        ...s.deliveries,
        {
          id: deliveryId,
          orderId,
          mode,
          date,
          address: mode === "pickup" ? copy.t0014 : address,
          status: copy.t0029,
        },
      ],
      notifications: [
        {
          id: uid(),
          title: formatCopy(copy.t0030, [lamb.name]),
          href: `/customer/lambs/${id}`,
          read: false,
        },
        ...s.notifications,
      ],
    }));
    notify(copy.t0031);
    router.push(`/checkout/${id}/confirmation`);
  }
  return (
    <div className="container">
      <PageHeader
        eyebrow={copy.t0032}
        title={formatCopy(copy.t0033, [lamb.name])}
        description={copy.t0034}
      />
      <form onSubmit={submit}>
        <div className="two-col">
          <div>
            <section className="card form-section">
              <h2>{copy.t0035}</h2>
              <div className="choices">
                {[
                  ["deposit", copy.t0036, copy.t0037],
                  ["full", copy.t0038, copy.t0039],
                ].map(([v, t, d]) => (
                  <label className="choice" key={v}>
                    <input
                      type="radio"
                      name="purchase"
                      checked={purchase === v}
                      onChange={() => setPurchase(v as typeof purchase)}
                    />
                    <span>
                      <b>{t}</b>
                      <small>{d}</small>
                    </span>
                  </label>
                ))}
              </div>
            </section>
            <section className="card form-section">
              <h2>{copy.t0040}</h2>
              <div className="choices">
                {plans.map((p) => (
                  <label className="choice" key={p.id}>
                    <input
                      type="radio"
                      name="plan"
                      checked={planId === p.id}
                      onChange={() => setPlan(p.id)}
                    />
                    <span>
                      <b>
                        {p.name}
                        {copy.t0008}
                        {money(p.monthly)}
                        {copy.t0041}
                      </b>
                      <small>{p.description}</small>
                    </span>
                  </label>
                ))}
              </div>
            </section>
            <section className="card form-section">
              <h2>{copy.t0042}</h2>
              <div className="choices">
                {[
                  ["delivery", copy.t0043],
                  ["pickup", copy.t0044],
                ].map(([v, t]) => (
                  <label className="choice" key={v}>
                    <input
                      name="delivery"
                      type="radio"
                      checked={mode === v}
                      onChange={() => setMode(v as typeof mode)}
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
              <div className="form-grid" style={{ marginTop: 20 }}>
                <label>
                  {copy.t0045}
                  <input
                    aria-label={copy.t0045}
                    type="date"
                    min="2026-09-11"
                    max="2027-09-10"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </label>
                {mode === "delivery" && (
                  <label>
                    {copy.t0046}
                    <input
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </label>
                )}
              </div>
              <small>
                {copy.t0047}
                {cost.months}
                {copy.t0048}
              </small>
            </section>
            <section className="card form-section">
              <h2>{copy.t0049}</h2>
              <div className="form-grid">
                <label>
                  {copy.t0050}
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label>
                  {copy.t0051}
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label className="check full">
                  <input type="checkbox" required />
                  {copy.t0052}
                </label>
              </div>
            </section>
          </div>
          <aside className="stack">
            <div className="card">
              <Photo lamb={lamb} />
              <h3 style={{ marginTop: 20 }}>
                {lamb.name}
                {copy.t0008}
                {lamb.breed}
              </h3>
              <Pricing
                price={lamb.price}
                care={cost.care}
                transport={cost.transport}
                total={cost.total}
                paid={cost.paid}
              />
              {error && (
                <div className="error" role="alert">
                  {error}
                </div>
              )}
              <button
                className="primary"
                style={{ width: "100%", marginTop: 24 }}
                disabled={busy}
                type="submit"
              >
                {busy ? copy.t0053 : copy.t0054} <ArrowRight size={16} />
              </button>
              <div className="info-box">{copy.t0055}</div>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}
