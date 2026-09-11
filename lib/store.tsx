"use client";
import { copy } from "@/data/copy";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type {
  Lamb,
  Order,
  Payment,
  Delivery,
  Message,
  Notification,
  Verification,
  Dispute,
  CareUpdate,
  User,
  Role,
} from "@/types";
import { ModelTools } from "@/lib/model-tools";
import {
  initialLambs,
  initialVerifications,
  initialDisputes,
  users,
} from "@/data/mock";
type State = {
  lambs: Lamb[];
  orders: Order[];
  payments: Payment[];
  deliveries: Delivery[];
  messages: Message[];
  notifications: Notification[];
  verifications: Verification[];
  disputes: Dispute[];
  updates: CareUpdate[];
  favorites: string[];
  user: User;
  profiles: Record<Role, User>;
  locale: string;
  onboarded: boolean;
  careNotifications: boolean;
};
const initial: State = {
  lambs: initialLambs,
  orders: [],
  payments: [],
  deliveries: [],
  messages: [
    {
      id: "m1",
      sender: "farmer",
      text: copy.t0513,
      date: "2026-09-10T09:00:00",
    },
  ],
  notifications: [],
  verifications: initialVerifications,
  disputes: initialDisputes,
  updates: [],
  favorites: [],
  user: users[0],
  profiles: { customer: users[0], farmer: users[1], admin: users[2] },
  locale: copy.t0339,
  onboarded: false,
  careNotifications: true,
};
type Context = {
  state: State;
  ready: boolean;
  update: (fn: (s: State) => State) => void;
  notice: string;
  notify: (text: string) => void;
  login: (role: Role, name?: string, email?: string) => void;
};
const Ctx = createContext<Context | null>(null);
export const uid = () =>
  globalThis.crypto?.randomUUID?.() ?? String(Date.now() + Math.random());
export function Store({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initial);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      const s = localStorage.getItem("kharoufi-demo-v1");
      if (s) setState({ ...initial, ...JSON.parse(s) });
    } catch {
      setNotice(copy.t0514);
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem("kharoufi-demo-v1", JSON.stringify(state));
      } catch {
        setNotice(copy.t0515);
      }
  }, [state, ready]);
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 5000);
    return () => clearTimeout(t);
  }, [notice]);
  // API integration: replace this local state adapter with authenticated API mutations and server validation.
  return (
    <Ctx.Provider
      value={{
        state,
        ready,
        update: (fn) => setState(fn),
        notice,
        notify: setNotice,
        login: (role, name, email) =>
          setState((s) => {
            const user = {
              ...s.profiles[role],
              ...(name ? { name } : {}),
              ...(email ? { email } : {}),
            };
            return { ...s, user, profiles: { ...s.profiles, [role]: user } };
          }),
      }}
    >
      <ModelTools lambs={state.lambs} />
      {children}
      {notice && (
        <div className="toast" role="status">
          {notice}
          <button aria-label={copy.t0511} onClick={() => setNotice("")}>
            {copy.t0512}
          </button>
        </div>
      )}
    </Ctx.Provider>
  );
}
export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error(copy.t0516);
  return c;
}
