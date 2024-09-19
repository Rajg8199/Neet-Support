import Preloader from "@/components/common/Preloader";
import ContactOne from "@/components/contacts/ContactOne";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import HeaderDashboard from "@/components/layout/headers/HeaderDashboard";
import Sidebar from "@/components/dashboard/Sidebar";

const metadata = {
  title:
    "Contact Us",
  description:
    "Buildings Dreams, Building Futures",
};

export default function ContactPage1() {
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
            <ContactOne />
          </div>
          
        </div>
      </main>
    </div>
  );
}
