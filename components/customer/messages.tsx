"use client";
import { copy } from "@/data/copy";

import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { useStore, uid } from "@/lib/store";
import type { Role } from "@/types";
export function Messages({ role }: { role: Role }) {
  const { state, update } = useStore();
  const [text, setText] = useState("");
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    end.current?.scrollIntoView({ block: "nearest" });
  }, [state.messages.length]);
  return (
    <>
      <PageHeader
        eyebrow={copy.t0089}
        title={copy.t0090}
        description={copy.t0091}
      />
      <div className="card message-layout">
        <aside className="conversations">
          <h3>{copy.t0092}</h3>
          <div className="conversation">
            <b>{role === "farmer" ? copy.t0093 : copy.t0094}</b>
            <small style={{ display: "block" }}>{copy.t0095}</small>
          </div>
        </aside>
        <section className="messages-main">
          <header className="messages-title">
            <b>{role === "farmer" ? copy.t0093 : copy.t0094}</b>
            <small style={{ display: "block" }}>{copy.t0096}</small>
          </header>
          <div className="messages-list">
            {state.messages.map((m) => (
              <div
                className={`bubble ${m.sender === role ? "me" : ""}`}
                key={m.id}
              >
                {m.text}
                <small>
                  {m.sender === "farmer" ? copy.t0097 : copy.t0098}
                  {copy.t0008}
                  {new Date(m.date).toLocaleTimeString(copy.t0099, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </div>
            ))}
            <div ref={end} />
          </div>
          <form
            className="compose"
            onSubmit={(e) => {
              e.preventDefault();
              if (!text.trim()) return;
              update((s) => ({
                ...s,
                messages: [
                  ...s.messages,
                  {
                    id: uid(),
                    sender: role,
                    text: text.trim(),
                    date: new Date().toISOString(),
                  },
                ],
              }));
              setText("");
            }}
          >
            <input
              required
              aria-label={copy.t0100}
              placeholder={copy.t0101}
              value={text}
              maxLength={2000}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="primary" aria-label={copy.t0102}>
              <Send size={18} />
            </button>
          </form>
        </section>
      </div>
    </>
  );
}
