# Kisan Setu — Backend (Node.js + Express)

API for an AI-assisted agricultural advisory platform: farmer accounts, personalized advice, weather, IoT readings, information bulletins, and extension points for remote sensing and ML.

---

## Project root (server folder)

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts (`dev`, `start`, `seed`), and `"type": "module"` for ES modules. |
| `package-lock.json` | Locked dependency tree for reproducible installs. |
| `.env` | **Local secrets** (not committed): MongoDB URI, JWT secret, optional OpenAI key, CORS origin, port. Create from `.env.example`. |
| `.env.example` | Template listing every environment variable the server reads. |
| `.gitignore` | Ignores `node_modules/`, `.env`, and logs. |

---

## Entry and application shell

| File | Purpose |
|------|---------|
| `src/index.js` | Process entry: connects to MongoDB, starts the HTTP server on the configured port, exits on fatal errors. |
| `src/app.js` | Express application: security headers (`helmet`), CORS, JSON body parser, request logging (`morgan`), mounts `/api/v1` routes, 404 handler, global error handler. |

---

## Configuration (`src/config/`)

| File | Purpose |
|------|---------|
| `env.js` | Loads `dotenv`, exposes a single `env` object (port, `MONGODB_URI`, JWT settings, `CORS_ORIGIN`, `OPENAI_API_KEY`). In production, enforces required variables. |
| `db.js` | `connectDb()`: opens the Mongoose connection with a server selection timeout so missing MongoDB fails quickly. |
| `upDistricts.js` | **District → lat/lng** map for Uttar Pradesh–focused defaults (e.g. Siddharthnagar, Balrampur). Used when the client sends a district name instead of coordinates (weather, profile auto-location). |

---

## Data models (`src/models/`)

Mongoose schemas and models for persistence.

| File | Purpose |
|------|---------|
| `User.js` | Farmer/admin accounts: email, password hash, name, phone, role. `toJSON` strips the password hash from API responses. |
| `FarmerProfile.js` | One profile per user: state, district, village, land size/category, crops, soil, irrigation, language, optional GPS. |
| `AdvisoryLog.js` | Stores each advisory Q&A: question, optional context (crop, season, district), response text, source (`openai` or `rules`). |
| `SensorDevice.js` | IoT device registry: unique `deviceId`, owning user, plot name, optional location, active flag. |
| `SensorReading.js` | Time-series readings: temperature, humidity, soil moisture, pH, rainfall, battery, optional raw payload. |
| `AgriContent.js` | Curated content: schemes, tips, bulletins, market notes; optional `regionTags` and validity window. |
| `ClimateAlert.js` | District-scoped alerts with severity and optional `validUntil`. |

---

## Middleware (`src/middleware/`)

| File | Purpose |
|------|---------|
| `auth.js` | `requireAuth`: reads `Authorization: Bearer <JWT>`, verifies token, sets `req.userId` / `req.userRole`. `attachUser` loads the full `User` document. `requireAdmin` for future admin-only routes. |
| `validate.js` | `validateBody` / `validateQuery`: run Zod schemas and return 400 with flattened errors on failure; replace `req.body` / `req.query` with parsed values. |
| `errorHandler.js` | Central error middleware: HTTP status from `HttpError` or 500; includes stack in development. `notFoundHandler` for unknown paths. |

---

## Utilities (`src/utils/`)

| File | Purpose |
|------|---------|
| `HttpError.js` | Small error class carrying `status` and optional `details` for consistent API errors. |
| `asyncHandler.js` | Wraps async route handlers so rejected promises reach `errorHandler` without manual `try/catch`. |

---

## Validation (`src/validators/`)

| File | Purpose |
|------|---------|
| `schemas.js` | Zod schemas for register/login, profile updates, advisory questions, weather query (district **or** lat+lng), IoT payloads, content/alerts listing, remote-sensing coordinates, recommendation query params. |

---

## Services (`src/services/`)

Business logic and external integrations. **This is where most “placeholder → real API” work happens.**

