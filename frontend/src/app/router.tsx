import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { RootLayout } from '@/pages/layouts/RootLayout';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';

const HomePage = lazy(() => import('@/pages/Home'));
const CardapioPage = lazy(() => import('@/pages/Cardapio'));
const PastelDetailPage = lazy(() => import('@/pages/PastelDetail'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

/**
 * @router AppRouter
 * @summary Main application routing configuration
 * @type router-configuration
 * @category navigation
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'cardapio',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CardapioPage />
          </Suspense>
        ),
      },
      {
        path: 'cardapio/:id',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PastelDetailPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

/**
 * @component AppRouter
 * @summary Router provider component
 */
export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
