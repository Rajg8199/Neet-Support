import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { schoolAchievement } from "../../../data/achievements";

export default function AchievementsTwo() {
  const getNumericValue = (value) => parseInt(value.replace(/[^0-9]/g, ""), 10);

  return (
    <section className="layout-pt-md layout-pb-md bg-beige-1">
      <div className="container">
        <div className="row y-gap-30">
          {schoolAchievement.map((elm, i) => {
            const { ref, inView } = useInView({
              triggerOnce: true,
              delay: i * 100, // Stagger animations
            });

            return (
              <div key={elm.id} className="col-lg-3 col-sm-6" ref={ref}>
                <div
                  className="counter -type-1"
                  data-aos="fade-left"
                  data-aos-duration={(i + 1) * 400}
                >
                  <div className="counter__number text-dark-1">
                    {inView && (
                      <CountUp end={getNumericValue(elm.title)} duration={2} />
                    )}
                    {elm.title.replace(/[0-9]/g, "")}
                  </div>
                  <div className="counter__title text-light-1">{elm.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}