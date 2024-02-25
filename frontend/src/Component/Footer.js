import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return ( 
    <div className="bg-black mt-3">
      <h1 className="text-center text-white mt-4 text-2xl">Footer</h1>
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
    </div>
  );
};

export default Footer;