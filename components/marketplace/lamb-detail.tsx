"use client";
import { copy } from "@/data/copy";

import Link from "next/link";
import {
  Photo,
  Badge,
  ButtonLink,
  WeightChart,
  EmptyState,
} from "@/components/ui";
import { useStore } from "@/lib/store";
import { farms, plans } from "@/data/mock";
import { age, money, dateLabel } from "@/lib/format";
import { ArrowLeft, ArrowRight, MapPin, ShieldCheck } from "lucide-react";
export function LambDetail({
  id,
  customer = false,
  tab = "overview",
  farmer = false,
}: {
  id: string;
  customer?: boolean;
  tab?: string;
  farmer?: boolean;
}) {
  const { state, ready } = useStore();
  const lamb = state.lambs.find((l) => l.id === id);
  if (!ready) return <div className="loading" aria-label={copy.t0376} />;
  if (!lamb) return <EmptyState title={copy.t0001} href="/marketplace" />;
  const farm = farms.find((f) => f.id === lamb.farmId)!;
  const order = state.orders.find((o) => o.lambId === id);
  const plan = plans.find(
    (p) => p.id === (order?.planId ?? lamb.feedingPlanId),
  )!;
  const base = customer
    ? `/customer/lambs/${id}`
    : farmer
      ? `/farmer/livestock/${id}`
      : `/marketplace/${id}`;
  return (
    <div className={customer || farmer ? "" : "container"}>
      <Link
        className="location"
        href={
          customer
            ? "/customer/lambs"
            : farmer
              ? "/farmer/livestock"
              : "/marketplace"
        }
      >
        <ArrowLeft size={15} />
        {copy.t0377}
      </Link>
      <div className="detail-grid">
        <div className="stack">
          <Photo lamb={lamb} large />
          <div className="tabs">
            <Link className={tab === "overview" ? "active" : ""} href={base}>
              {copy.t0378}
            </Link>
            {customer ? (
              <>
                <Link
                  className={tab === "health" ? "active" : ""}
                  href={base + "/health"}
                >
                  {copy.t0379}
                </Link>
                <Link
                  className={tab === "feeding" ? "active" : ""}
                  href={base + "/feeding"}
                >
                  {copy.t0380}
                </Link>
              </>
            ) : (
              <>
                <a href="#health">{copy.t0379}</a>
                <a href="#farm">{copy.t0381}</a>
              </>
            )}
          </div>
          <section className="card" id="health">
            <h2>{tab === "feeding" ? copy.t0382 : copy.t0383}</h2>
            {tab === "feeding" ? (
              <>
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
                <p>
                  {money(plan.monthly)}
                  {copy.t0384}
                </p>
                <ButtonLink href="/customer/deliveries">
                  {copy.t0385}
                </ButtonLink>
              </>
            ) : (
              <>
                <WeightChart records={lamb.weights} />
                <div className="info-box">
                  {copy.t0386}
                  {lamb.expectedWeight}
                  {copy.t0387}
                </div>
              </>
            )}
          </section>
          <section className="card">
            <h2>{copy.t0388}</h2>
            <div className="records">
              {lamb.healthRecords.map((h) => (
                <article className="record" key={h.id}>
                  <small>
                    {dateLabel(h.date)}
                    {copy.t0008}
                    {h.vet}
                  </small>
                  <h4>{h.title}</h4>
                  <p>{h.notes}</p>
                </article>
              ))}
            </div>
            <small>{copy.t0389}</small>
          </section>
          <section className="card">
            <h2>{copy.t0390}</h2>
            {state.updates.filter((u) => u.lambId === id).length ? (
              state.updates
                .filter((u) => u.lambId === id)
                .map((u) => (
                  <div className="record" key={u.id}>
                    <small>{dateLabel(u.date)}</small>
                    <h4>{u.title}</h4>
                    <p>{u.notes}</p>
                    {u.photo && <Photo lamb={{ ...lamb, photo: u.photo }} />}
                  </div>
                ))
            ) : (
              <p>{copy.t0391}</p>
            )}
          </section>
        </div>
        <div className="stack">
          <section className="card detail-header">
            <div className="row">
              <Badge>{lamb.status}</Badge>
              <small>{lamb.tag}</small>
            </div>
            <h1>
              {lamb.name}
              {copy.t0392}
              {lamb.breed}
            </h1>
            <p>
              <MapPin size={15} style={{ display: "inline" }} /> {farm.location}
              {copy.t0008}
              {farm.name}
            </p>
            <div className="lamb-specs">
              <div>
                <small>{copy.t0371}</small>
                <b>{age(lamb.birthDate)}</b>
              </div>
              <div>
                <small>{copy.t0393}</small>
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
            <div className="record">
              <small>
                {copy.t0394}
                {dateLabel(lamb.birthDate)}
              </small>
              <p>
                <ShieldCheck size={16} style={{ display: "inline" }} />{" "}
                {lamb.health}
              </p>
            </div>
            <div className="card-price">
              <div>
                <strong>{money(lamb.price)}</strong>
                <small>
                  {copy.t0395}
                  {money(lamb.careFee)}
                  {copy.t0041}
                </small>
              </div>
            </div>
            <div className="wide-actions">
              {farmer ? (
                <>
                  <ButtonLink href={`/farmer/care-updates/new?lamb=${id}`}>
                    {copy.t0396}
                  </ButtonLink>
                  <ButtonLink secondary href={`/farmer/livestock/${id}/edit`}>
                    {copy.t0295}
                  </ButtonLink>
                </>
              ) : customer ? (
                <>
                  <ButtonLink href="/customer/messages">
                    {copy.t0397}
                  </ButtonLink>
                  <ButtonLink secondary href="/customer/deliveries">
                    {copy.t0133}
                  </ButtonLink>
                </>
              ) : lamb.status === copy.t0289 ? (
                <ButtonLink href={`/checkout/${id}`}>
                  {copy.t0398}
                  <ArrowRight size={17} />
                </ButtonLink>
              ) : (
                <ButtonLink href={`/customer/lambs/${id}`}>
                  {copy.t0399}
                </ButtonLink>
              )}
            </div>
            <div className="info-box">{copy.t0400}</div>
          </section>
          <section className="card" id="farm">
            <Badge gold>{copy.t0401}</Badge>
            <h3 style={{ marginTop: 16 }}>{farm.name}</h3>
            <p>{farm.description}</p>
            <div className="row">
              <span className="avatar">{farm.farmer[0]}</span>
              <div>
                <b>{farm.farmer}</b>
                <small style={{ display: "block" }}>
                  {copy.t0402}
                  {farm.location}
                </small>
              </div>
            </div>
            <div className="wide-actions">
              <ButtonLink
                secondary
                href={farmer ? "/farmer/messages" : "/customer/messages"}
              >
                {copy.t0403}
              </ButtonLink>
            </div>
          </section>
          <section className="card">
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <small>{copy.t0404}</small>
          </section>
        </div>
      </div>
    </div>
  );
}
