import React, { useState } from "react";
import { Button, Modal, Space } from "antd";
import LogoIcons from "../event-list/VectorIcons.png";
import LogoIcons2 from "../event-list/Icon3.png";
import Icon3 from "../event-list/conferenceIcon2.png";
import ViewIcons from "../event-list/View.png";
import { Link } from "react-router-dom";

const Components = ({ title, img, id }) => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      {/* IconItam */}
      <div className=" flex gap-2  p-1 mb-2 ">
        <img src={img} />
        <p className="LogoText">{title}</p>
      </div>

      <div className="CardmySession " style={{ marginBottom: "40px" }}>
        <img
          src={ViewIcons}
          className="Logoimg float-right "
          onClick={() => showModal()}
          alt="LogoIcons"
        />
        <br />
        <div className="mySessionsCard    mt-2 flex md:flex-row gap-1   flex-col ">
          <div className=" w-[100%] py-2 px-2 ">
            <p className=" text-base font-bold text-[#FF9245] ">
              How to fill and choice filling of MCC portal
            </p>
          </div>

          <div className="w-[100%] py-2 px-2 ">
            <p className=" text-sm">Join us for an informative webinar on </p>
          </div>

          <div className="w-[100%] py-2 px-2   mr-3">
            <p className=" font-bold text-base">18 jun 2024 - 10:30 AM</p>
          </div>
        </div>
      </div>

      <Modal
        className="ModalComponent"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={"50%"}
      >
        <Space
          direction="horizontal"
          className="flex gap-3 justify-center items-center py-10"
        >
          <img src={img} alt="LogoIcons " className=" h-7" />
          <p className=" text-[#097F78] text-2xl font-semibold  ">UPcoming</p>
        </Space>
        {[...Array(4)].map((_, i) => (
          <Link to={"https://google.com"} target="_blnk" key={i}>
            {/* <div className="mySessionsCard  items-center  mt-2 flex md:flex-row gap-1   flex-col ">
              <div className=" w-[100%] py-1 px-1 ">
                <p className=" text-sm font-bold text-[#FF9245] ">
                  How to fill and choice filling of MCC portal
                </p>
              </div>

              <div className="w-[100%] py-1 px-1  text-center">
                <p className=" text-sm">
                  Join us for an informative webinar on{" "}
                </p>
              </div>

              <div className="w-[100%] py-1 px-1  text-end  mr-3">
                <p className=" font-bold text-base">18 jun 2024 - 10:30 AM</p>
              </div>
            </div> */}

            <div className="mySessionsCard    mt-2 flex md:flex-row gap-1   flex-col ">
              <div className=" w-[100%] py-2 px-2 ">
                <p className=" text-base font-bold text-[#FF9245] ">
                  How to fill and choice filling of MCC portal
                </p>
              </div>

              <div className="w-[100%] py-2 px-2 ">
                <p className=" text-sm">
                  Join us for an informative webinar on{" "}
                </p>
              </div>

              <div className="w-[100%] py-2 px-2   mr-3">
                <p className=" font-bold text-base">18 jun 2024 - 10:30 AM</p>
              </div>
            </div>
          </Link>
        ))}
      </Modal>
    </>
  );
};

const MySessions = () => {
  return (
    <>
      <div className=" dashboard__main  mt-28    bg-light-4">
        <div>
          <div className=" py-1 flex flex-col justify-center items-center gap-1">
            <h3 className=" font-semibold text-center text-2xl mt-6 ">
              My Sessions
            </h3>
            <p className=" text-[#565656] text-center mt-2">
              Set agendas, progress, and personalized guidance
            </p>
          </div>
          

          <Components img={LogoIcons} id={1} title="Upcoming" />
          <Components img={LogoIcons2} id={2} title="Completed" />
          <Components img={Icon3} id={3} title="Requested" />
        </div>
      </div>
    </>
  );
};

export default MySessions;
