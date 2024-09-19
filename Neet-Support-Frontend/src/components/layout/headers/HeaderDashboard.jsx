import React, { useEffect, useState } from "react";
import { sidebarItems } from "../../../data/homeSidebarItems";
import { notifications } from "@/data/notifications";
import MyCourses from "../component/MyCourses";
import { Link } from "react-router-dom";


export default function HeaderDashboard() {
  const [messageOpen, setMessageOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [isfullScreen, setIsfullScreen] = useState(false);
  const [isOnNotification, setIsOnNotification] = useState(false);
  const [isOnProfile, setIsOnProfile] = useState(false);

  const [documentElement, setDocumentElement] = useState();
  const handleFullScreenToggle = () => {
    setIsfullScreen((pre) => !pre);
    if (!isfullScreen) {
      openFullscreen();
    } else {
      closeFullscreen();
    }
  };

  useEffect(() => {
    setDocumentElement(document.documentElement);
  }, []);
  const openFullscreen = () => {
    if (documentElement?.requestFullscreen) {
      documentElement?.requestFullscreen();
    } else if (documentElement?.webkitRequestFullscreen) {
      /* Safari */
      documentElement?.webkitRequestFullscreen();
    } else if (documentElement?.msRequestFullscreen) {
      /* IE11 */
      documentElement?.msRequestFullscreen();
    }
  };

  const handleDarkmode = () => {
    if (document) {
      document.getElementsByTagName("html")[0].classList.toggle("-dark-mode");
    }
  };

  const closeFullscreen = () => {
    if (document?.exitFullscreen) {
      document?.exitFullscreen();
    } else if (document?.webkitExitFullscreen) {
      /* Safari */
      document?.webkitExitFullscreen();
    } else if (document?.msExitFullscreen) {
      /* IE11 */
      document?.msExitFullscreen();
    }
  };
  const handleResize = () => {};
  useEffect(() => {
    if (window.innerWidth < 990) {
      document
        .getElementById("dashboardOpenClose")
        .classList.add("-is-sidebar-hidden");
    }
    const handleResize = () => {
      if (window.innerWidth < 990) {
        document
          .getElementById("dashboardOpenClose")
          .classList.add("-is-sidebar-hidden");
      }
    };

    // Add event listener to window resize event
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <header className="header -dashboard -dark-bg-dark-1 js-header">
        <div className="header__container px-20 py-10">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="header__explore text-dark-1">
                  <button
                    onClick={() => {
                      document
                        .getElementById("dashboardOpenClose")
                        .classList.toggle("-is-sidebar-hidden");
                    }}
                    className="d-flex items-center js-dashboard-home-9-sidebar-toggle"
                  >
                    <i className="icon -dark-text-white icon-explore"></i>
                  </button>
                </div>

                <div className="header__logo ml-30 md:ml-20 sm:ml-10">
                  <Link data-barba to="/">
                    <img
                      className="-dark-d-none"
                      src="/assets/img/general/logo-dark.svg"
                      alt="logo"
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="text-white d-flex items-center lg:d-none mr-15">
                  <MyCourses />
                </div>
                <div className="d-flex items-center sm:d-none">
                <div className="relative">
                  <a
                    href="/Refer-Earn"
                    className="d-flex items-center text-light-1 ml-20 mr-20 -hover-dshb-header-light"
                    data-el-toggle=".js-courses-toggle"
                    onClick={() => setIsActive((pre) => !pre)}
                  >
                    Refer & Earn
                  </a>
                </div>
                </div>

                <div className="d-flex items-center sm:d-none">
                  <div className="relative">
                    <button
                      onClick={() => handleFullScreenToggle()}
                      className="d-flex text-light-1 items-center justify-center size-50 rounded-16 -hover-dshb-header-light"
                    >
                      <i className="text-24 icon icon-maximize"></i>
                    </button>
                  </div>

                  <div
                    className="relative"
                    onClick={() => setIsOnNotification((pre) => !pre)}
                  >
                    <a
                      href="#"
                      className="d-flex items-center text-light-1 justify-center size-50 rounded-16 -hover-dshb-header-light"
                      data-el-toggle=".js-notif-toggle"
                    >
                      <i className="text-24 icon icon-notification"></i>
                    </a>

                    <div
                      className={`toggle-element js-notif-toggle  ${
                        isOnNotification ? "-is-el-visible" : ""
                      } -`}
                    >
                      <div className="toggle-bottom -notifications bg-white shadow-4 border-light rounded-8 mt-10">
                        <div className="py-30 px-30">
                          <div className="y-gap-40">
                            {notifications.map((elm, i) => (
                              <div
                                key={i}
                                className={`d-flex items-center  ${
                                  i !== 0
                                    ? "border-top-light -dark-border-top-light-5"
                                    : ""
                                } `}
                              >
                                <div className="shrink-0">
                                  <img src={elm.imageSrc} alt="image" />
                                </div>
                                <div className="ml-12">
                                  <h4 className="text-15 lh-1 fw-500 -dark-text-dark-1">
                                    {elm.heading}
                                  </h4>
                                  <div className="text-13 lh-1 mt-10">
                                    {elm.time} Hours Ago
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="relative d-flex items-center ml-10"
                  onClick={() => setIsOnProfile((pre) => !pre)}
                >
                  <a href="#" data-el-toggle=".js-profile-toggle">
                    <img
                      className="size-50"
                      src="/assets/img/misc/user-profile.png"
                      alt="image"
                    />
                  </a>

                  <div
                    className={`toggle-element js-profile-toggle ${
                      isOnProfile ? "-is-el-visible" : ""
                    } -`}
                  >
                    <div className="toggle-bottom -profile bg-white shadow-4 border-light rounded-8 mt-10">
                      <div className="px-30 py-30">
                        <div className="sidebar -dashboard">
                          {sidebarItems.map((elm, i) => (
                            <div
                              key={i}
                              className={`sidebar__item ${
                                elm.id === 1 ? "-is-active -dark-bg-dark-2" : ""
                              }`}
                            >
                              <a
                                href={elm.href}
                                className="d-flex items-center text-17 lh-1 fw-500 sbar__link"
                              >
                                <i className={`${elm.iconClass} `}></i>
                                <span className="sbar__text">{elm.text}</span>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}


