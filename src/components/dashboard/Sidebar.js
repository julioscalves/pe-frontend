import React from "react";

export default function Sidebar() {
    return (
        <nav className="bg-gray-800 w-1/5 p-4 text-white">
          <ul>
            <li className="mb-4">
              <a href="#" className="flex items-center">
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                </svg>
                Dashboard
              </a>
            </li>
          </ul>
        </nav>
      )
}