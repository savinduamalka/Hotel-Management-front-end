import React, { useState } from "react";
import "./loginPage.css";
import axios from "axios";


const beachImage ="bg.jpg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        const token = localStorage.getItem("token");
        if (res.data.detailsofuser.type === "admin") {
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
    <div className="relative flex items-center justify-center min-h-screen">
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${beachImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div> {/* Dark overlay for better text visibility */}
      </div>
      <div className="relative z-10 w-full max-w-lg p-10 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-[#2B2B42] mb-4">
          Login to Your Account
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Welcome back to Blue Horizon - Galle! Please enter your details.
        </p>
        <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent transition duration-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-[#4A90E2] text-white font-semibold rounded-lg hover:bg-[#357ABD] transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-[#4A90E2] hover:underline">
            Forgot Password?
          </a>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <a
            href="/signup" // Update the link to your signup page
            className="mt-2 inline-block px-4 py-2 bg-[#4A90E2] text-white font-semibold rounded-lg hover:bg-[#357ABD] transition duration-300"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
