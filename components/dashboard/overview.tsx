"use client";
import { copy } from "@/data/copy";

import { Plus, ArrowUpRight } from "lucide-react";
import { useStore } from "@/lib/store";
import {
  PageHeader,
  MetricCard,
  ButtonLink,
  EmptyState,
  WeightChart,
  Badge,
} from "@/components/ui";
import { LambCard } from "@/components/marketplace/lamb-card";
import { money, dateLabel } from "@/lib/format";
import type { Role } from "@/types";
export function Overview({ role }: { role: Role }) {
  const { state } = useStore();
  const owned = state.lambs.filter((l) =>
    state.orders.some((o) => o.lambId === l.id),
  );
  const paid = state.payments
    .filter((p) => p.status === copy.t0026)
    .reduce((a, p) => a + p.amount, 0);
  const owed = state.payments
    .filter((p) => p.status === copy.t0028)
    .reduce((a, p) => a + p.amount, 0);
  return (
    <>
      <PageHeader
        eyebrow={
          role === "admin"
            ? copy.t0103
            : role === "farmer"
              ? copy.t0104
              : copy.t0105
        }
        title={
          role === "admin"
            ? copy.t0106
            : role === "farmer"
              ? copy.t0107
              : copy.t0108 +
                state.profiles.customer.name.split(copy.t0109)[0] +
                "."
        }
        description={
          role === "customer"
            ? copy.t0110
            : role === "farmer"
              ? copy.t0111
              : copy.t0112
        }
        action={
          <ButtonLink
            href={
              role === "customer"
                ? "/marketplace"
                : role === "farmer"
                  ? "/farmer/livestock/new"
                  : "/admin/verifications"
            }
          >
            <Plus size={16} />
            {role === "customer"
              ? copy.t0113
              : role === "farmer"
                ? copy.t0114
                : copy.t0115}
          </ButtonLink>
        }
      />
      <div className="metrics">
        <MetricCard
          label={role === "customer" ? copy.t0116 : copy.t0117}
          value={role === "customer" ? owned.length : state.lambs.length}
          detail="Un suivi individuel"
        />
        <MetricCard
          label={role === "admin" ? copy.t0118 : copy.t0119}
          value={
            role === "admin"
              ? state.verifications.filter((v) => v.status === copy.t0120)
                  .length
              : state.orders.length
          }
          detail="Dossiers de démonstration"
        />
        <MetricCard
          label={copy.t0121}
          value={money(paid)}
          detail="Paiements simulés"
        />
        <MetricCard
          label={copy.t0122}
          value={state.deliveries.filter((d) => d.status !== copy.t0071).length}
          detail="Livraison ou retrait"
        />
      </div>
      <div className="two-col">
        <div className="stack">
          <section>
            <div className="row" style={{ marginBottom: 18 }}>
              <h2>{role === "customer" ? copy.t0116 : copy.t0123}</h2>
              <ButtonLink
                secondary
                href={
                  role === "customer" ? "/customer/lambs" : `/${role}/livestock`
                }
              >
                {copy.t0124}
                <ArrowUpRight size={15} />
              </ButtonLink>
            </div>
            {(role === "customer" ? owned : state.lambs).length ? (
              <div className="lamb-grid featured">
                {(role === "customer" ? owned : state.lambs)
                  .slice(0, 2)
                  .map((l) => (
                    <LambCard
                      key={l.id}
                      lamb={l}
                      href={
                        role === "admin"
                          ? `/marketplace/${l.id}`
                          : `/${role}/${role === "customer" ? "lambs" : "livestock"}/${l.id}`
                      }
                    />
                  ))}
              </div>
            ) : (
              <EmptyState
                title={copy.t0125}
                description={copy.t0126}
                href="/marketplace"
              />
            )}
          </section>
          <section className="card">
            <h2>{role === "admin" ? copy.t0127 : copy.t0128}</h2>
            {role === "admin" ? (
              state.verifications
                .filter((v) => v.status === copy.t0120)
                .map((v) => (
                  <div className="record" key={v.id}>
                    <div className="row">
                      <b>{v.farm}</b>
                      <Badge>{v.status}</Badge>
                    </div>
                    <p>{v.location}</p>
                  </div>
                ))
            ) : state.updates.length ? (
              state.updates.slice(0, 4).map((u) => (
                <div className="record" key={u.id}>
                  <small>
                    {dateLabel(u.date)}
                    {copy.t0008}
                    {state.lambs.find((l) => l.id === u.lambId)?.name}
                  </small>
                  <h4>{u.title}</h4>
                  <p>{u.notes}</p>
                </div>
              ))
            ) : (
              <p>{copy.t0129}</p>
            )}
          </section>
        </div>
        <aside className="stack">
          <section className="card">
            <div className="eyebrow">{copy.t0130}</div>
            <h3>
              {(owned[0] ?? state.lambs[0]).name}
              {copy.t0131}
            </h3>
            <WeightChart records={(owned[0] ?? state.lambs[0]).weights} />
          </section>
          <section className="card">
            <h3>{copy.t0132}</h3>
            {state.deliveries[0] ? (
              <>
                <p>
                  {dateLabel(state.deliveries[0].date)}
                  <br />
                  {state.deliveries[0].address}
                </p>
                <ButtonLink secondary href={`/${role}/deliveries`}>
                  {copy.t0133}
                </ButtonLink>
              </>
            ) : (
              <p>{copy.t0134}</p>
            )}
          </section>
          <section className="card">
            <h3>{role === "admin" ? copy.t0135 : copy.t0136}</h3>
            <p>{copy.t0027}</p>
            <h2>{money(owed)}</h2>
            <small>{copy.t0137}</small>
            <div className="wide-actions">
              <ButtonLink
                secondary
                href={`/${role}/${role === "farmer" ? "earnings" : "payments"}`}
              >
                {copy.t0138}
              </ButtonLink>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
export function Lambs({ farmer = false }: { farmer?: boolean }) {
  const { state } = useStore();
  const rows = farmer
    ? state.lambs
    : state.lambs.filter((l) => state.orders.some((o) => o.lambId === l.id));
  return (
    <>
      <PageHeader
        eyebrow={farmer ? copy.t0139 : copy.t0140}
        title={copy.t0116}
        description={farmer ? copy.t0141 : copy.t0142}
        action={
          farmer ? (
            <ButtonLink href="/farmer/livestock/new">
              <Plus size={16} />
              {copy.t0143}
            </ButtonLink>
          ) : undefined
        }
      />
      {rows.length ? (
        <div className="lamb-grid">
          {rows.map((l) => (
            <LambCard
              key={l.id}
              lamb={l}
              href={`/${farmer ? "farmer/livestock" : "customer/lambs"}/${l.id}`}
            />
          ))}
        </div>
      ) : (
        <EmptyState title={copy.t0144} href="/marketplace" />
      )}
    </>
  );
}
