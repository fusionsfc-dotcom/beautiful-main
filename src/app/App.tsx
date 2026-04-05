import { RouterProvider } from "react-router";
import { router } from "./routes.tsx";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" richColors />
      <RouterProvider router={router} />
      <Analytics />
    </AuthProvider>
  );
}