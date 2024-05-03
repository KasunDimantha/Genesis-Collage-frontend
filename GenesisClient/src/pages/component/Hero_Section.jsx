import React from 'react';
import heroimg from './img/freepik-export-20240502133308v9GK.jpeg';

function Hero_Section() {
  return (
    <section className="relative h-screen">
      {/* Background Image */}
      <img src={heroimg} alt="heroimg" className="h-full w-full object-cover" />

      {/* Overlay with Gradient */}
      <div className="absolute inset-0">
        <div className="h-full w-full bg-gradient-to-b from-white via-white to-transparent opacity-65"></div>
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col  items-center text-center mt-52">
        {/* Content */}
        <div className="relative z-10">
          <h2 className=" text-4xl font-bold mb-4 text-sky-900">Where your career future begins!!!</h2>
          <h1 className=' text-yellow-600 font-semibold text-xl mb-6'>Find Your Preferred Courses & Improve Your Skills</h1>
          <button className="text-base bg-[#333333] px-5 py-3 rounded-xl border-none text-white font-bold cursor-pointer">Explore More!</button>
        </div>
      </div>
    </section>
  );
}

export default Hero_Section;
