import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";
import ErrorFallback from "./ui/ErrorFallback";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

import AppLayout from "./ui/AppLayout";
import Spinner from "./ui/Spinner";

// Lazy load the pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Cabins = lazy(() => import("./pages/Cabins"));
const Users = lazy(() => import("./pages/Users"));
const Settings = lazy(() => import("./pages/Settings"));
const Account = lazy(() => import("./pages/Account"));
const Login = lazy(() => import("./pages/Login"));
const Booking = lazy(() => import("./pages/Booking"));
const Checkin = lazy(() => import("./pages/Checkin"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function LazyLoader({ children }) {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
}

const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace("/")}
      >
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      </ErrorBoundary>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        element: (
          <LazyLoader>
            <Dashboard />
          </LazyLoader>
        ),
        path: "/dashboard",
      },
      {
        element: (
          <LazyLoader>
            <Bookings />
          </LazyLoader>
        ),
        path: "/bookings",
      },
      {
        element: (
          <LazyLoader>
            <Booking />
          </LazyLoader>
        ),
        path: "/bookings/:bookingId",
      },
      {
        element: (
          <LazyLoader>
            <Checkin />
          </LazyLoader>
        ),
        path: "/checkin/:bookingId",
      },
      {
        element: (
          <LazyLoader>
            <Cabins />
          </LazyLoader>
        ),
        path: "/cabins",
      },
      {
        element: (
          <LazyLoader>
            <Users />
          </LazyLoader>
        ),
        path: "/users",
      },
      {
        element: (
          <LazyLoader>
            <Settings />
          </LazyLoader>
        ),
        path: "/settings",
      },
      {
        element: (
          <LazyLoader>
            <Account />
          </LazyLoader>
        ),
        path: "/account",
      },
    ],
  },
  {
    element: (
      <LazyLoader>
        <Login />
      </LazyLoader>
    ),
    path: "/login",
  },
]);

function App() {
  return (
    <>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyles />
          <RouterProvider router={router} />

          <Toaster
            position="top center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              style: {
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
              },
              success: { duration: 3000 },
              error: { duration: 4000 },
            }}
          />
        </QueryClientProvider>
      </DarkModeProvider>
    </>
  );
}

export default App;
