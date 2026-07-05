import { Navigate, Route, Routes } from 'react-router-dom';

import { AdminLayout } from '@/layouts';
import {
  BookingDetailsPage,
  BookingsPage,
  CategoriesPage,
  DashboardPage,
  DisputesPage,
  NotificationsPage,
  PaymentsPage,
  ProfilePage,
  ProviderDetailsPage,
  ProvidersPage,
  ProviderVerificationPage,
  ReportsPage,
  ReviewsPage,
  SettingsPage,
  SupportTicketsPage,
  UsersPage,
} from '@/pages';
import { ROUTES } from '@/constants/routes';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path={ROUTES.USERS} element={<UsersPage />} />
        <Route path={ROUTES.PROVIDERS} element={<ProvidersPage />} />
        <Route path={ROUTES.PROVIDER_VERIFICATION} element={<ProviderVerificationPage />} />
        <Route path={ROUTES.PROVIDER_DETAILS} element={<ProviderDetailsPage />} />
        <Route path={ROUTES.BOOKINGS} element={<BookingsPage />} />
        <Route path={ROUTES.BOOKING_DETAILS} element={<BookingDetailsPage />} />
        <Route path={ROUTES.PAYMENTS} element={<PaymentsPage />} />
        <Route path={ROUTES.REVIEWS} element={<ReviewsPage />} />
        <Route path={ROUTES.CATEGORIES} element={<CategoriesPage />} />
        <Route path={ROUTES.REPORTS} element={<ReportsPage />} />
        <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />
        <Route path={ROUTES.DISPUTES} element={<DisputesPage />} />
        <Route path={ROUTES.SUPPORT} element={<SupportTicketsPage />} />
        <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Route>
    </Routes>
  );
}
