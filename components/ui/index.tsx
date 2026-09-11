"use client";
import { copy, formatCopy } from "@/data/copy";

import Link from "next/link";
import Image from "next/image";
import { Camera, Check, ShieldCheck, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import type { Lamb, WeightRecord } from "@/types";
import { dateLabel, money } from "@/lib/format";
export function Logo() {
  return (
    <Link href="/" className="logo">
      <span className="logo-mark">
        {copy.t0495}
        <span>{copy.t0496}</span>
      </span>
      {copy.t0497}
      <span className="brand-dot">{copy.t0498}</span>
    </Link>
  );
}
export function ButtonLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={`button ${secondary ? "secondary" : ""}`} href={href}>
      {children}
    </Link>
  );
}
export function Badge({
  children,
  gold = false,
}: {
  children: ReactNode;
  gold?: boolean;
}) {
  return (
    <span className={`badge ${gold ? "gold" : ""}`}>
      {gold ? <ShieldCheck size={14} /> : <Check size={13} />} {children}
    </span>
  );
}
export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-header">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}
export function Photo({
  lamb,
  large = false,
}: {
  lamb?: Lamb;
  large?: boolean;
}) {
  return (
    <div className={`photo ${large ? "large" : ""}`}>
      {lamb?.photo ? (
        <Image
          src={lamb.photo}
          alt={formatCopy(copy.t0499, [lamb.name])}
          fill
          sizes={large ? copy.t0500 : copy.t0501}
          unoptimized={lamb.photo.startsWith("data:")}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <>
          <Camera size={large ? 38 : 27} strokeWidth={1} />
          <span>{copy.t0502}</span>
          <small>{copy.t0503}</small>
        </>
      )}
    </div>
  );
}
export function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: ReactNode;
  detail?: string;
}) {
  return (
    <div className="card metric">
      <span>{label}</span>
      <strong>{value}</strong>
      {detail && <small>{detail}</small>}
    </div>
  );
}
export function EmptyState({
  title,
  description,
  href,
  label,
}: {
  title: string;
  description?: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="empty card">
      <Camera size={30} />
      <h3>{title}</h3>
      <p>{description}</p>
      {href && (
        <ButtonLink href={href}>
          {label ?? copy.t0206} <ArrowUpRight size={16} />
        </ButtonLink>
      )}
    </div>
  );
}
export function Pricing({
  price,
  care,
  transport,
  total,
  paid,
}: {
  price: number;
  care: number;
  transport: number;
  total: number;
  paid: number;
}) {
  return (
    <div className="pricing">
      <div>
        <span>{copy.t0504}</span>
        <b>{money(price)}</b>
      </div>
      <div>
        <span>{copy.t0505}</span>
        <b>{money(care)}</b>
      </div>
      <div>
        <span>{copy.t0506}</span>
        <b>{money(transport)}</b>
      </div>
      <div className="total">
        <span>{copy.t0233}</span>
        <b>{money(total)}</b>
      </div>
      <div>
        <span>{copy.t0507}</span>
        <b>{money(paid)}</b>
      </div>
      <small>
        {copy.t0508}
        {money(total - paid)}
        {copy.t0509}
      </small>
    </div>
  );
}
export function WeightChart({ records }: { records: WeightRecord[] }) {
  const max = Math.max(...records.map((r) => r.weight)) * 1.15;
  return (
    <div className="chart">
      <div className="chart-bars">
        {records.map((r, i) => (
          <div key={i}>
            <strong>
              {r.weight}
              {copy.t0373}
            </strong>
            <div style={{ height: `${(r.weight / max) * 125}px` }} />
            <small>{dateLabel(r.date)}</small>
          </div>
        ))}
      </div>
      <p className="muted">{copy.t0510}</p>
    </div>
  );
}
export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
    const prev = document.activeElement as HTMLElement;
    return () => prev?.focus();
  }, []);
  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <header>
        <h2>{title}</h2>
        <button aria-label={copy.t0511} onClick={onClose}>
          {copy.t0512}
        </button>
      </header>
      {children}
    </dialog>
  );
}
