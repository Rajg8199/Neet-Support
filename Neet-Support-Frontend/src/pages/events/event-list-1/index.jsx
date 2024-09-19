import Preloader from "@/components/common/Preloader";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import HeaderDashboard from "@/components/layout/headers/HeaderDashboard";
import MySessions from "./mySessions";
import FooterNine from "@/components/layout/footers/FooterNine";
import Sidebar from "@/components/dashboard/Sidebar";

const metadata = {
  title:
    "Webinars",
  description:
    "Buildings Dreams, Buildings Future",
};
export default function EventListPage1() {
  return (
    <div className="main-content  ">
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
            <MySessions />
          </div>
        <FooterNine />
        </div>
      </main>
    </div>
  );
}
