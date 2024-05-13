import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import pay from "./a_img/pay.png";

function A_Footer() {
  return (
    <div>
      <div className="grid grid-cols-4 gap-8 bg-[#3462a3] pl-16 pt-9 pr-5 pb-5 relative
                      max-sm:grid-cols-1
                      max-sm:text-sm
                      max-lg:grid-cols-2
                       ">

        <div className="text-white font-sans">
          <h5 className="text-white font-sans text-base">Do you Need Any help?</h5>
          <p className="pt-1">Contact us through </p>
          <p className="pt-1">(+94) 77 488 0013</p>
        </div>

        <div className="text-white font-sans">
          <h5 className="text-white font-sans text-base">Information</h5>
          <p>Carriers</p>
          <p>Payment</p>
          <p>Rate us</p>
        </div>

        <div className="text-white font-sans">
          <h4>Get In Touch</h4>
          <div className="flex ">
            <p className="pr-2 pt-2 text-base cursor-pointer"><FaWhatsappSquare /></p>
            <p className="pr-2 pt-2 text-base cursor-pointer"><FaFacebook /></p>
            <p className="pr-2 pt-2 text-base cursor-pointer"><FaTwitterSquare /></p>
            <p className="pr-2 pt-2 text-base cursor-pointer"><FaLinkedin /></p>
            <p className="pr-2 pt-2 text-base cursor-pointer"><FaYoutube /></p>
          </div>
        </div>

        <div>
          <h4 className="text-white">Pay Via</h4>
          <img src={pay} alt="payment" className="h-h25" />
        </div>

      </div>
      <div className="flex justify-center text-white bg-black pt-1 pb-1 ">
        <p>@Edume International Institute</p>
      </div>
    </div>
  )
}

export default A_Footer
