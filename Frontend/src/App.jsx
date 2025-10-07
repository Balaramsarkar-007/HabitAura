import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/DashboardPage";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import OverviewPage from "./pages/OverviewPage";
import HabitsPage from "./pages/HabitsPage"
import ProgressPage from "./pages/ProgressPage";
import ReminderPage from "./pages/ReminderPage";
import ShareHabitPage from "./pages/ShareHabitPage";
import AIRecommendationsPage from "./pages/AIRecommendationsPage"
import { HabitProvider } from "./context/HabitContext";
import { AuthProvider } from "./context/AuthContext";
import {ToastContainer} from  'react-toastify';
import AuthForm from "./pages/AuthForm";
import axios from "axios";
import ProtectedRoute from "./components/common/ProtectedRoute";

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider>
    <HabitProvider>
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition={"Bounce"}
        />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <LandingPage />
            </Layout>
          }
        />
        <Route
          path="/auth"
          element={
            <Layout>
              <AuthForm />
            </Layout>
          }
        />
        {/* Dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <OverviewPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/overview"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <OverviewPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/habits"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <HabitsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/progress"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProgressPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/reminder"
          element={
            <ProtectedRoute>
            <DashboardLayout>
              <ReminderPage />
            </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/share-habit"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ShareHabitPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/ai-recommendations"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AIRecommendationsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    </HabitProvider>
    </AuthProvider>
  );
}

export default App;
