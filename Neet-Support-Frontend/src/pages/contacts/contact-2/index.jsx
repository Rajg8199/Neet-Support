import Faq from "@/components/common/Faq";
import Preloader from "@/components/common/Preloader";

import ContactTwo from "@/components/contacts/ContactTwo";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Contact Us",
  description:
    "Buildings Dreams, Building Futures",
};

export default function ContactPage2() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <ContactTwo />
        <Faq />

        <FooterOne />
      </div>
    </div>
  );
}
