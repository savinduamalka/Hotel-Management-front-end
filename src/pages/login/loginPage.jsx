import React, { useState } from "react";
import "./loginPage.css";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault(); // Prevent form submission from reloading the page
    axios
      .post("http://localhost:3000/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        const token = localStorage.getItem("token");
        if(res.data.detailsofuser.type === "admin") {
            window.location.href = "/admin";
          } else {
            window.location.href = "/";
          }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-center bg-cover image">
      <div className="w-[450px] bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-10 shadow-lg">
        <h1 className="text-4xl font-bold text-center text-[#FEF9F2] mb-8">
          Login
        </h1>
        <form className="flex flex-col items-center space-y-5" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 text-[#7E60BF] bg-[#FEF9F2] bg-opacity-80 border border-[#E4B1F0] rounded focus:outline-none focus:ring-2 focus:ring-[#7E60BF] focus:border-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 text-[#7E60BF] bg-[#FEF9F2] bg-opacity-80 border border-[#E4B1F0] rounded focus:outline-none focus:ring-2 focus:ring-[#7E60BF] focus:border-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 bg-[#7E60BF] text-[#FEF9F2] font-semibold rounded hover:bg-[#6A4FA0] transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
