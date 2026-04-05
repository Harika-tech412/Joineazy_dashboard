# Joineazy — Assignment & Review Dashboard

Frontend internship task: a responsive **student assignment** dashboard with **role-based views** (student vs professor/admin). No backend — data is **seeded from JSON** and persisted in **`localStorage`**.

## Features

- **Students** see only assignments assigned to their user id, with per-assignment progress and an **overall completion** bar.
- **Double-verification submission flow**: “Yes, I have submitted” → **final confirmation** before marking submitted (after using the Drive link).
- **Admins (professors)** create/edit/delete assignments with a **Google Drive** submission link and assigned students (from a demo roster linked to each professor).
- **Admin view** shows, for each assignment, every assigned student with **submitted / not submitted** and an **individual progress bar**, plus a class-level overview.

## Tech stack

- React 19 (Create React App / `react-scripts`)
- Tailwind CSS, PostCSS
- **React Context** + `useReducer`-style updates for global app state
- Hooks: `useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`

## Project setup

```bash
cd joineazy-dashboard
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). Use the demo login buttons (no password).

```bash
npm test
npm run build
```

## Live Demo
🔗 https://monumental-valkyrie-4b557f.netlify.app

## Deploy (Netlify / Vercel)

- **Netlify**: connect the repo, build command `npm run build`, publish directory `build`. SPA fallback is included via `public/_redirects`.
- **Vercel**: import the project; default CRA settings (`build` output) work.



## Folder structure (overview)

```
src/
  App.js                 # Provider + role-based shell
  context/
    AppContext.js        # Auth, assignments, submissions, derived lists
  data/
    seedData.js          # Mock users + initial assignments/submissions
  services/
    persistence.js       # localStorage load/save
  components/
    admin/               # Professor dashboards, forms, cards
    auth/                # Demo login
    layout/              # Header, shell, side tips
    student/             # Student list, submission modal flow
    ui/                  # Shared (e.g. ProgressBar)
```

## Architecture & design notes

- **Single source of truth**: assignments and submissions live in context after hydration from `localStorage`. First visit seeds from `seedData.js`.
- **Scoping rules**: students filter assignments by `studentIds`; admins filter by `createdBy`. Submission records use keys `${assignmentId}_${studentId}`.
- **UI**: Tailwind for responsive layout (stacked on small screens, sidebar from `md` up, mobile menu for navigation). Modals use simple fixed overlays for accessibility (`role="dialog"` / `alertdialog` where appropriate).
- **Extending**: swap `persistence.js` for API calls; keep the same shapes for assignments and submissions.

## Demo video (submission)

Record a short walkthrough: login as a student (confirm flow), then as a professor (create/edit assignment, view bars). Include your **GitHub repo URL** and **hosted demo URL** in the PDF per Joineazy instructions.

---

Built for the Joineazy frontend internship task (April 2026).
