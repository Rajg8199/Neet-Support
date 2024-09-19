import Preloader from "@/components/common/Preloader";
import Sidebar from "@/components/dashboard/Sidebar";
import HeaderDashboard from "@/components/layout/headers/HeaderDashboard";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

import CollegeCompare from "@/components/dashboard/Tools/CollegeCompare";

const metadata = {
  title:
    "Cut-Offs",
  description:
    "Building Dreams, Building Future",
};

export default function DshbCollegeCompare() {
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
            
           <CollegeCompare />
          </div>
        </div>
      </main>
    </div>
  );
}
