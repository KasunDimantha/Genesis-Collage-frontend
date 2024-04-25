import poto1 from "./s_img/hand.jpg";
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useWorkoutsContext } from '../../../hooks/useWorkoutContext';
import { useAuthContext } from '../../../hooks/useAuthContext';

function S_EntrolledCoueces() {

  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext()

  const [activeTab, setActiveTab] = useState();
  const [courseid, setCourseid] = useState('')

  const handleTabClick = (tab) => {
    setActiveTab(tab);
};

  const getData= async () => {
      try {
          const response = await axios.get(`http://localhost:3002/Student/${user._id}`,  {
          headers: {
                  'Authorization': `Bearer ${user.token}`
              }
          })

          console.log(response.data[0].course.course_id)

          if(response.status === 200) {
            dispatch({type: 'SET_WORKOUTS', payload: response.data})
            setActiveTab('loadCourse')
            setCourseid(response.data[0].course.course_id)
          }
          
          
      
      } catch (error) {
          console.error(error);
      }
  }

  useEffect(() => {
      getData();
  }, [dispatch, user])


  const handlebackButton = () => {
    getData();
    setActiveTab('loadCourse')
  }

  const handleSemesterid = (id) => {
    localStorage.setItem('semesterid', id);
}


  const handleMoveSemester = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/Semester/course/${courseid}`,  {
      headers: {
              'Authorization': `Bearer ${user.token}`
          }
      })

      if(response.status === 200) {
        dispatch({type: 'SET_WORKOUTS', payload: response.data})
      }

    } catch (error) {
        console.error(error);
    }
  }


  return (
    <div>
      <div className='h-100'>
        <img src={poto1} alt="poto1" className="h-h100 w-w100% " />
      </div>

    

      <div>
      { activeTab === 'loadCourse' && 
            <div className=" justify-around absolute top-24 left-64 w-2/3">
                    <div className='jobContainer flex gap-10 justify-center flex-wrap items-center py-10' >

                    { workouts && 
                        workouts.map((data) => (
                    
                        <div key={data._id} className='group group/item singleJob w-[250px] p-[15px] rounded-[10px] shadow-lg shadow-greyIsh-400/700 bg-[#94e0f7] hover:shadow-lg hover:bg-[#3260b5e5] '>
                            
                            <p className='text-md font-bold  pt-[20px] border-t-[2px] mt-[20px] group-hover:text-white'>
                                {data.course.course_name}
                            </p>

                        
                            <div className='company flex items-center gap-2'>
                                <p className='text-[14px] py-[1rem] block  group-hover:text-white'></p>
                            </div>

                            <button 
                              onClick={handleMoveSemester}
                                className=' border-[3px] rounded-[10px] block p-[10px] w-full text-[14px] font-semibold bg-white text-textColor group-hover/item:text-textColor group-hover:text-black'>
                                    <span onClick={() => handleTabClick('loadsemester')} class="cursor-pointer mr-2" >
                                            View Semesters...
                                    </span>
                            </button>

                        </div>
                        ))
                    }


                    </div>

                        
            </div>
        }

        {activeTab === 'loadsemester' &&
          <div className=" justify-around absolute top-24 left-64 w-2/3">
            <button><span onClick={handlebackButton}>back</span></button>
            <table className="w-5/6 bg-white border border-gray-300 m-10">
                    <thead>
                        <tr className='bg-emerald-200'>
                        <th className="py-2 px-4 border-b">Semester Name</th>
                        <th className="py-2 px-4 border-b">Starting Date</th>
                        <th className="py-2 px-4 border-b">Action</th>
                        
                    
                        {/* Add more header columns as needed */}
                        </tr>
                    </thead>
                    <tbody >
                        {workouts && workouts.map((row) => (
                        <tr key={row._id}  className=' hover:bg-blue-300'>
                            <td className="py-2 px-4 text-center border-b">{row.semester_name}</td>
                            <td className="py-2 px-4 text-center border-b">{row.semester_start_date}</td>
                            <td className='text-center'>
                                <Link to='/s_dashbord/s_entrolledCouecesPage/s_loadmodule'>
                                <button 
                                    className=" text-pink-700  font-semibold hover:text-white px-2 rounded-lg border border-pink-500 hover:border-transparent mr-4  hover:bg-pink-500"
                                    onClick={() => {handleSemesterid(row._id)}}>
                                        View
                                </button>
                                </Link>
                                </td>
                            {/* Add more columns as needed */}
                        </tr>
                        ))}
                    </tbody>
                    </table>
          </div>
        }
      </div>
    </div>
  )
}

export default S_EntrolledCoueces
