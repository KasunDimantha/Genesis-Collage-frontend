import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useWorkoutsContext } from '../../../hooks/useWorkoutContext';
import { useAuthContext } from '../../../hooks/useAuthContext'; 




function S_MyCourseComponent() {

    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext()

    const [activeTab, setActiveTab] = useState('loadCourse');
    const [courseId, setCourseId] = useState('');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    
    const getData = async () => {
        try {
          const response = await axios.get('http://localhost:3002/Course/',  {
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
        getData()
    }, [dispatch, user])

    const handleTabBack = () => {
        getData()
        setActiveTab('loadCourse');
    }

    const handleCourseid = async (id) => {
        setCourseId(id)

        try {
            const response = await axios.get(`http://localhost:3002/Course/${id}`,  {
                  headers: {
                      'Authorization': `Bearer ${user.token}`
                  }
              }); 
      
              if (response.status === 200) {
      
                dispatch({ type: "SET_WORKOUTS", payload: response.data})
      
              }
              setActiveTab('viewCourse');
      
          } catch (error) {
            console.log("kasun error" )
            console.log(error)
          }
    }

  return (
    <div className='mt-20'>
        {activeTab === 'loadCourse' && 
            <div className='jobContainer flex gap-10 justify-center flex-wrap items-center py-10' >

            { workouts && 
            workouts.map((data) => {
    
            return(
    
                <div key={data._id} className='group group/item singleJob w-[250px] p-[15px] rounded-[10px] shadow-lg shadow-greyIsh-400/700 bg-[#94e0f7] hover:shadow-lg hover:bg-[#3260b5e5] '>
                    
                    
                    <p className='text-md font-bold  pt-[20px] border-t-[2px] mt-[20px] group-hover:text-white'>
                        {data.course_name}
                    </p>
    
                <div className='company flex items-center gap-2'>
                    <span className='text-[14px] py-[1rem] block  group-hover:text-white'>{data.course_category}</span>
                </div>
                <div className='company flex items-center gap-2'>
                    <p className='text-[14px] py-[1rem] block  group-hover:text-white'>{/*data.course_description.course_duration*/}</p>
                </div>
    
                <button 
                    className=' border-[3px] rounded-[10px] block p-[10px] w-full text-[14px] font-semibold bg-white text-textColor group-hover/item:text-textColor group-hover:text-black'>
                        <span onClick={() => handleCourseid(data._id)} class="cursor-pointer mr-2" >
                                More Details..
                        </span>
                </button>
    
                </div>
    
    
                )
            })
            }
    
    
            </div>
        }

        {activeTab === 'viewCourse' &&
            <div>
                <button 
                    onClick={handleTabBack}
                    className='text-zinc-700 font-semibold hover:text-white py-1 px-2 border border-zinc-500 hover:border-transparent mr-3 hover:bg-zinc-500 rounded-lg'>
                        Back
                </button>
                <div>
                    {workouts && workouts.map((data) => (
                        <div key={data._id}>
                            <h3> Course Name: {data.course_name}</h3>
                            <h3> Course Category: {data.course_category}</h3>
                            <h3> Course Duration: {data.course_description.course_duration}</h3>
                            <h3> Course Outcomes : {data.course_description.course_outcomes}</h3>
                            <button 
                                onClick={ async () => {
                                    try {
                                        const response = await axios.post('http://localhost:3002/Student/', {
                                            student_id: user._id,
                                            student_name: user.name,
                                            course_id: courseId,
                                            course_name: data.course_name,
                                        },{
                                        headers: {
                                            'Authorization': `Bearer ${user.token}`
                                        }})
                                         
                                        if(response.status === 200){
                                            alert(`${data.course_name} Course Enrolled Successfully`)
                                            console.log("Course Enrolled Successfully")
                                        }
                                    } catch (error) {
                                        console.log(error)
                                    }
                                }}
                                className='text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent mr-3 hover:bg-blue-500 rounded-lg'>Entroll</button>
                        </div>
                    ))
                        
                    }
                </div>
            </div>

        }
      
    </div>
  )
}

export default S_MyCourseComponent
