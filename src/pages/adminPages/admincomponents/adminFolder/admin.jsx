import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Bookings from "../bookingFolder/bookings";
import Categories from "../categoryFolder/categories";
import Rooms from "../roomsFolder/rooms";
import Users from "../usersFolder/users";
import Feedback from "../feedbackFolder/feedback";
import Gallery from "../galleryFolder/gallery";
import { FaBookmark, FaClipboardList, FaBed, FaUsers, FaComments, FaImage } from "react-icons/fa";

export default function AdminPage() {
  return (
    <div className="flex">
      
      <div className="w-[30vh] h-[100vh] bg-[#7E60BF] text-[#FEF9F2] flex flex-col py-10 px-4 shadow-lg fixed">
        <div className="mb-8 text-3xl font-bold text-center">Admin Panel</div>
        <div className="flex flex-col space-y-6">
          <Link
            to="bookings"
            className="flex items-center text-2xl hover:text-[#E4B1F0] transition-colors duration-300"
          >
            <FaClipboardList className="mr-2" />
            Bookings
          </Link>
          <Link
            to="categories"
            className="flex items-center text-2xl hover:text-[#E4B1F0] transition-colors duration-300"
          >
            <FaBookmark className="mr-2" />
            Categories
          </Link>
          <Link
            to="rooms"
            className="flex items-center text-2xl hover:text-[#E4B1F0] transition-colors duration-300"
          >
            <FaBed className="mr-2" />
            Rooms
          </Link>
          <Link
            to="users"
            className="flex items-center text-2xl hover:text-[#E4B1F0] transition-colors duration-300"
          >
            <FaUsers className="mr-2" />
            Users
          </Link>
          <Link
            to="feedback"
            className="flex items-center text-2xl hover:text-[#E4B1F0] transition-colors duration-300"
          >
            <FaComments className="mr-2" />
            Feedback
          </Link>
          <Link
            to="gallery"
            className="flex items-center text-2xl hover:text-[#E4B1F0] transition-colors duration-300"
          >
            <FaImage className="mr-2" />
            Gallery Items
          </Link>
        </div>
      </div>

      <div className="flex-1 bg-[#FEF9F2] p-10 ml-[30vh]">
        <h1 className="text-4xl font-bold text-[#7E60BF]">Admin Dashboard</h1>
        <p className="mt-4 text-lg text-[#7E60BF]">
          Manage bookings, rooms, categories, and more.
        </p>
        <hr className="my-8 border-t-2 border-[#7E60BF]" />
        <Routes>
          <Route path="bookings" element={<Bookings />} />
          <Route path="categories" element={<Categories />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="users" element={<Users />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="gallery" element={<Gallery />} />
        </Routes>
      </div>
    </div>
  );
}
