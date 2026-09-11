import { notFound } from "next/navigation";
import { RouteView } from "@/components/router";
import type { Metadata } from "next";
const valid: Record<string, string[]> = {
  customer: [
    "onboarding",
    "lambs",
    "messages",
    "payments",
    "deliveries",
    "profile",
    "notifications",
  ],
  farmer: [
    "onboarding",
    "livestock",
    "care-updates",
    "orders",
    "customers",
    "messages",
    "deliveries",
    "earnings",
    "settings",
  ],
  admin: [
    "verifications",
    "farms",
    "livestock",
    "orders",
    "payments",
    "disputes",
    "deliveries",
    "users",
    "settings",
  ],
};
function isValid(s: string[]) {
  const [r, section, id, tab] = s;
  if (
    [
      "how-it-works",
      "for-farmers",
      "trust-safety",
      "faq",
      "login",
      "register",
    ].includes(r)
  )
    return s.length === 1;
  if (r === "marketplace") return s.length === 2;
  if (r === "checkout")
    return s.length === 2 || (s.length === 3 && id === "confirmation");
  if (!(r in valid)) return false;
  if (s.length === 1) return true;
  if (!valid[r].includes(section)) return false;
  if (s.length === 2) return true;
  if (r === "customer" && section === "lambs")
    return (
      s.length === 3 || (s.length === 4 && ["health", "feeding"].includes(tab))
    );
  if (r === "farmer" && section === "livestock")
    return s.length === 3 || (s.length === 4 && tab === "edit");
  return (
    r === "farmer" &&
    section === "care-updates" &&
    id === "new" &&
    s.length === 3
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ segments: string[] }>;
}): Promise<Metadata> {
  const { segments } = await params;
  return {
    title:
      segments[0] === "customer"
        ? "Espace client"
        : segments[0] === "farmer"
          ? "Espace éleveur"
          : segments[0] === "admin"
            ? "Administration"
            : segments[0] === "checkout"
              ? "Réservation"
              : "Découvrir",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ segments: string[] }>;
}) {
  const { segments } = await params;
  if (!isValid(segments)) notFound();
  return <RouteView segments={segments} />;
}
