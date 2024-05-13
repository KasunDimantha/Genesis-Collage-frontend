import React from 'react'
import { FaSearch } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useLogout } from "../../../hooks/useLogout";
import { useAuthContext } from "../../../hooks/useAuthContext";
import  edume  from "./a_img/EDUME.jpeg"

function A_Header() {
    const {logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    const handleclickDashbord = () => {
        localStorage.removeItem("courseid")
        localStorage.removeItem("semesterid")
    }

  return (
    <div className='sticky top-0 z-10'>
      <div className="flex 
                        justify-between 
                        items-center 
                        bg-[#1a3457] 
                        pt-4 pr-20 pb-3 pl-20
                        max-sm:pl-2
                        max-sm:pb-8
                        max-sm:pr-2
                        max-md:pl-4
                        max-md:pb-8
                        max-md:pr-6
                        max-lg:pl-10
                        max-lg:pr-10 ">
                <div  onClick={handleclickDashbord}
                    className="font-sans text-white">
                    <Link to="/a_dashbord">
                        <img    src={edume} 
                                alt="Edume Logo"
                                className='w-20' />
                        <h3 
                                                className="text-2xl
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
                    <div>
                        {user && (
                            <span>{user.username}</span>
                        )}
                    </div>
                    <div className="font-sans text-white">
                        <Link to="/signInPage">
                            <button onClick={handleClick} className='cursor-pointer pl-6'>LogOut</button>
                        </Link>
                    </div>
                    
                </div>
            </div>
            
    </div>
  )
}

export default A_Header
