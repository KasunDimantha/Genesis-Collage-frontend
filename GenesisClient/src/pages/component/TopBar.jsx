import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import genesis from "./img/Genesis.jpeg"

function TopBar() {

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
    <div className={`sticky top-0 z-50 ${isScrolled ?  'bg-black bg-opacity-75 h-16 text-white' : ''}`}>
      <div className="flex 
                         justify-between 
                        items-center 
                        bg-[#1a3457] 
                        py-1 px-10
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
                        <img    src={genesis} 
                                alt="Edume Logo"
                                className=" w-20" />
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
                        <a className="flex justify-center text-base text-white"><VscAccount/></a>
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
            
            <div className={`sticky top-0 z-50 ${isScrolled ?  'bg-black bg-opacity-75 h-16 text-white' : ''}`}>
                <ul className="flex justify-center relative h-h0 -bottom-6 font-semibold">
                    <Link to='/'><li className="mr-16 text-base cursor-pointer  "><a className="hover:text-lg hover:underline decoration-1 font-semiboldx ">Home</a></li></Link>
                    <li className="mr-16 text-base cursor-pointer  "><a className="hover:text-lg hover:underline decoration-1 font-semiboldx ">Programs</a></li>
                    <li className="mr-16 text-base cursor-pointer  "><a href="#career" className="hover:text-lg hover:underline decoration-1 font-semiboldx ">Career</a></li>
                    <li className="mr-16 text-base cursor-pointer  "><a href="#about" className="hover:text-lg hover:underline decoration-1 font-semiboldx ">About Us</a></li>
                    <li className="mr-16 text-base cursor-pointer "><a href="#contact" className="hover:text-lg hover:underline decoration-1 font-semiboldx ">Contact Us</a></li>
                    <li className="mr-16 text-base cursor-pointer "><a href="#course" className="hover:text-lg hover:underline decoration-1 font-semiboldx ">Courses</a></li>
                    
                </ul>
            </div>
    </div>
  )
}

export default TopBar
