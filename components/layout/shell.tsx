"use client";
import { copy } from "@/data/copy";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  Bell,
  Menu,
  X,
  LayoutDashboard,
  ChevronDown,
  LogOut,
  ArrowUpRight,
  MessageCircle,
  Truck,
  Heart,
  Settings,
  Leaf,
} from "lucide-react";
import { Logo, ButtonLink } from "@/components/ui";
import { navigation, publicNav, roleLabels } from "@/data/navigation";
import { useStore } from "@/lib/store";
import type { Role } from "@/types";
export function Shell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const role = path.split("/")[1] as Role;
  const dashboard = role in navigation;
  const [menu, setMenu] = useState(false);
  const [pop, setPop] = useState("");
  const { state, update, notify } = useStore();
  const changeLocale = (locale: string) => {
    update((s) => ({ ...s, locale }));
    notify(locale === copy.t0339 ? copy.t0340 : copy.t0341);
  };
  const icons = [LayoutDashboard, Heart, MessageCircle, Truck, Settings];
  return (
    <div data-locale={state.locale} dir="ltr">
      <div className="demo-strip">
        {copy.t0342}
        <span>{copy.t0343}</span>
        {copy.t0344}
        <span>{copy.t0343}</span>
        {copy.t0345}
      </div>
      {dashboard ? (
        <>
          <aside className={`sidebar ${menu ? "open" : ""}`}>
            <Logo />
            <div className="sidebar-label">{roleLabels[role]}</div>
            <nav>
              {navigation[role].map(([name, slug], i) => {
                const href = `/${role}${slug ? "/" + slug : ""}`;
                const Icon = icons[i % icons.length];
                return (
                  <Link
                    key={href}
                    onClick={() => setMenu(false)}
                    className={
                      path === href || (slug && path.startsWith(href + "/"))
                        ? "active"
                        : ""
                    }
                    href={href}
                  >
                    <Icon size={18} />
                    {name}
                  </Link>
                );
              })}
            </nav>
            <div className="sidebar-bottom">
              <Leaf size={22} />
              <strong>{copy.t0346}</strong>
              <p>{copy.t0347}</p>
              <Link href="/marketplace">
                {copy.t0348}
                <ArrowUpRight size={15} />
              </Link>
            </div>
            <Link
              className="logout"
              href="/login"
              onClick={() => {
                setMenu(false);
                notify(copy.t0349);
              }}
            >
              <LogOut size={17} />
              {copy.t0350}
            </Link>
          </aside>
          <div className="dashboard-top">
            <button
              className="mobile-only icon-button"
              aria-label={copy.t0351}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
            <span>
              {roleLabels[role]} <span className="muted">{copy.t0352}</span>
            </span>
            <div className="account-actions">
              <div className="popover-anchor">
                <button
                  className="icon-button"
                  aria-label={copy.t0208}
                  onClick={() => setPop(pop === "notice" ? "" : "notice")}
                >
                  <Bell size={19} />
                  {state.notifications.some((n) => !n.read) && <i />}
                </button>
                {pop === "notice" && (
                  <div className="popover">
                    <b>{copy.t0208}</b>
                    {state.notifications.length ? (
                      state.notifications.slice(0, 5).map((n) => (
                        <Link
                          key={n.id}
                          href={n.href}
                          onClick={() => {
                            setPop("");
                            update((s) => ({
                              ...s,
                              notifications: s.notifications.map((x) =>
                                x.id === n.id ? { ...x, read: true } : x,
                              ),
                            }));
                          }}
                        >
                          {n.title}
                        </Link>
                      ))
                    ) : (
                      <p>{copy.t0353}</p>
                    )}
                  </div>
                )}
              </div>
              <div className="popover-anchor">
                <button
                  className="profile-button"
                  onClick={() => setPop(pop === "profile" ? "" : "profile")}
                >
                  <span className="avatar">
                    {(state.profiles[role] ?? state.user).name.slice(0, 1)}
                  </span>
                  <span>
                    {
                      (state.profiles[role] ?? state.user).name.split(
                        copy.t0109,
                      )[0]
                    }
                  </span>
                  <ChevronDown size={15} />
                </button>
                {pop === "profile" && (
                  <div className="popover">
                    {(["customer", "farmer", "admin"] as Role[]).map((r) => (
                      <Link onClick={() => setPop("")} href={`/${r}`} key={r}>
                        {roleLabels[r]}
                        {copy.t0354}
                      </Link>
                    ))}
                    <Link
                      href={`/${role}/${role === "customer" ? "profile" : "settings"}`}
                      onClick={() => setPop("")}
                    >
                      {copy.t0256}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <header className="public-header">
          <Logo />
          <nav className={menu ? "open" : ""}>
            {publicNav.map(([n, h]) => (
              <Link
                onClick={() => setMenu(false)}
                className={path === h ? "active" : ""}
                key={h}
                href={h}
              >
                {n}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <div className="languages">
              {[copy.t0339, copy.t0355].map((l) => (
                <button
                  key={l}
                  className={state.locale === l ? "selected" : ""}
                  aria-pressed={state.locale === l}
                  onClick={() => changeLocale(l)}
                >
                  {l}
                </button>
              ))}
            </div>
            <Link className="sign-in" href="/login">
              {copy.t0356}
            </Link>
            <ButtonLink href="/marketplace">{copy.t0206}</ButtonLink>
            <button
              className="icon-button mobile-only"
              aria-label={copy.t0351}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </header>
      )}
      <main className={dashboard ? "dashboard-main" : "public-main"}>
        {children}
      </main>
      {dashboard ? (
        <nav className="bottom-nav">
          {navigation[role].slice(0, 4).map(([n, s], i) => {
            const Icon = icons[i];
            return (
              <Link
                className={
                  path === `/${role}${s ? "/" + s : ""}` ? "active" : ""
                }
                key={s}
                href={`/${role}${s ? "/" + s : ""}`}
              >
                <Icon size={19} />
                <span>{n}</span>
              </Link>
            );
          })}
        </nav>
      ) : (
        <footer>
          <div>
            <Logo />
            <p>{copy.t0357}</p>
            <small>{copy.t0358}</small>
          </div>
          <div>
            <b>{copy.t0359}</b>
            {publicNav.slice(0, 3).map(([n, h]) => (
              <Link href={h} key={h}>
                {n}
              </Link>
            ))}
          </div>
          <div>
            <b>{copy.t0360}</b>
            <Link href="/trust-safety">{copy.t0361}</Link>
            <Link href="/faq">{copy.t0362}</Link>
            <Link href="/login">{copy.t0363}</Link>
          </div>
          <div className="footer-bottom">
            {copy.t0364}
            <span>{copy.t0365}</span>
          </div>
        </footer>
      )}
    </div>
  );
}
