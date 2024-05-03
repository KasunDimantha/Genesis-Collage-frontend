import React, {Component,useState, useEffect, useCallback, useRef } from 'react'
import A_Admin_Navbar from './A_Admin_Navbar'
import jsPDF from "jspdf";
import { useWorkoutsContext } from '../../../hooks/useWorkoutContext';
import { useAuthContext } from '../../../hooks/useAuthContext';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

function A_StudentAtendence() {

    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext()
    const student = "Student";
    let count = 1;
    let history = useNavigate();

    const getData = async () => {
        try {
          
          const response = await axios.get(`http://localhost:3002/User/role${student}`,  {
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
      }, [dispatch, user]);

      const [query, setQuery] = useState('');
      const [sid, setSid] = useState('');


      const viewStudentAttendence = (id) => {
        
        localStorage.setItem('studentid', id)

        history("/s_dashbord/a_StudentPaymentPage")
      }


  return (
    <div>
        <div className="min-h-100 flex">
            <A_Admin_Navbar/>

            
            <div className="min-h-h100 ml-24 mb-10 w-2/3">
                <div >

                <div className="bg-gray-300 p-3">
                    <h1 className="font-semibold text-xl text-center">All Student</h1>
                </div>

                {/* Add button to link addStudent page */}
                <div className="m-3 w-5/6 flex justify-center ">
                    <input type="text" 
                            placeholder='Search....' 
                            className='block flex-1 border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm sm:leading-6'
                            onChange={(e) => setQuery(e.target.value)}  />
                    
                    
                </div>

                {/* add table to load All students*/}
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">No.</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Con Number</th>
                            <th className="py-2 px-4 border-b">Action</th>
                    
                    
                        {/* Add more header columns as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {workouts && workouts.filter(row => row.username.toLowerCase().includes(query)).map((row) => (
                        <tr key={row._id}>
                            <td className="py-2 px-4 border-b">{count++}.</td>
                            <td className="py-2 px-4 border-b">{row.username}</td>
                            <td className="py-2 px-4 border-b">{row.email}</td>
                            <td className="py-2 px-4 border-b">{row.con_number}</td>
                            <td>
                                <button onClick={() => viewStudentAttendence(row._id)} className=" text-[#333333] font-semibold hover:text-white py-1 px-5 rounded-lg border border-[#333333] hover:border-transparent mr-3 hover:bg-[#333333]">
                                    view
                                </button>
                            </td>
                            
                        </tr>
                        ))}
                    </tbody>
                </table>


                </div>
            </div>
            
 
               
            
        </div>
    </div>
  )
}

export default A_StudentAtendence
