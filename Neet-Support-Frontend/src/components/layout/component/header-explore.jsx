import React, { useState } from "react";
import { Link } from "react-router-dom";
export const HeaderExplore = ({ allClasses }) => {
  const [exploreActive, setExploreActive] = useState(false);
  return (
    <>
      <div className={`${allClasses ? allClasses : ""}`}>
        <Link
          to="http://localhost:3000/"
          // onClick={() => setExploreActive((pre) => !pre)}
          className="d-flex items-center"
          data-el-toggle=".js-explore-toggle"
        >
          <i className="icon icon-explore mr-15"></i>
          Blogs
        </Link>

        <div
          className={`explore-content py-25 rounded-8 bg-white toggle-element js-explore-toggle ${
            exploreActive ? "-is-el-visible" : ""
          }`}
        ></div>
      </div>
    </>
  );
};
