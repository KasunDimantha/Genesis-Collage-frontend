import React, { useState, useEffect } from "react";
import poto1 from "./s_img/hand.jpg";
import axios from "axios";
import { MdOutlineCancel } from "react-icons/md";
import { useWorkoutsContext } from "../../../hooks/useWorkoutContext";
import { useAuthContext } from "../../../hooks/useAuthContext";


function S_CeditProfile() {
  const [activeTab, setActiveTab] = useState("Table");
  const [name, setFname] = useState();
  const [email, setEmail] = useState();
  const [con_number, setCnumber] = useState();
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext()

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  const getData = async () => {
    try {
      
      const response = await axios.get(`http://localhost:3002/User/${user._id}`,  {
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
        });

        if (response.status === 200) {

          dispatch({ type: "SET_WORKOUTS", payload: response.data})

        }

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getData()
  }, [dispatch, user]);


  const handleSubmit = (e) => {

    try {
      const response = axios.patch(`http://localhost:3002/User/${user._id}`, {
        name, 
        email, 
        con_number
      },  {
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
        });

        if (response.status === 200) {
          dispatch({ type: "UPDATE_WORKOUT", payload: response.data})
        } 

    } catch (error) {
      console.log(error)
    }
   
  };

  return (
    <div>
      <div className="h-h100 ">
        <img src={poto1} alt="poto1" className="h-h100 w-w100% " />

        <div className=" relative -mt-top bottom-20 ">
          {activeTab === "Table" && (
            <div>
              <div className="mt-36 ml-16 bg-slate-300 pt-5 pb-5 pl-5 pr-5 w-w450 rounded-xl">
                {
                  workouts &&
                  workouts.map((user1) => (
                      <div>
                        <p  key={user1._id} className=" bg-slate-400 rounded-lg mt-2 pl-3">
                          Name : {user1.name}
                        </p>
                        <p key={user1._id} className=" bg-slate-400 rounded-lg mt-2 pl-3">
                          Email : {user1.email}
                        </p>
                        <p key={user1._id} className=" bg-slate-400 rounded-lg mt-2 pl-3">
                          Con Number : {user1.con_number}
                        </p>
                        <p key={user1._id} className=" bg-slate-400 rounded-lg mt-2 pl-3">
                          Role : {user1.role}
                        </p>
                      </div>
                    ))
                }
              </div>
              <button
                className="ml-16 mt-20 text-5 border-none cursor-pointer bg-[#125a5ed7] text-white pt-2 pb-2 pl-16 pr-16 rounded-xl"
                onClick={() => handleTabClick("Update")}
              >
                Edit Details
              </button>
            </div>
          )}
          {activeTab === "Update" && (
            <div className="flex justify-center mt-36">
              <div className=" bg-[#c0e1ed] w-64 place-content-center rounded-md">
                <div className="right-0 flex justify-end">
                  <p   onClick={() => handleTabClick("Table")} className="cursor-pointer w-6 text-xl right-0 pr-1 pt-1 hover:text-red-600"><MdOutlineCancel /></p>
                </div>
                

                <form onSubmit={handleSubmit}>

                  <div className="mt-1 pl-8">
                    <p className="font-bold mb-1">Full Name</p>
                    <input
                      type="text"
                      placeholder="Full Name"
                      autoComplete="off"
                      name="name"
                      value={user.name}
                      className="border-non outline-none pt-1 pb-1 pl-2 pr-2 font-sans text-1xl"
                      onChange={(e) => setFname(e.target.value)}
                    />
                  </div>

                  <div className="mt-1 pl-8">
                    <p className="font-bold mb-1">Email</p>
                    <input
                      type="email"
                      placeholder="email"
                      autoComplete="off"
                      name="email"
                      value={user.email}
                      className="border-non outline-none pt-1 pb-1 pl-2 pr-2 font-sans text-1xl"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mt-1 pl-8">
                    <p className="font-bold mb-1">Contact Number</p>
                    <input
                      type="text"
                      placeholder="Contact No"
                      autoComplete="off"
                      name="con_number"
                      value={user.con_number}
                      className="border-non outline-none pt-1 pb-1 pl-2 pr-2 font-sans text-1xl"
                      onChange={(e) => setCnumber(e.target.value)}
                    />
                  </div>

                  <div className="flex mt-4 pl-10 pb-5">
                    <button
                      className="text-5 border-none cursor-pointer bg-[#125a5ed7] text-white pt-2 pb-2 pl-16 pr-16 rounded-xl"
                    >
                      Update
                    </button>
                  </div>

                </form>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default S_CeditProfile;
