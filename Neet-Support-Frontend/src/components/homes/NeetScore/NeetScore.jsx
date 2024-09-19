import React from "react";

function App() {
  const data = [
    {
      id: 1,
      paragraph:
        "Our expert team at NEET Support is your secret weapon for getting into your dream college!",
      title: "Experienced Team",
      img: '/assets/img/home-4/NeetScore/1.png',
    },
    {
      id: 2,
      paragraph:
        "Our expert team at NEET Support is your secret weapon for getting into your dream college!",
      title: "Experienced Team",
      img: 'assets/img/home-4/NeetScore/2.png',
    },
    {
      id: 3,
      paragraph:
        "Our expert team at NEET Support is your secret weapon for getting into your dream college!",
      title: "Experienced Team",
      img: 'assets/img/home-4/NeetScore/3.png',
    },
    {
      id: 4,
      paragraph:
        "Our expert team at NEET Support is your secret weapon for getting into your dream college!",
      title: "Experienced Team",
      img: 'assets/img/home-4/NeetScore/4.png',
    },
  ];
  return (
    <div className="neet-container ">
      <h1 className=" text-3xl text-center  md:text-4xl p-2 mb-4  font-semibold   ">
        Why we are the<b className=" font-bold text-orange-400 "> "BEST!"</b>
      </h1>
      <div className="neet-row p-3   lg:p-5 gap-8  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {data.map((item, i) => {
          return (
            <>
              <div key={i} className=" flex flex-wrap  rounded-lg py-6 lg:py-10 text-center shadow-xl bg-[#ffab6f] ">
                <img
                  className="object-cover m-auto h-16"
                  src={item.img}
                  alt="Experienced Team Icon"
                />
                <div className=" p-2">
                  <h2 className=" font-semibold text-lg mb-3  text-white">
                    {item.title}
                  </h2>
                  <p className="neet-card-description py-2  text-white ">
                    {item.paragraph}
                  </p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default App;