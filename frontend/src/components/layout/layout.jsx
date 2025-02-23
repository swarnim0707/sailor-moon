import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import moonLogo from '/src/assets/circular_moon_logo.png';
import './global.css';
import menuItems from "./menuList.json";

import Home from "../home/home.jsx";
import FavPhases from '../favouritePhases/favPhases.jsx';


export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  // const navigate = useNavigate(); // For navigation
  // const location = useLocation()
  const [moonClass, setMoonClass] = useState("moonLogo moonLogoHome")
  const [component, setComponent] = useState("Home")

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);
  
  useEffect(() => {
    if(component == "Home") {
      setMoonClass("moonLogo moonLogoHome")
    }
    else if (component == "Favourite Phases") {
      setMoonClass("moonLogo moonLogoTopRight")
    }
  }, [component])

  return (
    <>
      <div ref={menuRef}>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        {menuOpen && (
          <ul className="menu-list">
            {menuItems.items.map((item) => (
              <li key={item.id}>
                <button onClick={() => {
                  setComponent(item.name);
                  setMenuOpen(!menuOpen)
                }}>
                  <b>{item.name}</b>
                </button>
            </li>
            ))}
          </ul>
        )}
      </div>

      <img src={moonLogo} className={moonClass} alt="Moon logo" />
      {(component === "Home") ? (
        <>
          <Home/>
        </>
      ) : (
        <>
          <FavPhases/>
        </>
      )}
    </>
  );
}