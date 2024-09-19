import BlogsTwo from "@/components/blogs/BlogsTwo";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Blogs",
  description:
    "Blogs to get Update Youself about NEET UG & PG.",
};

export default function BlogListpage2() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        {/* <PageLinks /> */}
        <BlogsTwo />

        <FooterOne />
      </div>
    </div>
  );
}
