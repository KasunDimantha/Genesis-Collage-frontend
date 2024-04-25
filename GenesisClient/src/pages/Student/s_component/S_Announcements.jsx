import React, { useState, useEffect } from 'react'
import poto1 from "./s_img/hand.jpg";
import axios from 'axios';
import { useWorkoutsContext } from '../../../hooks/useWorkoutContext';
import { useAuthContext } from '../../../hooks/useAuthContext';

function S_Announcements() {

  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext()

  const [courseid, setCourseid] = useState("");

  const getAnouncement = async () => {
    try {
      
      const response = await axios.get(`http://localhost:3002/Anouncement/students/${courseid}`,  {
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
        });

        console.log(response.data)

        if (response.status === 200) {

          dispatch({ type: "SET_WORKOUTS", payload: response.data})

        }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    const id = localStorage.getItem("courseID");
    setCourseid(id);

    getAnouncement()
  }, [dispatch, user]);

  return (
    <div>
      <div className="h-h100">
        <img src={poto1} alt="poto1" className="h-h100 w-w100% " />

        <div className="container relative -mt-top ml-10  min-h-screen ">

          <div className="bg-gray-300 p-3 my-2">
            <h1 className="font-semibold text-2xl">Announcements</h1>
          </div>

          {/* Add tab pane */}
          <div className="flex justify-end">
           
           
          </div>

            {/* Tab pane content */}
              <div className="mt-4">
              <div className="bg-gray-100 p-4">

                {/* divide width */}
                <div class="grid grid-cols-1 divide-y">
                    {workouts && workouts.map((row) => (
                        <div key={row._id}>
                          <div className='p-3 text-xs'>:- {row.author_name}</div>
                          <div className='p-3'>{row.massage}</div>
                        </div>
                          
                        
                      ))
                    }
                </div>
              </div>
            

          </div>
        </div>
      </div>
    </div>
  )
}

export default S_Announcements
