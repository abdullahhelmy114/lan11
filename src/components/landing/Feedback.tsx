import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import { ui } from "@/lib/content";
import { addFeedback } from "@/lib/local-store";
import { SectionLabel } from "./shared";

export function Feedback({ lang }: { lang: Lang }) {
  const u = ui[lang];
  const [kind, setKind] = useState<"suggestion" | "opinion">("suggestion");
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (body.trim().length < 3) return;
    addFeedback({ kind, name: name.trim(), body: body.trim() });
    setBody("");
    setName("");
    setSent(true);
    window.setTimeout(() => setSent(false), 3000);
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-orange";

  return (
    <section id="feedback" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-14 sm:px-8 sm:py-20">
      <SectionLabel>{u.feedbackTitle}</SectionLabel>
      <h2 className="text-3xl font-semibold text-primary sm:text-4xl">{u.feedbackTitle}</h2>

      <div className="mt-6 inline-flex rounded-full bg-secondary p-1">
        {u.feedbackTabs.map((label, i) => {
          const value = i === 0 ? "suggestion" : "opinion";
          const active = kind === value;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setKind(value as "suggestion" | "opinion")}
              aria-pressed={active}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                active ? "bg-orange text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <form onSubmit={submit} className="glass mt-6 rounded-2xl p-5 sm:p-7">
        <div>
          <label className="text-xs text-muted-foreground" htmlFor="fb-name">
            {u.feedbackName}
          </label>
          <input id="fb-name" maxLength={60} value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </div>
        <div className="mt-4">
          <label className="text-xs text-muted-foreground" htmlFor="fb-body">
            {u.feedbackTabs[kind === "suggestion" ? 0 : 1]}
          </label>
          <textarea
            id="fb-body"
            rows={5}
            maxLength={800}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={u.feedbackText}
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          className="mt-5 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-elegant transition-transform hover:scale-[1.02]"
        >
          {u.feedbackSubmit}
        </button>
        {sent && <p className="mt-3 text-xs text-orange">{u.feedbackThanks}</p>}
      </form>
    </section>
  );
}
