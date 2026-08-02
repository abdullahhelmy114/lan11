import { createFileRoute } from "@tanstack/react-router";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().max(60).optional(),
  type: z.enum(["suggestion", "opinion"]),
  message: z.string().trim().min(4).max(800),
});

async function ensureTable(sql: NeonQueryFunction<false, false>) {
  await sql`
    CREATE TABLE IF NOT EXISTS feedback_messages (
      id BIGSERIAL PRIMARY KEY,
      name TEXT,
      type TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}

export const Route = createFileRoute("/api/public/feedback")({
  server: {
    handlers: {
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
            INSERT INTO feedback_messages (name, type, message)
            VALUES (${parsed.data.name || null}, ${parsed.data.type}, ${parsed.data.message})
            RETURNING id, name, type, message, created_at
          `;
          return Response.json({ ok: true, feedback: rows[0] });
        } catch (error) {
          console.error("feedback insert failed", error);
          return Response.json({ error: "Database error" }, { status: 500 });
        }
      },
    },
  },
});
