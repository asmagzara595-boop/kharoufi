"use client";
import { copy, formatCopy } from "@/data/copy";

import { useState, type ReactNode } from "react";
import { Search } from "lucide-react";
import {
  PageHeader,
  MetricCard,
  EmptyState,
  Badge,
  ButtonLink,
  Modal,
} from "@/components/ui";
import { useStore } from "@/lib/store";
import { money, dateLabel, age } from "@/lib/format";
import { farms } from "@/data/mock";
import type { Role } from "@/types";
type Row = { id: string; search: string; status: string; cells: ReactNode[] };
export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: Row[];
}) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const filtered = rows.filter(
    (r) =>
      r.search.toLowerCase().includes(q.toLowerCase()) &&
      (!status || r.status === status),
  );
  return (
    <div className="card">
      <div className="table-toolbar">
        <div className="search">
          <Search size={17} />
          <input
            aria-label={copy.t0215}
            value={q}
            placeholder={copy.t0216}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <select
          aria-label={copy.t0217}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">{copy.t0218}</option>
          {[...new Set(rows.map((r) => r.status))].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      {filtered.length ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  {r.cells.map((c, i) => (
                    <td key={i} data-label={headers[i]}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          title={copy.t0219}
          description={rows.length ? copy.t0220 : copy.t0221}
        />
      )}
      <small style={{ display: "block", marginTop: 16 }}>
        {filtered.length}
        {copy.t0222}
      </small>
    </div>
  );
}
export function Tables({ role, section }: { role: Role; section: string }) {
  const { state, update, notify } = useStore();
  const [selected, setSelected] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  let title = "",
    headers: string[] = [],
    rows: Row[] = [];
  if (section === "payments" || section === "earnings") {
    title = section === "earnings" ? copy.t0223 : copy.t0224;
    headers = [copy.t0225, copy.t0226, copy.t0227, copy.t0228, copy.t0229];
    rows = state.payments.map((p) => ({
      id: p.id,
      search: p.label + copy.t0109 + p.orderId,
      status: p.status,
      cells: [
        p.orderId.slice(0, 8),
        p.label,
        dateLabel(p.date),
        money(p.amount),
        <Badge key="s">{p.status}</Badge>,
      ],
    }));
  } else if (section === "orders") {
    title = copy.t0230;
    headers = [
      copy.t0231,
      copy.t0232,
      copy.t0098,
      copy.t0233,
      copy.t0229,
      copy.t0234,
    ];
    rows = state.orders.map((o) => {
      const l = state.lambs.find((x) => x.id === o.lambId)!;
      return {
        id: o.id,
        search: o.id + copy.t0109 + l.name + copy.t0235,
        status: o.status,
        cells: [
          o.id.slice(0, 8),
          l.name,
          state.profiles.customer.name,
          money(o.total),
          <Badge key="s">{o.status}</Badge>,
          <ButtonLink
            key="a"
            secondary
            href={
              role === "farmer"
                ? `/farmer/livestock/${l.id}`
                : `/marketplace/${l.id}`
            }
          >
            {copy.t0236}
          </ButtonLink>,
        ],
      };
    });
  } else if (section === "livestock") {
    title = copy.t0237;
    headers = [
      copy.t0238,
      copy.t0232,
      copy.t0239,
      copy.t0240,
      copy.t0229,
      copy.t0234,
    ];
    rows = state.lambs.map((l) => ({
      id: l.id,
      search: l.name + copy.t0109 + l.tag + copy.t0109 + l.breed,
      status: l.status,
      cells: [
        l.tag,
        l.name + copy.t0008 + l.breed,
        formatCopy(copy.t0241, [age(l.birthDate), l.weight]),
        l.health,
        <Badge key="s">{l.status}</Badge>,
        <ButtonLink key="a" secondary href={`/marketplace/${l.id}`}>
          {copy.t0242}
        </ButtonLink>,
      ],
    }));
  } else if (section === "verifications") {
    title = copy.t0243;
    headers = [copy.t0244, copy.t0245, copy.t0186, copy.t0229, copy.t0246];
    rows = state.verifications.map((v) => ({
      id: v.id,
      search: v.farm + copy.t0109 + v.location,
      status: v.status,
      cells: [
        v.id.toUpperCase(),
        v.farm,
        v.location,
        <Badge key="s">{v.status}</Badge>,
        <button
          key="a"
          onClick={() => {
            setSelected(v.id);
            setReason("");
            setError("");
          }}
        >
          {copy.t0247}
        </button>,
      ],
    }));
  } else if (section === "farms") {
    title = copy.t0248;
    headers = [copy.t0245, copy.t0097, copy.t0186, copy.t0229, copy.t0234];
    rows = farms.map((f) => ({
      id: f.id,
      search: f.name + copy.t0109 + f.farmer + copy.t0109 + f.location,
      status: copy.t0249,
      cells: [
        f.name,
        f.farmer,
        f.location,
        <Badge gold key="s">
          {copy.t0249}
        </Badge>,
        <button key="a" onClick={() => setSelected(f.id)}>
          {copy.t0236}
        </button>,
      ],
    }));
  } else if (section === "users" || section === "customers") {
    title = section === "users" ? copy.t0250 : copy.t0251;
    headers = [copy.t0252, copy.t0051, copy.t0253, copy.t0229, copy.t0246];
    rows = (
      section === "customers"
        ? Object.values(state.profiles).filter(
            (u) => u.role === "customer" && state.orders.length,
          )
        : Object.values(state.profiles)
    ).map((u) => ({
      id: u.id,
      search: u.name + copy.t0109 + u.email,
      status: copy.t0254,
      cells: [
        u.name,
        u.email,
        u.role === "farmer"
          ? copy.t0097
          : u.role === "customer"
            ? copy.t0098
            : copy.t0255,
        <Badge key="s">{copy.t0254}</Badge>,
        <ButtonLink
          key="a"
          secondary
          href={role === "admin" ? "/admin/settings" : "/farmer/messages"}
        >
          {role === "admin" ? copy.t0256 : copy.t0257}
        </ButtonLink>,
      ],
    }));
  } else if (section === "disputes") {
    title = copy.t0258;
    headers = [copy.t0244, copy.t0259, copy.t0260, copy.t0229, copy.t0246];
    rows = state.disputes.map((d) => ({
      id: d.id,
      search: d.id + copy.t0109 + d.subject,
      status: d.status,
      cells: [
        d.id.toUpperCase(),
        d.orderId,
        d.subject,
        <Badge key="s">{d.status}</Badge>,
        <button
          key="a"
          onClick={() => {
            setSelected(d.id);
            setReason(d.resolution ?? "");
          }}
        >
          {copy.t0247}
        </button>,
      ],
    }));
  }
  const verification = state.verifications.find((v) => v.id === selected);
  const farm = farms.find((f) => f.id === selected);
  const dispute = state.disputes.find((d) => d.id === selected);
  return (
    <>
      <PageHeader
        eyebrow={role === "admin" ? copy.t0261 : copy.t0262}
        title={title}
        description={copy.t0263}
      />
      {(section === "payments" || section === "earnings") && (
        <div className="metrics">
          <MetricCard
            label={copy.t0264}
            value={money(
              state.payments
                .filter((p) => p.status === copy.t0026)
                .reduce((a, p) => a + p.amount, 0),
            )}
          />
          <MetricCard
            label={copy.t0265}
            value={money(
              state.payments
                .filter((p) => p.status === copy.t0028)
                .reduce((a, p) => a + p.amount, 0),
            )}
          />
          <MetricCard label={copy.t0266} value={state.payments.length} />
          <MetricCard
            label={copy.t0267}
            value="0"
            detail="Aucune banque connectée"
          />
        </div>
      )}
      <DataTable headers={headers} rows={rows} />
      {verification && (
        <Modal title={verification.farm} onClose={() => setSelected(null)}>
          <p>
            {verification.location}
            {copy.t0008}
            {verification.notes}
          </p>
          <div className="info-box">{copy.t0268}</div>
          <label>
            {copy.t0269}
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </label>
          {error && <p className="error">{error}</p>}
          <div className="wide-actions">
            {([copy.t0270, copy.t0271] as const).map((status) => (
              <button
                className={status === copy.t0270 ? "primary" : "danger"}
                key={status}
                onClick={() => {
                  if (status === copy.t0271 && !reason.trim()) {
                    setError(copy.t0272);
                    return;
                  }
                  update((s) => ({
                    ...s,
                    verifications: s.verifications.map((v) =>
                      v.id === selected
                        ? { ...v, status, notes: reason || v.notes }
                        : v,
                    ),
                  }));
                  notify(formatCopy(copy.t0273, [status.toLowerCase()]));
                  setSelected(null);
                }}
              >
                {status === copy.t0270 ? copy.t0274 : copy.t0275}
              </button>
            ))}
          </div>
        </Modal>
      )}
      {farm && (
        <Modal title={farm.name} onClose={() => setSelected(null)}>
          <Badge gold>{copy.t0249}</Badge>
          <p style={{ marginTop: 20 }}>{farm.description}</p>
          <p>
            {farm.farmer}
            {copy.t0008}
            {farm.location}
          </p>
          <ButtonLink href="/admin/livestock">{copy.t0276}</ButtonLink>
        </Modal>
      )}
      {dispute && (
        <Modal title={dispute.subject} onClose={() => setSelected(null)}>
          <p>
            {copy.t0277}
            {dispute.id}
            {copy.t0278}
            {dispute.orderId}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              update((s) => ({
                ...s,
                disputes: s.disputes.map((d) =>
                  d.id === selected
                    ? { ...d, status: copy.t0279, resolution: reason }
                    : d,
                ),
              }));
              setSelected(null);
              notify(copy.t0280);
            }}
          >
            <label>
              {copy.t0281}
              <textarea
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </label>
            <button className="primary" type="submit">
              {copy.t0282}
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
