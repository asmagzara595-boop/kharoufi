"use client";
import { copy, formatCopy } from "@/data/copy";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import {
  PageHeader,
  EmptyState,
  Modal,
  Badge,
  ButtonLink,
} from "@/components/ui";
import { useStore, uid } from "@/lib/store";
import { dateLabel, money, quote } from "@/lib/format";
import { plans, DEMO_DATE } from "@/data/mock";
import type { Delivery, Role } from "@/types";
export function Deliveries({ role }: { role: Role }) {
  const { state, update, notify } = useStore();
  const [editing, setEditing] = useState<Delivery | null>(null);
  const [mode, setMode] = useState<"delivery" | "pickup">("delivery");
  const [plan, setPlan] = useState("pasture");
  const [error, setError] = useState("");
  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editing) return;
    const f = new FormData(e.currentTarget),
      date = String(f.get("date")),
      address = String(f.get("address") ?? copy.t0014);
    if (date <= DEMO_DATE) {
      setError(copy.t0056);
      return;
    }
    const order = state.orders.find((o) => o.id === editing.orderId)!;
    const lamb = state.lambs.find((l) => l.id === order.lambId)!;
    const cost = quote(
      lamb.price,
      plans.find((p) => p.id === plan)!.monthly,
      date,
      mode,
      order.purchase,
    );
    if (cost.total < order.paid) {
      setError(copy.t0057);
      return;
    }
    update((s) => ({
      ...s,
      deliveries: s.deliveries.map((d) =>
        d.id === editing.id
          ? { ...d, date, mode, address, status: copy.t0029 }
          : d,
      ),
      lambs: s.lambs.map((l) =>
        l.id === lamb.id ? { ...l, feedingPlanId: plan } : l,
      ),
      orders: s.orders.map((o) =>
        o.id === order.id
          ? { ...o, planId: plan, total: cost.total, months: cost.months }
          : o,
      ),
      payments: [
        ...s.payments.filter(
          (p) => !(p.orderId === order.id && p.status === copy.t0028),
        ),
        ...(cost.total > order.paid
          ? [
              {
                id: uid(),
                orderId: order.id,
                label: copy.t0027,
                amount: cost.total - order.paid,
                status: copy.t0028,
                date,
              },
            ]
          : []),
      ],
      notifications: [
        {
          id: uid(),
          title: formatCopy(copy.t0058, [lamb.name]),
          href: "/customer/deliveries",
          read: false,
        },
        ...s.notifications,
      ],
    }));
    setEditing(null);
    notify(copy.t0059);
  }
  return (
    <>
      <PageHeader
        eyebrow={copy.t0060}
        title={copy.t0061}
        description={copy.t0062}
      />
      {!state.deliveries.length ? (
        <EmptyState
          title={copy.t0063}
          description={copy.t0064}
          href="/marketplace"
        />
      ) : (
        <div className="stack">
          {state.deliveries.map((d) => {
            const order = state.orders.find((o) => o.id === d.orderId)!;
            const lamb = state.lambs.find((l) => l.id === order.lambId)!;
            return (
              <section className="card" key={d.id}>
                <div className="row">
                  <h2>
                    {lamb.name}
                    {copy.t0008}
                    {d.mode === "pickup" ? copy.t0014 : copy.t0065}
                  </h2>
                  <Badge>{d.status}</Badge>
                </div>
                <p>
                  {dateLabel(d.date)}
                  {copy.t0008}
                  {d.address}
                </p>
                <div className="timeline">
                  {[copy.t0066, copy.t0067, copy.t0068, copy.t0069].map(
                    (step, i) => {
                      const done =
                        i < 2 ||
                        (i === 2 && d.status === copy.t0070) ||
                        d.status === copy.t0071;
                      return (
                        <div className={done ? "done" : ""} key={step}>
                          {done ? (
                            <CheckCircle2 size={18} />
                          ) : (
                            <Circle size={18} />
                          )}{" "}
                          {step}
                        </div>
                      );
                    },
                  )}
                </div>
                <p>
                  {copy.t0072}
                  {plans.find((p) => p.id === order.planId)?.name}
                  {copy.t0073}
                  {money(order.total - order.paid)}
                </p>
                <div className="wide-actions">
                  {role === "customer" ? (
                    <button
                      onClick={() => {
                        setEditing(d);
                        setMode(d.mode);
                        setPlan(order.planId);
                        setError("");
                      }}
                    >
                      {copy.t0074}
                    </button>
                  ) : (
                    <>
                      <button
                        disabled={d.status !== copy.t0029}
                        onClick={() => {
                          update((s) => ({
                            ...s,
                            deliveries: s.deliveries.map((x) =>
                              x.id === d.id ? { ...x, status: copy.t0070 } : x,
                            ),
                            orders: s.orders.map((o) =>
                              o.id === order.id
                                ? { ...o, status: copy.t0070 }
                                : o,
                            ),
                          }));
                          notify(copy.t0075);
                        }}
                      >
                        {copy.t0076}
                      </button>
                      <button
                        disabled={d.status !== copy.t0070}
                        onClick={() => {
                          update((s) => ({
                            ...s,
                            deliveries: s.deliveries.map((x) =>
                              x.id === d.id ? { ...x, status: copy.t0071 } : x,
                            ),
                            orders: s.orders.map((o) =>
                              o.id === order.id
                                ? { ...o, status: copy.t0071 }
                                : o,
                            ),
                          }));
                          notify(copy.t0077);
                        }}
                      >
                        {copy.t0078}
                      </button>
                    </>
                  )}
                  <ButtonLink
                    secondary
                    href={
                      role === "admin" ? "/admin/orders" : `/${role}/messages`
                    }
                  >
                    {copy.t0079}
                    {role === "admin" ? copy.t0080 : copy.t0081}
                  </ButtonLink>
                </div>
              </section>
            );
          })}
        </div>
      )}
      {editing && (
        <Modal title={copy.t0082} onClose={() => setEditing(null)}>
          <form onSubmit={save}>
            <label>
              {copy.t0045}
              <input
                name="date"
                type="date"
                required
                defaultValue={editing.date}
                min="2026-09-11"
                max="2027-09-10"
              />
            </label>
            <label>
              {copy.t0083}
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as typeof mode)}
              >
                <option value="delivery">{copy.t0084}</option>
                <option value="pickup">{copy.t0044}</option>
              </select>
            </label>
            {mode === "delivery" && (
              <label>
                {copy.t0085}
                <input name="address" required defaultValue={editing.address} />
              </label>
            )}
            <label>
              {copy.t0086}
              <select value={plan} onChange={(e) => setPlan(e.target.value)}>
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                    {copy.t0008}
                    {money(p.monthly)}
                    {copy.t0041}
                  </option>
                ))}
              </select>
            </label>
            <small>{copy.t0087}</small>
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <button className="primary" type="submit">
              {copy.t0088}
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
