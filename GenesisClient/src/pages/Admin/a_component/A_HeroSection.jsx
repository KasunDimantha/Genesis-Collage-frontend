import React, { useState } from "react";
import A_Admin_Navbar from "./A_Admin_Navbar";
import { Link } from "react-router-dom";


function A_HeroSection() {

    
  return (
    <div className=''>
         
      <div className="min-h-h100 flex">
          <A_Admin_Navbar/>
          <div className="min-h-h100 ml-24 w-2/3 mb-10 
                            max-sm:mt-72
                            max-sm:ml-7
                            max-sm:mr-7
                            max-sm:w-full
                            max-sm:relative
                             ">
            
            
            <div class="">

                <h1 className='font-bold text-lg p-5'></h1>

                <div className="">

                <div className="border-solid border-2 border-[#7d8896] -top-6">
                    <div class="grid grid-cols-2 gap-12 ml-12 mr-12  mt-20 mb-4 max-md:grid-cols-1 ">

                      <Link to='/a_dashbord/a_ScaneStudentPage'><div className="border-solid border-2 border-[#7d8896] pt-2 pb-2 pl-3 pr-3 rounded-lg bg-[#dce0e6] cursor-pointer">Scane Student</div></Link>
                      
                      <Link><div className="border-solid border-2 border-[#7d8896] pt-2 pb-2 pl-3 pr-3 rounded-lg bg-[#dce0e6] cursor-pointer">.....................</div></Link>
                      
                      <Link><div className="border-solid border-2 border-[#7d8896] pt-2 pb-2 pl-3 pr-3 rounded-lg bg-[#dce0e6] cursor-pointer">.....................</div></Link>
                      
                      <Link><div className="border-solid border-2 border-[#7d8896] pt-2 pb-2 pl-3 pr-3 rounded-lg bg-[#dce0e6] cursor-pointer">.....................</div></Link>
                      
                      <Link><div className="border-solid border-2 border-[#7d8896] pt-2 pb-2 pl-3 pr-3 rounded-lg bg-[#dce0e6] cursor-pointer">.....................</div></Link>
                      
                      <Link><div className="border-solid border-2 border-[#7d8896] pt-2 pb-2 pl-3 pr-3 rounded-lg bg-[#dce0e6] cursor-pointer">.....................</div></Link>
                              
                    </div>
                </div>

                </div>


            </div>

          </div>
      </div>
    </div>
  )
}

export default A_HeroSection
