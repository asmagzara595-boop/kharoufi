import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "./globals.css";
import { Store } from "@/lib/store";
import { Shell } from "@/components/layout/shell";
export const metadata: Metadata = {
  title: {
    default: "Kharoufi — Choose it. Follow it. Receive it.",
    template: "%s | Kharoufi",
  },
  description:
    "Choisissez un jeune agneau, suivez sa croissance et préparez sa livraison. Prototype local Kharoufi.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Store>
          <Shell>{children}</Shell>
        </Store>
      </body>
    </html>
  );
}
