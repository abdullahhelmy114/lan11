import { createFileRoute } from "@tanstack/react-router";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(60),
  country: z.string().trim().min(2).max(60),
  message: z.string().trim().min(4).max(400),
});

async function ensureTable(sql: NeonQueryFunction<false, false>) {
  await sql`
    CREATE TABLE IF NOT EXISTS solidarity_messages (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      country TEXT NOT NULL,
      message TEXT NOT NULL,
      approved BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}

export const Route = createFileRoute("/api/public/messages")({
  server: {
    handlers: {
      GET: async () => {
        const url = process.env["DATABASE_URL"];
        if (!url) return Response.json({ error: "DATABASE_URL is not configured" }, { status: 500 });
        try {
          const sql = neon(url);
          await ensureTable(sql);
          const rows = await sql`
            SELECT id, name, country, message, created_at
            FROM solidarity_messages
            WHERE approved = true
            ORDER BY created_at DESC
            LIMIT 200
          `;
          return Response.json(
            { messages: rows },
            { headers: { "cache-control": "no-store" } },
          );
        } catch (error) {
          console.error("messages fetch failed", error);
          return Response.json({ error: "Database error" }, { status: 500 });
        }
      },
      POST: async ({ request }) => {
        const url = process.env["DATABASE_URL"];
        if (!url) return Response.json({ error: "DATABASE_URL is not configured" }, { status: 500 });

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = schema.safeParse(body);
        if (!parsed.success) return Response.json({ error: "Invalid input" }, { status: 400 });

        try {
          const sql = neon(url);
          await ensureTable(sql);
          const rows = await sql`
            INSERT INTO solidarity_messages (name, country, message)
            VALUES (${parsed.data.name}, ${parsed.data.country}, ${parsed.data.message})
            RETURNING id, name, country, message, created_at
          `;
          return Response.json({ ok: true, message: rows[0] });
        } catch (error) {
          console.error("message insert failed", error);
          return Response.json({ error: "Database error" }, { status: 500 });
        }
      },
    },
  },
});
