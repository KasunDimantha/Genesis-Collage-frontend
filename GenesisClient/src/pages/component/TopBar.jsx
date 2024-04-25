import React from "react"
import { FaSearch } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import edume from "./img/EDUME.jpeg"

function TopBar() {
  return (
    <div>
      <div className="flex 
                        justify-between 
                        items-center 
                        bg-[#1a3457] 
                        pt-4 pr-36 pb-3 pl-36
                        max-sm:pl-2
                        max-sm:pb-12
                        max-sm:pr-2
                        max-md:pl-4
                        max-md:pb-12
                        max-md:pr-6
                        max-lg:pl-10
                        max-lg:pr-10 ">

                <div className="font-sans text-white">
                    <Link to="/">
                        <img    src={edume} 
                                alt="Edume Logo"
                                className="w-20" />
                        <h3 className="text-2xl
                                                max-sm:text-lg
                                                max-lg:text-xl"></h3></Link>
                </div>

                {/*<div className="flex 
                                relative 
                                max-sm:top-16
                                max-sm:left-20 
                                max-sm:absolute 
                                max-sm:items-center
                                max-md:top-16
                                max-md:left-40 
                                max-md:absolute 
                                max-md:items-center">
                    
                    <input type="text" placeholder="search here.." className="h-h29 
                                                                              w-w250 
                                                                              outline-none 
                                                                              rounded-2xl 
                                                                              pl-4 
                                                                              border-none 
                                                                              font-sans
                                                                              max-sm:w-48"/>
                    <button className="w-w29 h-h29 rounded-2xl relative border-none bg-white -left-7 hover:bg-gray-300 active:bg-gray-200 pl-1"><FaSearch/></button>
                </div>*/}

                <div className="items-center
                                max-lg:text-sm">
                    <div>
                        <a className="flex justify-center text-base"><VscAccount/></a>
                    </div>
                    <div className="font-sans text-white">
                        <ul>
                            <Link to="/signInPage" className="cursor-pointer">Login </Link>
                             | 
                            <Link to="/signUpPage" className="cursor-pointer"> SignUp</Link>
                        </ul>
                        <ul> </ul>

                    </div>
                </div>
            </div>
            <div>
                <ul className="flex justify-center  relative h-0 -bottom-6">
                    <li className="mr-16 text-base cursor-pointer text-black "><a className="hover:text-lg hover:underline decoration-1 font-semibold ">Home</a></li>
                    <li className="mr-16 text-base cursor-pointer text-black "><a className="hover:text-lg hover:underline decoration-1 font-semibold ">Programs</a></li>
                    <li className="mr-16 text-base cursor-pointer text-black "><a className="hover:text-lg hover:underline decoration-1 font-semibold ">Support</a></li>
                    <li className="mr-16 text-base cursor-pointer text-black "><a className="hover:text-lg hover:underline decoration-1 font-semibold ">About Us</a></li>
                    <li className="mr-16 text-base cursor-pointer text-black "><a className="hover:text-lg hover:underline decoration-1 font-semibold ">Contact Us</a></li>
                    <Link><li className="mr-16 text-base cursor-pointer text-black "><a className="hover:text-lg hover:underline decoration-1 font-semibold ">Courses</a></li></Link>
                    
                    <li className="mr-16 text-base cursor-pointer text-white "><a className="hover:text-lg hover:underline decoration-1 font-semibold ">Student Manuals</a></li>
                </ul>
            </div>
    </div>
  )
}

export default TopBar
