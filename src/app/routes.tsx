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
import RehabExercise from "./pages/program/RehabExercise";
import IntegratedCare from "./pages/program/IntegratedCare";
import TbtTherapy from "./pages/program/TbtTherapy";
import BrandStory from "./pages/intro/BrandStory";
import AntiCancerNutrition from "./pages/program/AntiCancerNutrition";
import TreatmentDetail from "./pages/program/treatments/TreatmentDetail";
import Why from "./pages/Why";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      { path: "why", Component: Why },
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
      { path: "program/rehab", Component: RehabExercise },
      { path: "program/integrated", Component: IntegratedCare },
      { path: "program/tbt", Component: TbtTherapy },
      { path: "intro/story", Component: BrandStory },
      { path: "program/nutrition", Component: AntiCancerNutrition },
      { path: "program/integrated/:slug", Component: TreatmentDetail },
      { path: "*", Component: ErrorPage },
    ],
  },
]);