import React, { useState, useEffect } from "react";
import poto1 from "./s_img/hand.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import { useWorkoutsContext } from "../../../hooks/useWorkoutContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import S_ModuleDetails from "./S_ModuleDetails";

function S_AccessCources() {

  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext()
  const [modules, setModules] = useState(
    []
  );

  const getData = async () => {
    try {
      
      const response = await axios.get(`http://localhost:3002/Student/${user._id}`,  {
          headers: {
              'Authorization': `Bearer ${user.token}`
          }
        });

        if (response.status === 200) {

          getModule(response.data[0].course.course_id)
          
          
        }

    } catch (error) {
      console.log(error)
    }
  }

 

  const getModule = async (module) => {
    console.log( " module = " + module)

    const response = await axios.get(`http://localhost:3002/Module/course/${module}`,  {
          headers: {
              'Authorization': `Bearer ${user.token}`
          }
        });
        console.log(response.data)

        if (response.status === 200) {
          //setModules(response.data)
          dispatch({ type: 'SET_WORKOUTS', payload: response.data });
        }
  }

  console.log("kasun")
  console.log(workouts)


  useEffect(() => {
    getData();
    
  }, [dispatch, user]);

  const handleCourseid = (id) => {
    
    localStorage.setItem("moduleID", id)
  }

 

  return (
    <div>
      <div className='h-100'>
        <img src={poto1} alt="poto1" className="h-h100 w-w100% " />
      </div>

        
          <div>
            <div  className=" -mt-top bottom-20 absolute jobContainer flex gap-10 justify-center flex-wrap items-center py-10">
      
              {workouts && workouts.map((data) => (
                <div key={data._id} className='group group/item singleJob w-[250px] p-[15px] rounded-[10px] shadow-lg shadow-greyIsh-400/700 bg-[#94e0f7] hover:shadow-lg hover:bg-[#3260b5e5] '>
                                        
                                        
                    <p className='text-md font-bold  pt-[20px] border-t-[2px] mt-[20px] group-hover:text-white'>
                        {data.module_id}
                    </p>

                    <div className='company flex items-center gap-2'>
                        <span className='text-[14px] py-[1rem] block  group-hover:text-white'>{data.module_name}</span>
                    </div>
                    <div className='company flex items-center gap-2'>
                        <p className='text-[14px] py-[1rem] block  group-hover:text-white'>{/*data.course_description.course_duration*/}</p>
                    </div>

                    <button 
                        className=' border-[3px] rounded-[10px] block p-[10px] w-full text-[14px] font-semibold bg-white text-textColor group-hover/item:text-textColor group-hover:text-black'>
                            <span onClick={() => handleCourseid(data.module_id)} class="cursor-pointer mr-2" >
                                    <Link to='/s_dashbord/s_viewmodulepage'>More Details..</Link>
                            </span>
                    </button>

                </div>
              ))

              }
            </div>
          </div>
        
        
    </div>
  )
}

export default S_AccessCources
