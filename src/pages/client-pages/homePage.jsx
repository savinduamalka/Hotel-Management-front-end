import React from "react";
import Header from "../../components/header/header";
import NavBar from "../../pages/client-pages/navBar";


export default function HomePage() {
  return (
    <div>
      <NavBar />
      <Header />
      
      <div className="flex flex-col items-center w-full h-screen bg-[#FEF9F2]">
        <div className="bg-white border border-[#E4B1F0] shadow-lg h-[180px] w-[750px] rounded-lg flex flex-col justify-evenly items-center mt-[100px] p-6">
          <h2 className="text-[#7E60BF] text-[24px] font-bold">Guest Entry</h2>
          <div className="flex items-center w-full justify-evenly">
            <input
              type="date"
              className="w-[200px] h-[45px] rounded-md border-2 border-[#7E60BF] px-4 text-[#7E60BF] font-semibold"
            />
            <input
              type="date"
              className="w-[200px] h-[45px] rounded-md border-2 border-[#7E60BF] px-4 text-[#7E60BF] font-semibold"
            />
            <input
              type="number"
              placeholder="Guests"
              className="w-[100px] h-[45px] rounded-md border-2 border-[#7E60BF] px-4 text-[#7E60BF] font-semibold"
            />
            <select className="w-[150px] h-[45px] rounded-md border-2 border-[#7E60BF] bg-white px-4 text-[#7E60BF] font-semibold">
              <option>Luxury</option>
              <option>Normal</option>
              <option>Low</option>
            </select>
            <button className="w-[150px] h-[45px] rounded-md bg-[#7E60BF] text-[#FEF9F2] font-semibold hover:bg-[#E4B1F0] transition duration-300 ease-in-out">
              View Rates
            </button>
          </div>
        </div>
        <h1 className="text-[#7E60BF] text-[50px] mt-[50px] font-bold tracking-wide">
          Welcome to Blue Horizon - Galle
        </h1>
        <div className="bg-[#E4B1F0] w-full mt-10 py-8 rounded-lg shadow-lg">
          <h2 className="text-[#7E60BF] text-[32px] font-bold text-center mb-6">
            Explore Our Attractions
          </h2>
          <div className="flex justify-around max-w-6xl mx-auto">
            <div className="bg-white w-[250px] h-[200px] rounded-lg shadow-md flex flex-col items-center justify-center transition-transform transform hover:scale-105">
              <img
                src="https://tripjive.com/wp-content/uploads/2024/10/Galle-beach-tourism-1024x585.jpg"
                alt="Beautiful Beaches"
                className="rounded-t-lg w-full h-[120px] object-cover"
              />
              <h3 className="text-[#7E60BF] font-semibold mt-2">
                Beautiful Beaches
              </h3>
              <p className="text-center p-2 text-[#333]">
                Relax on the stunning shores of Galle.
              </p>
            </div>
            <div className="bg-white w-[250px] h-[200px] rounded-lg shadow-md flex flex-col items-center justify-center transition-transform transform hover:scale-105">
              <img
                src="https://www.travelmapsrilanka.com/destinations/destinationimages/visit-to-galle-fort.jpg"
                alt="Historic Forts"
                className="rounded-t-lg w-full h-[120px] object-cover"
              />
              <h3 className="text-[#7E60BF] font-semibold mt-2">
                Historic Forts
              </h3>
              <p className="text-center p-2 text-[#333]">
                Discover the rich history of Galle Fort.
              </p>
            </div>
            <div className="bg-white w-[250px] h-[200px] rounded-lg shadow-md flex flex-col items-center justify-center transition-transform transform hover:scale-105">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D22AQFK8AoyzFGJqA/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1715534610402?e=2147483647&v=beta&t=B2z2in-u7Z9yRqfzi1AnjNg2KHyBrzNcT7g49_g0Gpk"
                alt="Local Cuisine"
                className="rounded-t-lg w-full h-[120px] object-cover"
              />
              <h3 className="text-[#7E60BF] font-semibold mt-2">
                Local Cuisine
              </h3>
              <p className="text-center p-2 text-[#333]">
                Savor delicious dishes from our local chefs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
