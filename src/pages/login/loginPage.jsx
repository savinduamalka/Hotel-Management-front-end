import React from 'react'
import './loginPage.css'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-center bg-cover image">
      <div className="w-[550px]  bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-10 shadow-lg">
        <h1 className="text-4xl font-bold text-center text-[#FEF9F2] mb-8">Login</h1>
        <form className="flex flex-col items-center space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 text-[#7E60BF] bg-[#FEF9F2] bg-opacity-80 border border-[#E4B1F0] rounded focus:outline-none focus:ring-2 focus:ring-[#7E60BF] focus:border-transparent"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 text-[#7E60BF] bg-[#FEF9F2] bg-opacity-80 border border-[#E4B1F0] rounded focus:outline-none focus:ring-2 focus:ring-[#7E60BF] focus:border-transparent"
          />
          <button className="w-full py-3 bg-[#7E60BF] text-[#FEF9F2] font-semibold rounded hover:bg-[#6A4FA0] transition duration-300">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
