/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import DashboardLayout from '@/src/layouts/DashboardLayout';
import Dashboard from '@/src/pages/Dashboard';
import Employees from '@/src/pages/Employees';
import AIInsights from '@/src/pages/AIInsights';
import Attendance from '@/src/pages/Attendance';
import Leave from '@/src/pages/Leave';
import Payroll from '@/src/pages/Payroll';
import Performance from '@/src/pages/Performance';
import OrgChart from '@/src/pages/OrgChart';
import Handbook from '@/src/pages/Handbook';
import Onboarding from '@/src/pages/Onboarding';

export default function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/org-chart" element={<OrgChart />} />
          <Route path="/ai-insights" element={<AIInsights />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/handbook" element={<Handbook />} />
          {/* Fallback for other routes */}
          <Route path="*" element={<div className="flex items-center justify-center h-full text-muted-foreground">Module coming soon...</div>} />
        </Routes>
      </DashboardLayout>
      <Toaster />
    </BrowserRouter>
  );
}


