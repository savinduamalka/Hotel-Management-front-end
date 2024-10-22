import React from 'react';
import Header from '../../components/header/header';

export default function HomePage() {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center w-full h-screen bg-[#7E60BF]">
        <div className="bg-[#FEF9F2] border border-[#E4B1F0] shadow-lg h-[150px] w-[750px] rounded-lg flex justify-evenly items-center mt-[100px] p-6 space-x-6">
          <input
            type="date"
            className="w-[200px] h-[45px] rounded-md border-2 border-[#7E60BF] px-4 text-[#7E60BF] font-semibold"
          />
          <input
            type="date"
            className="w-[200px] h-[45px] rounded-md border-2 border-[#7E60BF] px-4 text-[#7E60BF] font-semibold"
          />
          <select
            className="w-[150px] h-[45px] rounded-md border-2 border-[#7E60BF] bg-white px-4 text-[#7E60BF] font-semibold"
          >
            <option>Luxury</option>
            <option>Normal</option>
            <option>Low</option>
          </select>
          <button className="w-[150px] h-[45px] rounded-md bg-[#7E60BF] text-[#FEF9F2] font-semibold hover:bg-[#E4B1F0] transition duration-300 ease-in-out">
            Book Now
          </button>
        </div>
        <h1 className="text-[#FEF9F2] text-[50px] mt-[50px] font-bold tracking-wide">
          Welcome to Blue Horizon - Galle
        </h1>
      </div>
    </div>
  );
}
