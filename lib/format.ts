import { DEMO_DATE } from "@/data/mock";
export const money = (n: number) =>
  new Intl.NumberFormat("fr-TN", { maximumFractionDigits: 0 }).format(n) +
  " TND";
export const dateLabel = (d: string) =>
  new Date(d + "T12:00:00").toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
export function age(birthDate: string) {
  const weeks = Math.floor(
    (Date.parse(DEMO_DATE) - Date.parse(birthDate)) / 604800000,
  );
  return weeks >= 12 ? "3 mois" : weeks <= 9 ? "2 mois" : `${weeks} semaines`;
}
export function quote(
  price: number,
  monthly: number,
  date: string,
  mode: string,
  purchase: string,
) {
  const start = new Date(DEMO_DATE + "T12:00:00");
  const end = new Date(date + "T12:00:00");
  const months = Number.isNaN(end.getTime())
    ? 1
    : Math.max(
        1,
        (end.getFullYear() - start.getFullYear()) * 12 +
          end.getMonth() -
          start.getMonth() +
          (end.getDate() > start.getDate() ? 1 : 0),
      );
  const care = months * monthly;
  const transport = mode === "delivery" ? 60 : 0;
  const total = price + care + transport;
  const paid = purchase === "deposit" ? Math.round(price * 0.3) : total;
  return { months, care, transport, total, paid, balance: total - paid };
}
