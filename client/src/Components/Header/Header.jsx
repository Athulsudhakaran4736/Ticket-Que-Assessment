import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";
import { RxHamburgerMenu } from "react-icons/rx";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [menuVisible, setMenuVisible] = useState(true);

  const handleChange = async (e) => {
    e.preventDefault();
    await doSignOut();
    navigate("/sign-in");
  };
  return (
    <div className="bg-slate-500 p-4">
      <div className="flex justify-between items-center  p-3">
        <Link to="/">
          <h3 className="font-bold pl-3 text-2xl text-emerald-50">
            Task Management
          </h3>
        </Link>
        <RxHamburgerMenu
          className="hamburger-icon"
          size={30}
          color="white"
          onClick={() => setMenuVisible(!menuVisible)}
        />
        {menuVisible && (
          <ul
            className={`flex gap-16 text-gray-100 nav-side ${
              menuVisible ? "visible" : "hidden"
            }`}
          >
            {isLoggedIn ? (
              <Link to="/home" className="hover:text-sky-400">
                <li>HOME</li>
              </Link>
            ) : (
              ""
            )}
            <Link to="/profile">
              <li className="hover:text-sky-400">PROFILE</li>
            </Link>
            <Link to="/sign-in" onClick={handleChange}>
              <li className="hover:text-sky-400">SIGN OUT</li>
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
}
