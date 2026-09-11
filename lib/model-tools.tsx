"use client";
import { useEffect, useRef } from "react";
import type { Lamb } from "@/types";
type Tool = {
  name: string;
  description: string;
  inputSchema: object;
  annotations: { readOnlyHint: boolean };
  execute: (input: unknown) => unknown;
};
type ModelDocument = Document & {
  modelContext?: {
    registerTool: (
      tool: Tool,
      options: { signal: AbortSignal },
    ) => void | Promise<void>;
  };
};
export function ModelTools({ lambs }: { lambs: Lamb[] }) {
  const current = useRef(lambs);
  useEffect(() => {
    current.current = lambs;
  }, [lambs]);
  useEffect(() => {
    const context = (document as ModelDocument).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const tool: Tool = {
      name: "search_kharoufi_lambs",
      description:
        "Search the local demonstration catalog by name or breed. Returns current weights, prices, availability, and profile links. Does not reserve or purchase.",
      inputSchema: {
        type: "object",
        properties: { query: { type: "string" } },
        required: ["query"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute(input) {
        if (
          !input ||
          typeof input !== "object" ||
          !("query" in input) ||
          typeof input.query !== "string"
        )
          throw new Error("query must be a string");
        const query = input.query.toLocaleLowerCase();
        return current.current
          .filter((l) =>
            `${l.name} ${l.breed}`.toLocaleLowerCase().includes(query),
          )
          .map((l) => ({
            id: l.id,
            name: l.name,
            birthDate: l.birthDate,
            weight: l.weight,
            price: l.price,
            status: l.status,
            href: `/marketplace/${l.id}`,
          }));
      },
    };
    try {
      void Promise.resolve(
        context.registerTool(tool, { signal: lifecycle.signal }),
      ).catch(() => {});
    } catch {
      /* Browsers without the experimental API use the same visible marketplace. */
    }
    return () => lifecycle.abort();
  }, []);
  return null;
}
