import React from "react";
import HeaderFour from "@/components/layout/headers/HeaderFour";
import HeroFour from "@/components/homes/heros/HeroFour";
import Brands from "@/components/common/Brands";

import CategoriesFour from "@/components/homes/categories/CategoriesFour";
import CoursesFour from "@/components/homes/courses/CoursesFour";
import LearningPath from "@/components/homes/LearningPath/LearningPath";

import LandJob from "@/components/homes/landJob/LandJob";
import TestimonialsFour from "@/components/homes/testimonials/TestimonialsFour";
import AchievementsTwo from "@/components/homes/achievements/AchievementsTwo";
import InstractorFour from "@/components/homes/instractors/InstractorFour";
import EventsFour from "@/components/homes/events/EventsFour";
import LearningSelection from "@/components/homes/LearningSelection";
import FooterFour from "@/components/layout/footers/FooterFour";
import Preloader from "@/components/common/Preloader";
import MetaComponent from "@/components/common/MetaComponent";
import NeetScore from "@/components/homes/NeetScore/NeetScore";
import FeaturedCourses from "@/components/homes/courses/FeaturedCourses";
import Faqs from "@/components/homes/faqs/Faqs";
import NEETRankPredictor from "@/components/homes/rankpredication/RankPredict";

const metadata = {
  title: "Neet Support || Building Dreams, Building Future",
  description: "Building Dreams, Building Future",
  keyword:""
};

export default function HomePage4() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="main-content">
        <Preloader />
        <HeaderFour />
      </div>
      <div className="content-wrapper   js-content-wrapper overflow-hidden">
        <HeroFour />
        <Brands />
        <CategoriesFour />
        <CoursesFour />
        <LearningPath />
        
        <NeetScore />
        {/* <FeaturedCourses /> */}
        <LandJob />
        <TestimonialsFour />
        <AchievementsTwo />
        <br />
        <InstractorFour />
        <EventsFour />
        <LearningSelection />
        <NEETRankPredictor />
        {/* <Faqs /> */}
        <br />
        <FooterFour />
      </div>
    </>
  );
}
