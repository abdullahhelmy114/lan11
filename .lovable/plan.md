# خطة: نشر المشروع على Coolify (Self-Hosting)

## الهدف
إضافة ملفات وإعدادات ضرورية لتمكين نشر تطبيق TanStack Start على خادم Coolify خاص، مع الحفاظ على إمكانية النشر العادي على Lovable.

## حالة المشروع الحالية
- الإطار: TanStack Start v1 (full-stack React + SSR).
- أداة البناء: Vite 8 + Nitro 3.
- مدير الحزم: Bun (`bunfig.toml` موجود).
- سكربتات البناء: `build` → `vite build`، `preview` → `vite preview`.
- لا يوجد حاليًا Dockerfile أو docker-compose أو إعدادات Coolify.

## الخطوات المقترحة

### 1. إضافة Dockerfile
- استخدام مرحلتين (multi-stage):
  - **stage `deps`**: تثبيت الاعتماديات بـ `bun install`.
  - **stage `builder`**: تشغيل `bun run build` لإنتاج مجلد `dist/` أو `.output/` (حسب إعداد Nitro).
  - **stage `runner`**: صورة نهائية خفيفة (مثل `oven/bun:alpine` أو `node:22-alpine`) تعمل على المنفذ `3000`.
- ضمان تثبيت `node_modules` كاملاً (production + dev) أثناء البناء لأن بعض أدوات Vite devDependencies.
- نسخ `package.json` و`bunfig.toml` و`bun.lockb` (إن وُجد) أولاً لاستفادة من cache.

### 2. إضافة docker-compose.yml (اختياري لكن مفيد)
- تعريف service واحد `app`.
- تحديد `build: context: .` و`ports: "3000:3000"`.
- إضافة `restart: unless-stopped`.
- ترك مكان لمتغيرات البيئة تحت `environment:` أو `env_file: .env.production`.

### 3. إضافة/تعديل سكربتات package.json
- إضافة سكربت `"start": "node ./.output/server/index.mjs"` أو ما يوازيه حسب مخرجات Nitro.
- التحقق من مسار ملف الخادم النهائي بعد `vite build` وتعديل `start` ليتناسب معه.

### 4. إعدادات Coolify
- إنشاء ملف `.coolify.yaml` أو توثيق الإعدادات اليدوية:
  - **Build Pack**: Dockerfile.
  - **Port**: 3000.
  - **Domain**: ربط النطاق المخصص (مثل `ruhulqudus.com`).
  - **Healthcheck**: مسار `/` (أو `/api/health` إن أُضيف لاحقًا).
  - **Environment Variables**: `NODE_ENV=production`، `NITRO_PRESET=node-server` (إن لزم).

### 5. متغيرات البيئة
- `NODE_ENV=production`
- `NITRO_PRESET=node-server`
- أي متغيرات أخرى خاصة بالتطبيق (مفاتيح API، إعدادات البريد، إلخ) — المشروع الحالي لا يستخدم secrets خارجية.

### 6. اختبار محلي قبل النشر
- تشغيل `docker build -t ruhulqudus-app .`.
- تشغيل `docker run -p 3000:3000 ruhulqudus-app`.
- التأكد من أن الموقع يعمل على `http://localhost:3000`.

### 7. توثيق النشر
- إضافة قسم "Self-hosting with Coolify" إلى README.md يشرح:
  - كيفية رفع المشروع إلى Git.
  - إضافة Resource جديد في Coolify من Git Repository.
  - تحديد Dockerfile والمنفذ.
  - ربط النطاق.

## المخرجات المتوقعة
- `Dockerfile`
- `docker-compose.yml`
- تحديث `package.json` بسكربت `start`
- تحديث `README.md` بتعليمات Coolify
- (اختياري) `.dockerignore`

## ملاحظات
- لن نغيّر منطق التطبيق أو واجهته.
- النشر على Lovable يبقى ممكناً كما هو؛ هذه الإضافات موجّهة للاستضافة الذاتية فقط.
- إذا كان Coolify يستخدم Traefik، فلا حاجة لإعدادات Nginx يدوية — Coolify يديرها تلقائياً.