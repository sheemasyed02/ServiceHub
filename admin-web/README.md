# ServiceHub Admin

React 19 + Vite + TypeScript admin dashboard for ServiceHub.

## Stack

- React 19, TypeScript, Vite
- Material UI v6
- React Router, TanStack Query, Redux Toolkit
- TanStack Table, Recharts, React Hook Form, Axios

## Scripts

```bash
npm install
npm run dev       # http://localhost:5173
npm run build
npm run lint
npm run format
npm run typecheck
```

## Structure

```
src/
├── components/   # DataTable, dialogs, common UI
├── pages/        # Dashboard, Users, Providers, Bookings, etc.
├── layouts/      # AdminLayout, Sidebar, TopNavbar
├── routes/       # AppRoutes
├── store/        # Redux UI state (sidebar)
├── services/     # Axios, React Query client
├── theme/        # MUI theme
├── constants/    # Routes, menu, mock data
├── types/        # TypeScript types
└── utils/        # Formatters, CSV export
```

All data is mock/UI-only — no backend required.
