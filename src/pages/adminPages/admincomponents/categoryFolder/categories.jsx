import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !isLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "api/categories", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setCategories(res.data.categories);
          setIsLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoaded]);

  if (!token) {
    return (
      <a
        href="/login"
        className="bg-[#7E60BF] text-[#FEF9F2] px-4 py-2 rounded hover:bg-[#6A4FA0] transition duration-300"
        style={{ fontSize: "18px" }}
      >
        Login
      </a>
    );
  }

  function deleteCategory(name) {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "api/categories/" + name, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        toast.success("Successfully deleted!");
        setIsLoaded(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handlePlus() {
    navigate("/admin/add-category");
  }

  return (
    <div className="flex justify-center p-10">
      <button
        className="bg-[#7E60BF] w-[60px] h-[60px] rounded-full text-4xl text-white flex justify-center items-center fixed bottom-5 right-5 shadow-lg hover:bg-[#6A4FA0] transition duration-300"
        onClick={handlePlus}
      >
        <IoIosAdd />
      </button>

      <table className="w-4/5 text-center border-collapse rounded-lg shadow-lg overflow-hidden bg-[#F8FAFC]">
        <thead>
          <tr className="bg-[#7E60BF] text-white">
            <th className="p-4">Image</th>
            <th className="p-4">Name</th>
            <th className="p-4">Price</th>
            <th className="p-4">Features</th>
            <th className="p-4">Description</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-[#FEF9F2]" : "bg-[#E4B1F0]"
              } hover:bg-[#F1E4F6]`}
            >
              <td className="p-4">
                <img
                  src={category.image}
                  alt={category.name}
                  width="50"
                  className="rounded"
                />
              </td>
              <td className="p-4 font-semibold text-[#7E60BF]">
                {category.name}
              </td>
              <td className="p-4 text-[#6A4FA0]">{category.price}</td>
              <td className="p-4">{category.features}</td>
              <td className="p-4">{category.description}</td>
              <td className="flex justify-center gap-2 p-4">
                <button
                  onClick={() => deleteCategory(category.name)}
                  className="px-3 py-1 bg-[#7E60BF] text-white rounded hover:bg-[#6A4FA0] transition duration-300 flex items-center"
                >
                  <FaTrash />
                </button>
                <button className="px-3 py-1 bg-[#4F72B2] text-white rounded hover:bg-[#3B5998] transition duration-300 flex items-center">
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
