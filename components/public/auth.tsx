"use client";
import { copy } from "@/data/copy";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Leaf } from "lucide-react";
import { useStore } from "@/lib/store";
import type { Role } from "@/types";
export function Auth({ register = false }: { register?: boolean }) {
  const [role, setRole] = useState<Role>("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { login } = useStore();
  const router = useRouter();
  return (
    <div className="auth">
      <div className="auth-story">
        <Leaf size={42} />
        <h2 style={{ marginTop: 28 }}>
          {copy.t0435}
          <br />
          {copy.t0436}
        </h2>
        <p>{copy.t0437}</p>
        <span className="slogan">{copy.t0357}</span>
      </div>
      <div className="auth-form">
        <div className="eyebrow">{copy.t0177}</div>
        <h1>{register ? copy.t0438 : copy.t0439}</h1>
        <p>{copy.t0440}</p>
        <div className="auth-roles">
          {(
            [
              ["customer", copy.t0098],
              ["farmer", copy.t0097],
              ...(!register ? [["admin", copy.t0255]] : []),
            ] as [Role, string][]
          ).map(([r, n]) => (
            <button
              key={r}
              aria-pressed={role === r}
              onClick={() => setRole(r)}
            >
              {n}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(role, name, email);
            router.push(
              `/${role}${register && role !== "admin" ? "/onboarding" : ""}`,
            );
          }}
        >
          {register && (
            <label>
              {copy.t0050}
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </label>
          )}
          <label>
            {copy.t0441}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={copy.t0442}
            />
          </label>
          <div className="info-box">{copy.t0443}</div>
          <button type="submit" className="primary">
            {register ? copy.t0444 : copy.t0445}
          </button>
        </form>
        <p style={{ marginTop: 22, fontSize: 13 }}>
          {register ? copy.t0446 : copy.t0447}{" "}
          <Link
            className="text-button"
            href={register ? "/login" : "/register"}
          >
            {register ? copy.t0448 : copy.t0449}
          </Link>
        </p>
      </div>
    </div>
  );
}
