import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const token=localStorage.getItem("token");

  useEffect(
    () => {
    if (token && !isLoaded) {
      axios.get('http://localhost:3000/api/categories',
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
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
    axios.delete("http://localhost:3000/api/categories/" + name,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json"
        }
      }
    )
      .then(() => {
        setIsLoaded(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  

  return (
    <div className="flex justify-center p-10">
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
              className={`${index % 2 === 0 ? 'bg-[#FEF9F2]' : 'bg-[#E4B1F0]'} hover:bg-[#F1E4F6]`}
            >
              <td className="p-4">
                <img src={category.image} alt={category.name} width="50" className="rounded" />
              </td>
              <td className="p-4 font-semibold text-[#7E60BF]">{category.name}</td>
              <td className="p-4 text-[#6A4FA0]">{category.price}</td>
              <td className="p-4">{category.features}</td>
              <td className="p-4">{category.description}</td>
              <td className="p-4">
                <button
                  onClick={
                    () => {
                      deleteCategory(category.name)
                    }
                  }
                  className="px-3 py-1 bg-[#7E60BF] text-white rounded hover:bg-[#6A4FA0] transition duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
