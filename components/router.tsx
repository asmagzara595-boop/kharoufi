"use client";
import { copy } from "@/data/copy";

import { Suspense } from "react";
import { LambDetail } from "@/components/marketplace/lamb-detail";
import { Checkout } from "@/components/customer/checkout";
import { Auth } from "@/components/public/auth";
import { ContentPage } from "@/components/public/content-page";
import { Overview, Lambs } from "@/components/dashboard/overview";
import { Messages } from "@/components/customer/messages";
import { Deliveries } from "@/components/customer/deliveries";
import { Tables } from "@/components/dashboard/tables";
import {
  Settings,
  Onboarding,
  Notifications,
} from "@/components/dashboard/settings";
import { LivestockForm, CareForm } from "@/components/farmer/forms";
import { EmptyState } from "@/components/ui";
import { useStore } from "@/lib/store";
import type { Role } from "@/types";
export function RouteView({ segments }: { segments: string[] }) {
  const { ready } = useStore();
  const [root, section, id, tab] = segments;
  if (!ready)
    return <div className="loading" role="status" aria-label={copy.t0492} />;
  if (["how-it-works", "for-farmers", "trust-safety", "faq"].includes(root))
    return <ContentPage slug={root} />;
  if (root === "login" || root === "register")
    return <Auth register={root === "register"} />;
  if (root === "marketplace" && section) return <LambDetail id={section} />;
  if (root === "checkout" && section)
    return <Checkout id={section} confirmation={id === "confirmation"} />;
  if (["customer", "farmer", "admin"].includes(root)) {
    const role = root as Role;
    if (!section) return <Overview role={role} />;
    if (section === "onboarding")
      return <Onboarding farmer={role === "farmer"} />;
    if (section === "messages") return <Messages role={role} />;
    if (section === "deliveries") return <Deliveries role={role} />;
    if (section === "profile" || section === "settings")
      return <Settings role={role} />;
    if (section === "notifications") return <Notifications />;
    if (section === "lambs")
      return id ? <LambDetail id={id} customer tab={tab} /> : <Lambs />;
    if (role === "farmer" && section === "livestock") {
      if (id === "new") return <LivestockForm />;
      if (id)
        return tab === "edit" ? (
          <LivestockForm id={id} />
        ) : (
          <LambDetail id={id} farmer />
        );
      return <Lambs farmer />;
    }
    if (section === "care-updates")
      return (
        <Suspense fallback={<div className="loading" />}>
          <CareForm />
        </Suspense>
      );
    if (
      [
        "payments",
        "earnings",
        "orders",
        "livestock",
        "verifications",
        "farms",
        "users",
        "customers",
        "disputes",
      ].includes(section)
    )
      return <Tables role={role} section={section} />;
  }
  return <EmptyState title={copy.t0493} href="/" label={copy.t0494} />;
}
