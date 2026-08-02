import type { Lang } from "./i18n";

export type Registration = {
  id: string;
  lang: Lang;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
};

export type SolidarityMessage = {
  id: string;
  name: string;
  country: string;
  message: string;
  createdAt: string;
  approved: boolean;
};

const REG_KEY = "rq_registrations";
const WALL_KEY = "rq_solidarity";

function read<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, rows: T[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(rows));
  } catch {
    /* storage unavailable */
  }
}

const id = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : String(Date.now() + Math.random());

export const getRegistrations = () => read<Registration>(REG_KEY);

export function addRegistration(data: Omit<Registration, "id" | "createdAt">): Registration {
  const row: Registration = { ...data, id: id(), createdAt: new Date().toISOString() };
  write(REG_KEY, [row, ...getRegistrations()]);
  return row;
}

export const getMessages = () => read<SolidarityMessage>(WALL_KEY);

export function addMessage(
  data: Omit<SolidarityMessage, "id" | "createdAt" | "approved">,
): SolidarityMessage {
  const row: SolidarityMessage = {
    ...data,
    id: id(),
    createdAt: new Date().toISOString(),
    approved: true,
  };
  write(WALL_KEY, [row, ...getMessages()]);
  return row;
}

export const SEED_MESSAGES: SolidarityMessage[] = [
  {
    id: "seed-1",
    name: "أمّ يوسف",
    country: "الأردن",
    message: "خطواتكم دعاء يمشي على الأرض. القدس في القلب ولو بعُدت الطريق.",
    createdAt: "2026-01-02T09:00:00.000Z",
    approved: true,
  },
  {
    id: "seed-2",
    name: "Miriam H.",
    country: "Ireland",
    message: "Walking with you in spirit from Galway. Language is how we carry each other.",
    createdAt: "2026-01-03T09:00:00.000Z",
    approved: true,
  },
  {
    id: "seed-3",
    name: "Ahmet Y.",
    country: "Türkiye",
    message: "Kudüs yalnız değil. Yolunuz açık, sabrınız bol olsun.",
    createdAt: "2026-01-04T09:00:00.000Z",
    approved: true,
  },
  {
    id: "seed-4",
    name: "عبد الرحمن",
    country: "المغرب",
    message: "من مراكش إلى القافلة: الكلمة الطيّبة زادٌ، والثبات وعد.",
    createdAt: "2026-01-05T09:00:00.000Z",
    approved: true,
  },
  {
    id: "seed-5",
    name: "Sofia R.",
    country: "Spain",
    message: "Every word learned here is a door opened for justice. Buen camino.",
    createdAt: "2026-01-06T09:00:00.000Z",
    approved: true,
  },
];

export type MemoryCard = {
  id: string;
  code: string;
  name: string;
  country: string;
  verseId: string;
  createdAt: string;
};

export type Feedback = {
  id: string;
  kind: "suggestion" | "opinion";
  name: string;
  body: string;
  createdAt: string;
};

const CARD_KEY = "rq_memory_cards";
const FEEDBACK_KEY = "rq_feedback";

export const getCards = () => read<MemoryCard>(CARD_KEY);

export function addCard(data: Omit<MemoryCard, "id" | "createdAt" | "code">): MemoryCard {
  const code = `RQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const row: MemoryCard = { ...data, code, id: id(), createdAt: new Date().toISOString() };
  write(CARD_KEY, [row, ...getCards()]);
  return row;
}

export const getFeedback = () => read<Feedback>(FEEDBACK_KEY);

export function addFeedback(data: Omit<Feedback, "id" | "createdAt">): Feedback {
  const row: Feedback = { ...data, id: id(), createdAt: new Date().toISOString() };
  write(FEEDBACK_KEY, [row, ...getFeedback()]);
  return row;
}
