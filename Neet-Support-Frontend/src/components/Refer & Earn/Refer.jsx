import React from "react";
import Book from "./img/Book.png";
import ShareIcon from "./img/Share.png";
import Computer from "./img/Computer.png";
import Money from "./img/Group.png";
import Instagram from "./img/Instagram.png";
import whatsapp from "./img/whatsapp.png";
import FacebookIcon from "./img/Facebook.png";
import Message from "./img/message.png";
import Faq from "../common/Faq";

const ReferEarnComponents = () => {
  const data = [
    {
      name: "Copy Referral Link",
      img: Book,
    },
    {
      name: "Share Your Link",
      img: ShareIcon,
    },
    {
      name: "Your Friend Signs Up",
      img: Computer,
    },
    {
      name: "Earn Rewards",
      img: Money,
    },
  ];
  return (
    <div className=" mt-14 lg:m-0">
      <div className=" flex flex-col justify-center items-center">
        <h3 className=" text-3xl font-semibold">Refer & Earn</h3>
        <p className=" text-base text-[#717171]  text-center  mt-6 mb-4">
          Welcome User! Start referring your friends and earn rewards!
        </p>
      </div>

      <div className="referlink p-2 text-white mt-8">
        <div className="flex justify-center items-center gap-6  flex-wrap p-2">
          <h4 className=" text-2xl text-white  font-semibold ">
            Ready to Earn ₹ 00,000 ?
          </h4>
          <div
            style={{
              backgroundColor: "#FF9244",
              padding: "2px",
              height: "30px",
              borderRadius: "50px",
            }}
          ></div>
          <p className=" text-center mb-6 py-2  p-2">
            Refer a friend and earn their gratitude and cash rewards up to Rs.
            35,000/-
          </p>
        </div>

        <div className="  flex  gap-7 justify-around flex-wrap   m-auto ">
          <div className=" mt-4">
            <p className=" text-base px-8   mb-10 -mt-6 font-semibold">
              Your Unique Referral Link
            </p>
            <div className=" bg-[#209A92]     rounded-3xl gap-4 p-2 text-white flex justify-center items-center ">
              <p className="text-sm font-semibold  w-[260px] px-7 ">
                https://neetsupport.in/referralnhs....
              </p>
              <img
                src={Book}
                className="  p-2 object-center bg-white  w-8 mr-8 rounded-full shadow-md "
                alt=""
              />
            </div>
          </div>
          <div className="  p-2">
          {/* <img src="" alt="" /> */}
            <p className=" font-semibold ">Share with you friends</p>
            <div className=" flex gap-2 p-3 px-10 ">
              <img className="shareboxrefer"  src={Instagram} alt="Books" />
              <img className="shareboxrefer"  src={whatsapp} alt="Books" />
              <img className="shareboxrefer"  src={FacebookIcon} alt="Books" />
              <img className="shareboxrefer"  src={Message} alt="Books" />
            </div>
          </div>
        </div>
      </div>

      <div className="referlink mt-4 flex h-[160px] justify-evenly flex-col p-2">
        <div className="flex justify-evenly py-2 ">
          {data.map((item) => {
            return (
              <div className=" bg-[#f2f2f2]  p-2  rounded-full shadow-xl">
                <img
                  src={item.img}
                  className="object-cover  w-[50px] p-2 m-auto "
                  alt="Books"
                />
              </div>
            );
          })}
        </div>
        <div className=" flex justify-evenly py-2" >
          {data.map((item, index) => {
            return (
              <p className=" text-[8px] lg:text-[16px] mt-10 font-semibold text-white " style={{paddingRight:index === 3 ? '20px':null}} >
                {item.name}
              </p>
            );
          })}
        </div>
      </div>

      <div className="referlink1 p-10 shadow-sm   flex gap-5 flex-wrap flex-col mt-6">
        <div className=" flex gap-4 flex-wrap">
          <p className=" text-2xl text-[#005F59] font-semibold">
            Your Rewards
          </p>
          <div
            style={{ padding: 2, backgroundColor: "orange", width: 2 }}
          ></div>
          <p className=" text-gray-400">
            Check your total earnings and available withdrawal amount
          </p>
        </div>
        <div className=" flex flex-wrap gap-5 justify-evenly p-1 ">
          <div className=" w-[100%] md:w-[150px] items-center shadow-md h-[87px] rounded-lg bg-[#097F78] p-2">
            <p className=" text-center text-white text-2xl font-semibold">12</p>
            <p className=" text-center text-white mt-2">Friend Signs Up</p>
          </div>

          <div className=" w-[100%] md:w-[150px] items-center shadow-md h-[87px] rounded-lg bg-[#097F78] p-2">
            <p className=" text-center text-white text-2xl font-semibold">12</p>
            <p className=" text-center text-white mt-2">Successful Referral</p>
          </div>

          <div className=" w-[100%] md:w-[150px] items-center shadow-md h-[87px] rounded-lg bg-[#097F78] p-2">
            <p className=" text-center text-white text-2xl font-semibold">12</p>
            <p className=" text-center text-white mt-2">Total Earning</p>
          </div>

          <div className="  flex gap-4  justify-around items-center  w-[100%] md:w-[200px] shadow-md h-[87px] rounded-lg bg-[#097F78] p-2">
            <p className=" text-center text-white text-2xl font-semibold">12</p>
            <button className="  bg-orange-400 shadow-md p-2 rounded text-white ">
              Withdrawal Now
            </button>
          </div>
        </div>
      </div>

      <div className="MainRefrelData1 mt-7">
        <h3 className=" text-3xl font-semibold mt-5">
          Your <b className=" text-orange-500">Referral</b> Activity
        </h3>
        <br />
        <div className="MainShowtable">
          <div className="MainShowTableHeading">
            <p>Friend's Name</p>
            <p>Status</p>
            <p>Reward Earned</p>
          </div>
          <div
            style={{
              backgroundColor: "#B7804A",
              padding: 2,
              borderRadius: 10,
              marginTop: "10px",
            }}
          ></div>
          <br />
          <div
            style={{ backgroundColor: "#B7804A", padding: 2, borderRadius: 10 }}
          ></div>
          <br />
          <div
            style={{ backgroundColor: "#B7804A", padding: 2, borderRadius: 10 }}
          ></div>
          <br />
          <div
            style={{ backgroundColor: "#B7804A", padding: 2, borderRadius: 10 }}
          ></div>
          <br />
          <div
            style={{ backgroundColor: "#B7804A", padding: 2, borderRadius: 10 }}
          ></div>
          <br />
          <div
            style={{ backgroundColor: "#B7804A", padding: 2, borderRadius: 10 }}
          ></div>
          <br />
          <div
            style={{ backgroundColor: "#B7804A", padding: 2, borderRadius: 10 }}
          ></div>
          <br />
        </div>
      </div>
      <div className="  bg-white ">
        <Faq />
      </div>
    </div>
  );
};

const ReferEarn = () => {
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <ReferEarnComponents />
      </div>
    </div>
    
  );
};

export default ReferEarn;
