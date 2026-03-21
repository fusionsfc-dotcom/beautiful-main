import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Clinics from "./pages/Clinics";
import Facilities from "./pages/Facilities";
import Columns from "./pages/Columns";
import Reservation from "./pages/Reservation";
import HealthCheck from "./pages/HealthCheck";
import ClinicDetail from "./pages/ClinicDetail";
import Cases from "./pages/Cases";
import MyConsultations from "./pages/MyConsultations";
import MyResults from "./pages/MyResults";
import MyReports from "./pages/MyReports";
import About from "./pages/About";
import Admin from "./pages/Admin";
import ErrorPage from "./pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      { path: "clinics", Component: Clinics },
      { path: "clinics/:id", Component: ClinicDetail },
      { path: "facilities", Component: Facilities },
      { path: "columns", Component: Columns },
      { path: "reservation", Component: Reservation },
      { path: "health-check", Component: HealthCheck },
      { path: "cases", Component: Cases },
      { path: "my-consultations", Component: MyConsultations },
      { path: "my-results", Component: MyResults },
      { path: "my-reports", Component: MyReports },
      { path: "about", Component: About },
      { path: "admin", Component: Admin },
      { path: "*", Component: ErrorPage },
    ],
  },
]);