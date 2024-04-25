import React, { useState } from "react";
import signinimg from "./img/photo02.avif";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import img1 from "./img/Facebook.png";
import img2 from "./img/Google.png";
import img3 from "./img/linkedin.png";

function SignIn() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { login, error, isLoading } = useLogin();
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }
  

  return (
   

    <div className="h-h100 text-center">
       
      <img src={signinimg} alt="signinimg" className="h-h100 w-w100%" />

      <div className="flex justify-center absolute w-w90% text-center pl-5 pr-5 top-32 ">
        <div className="text-start font-sans rounded-xl bg-[#ffffff5e] w-w450 h-h500 m-5">
          <h2 className="mt-16 pl-16 font-bold text-xl">Loging Here !!!</h2>
          <p className="mt-10 pl-16 font-bold text-lg">
            Loging Using Social Networks
          </p>
          <div className="flex pl-16">
            <img
              src={img1}
              alt="facebook"
              className="cursor-pointer w-8 h-8 mt-1 mr-3"
            />
            <img src={img2} alt="google" className="cursor-pointer w-12 h-12" />
            <img
              src={img3}
              alt="linedin"
              className="cursor-pointer w-12 h-12"
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mt-10 pl-16">
              <p className="font-bold mb-2">Email</p>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="border-non outline-none pt-1 pb-1 pl-2 pr-2 font-sans text-1xl"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-5 pl-16">
              <p className="font-bold mb-2">Password</p>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="border-non outline-none pt-1 pb-1 pl-2 pr-2 font-sans text-1xl"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center mt-10">
                <button disabled={isLoading} className="text-5 border-none cursor-pointer bg-[#a83030d7] text-white pt-3 pb-3 pl-20 pr-20 rounded-xl">
                  Sign In
                </button>
                {error && <div className="error">{error}</div>}
            </div>
          </form>

        </div>

      </div>
    </div>
  );


}




export default SignIn;
