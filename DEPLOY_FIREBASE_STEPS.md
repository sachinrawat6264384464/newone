# Deploy Home Storey to Firebase Hosting – Step by Step

Your app uses Next.js API routes (e.g. `/api/send-notification`). Use **Firebase Hosting + Next.js (web frameworks)** so the API and contact form keep working.

--- 

## Prerequisites

- Node.js 18 or 20 (avoid Node 24 if you had auth issues)
- Firebase CLI installed: `npm install -g firebase-tools`
- Logged in: `firebase login` (use the Google account that owns the **home-storey** project)
- Firebase project **home-storey** already exists and is linked

---

## Step 1: Enable web frameworks (one-time)

In the project folder (`home_storey_app`), run:

```bash
firebase experiments:enable webframeworks
```

You should see: `Enabled webframeworks experiment.`

---

## Step 2: Initialize Firebase Hosting for Next.js

Run:

```bash
firebase init hosting
```

Answer the prompts **exactly** like this:

| Prompt | What to answer |
|--------|----------------|
| **Please select an option:** | Use an existing project |
| **Select a default Firebase project:** | **home-storey** (use arrow keys, then Enter) |
| **What do you want to use as your public directory?** | **public** (default; Firebase will override for Next.js) |
| **Configure as a single-page app?** | **N** (No) |
| **Set up automatic builds and deploys with GitHub?** | **N** (No) unless you want that later |
| **File public/index.html already exists. Overwrite?** | **N** (No) if asked |

The CLI will detect Next.js and add the right config. You should get a `firebase.json` (and possibly `firebase.apphosting.yaml` or similar) in the project root.

---

## Step 3: Confirm Firebase project

If you didn’t link a project in Step 2, or want to switch:

```bash
firebase use home-storey
```

Check:

```bash
firebase projects:list
```

Ensure **home-storey** is there and you’re using it.

---

## Step 4: Install dependencies

```bash
npm install
```

---

## Step 5: Build the Next.js app

From the project root:

```bash
npm run build
```

If you see errors about Turbopack and Firebase, try a plain Next build once:

```bash
npx next build
```

Fix any build errors before deploying.

---

## Step 6: Deploy to Firebase

```bash
firebase deploy
```

Or only hosting:

```bash
firebase deploy --only hosting
```

First deploy can take several minutes (Cloud Functions are created). When it finishes, you’ll see a **Hosting URL**, e.g.:

- `https://home-storey.web.app`
- or `https://home-storey.firebaseapp.com`

Open that URL to test the site.

---

## Step 7: Environment variables in production

Your app uses `.env` (Firebase, Brevo, admin credentials). Those are **not** uploaded with the deploy.

- **Option A – Firebase App Hosting (if you use it):** set env vars in Firebase Console → App Hosting → your app → Environment variables.
- **Option B – Cloud Functions (with `firebase deploy`):** set them in Firebase Console → **Functions** → **Environment variables** (or use a `.env` file and a tool that injects them into Functions).

For **Firebase Hosting + Next.js (webframeworks)**:

- **`NEXT_PUBLIC_*`** are baked into the client at **build time**. So run `npm run build` (and deploy) from a machine or CI where `.env` (or your build env) has the correct `NEXT_PUBLIC_*` values.
- **Server-only** vars (e.g. `SMTP_PASS`, `ADMIN_PASSWORD`) must be available to the **Cloud Functions** that run your API routes. Set them in Firebase Console → **Functions** → **Environment variables** (or equivalent for the runtime that runs the Next.js server/API).

So:

1. Before **Step 5**, ensure `.env` has the right values for production (and that you don’t commit secrets).
2. For production-only secrets (e.g. SMTP, admin password), add them in Firebase Console → **Functions** → **Environment variables** (or as your Firebase/Next.js docs specify for your setup).

---

## Step 8: Add custom domain (optional)

1. Firebase Console → your project → **Hosting**.
2. Click **Add custom domain**.
3. Enter your domain (e.g. `homestorey.com`).
4. Add the **TXT** and **A** records your DNS provider shows.
5. After verification, Firebase will issue SSL.

---

## Troubleshooting

| Issue | What to do |
|-------|------------|
| **401 / invalid credentials** | Run `firebase logout`, then `firebase login`. Use the Google account that owns **home-storey**. |
| **Build fails** | Run `npm run build` (or `npx next build`) locally and fix errors. Don’t deploy until build succeeds. |
| **API route 404 in production** | Ensure you used **Firebase Hosting + Next.js (webframeworks)** and that deploy completed (including Cloud Functions). Check Firebase Console → **Functions** for errors. |
| **Env vars not working** | Confirm `NEXT_PUBLIC_*` are set when you run `npm run build`. For server/API, set vars in Firebase Console → **Functions** → **Environment variables**. |

---

## Quick reference

```bash
firebase experiments:enable webframeworks
firebase init hosting          # Pick home-storey, Next.js, public dir, no SPA
firebase use home-storey       # if needed
npm install
npm run build
firebase deploy
```

Then open the Hosting URL and, if needed, set env vars and add a custom domain as above.
