import React from "react";
import sketch from "../../assets/new/sktech.svg";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0  text-center bg-gradient-to-b from-cyan-100/70">
      <div className="">
        <h1 className="md:text-home-heading-large text-home-heading-small ralative font-bold text-gray-800 max-w-3xl mx-auto">
          Empower your future with the courses designed to
          <span className="text-blue-600"> fit your choice.</span>
        </h1>
        <div className="flex justify-end ">
          <img src={sketch} alt="sketch" />
        </div>
      </div>
      <p className=" text-gray-500 max-w-2xl mx-auto mb-3">
        We bring together world-class instructors,interactive content and a
        supportive community to help you achieve your personal and professional
        goals.
      </p>
      <p className=" text-gray-500 max-w-2xl mx-auto">
        We bring together world-class instructors to help you achieve your
        professional goals
      </p>
      <div className="pt-5">
        <SearchBar />
      </div>
    </div>
  );
};

export default Hero;
