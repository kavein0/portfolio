# Cyberpunk Cybersecurity Portfolio - AI Memory Document

**Project Path:** `C:\Users\bproo\.gemini\antigravity\scratch\voron-portfolio`
**GitHub Repo:** `https://github.com/kavein0/portfolio.git` (Branch: `main`)

## 1. Project Overview & Tech Stack
- **Type:** Personal Cybersecurity Portfolio Website.
- **Framework:** Next.js (App Router, Turbopack) + React + TypeScript.
- **Styling:** Tailwind CSS + custom CSS variables.
- **Animations:** Framer Motion (page transitions, stagger effects, hover states) + Custom CSS (`glitch-wrapper`, `glitch-text`).
- **Icons:** `lucide-react`.

## 2. Design System & Aesthetics (CRITICAL)
The user strongly prefers a highly polished, premium **Cyberpunk / Hacker** aesthetic.
- **Colors:** Deep dark backgrounds (`--bg-primary`, `--bg-secondary`, `--bg-tertiary`), highlighted by neon accents, primarily **Cyber Green** (`--cyber-green`) and neon blue.
- **Typography:** Heavy use of monospace (`font-mono`) for data/tech elements, and a distinct display font (`font-display`) for headings.
- **Buttons:** Use the `.magnetic-btn` custom class. Recent updates allow dynamic hover colors via the `--btn-color` CSS variable (e.g., transitioning to blue on hover).
- **Effects:** CSS glitch effects on main titles. Elements should feel responsive and "alive" (staggered fade-ins, border highlights on hover).

## 3. Data Architecture (`src/lib/data.ts`)
The portfolio aggregates achievements across several platforms:
- **HackTheBox Academy:** 
  - 17 Modules, 19 Badges. 
  - **Rule:** Use *personal achievement certificate links* (e.g., `https://academy.hackthebox.com/achievement/...`) instead of generic module URLs. 
  - **Rule:** The order of items must *strictly* match the user's provided screenshots. 
- **HackTheBox Labs:**
  - 10 Owned Machines, 10 Solved Challenges.
  - **Rule:** Also use personal achievement links (e.g., `https://labs.hackthebox.com/achievement/machine/...`).
- **TryHackMe:**
  - Cloudflare actively blocks scraping. Currently relies on static data/badges. Do not attempt direct scraping without a workaround.
- **Cisco Academy:** Static data entries.

## 4. API & Backend State
- **HTB API:** Code is prepared in `src/app/api/htb/route.ts` (or similar) to fetch real-time stats.
- **Current Blocker:** Automated fetching throws a timeout/error because the user has not yet added their `HTB_API_TOKEN` to `.env.local`. Until this is provided, stats fail gracefully or show static placeholders. Do not break the build over this.

## 5. Known Quirks & Fixed Bugs
- **`useTypingEffect` (HeroSection):** Previously had issues with infinite re-renders/React state updates. Fixed by using a more robust state transition pattern. Do not revert to synchronous setState loops.
- **Terminal Widget:** Ensure static terminal commands (`whoami`, `skills`) use the correct properties from `data.ts` (e.g., use `title` instead of the old `role` property to avoid TypeScript undefined errors).
- **Hydration:** Be careful with server/client rendering mismatches. Ensure random or date-based values match between SSR and hydration, or render them only on the client.

## 6. User Preferences & Workflow for AI
- **Git:** The user likes continuous integration. Always run `npm run build` to verify changes, then `git add .`, `git commit -m "..."`, and `git push`.
- **Accuracy:** When the user provides a list of URLs or a specific order, follow it *exactly*.
- **No Placeholders:** If you build a new component, make it look premium immediately. Do not use generic colors like plain red or blue; stick to the cyberpunk palette and CSS variables.

## 7. Next Steps / Pending Work (Context for next session)
- Integrating real-time HTB stats once `HTB_API_TOKEN` is configured.
- Refining TryHackMe data (either manual updates or embedding official dynamic SVG widgets).
- Further expanding the `TerminalWidget` to make it more interactive.
