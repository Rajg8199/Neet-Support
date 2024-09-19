import Preloader from "@/components/common/Preloader";
import DashboardOne from "@/components/dashboard/DashboardOne";
import Message from "@/components/counselling/Message";
import Sidebar from "@/components/dashboard/Sidebar";
import HeaderDashboard from "@/components/layout/headers/HeaderDashboard";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import CRouter from "@/components/counselling/CRouter";

const metadata = {
  title: "Counselling",
  description: "Building Dreams, Building Future",
};
export default function DshbMessagesPage() {
  return (
    <div className="barba-container" data-barba="container">
      <MetaComponent meta={metadata} />
      <main className="main-content">
        <Preloader />
        <HeaderDashboard />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <div
            id="dashboardOpenClose"
            className="dashboard -home-9 js-dashboard-home-9"
          >
            <div className="dashboard__sidebar scroll-bar-1">
              <Sidebar />
            </div>
            <CRouter />
          </div>
        </div>
      </main>
    </div>
  );
}
