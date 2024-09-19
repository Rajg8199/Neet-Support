import React, { useState } from "react";

export default function MyCourses() {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="relative">
      <a
        href="#"
        className="d-flex items-center text-light-1 ml-20 -hover-dshb-header-light"
        data-el-toggle=".js-courses-toggle"
        onClick={() => setIsActive((pre) => !pre)}
      >
        Services <i className="text-9 icon-chevron-down ml-10"></i>
      </a>

      <div
        className={`toggle-element js-courses-toggle ${
          isActive ? "-is-el-visible" : ""
        } `}
      >
        <div className="toggle-bottom -courses bg-white -dark-bg-dark-1 shadow-4 border-light rounded-8 mt-20">
          <div className="px-30 py-30">
            
          <h2 className="text-center text-light-6 mb-20 text-3xl font-extrabold current-p"> Current Plan</h2>

          <div>
            <h4 className=" text-light-6 service-explore  font-semibold text-24"><span className="icon-discovery text-[#ff9245] pt-1"></span>Explore</h4>
          </div>

            <div className="mt-20">
              <a
                href="#"
                className="button py-10 -orange-1 text-white col-12 "
              >
                Upgrade Your Plan
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
