import About from "@/components/about/About";
import BecomeInstactor from "@/components/common/BecomeInstactor";
import BacomeStudent from "@/components/common/BecomeStudent";
import Brands from "@/components/common/Brands";
import PageLinks from "@/components/common/PageLinks";
import StepsOne from "@/components/common/StepsOne";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";
import Testimonials from "../../../components/common/Testimonials";
import LearningJourney from "@/components/common/LearningJourney";
import LearningPathSix from "@/components/common/LearningPathSix";
import Preloader from "@/components/common/Preloader";

import MetaComponent from "@/components/common/MetaComponent";
import LearningPath from "@/components/homes/LearningPath/LearningPath";

const metadata = {
  title:
    "About Us",
  description:
    "Buildings Dreams, Buildings Future",
};

export default function AboutPage2() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        {/* <PageLinks /> */}
        <br />

        <About />
        <StepsOne />
        <LearningJourney />
        <Testimonials />

        {/* <LearningPathSix /> */}
        <LearningPath />

        <BecomeInstactor />
        <BacomeStudent />

        <Brands />

        <FooterOne />
      </div>
    </div>
  );
}
