# RPF_MIS REMERA — Starter Kit

This is a starter project package, not a deployed or fully tested production system.

## Included
- React + Vite application scaffold
- Responsive starter dashboard
- PWA manifest and service-worker registration
- Capacitor configuration for Android packaging
- PostgreSQL/Supabase starter schema with role, member, audit-log and import-batch tables
- Initial Excel/CSV import template
- Environment-variable example
- Setup and deployment instructions

## Important before using real member data
1. Obtain authorization from the organization responsible for the membership register.
2. Use a private Supabase project (or another secured PostgreSQL host).
3. Apply the SQL schema and configure Row Level Security policies before importing personal data.
4. Store secrets only in server-side environment variables. Never place admin passwords or service-role keys in frontend code.
5. Have the data owner validate the Excel import mapping and backup the original workbook.
6. Do not upload real National IDs or phone numbers to a public/demo deployment.

The initial dataset of approximately 18,000 members is NOT included. Import it using the controlled import workflow after the backend is configured.

## Requirements
- Node.js 20+
- npm
- Android Studio (only for Android APK builds)
- A Supabase project or PostgreSQL backend

## Run locally
```bash
npm install
cp .env.example .env
npm run dev
```
Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env` after creating your Supabase project.

## Build the web app
```bash
npm run build
npm run preview
```

## Android wrapper
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap add android
npm run build
npx cap sync android
npx cap open android
```
Build the APK from Android Studio. The Android wrapper does not itself provide backend security; configure and test authentication and database policies first.

## Database
Run `database/schema.sql` in the Supabase SQL editor. Then configure secure authentication and policies. The schema intentionally does not hard-code the super-admin password. Create the first administrator through a secure server-side provisioning process.

## Import template
Use `templates/initial_members_import.csv` as a column guide. Keep the original workbook unchanged. Import in a staging/preview step, review duplicates and validation errors, then commit only after approval.
