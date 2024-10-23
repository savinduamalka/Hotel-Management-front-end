import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Bookings from "./admincomponents/bookings";
import Categories from "./admincomponents/categories";
import Rooms from "./admincomponents/rooms";
import Users from "./admincomponents/users";
import Feedback from "./admincomponents/feedback";
import Gallery from "./admincomponents/gallery";

export default function AdminPage() {
  return (
    <div className="flex">
      <div className="w-[30vh] h-[100vh] bg-[#7E60BF] text-[#FEF9F2] flex flex-col py-10 px-4 shadow-lg">
        <div className="mb-8 text-3xl font-bold text-center">Admin Panel</div>
        <div className="flex flex-col space-y-6">
          <Link
            to="bookings"
            className="text-2xl hover:text-[#E4B1F0] transition-colors duration-300"
          >
            Bookings
          </Link>
          <Link
            to="categories"
            className="text-2xl hover:text-[#E4B1F0] transition-colors duration-300"
          >
            Categories
          </Link>
          <Link
            to="rooms"
            className="text-2xl hover:text-[#E4B1F0] transition-colors duration-300"
          >
            Rooms
          </Link>
          <Link
            to="users"
            className="text-2xl hover:text-[#E4B1F0] transition-colors duration-300"
          >
            Users
          </Link>
          <Link
            to="feedback"
            className="text-2xl hover:text-[#E4B1F0] transition-colors duration-300"
          >
            Feedback
          </Link>
          <Link
            to="gallery"
            className="text-2xl hover:text-[#E4B1F0] transition-colors duration-300"
          >
            Gallery Items
          </Link>
        </div>
      </div>

      <div className="flex-1 bg-[#FEF9F2] p-10">
        <h1 className="text-4xl font-bold text-[#7E60BF]">Admin Dashboard</h1>
        <p className="mt-4 text-lg text-[#7E60BF]">
          Manage bookings, rooms, categories, and more.
        </p>
        <hr className="my-8 border-t-2 border-[#7E60BF]" />
        <Routes>
          <Route path="bookings" element={<Bookings />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/users" element={<Users />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </div>
  );
}