| File | Purpose |
|------|---------|
| `weatherService.js` | Fetches **live** weather from [Open-Meteo](https://open-meteo.com/) (`api.open-meteo.com`): current conditions and a short daily forecast. No API key required. |
| `advisoryService.js` | If `OPENAI_API_KEY` is set, calls OpenAI (`gpt-4o-mini`) with a Kisan Setu system prompt; otherwise returns **rule-based** Hindi/English guidance from keywords and context. |
| `remoteSensingService.js` | **Placeholder**: deterministic fake NDVI/NDMI-style indices from coordinates. Intended to be replaced by Earth Engine, Sentinel Hub, Bhuvan, etc. |
| `recommendationService.js` | **Placeholder / heuristic**: simple soil-type → suggested crop lists and generic resilience tips. Intended to be replaced or backed by a trained model or external agronomy API. |

---

## Controllers (`src/controllers/`)

Thin layer: read `req`, call services/models, send `res.json` / status codes.

| File | Purpose |
|------|---------|
| `authController.js` | Register (hash password, create user + empty profile), login (issue JWT), `me` (current user JSON). |
| `farmerController.js` | `GET/PUT /farmers/me`: load or update `FarmerProfile`; can fill `location` from district using `upDistricts.js`. |
| `advisoryController.js` | Runs `generateAdvisory`, persists `AdvisoryLog`, returns response; lists recent history for the authenticated user. |
| `weatherController.js` | Resolves district to coordinates or uses lat/lng, calls `fetchWeatherSnapshot`. |
| `iotController.js` | Register/update devices, ingest readings, list devices and readings (scoped to the logged-in user). |
| `contentController.js` | Lists `AgriContent` filtered by type, district tags, and date validity. |
| `alertController.js` | Lists active `ClimateAlert` rows for a district. |
| `remoteSensingController.js` | Exposes `stubVegetationIndices` as JSON. |
| `recommendationController.js` | Exposes `soilCropRecommendations` as JSON. |

---

## Routes (`src/routes/`)

| File | Purpose |
|------|---------|
| `index.js` | Mounts all routers under `/api/v1` and exposes `GET /api/v1/health`. |
| `auth.routes.js` | `/auth/register`, `/auth/login`, `/auth/me`. |
| `farmers.routes.js` | `/farmers/me` (protected). |
| `advisory.routes.js` | `/advisory/query`, `/advisory/history` (protected). |
| `weather.routes.js` | `/weather/current` (public). |
| `iot.routes.js` | `/iot/devices`, `/iot/devices/:deviceId/readings` (protected). |
| `content.routes.js` | `/content` (public). |
| `alerts.routes.js` | `/alerts` (public). |
| `remoteSensing.routes.js` | `/remote-sensing/indices` (public). |
| `recommendations.routes.js` | `/recommendations/soil-crop` (public). |

---

## Scripts (`src/scripts/`)

| File | Purpose |
|------|---------|
| `seed.js` | One-time-style seed: if collections are empty, inserts sample `AgriContent` and `ClimateAlert` documents for demos. Run with `npm run seed`. |

---

## Where to change links and URLs (summary)

| Location | What to change |
|----------|----------------|
| **`client/vite.config.js`** | `server.proxy['/api'].target` |
| **`server/.env`** | `CORS_ORIGIN`, `MONGODB_URI`, `PORT`, `OPENAI_API_KEY`, `JWT_SECRET` |
| **`server/src/services/weatherService.js`** | Weather API base URL and query parameters |
| **`server/src/services/advisoryService.js`** | LLM provider, model name, API usage |
| **`server/src/services/remoteSensingService.js`** | Satellite / vegetation-index provider URLs |
| **`server/src/config/upDistricts.js`** | District names and centroid coordinates (not HTTP links, but affects location defaults) |
| **Frontend (when you add `fetch`)** | Use `/api/v1/...` in dev (proxy), or full `https://your-api-domain/...` in production |

The sections below explain **each of these in detailed steps**.

---

## Detailed steps: where to change links and URLs

### A. Vite dev proxy (frontend → backend during `npm run dev`)

**File:** `client/vite.config.js` (in the parent folder next to `server/`).

1. Open `client/vite.config.js`.
2. Find `server.proxy` and the object keyed `'/api'`.
3. Set `target` to wherever your Express app listens:
   - Local default: `http://localhost:4000` (must match `PORT` in `server/.env`).
   - API on another PC on your LAN: `http://192.168.x.x:4000` (use that machine’s IP and port).
   - API behind HTTPS locally (uncommon): `https://localhost:4000` and ensure certificates are trusted.
4. Save the file and **restart** the Vite dev server (`npm run dev` in `client/`). Proxy changes are not always picked up by hot reload.
5. In React, call the API with paths that **start with** `/api`, for example `fetch('/api/v1/health')`. The browser sends the request to Vite (port 5173); Vite forwards it to `target`.

**Production note:** The Vite proxy is **only for development**. In production you typically build static files and host them on a CDN or static host; the browser must call your real API URL directly (see section D).

---

### B. CORS (which websites may call your API from a browser)

**Files:** `server/.env`, optionally `server/src/app.js`, `server/src/config/env.js`.

1. Open `server/.env` and find `CORS_ORIGIN`.
2. Set it to the **exact origin** your React app uses in the browser, including scheme and port, for example:
   - `http://localhost:5173` (Vite default).
3. For **multiple** allowed origins, use comma-separated values in `.env`, for example:  
   `CORS_ORIGIN=http://localhost:5173,https://app.example.com`  
   The app already splits on commas in `src/app.js` (`env.corsOrigin.split(',')`).
4. If you add a new env variable name (instead of stuffing everything into `CORS_ORIGIN`), you must read it in `src/config/env.js` and pass it into `cors({ origin: ... })` in `src/app.js`.
5. Restart the Node server after any `.env` change.
6. If the browser shows a CORS error, check: wrong origin (trailing slash mismatch—origins usually have **no** trailing slash), `http` vs `https`, or calling the API from `file://` (not allowed unless you change CORS policy).

---

### C. MongoDB connection string

**Files:** `server/.env`, (optional) `server/src/config/db.js` for timeouts.

1. Copy `server/.env.example` to `server/.env` if you have not already.
2. Set `MONGODB_URI`:
   - **Local MongoDB:** `mongodb://127.0.0.1:27017/kisan_setu`
   - **MongoDB Atlas:** use the connection string from the Atlas UI (replace `<password>` and ensure your IP is allowlisted).
3. Save and restart the server. If connection fails, Atlas users often need to fix network access, user/password, or `mongodb+srv` vs `mongodb://`.
4. You do **not** put MongoDB’s URL in the frontend; only the backend uses it.

---

### D. Public API URL the frontend uses (production)

There is **no** single “frontend API base URL” file in this repo yet because the landing page does not call the API. When you add `fetch` or axios:

1. **Development:** use relative URLs like `/api/v1/...` so Vite’s proxy works (section A).
2. **Production:** either:
   - Host the API on the **same domain** as the app under a path (e.g. `https://example.com/api/v1`) and configure your reverse proxy (Nginx, Caddy, Cloudflare) to forward `/api` to Node; then the frontend can still use `/api/v1/...`, or  
   - Set an explicit base URL, e.g. `https://api.example.com`, in a Vite env variable such as `VITE_API_URL`, and build requests as `` `${import.meta.env.VITE_API_URL}/v1/health` ``. Then add that production origin to `CORS_ORIGIN` on the server.

---

### E. Weather service base URL

**File:** `server/src/services/weatherService.js`.

1. Locate the constant `BASE` (Open-Meteo forecast endpoint).
2. To keep Open-Meteo, you usually **leave** `BASE` unchanged unless you switch to another path on the same host (e.g. historical API uses a different base in their docs).
3. To use another provider, replace `BASE` and rewrite `fetchWeatherSnapshot` so the `fetch` URL and response parsing match that provider’s documentation.
4. If the provider needs a secret, **do not** hardcode it in this file; add `WEATHER_API_KEY` (or similar) to `.env`, export it from `env.js`, and append it to the query string or headers inside `weatherService.js`.

---

### F. AI / LLM advisory (OpenAI or other)

**Files:** `server/.env` (`OPENAI_API_KEY`), `server/src/services/advisoryService.js`.

1. Put your key in `server/.env` as `OPENAI_API_KEY=sk-...`.
2. In `advisoryService.js`, the model is set in `chat.completions.create({ model: 'gpt-4o-mini', ... })`. Change `model` to another OpenAI model if your account supports it.
3. For a **non-OpenAI** provider, replace the `OpenAI` client block with that vendor’s SDK or raw `fetch`, and map the response text into the same `{ response, source }` shape used today.
4. Restart the server after `.env` changes.

---

### G. Remote sensing (no external URL yet)

**File:** `server/src/services/remoteSensingService.js`.

1. When you subscribe to a provider, they will give you a **base URL**, paths, and auth rules.
2. Add secrets to `.env` and `env.js`, then implement HTTPS calls inside `stubVegetationIndices` (you can rename the function) using `fetch` or the vendor’s SDK.
3. There is currently **no** placeholder URL string here—only simulated numbers—so “changing the link” means **adding** the real endpoint when you integrate.

---

### H. District coordinates (affects weather by district name)

**File:** `server/src/config/upDistricts.js`.

1. Edit `UP_DISTRICT_COORDS`: each key is a district name; values are `lat`, `lng`, and `state`.
2. Use a reliable map or GIS source for centroids; wrong coordinates shift weather and remote-sensing lookups.
3. After adding a district, `GET /api/v1/weather/current?district=YourDistrict` works only if the name matches the object key’s spelling (matching is case-insensitive in code via `resolveDistrictCoords`).

---

### I. Production server URL and TLS

1. Set `PORT` in `.env` or let the host inject it (Heroku, Railway, etc. often set `PORT` automatically).
2. Set `NODE_ENV=production` so stricter env checks apply in `env.js`.
3. Set a long random `JWT_SECRET`.
4. HTTPS is usually terminated at a **reverse proxy** or load balancer in front of Node; you do not need to hardcode `https://` inside these service files unless a **third-party API** requires a specific callback URL (OAuth), in which case you configure that URL in the provider’s dashboard and in your `.env` as needed.

---

## Detailed steps: replace placeholders with real APIs

Use this as an implementation checklist. Complete **in order** where steps depend on earlier ones.

### Phase 1 — Core platform (database, secrets, smoke test)

1. **Install MongoDB** locally, or create a **MongoDB Atlas** cluster and database user.
2. In `server/`, copy `.env.example` to `.env`.
3. Set `MONGODB_URI` to your connection string.
4. Set `JWT_SECRET` to a long random string (never commit it).
5. Set `CORS_ORIGIN` to your Vite origin (e.g. `http://localhost:5173`).
6. Run `npm install` in `server/`, then `npm run dev`.
7. Verify `GET http://localhost:4000/api/v1/health` returns JSON `{ "ok": true, ... }`.
8. Optional: run `npm run seed` once to load sample `AgriContent` and `ClimateAlert` if collections are empty.

---

### Phase 2 — Weather (optional provider swap)

**Current state:** Open-Meteo is already a real, keyless API.

1. Read your target provider’s docs (parameters, units, response JSON).
2. In `weatherService.js`, implement a function that builds the correct URL (and headers if needed).
3. Parse the JSON response and return a **stable** object shape for your mobile/web clients. Minimally preserve: location, “current” snapshot, and short-range daily forecast if you use them in the UI.
4. If you need an API key:
   - Add `WEATHER_API_KEY=...` to `.env`.
   - Add `weatherApiKey: process.env.WEATHER_API_KEY || ''` (or similar) in `env.js`.
   - Use `env.weatherApiKey` inside `weatherService.js`.
5. Test:  
   `GET /api/v1/weather/current?lat=27.25&lng=82.95`  
   and  
   `GET /api/v1/weather/current?district=Siddharthnagar`.
6. If you change the JSON shape returned to clients, update the frontend types and UI accordingly.

---

### Phase 3 — AI advisory (OpenAI or alternative)

**Current state:** Rules-only without `OPENAI_API_KEY`; OpenAI when key is set.

1. Obtain an API key from OpenAI (or another LLM host).
2. Add `OPENAI_API_KEY` to `server/.env` and restart the server.
3. Call `POST /api/v1/advisory/query` with a valid JWT and body `{ "question": "..." }`. Confirm the response includes `"source": "openai"` when the call succeeds.
4. Tune `model`, `max_tokens`, and `temperature` in `advisoryService.js` for quality vs cost.
5. For **non-OpenAI** models: replace the `client.chat.completions.create` call with the vendor’s equivalent; on failure, fall back to `ruleBasedAdvice` so the app stays usable offline or when quotas are hit.
6. Optional: log token usage or errors to monitor costs (new logging in `advisoryService.js` or a wrapper).

---

### Phase 4 — Remote sensing (replace stub with a real provider)

**Current state:** `remoteSensingService.js` computes fake NDVI/NDMI from lat/lng.

1. Pick a provider (examples: **Sentinel Hub** process API, **Google Earth Engine** via your own small backend service, **Planet**, government portals with documented APIs).
2. Complete their signup, create credentials (OAuth client, instance ID, API key, etc.).
3. Add all secrets to `.env` and wire them through `env.js` (never commit secrets).
4. In `remoteSensingService.js`, replace the body of `stubVegetationIndices` with:
   - Authentication (token refresh if OAuth),
   - HTTP request(s) with the correct bbox or point, date range, and band math for NDVI/NDMI (or your indices),
   - Error handling (timeouts, 429 rate limits, empty tiles).
5. Map the provider’s response to the fields your API already returns (`ndvi`, `ndmi`, `healthLabel`, etc.) so existing clients keep working, **or** version the route (e.g. `/api/v2/remote-sensing/indices`).
6. Optional: add a Mongoose model `VegetationIndexCache` and cache by rounded lat/lng + date to reduce API cost.
7. Test: `GET /api/v1/remote-sensing/indices?lat=27.25&lng=82.95`.

---

### Phase 5 — Crop / soil recommendations (heuristics → model or external API)

**Current state:** Static lookup tables in `recommendationService.js`.

1. Decide: **hosted model API** (you operate a Python/FastAPI service) vs **third-party agronomy API** vs **database-driven** expert rules.
2. If using HTTP:
   - Add `RECOMMENDATION_API_URL` and optional `RECOMMENDATION_API_KEY` to `.env` and `env.js`.
   - In `soilCropRecommendations` (or a new async function), `fetch` your service with `soilType`, `district`, and any extra context (crop, season).
   - Parse JSON and return the same top-level keys the controller expects, or change `recommendationController.js` to match your new contract.
3. If using a local ML file or DB, load data once at startup or query MongoDB collections you maintain.
4. Test: `GET /api/v1/recommendations/soil-crop?soilType=loam&district=Balrampur`.

---

### Phase 6 — Alerts and agricultural content (data feeds)

**Current state:** Data lives in MongoDB; `seed.js` inserts samples only when collections are empty.

**Option A — Manual / CMS**

1. Use **MongoDB Compass** or a script to insert documents into `agricontents` and `climatealerts` collections matching the schemas in `AgriContent.js` and `ClimateAlert.js`.
2. Test `GET /api/v1/content?district=Siddharthnagar` and `GET /api/v1/alerts?district=Siddharthnagar`.

**Option B — Automated feed (IMD, state dept, RSS)**

1. Find the **official feed URL** (JSON, RSS, or HTML scraping as last resort).
2. Add `ALERT_FEED_URL` / API keys to `.env` and `env.js`.
3. Create `src/services/alertSyncService.js` that fetches the feed, normalizes records, and upserts into `ClimateAlert` and/or `AgriContent` using Mongoose.
4. Add `src/scripts/syncAlerts.js` that calls the sync function and exits; schedule it with **cron** (Linux), **Task Scheduler** (Windows), or your host’s job runner.
5. Run the script once manually and verify new rows appear in the database and via the GET endpoints.

---

### Phase 7 — IoT ingestion (devices and security)

**Current state:** REST endpoints store readings in MongoDB; devices use the **farmer’s JWT**.

1. Register a device: `POST /api/v1/iot/devices` with JWT and `{ "deviceId": "field-001", ... }`.
2. Post readings: `POST /api/v1/iot/devices/field-001/readings` with the same JWT.
3. For production hardening (placeholders to replace):
   - Issue **per-device API keys** or HMAC signatures stored hashed in `SensorDevice`, and add middleware that authenticates the device without the farmer’s login token.
   - Or use a **gateway** (e.g. MQTT → Node consumer) that holds one server-side credential.

---

### Phase 8 — Final verification checklist

1. `GET /api/v1/health` — OK.
2. Register → login → `GET /api/v1/auth/me` with `Authorization: Bearer <token>`.
3. `PUT /api/v1/farmers/me` with profile fields; confirm district-based location if applicable.
4. `POST /api/v1/advisory/query` — response and `source` field as expected.
5. `GET /api/v1/weather/current?district=Siddharthnagar`.
6. `GET /api/v1/remote-sensing/indices?lat=...&lng=...` — real or stub values consistent with your integration.
7. `GET /api/v1/recommendations/soil-crop?soilType=loam`.
8. From the React app (dev): `fetch('/api/v1/health')` with Vite proxy pointing at the correct `target`.
9. After deploying: set production `CORS_ORIGIN`, HTTPS at the proxy, and strong `JWT_SECRET`.

---

## Quick commands

```bash
npm install          # dependencies
npm run dev          # dev server with --watch
npm start            # production-style (no watch)
npm run seed         # sample content/alerts if DB is empty
```

API base path: **`/api/v1`**.
