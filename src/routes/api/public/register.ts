import { createFileRoute } from "@tanstack/react-router";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";

const schema = z.object({
  full_name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  whatsapp_number: z.string().trim().min(6).max(25),
  selected_language: z.string().trim().min(2).max(8),
});

export const Route = createFileRoute("/api/public/register")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const url = process.env["DATABASE_URL"];
        if (!url) {
          return Response.json({ error: "DATABASE_URL is not configured" }, { status: 500 });
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = schema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Invalid input" }, { status: 400 });
        }

        try {
          const sql = neon(url);
          await sql`
            CREATE TABLE IF NOT EXISTS registrations (
              id BIGSERIAL PRIMARY KEY,
              full_name TEXT NOT NULL,
              email TEXT NOT NULL,
              whatsapp_number TEXT NOT NULL,
              selected_language TEXT NOT NULL,
              created_at TIMESTAMPTZ NOT NULL DEFAULT now()
            )
          `;
          const rows = await sql`
            INSERT INTO registrations (full_name, email, whatsapp_number, selected_language)
            VALUES (${parsed.data.full_name}, ${parsed.data.email}, ${parsed.data.whatsapp_number}, ${parsed.data.selected_language})
            RETURNING id
          `;
          return Response.json({ ok: true, id: rows[0]?.["id"] ?? null });
        } catch (error) {
          console.error("register insert failed", error);
          return Response.json({ error: "Database error" }, { status: 500 });
        }
      },
    },
  },
});
