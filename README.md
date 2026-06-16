# Perry

Perry is a private, invite-only network for organizing and joining walking salons.

This MVP includes:

- Invite-only access model screens
- Onboarding, profile, availability, and directory views
- Walk discovery with list/map modes
- Walk detail, interest workflow, proposal flow, organizer dashboard, admin tools
- Supabase schema and starter RLS policies
- AI proposal draft API route with a deterministic fallback

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Supabase

Start with `supabase/schema.sql`. The UI currently uses sample data from `lib/sample-data.ts`, so it can be reviewed before connecting a live database.
