import React, {Component,useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import A_Admin_Navbar from './A_Admin_Navbar'
import { useWorkoutsContext } from '../../../hooks/useWorkoutContext';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { GiCancel } from "react-icons/gi";


function A_LoadallAdmin() {

    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext()
    const admin = "Admin";


    const getData = async () => {
        try {
          
          const response = await axios.get(`http://localhost:3002/User/role${admin}`,  {
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

      const [activeTab, setActiveTab] = useState('loadAdmin');
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [con_number, setCnumber] = useState('');
      const [role, setRole] = useState("Admin");
      const [password, setPassword] = useState(''); 
      let count = 1; 
    // tab pane handle click
      const handleTabClick = (tab) => {
          setActiveTab(tab);
      };
  
      const handleSubmit = async (e) => {
          e.preventDefault()
          alert("Admin Added Successfully")
          
          try {
              const response = await axios.post('http://localhost:3002/User/signup', {
                  name,
                  email,
                  con_number,
                  role,
                  password
              }, {
                  headers: {
                      'Authorization': `Bearer ${user.token}`
                  }
              })
  
              if (response.status === 200) {
      
                  dispatch({ type: "CREATE_WORKOUT", payload: response.data})
        
                }
  
          } catch (error) {
              console.log(error)
          }
  
  
      }
  


  return (
    <div>
      <div className="min-h-h100 flex">

            <A_Admin_Navbar/>

            {  activeTab === 'loadAdmin' && 
            <div className="min-h-h100 ml-24 mb-10 w-2/3">

                <div className="bg-gray-300 p-3">
                    <h1 className="font-semibold text-xl text-center">All Admins</h1>
                </div>

                {/* Add button to link addStudent page */}
                <div className="m-3 pr-16 flex justify-end ">
                    <button onClick={() => handleTabClick('addAdmin')} class=" text-[#333333] font-semibold hover:text-white py-2 px-4 rounded-lg border border-[#333333] hover:border-transparent mr-3 hover:bg-[#333333]">
                        Add New Admin
                    </button>
                    
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
                        {workouts && workouts.map((row) => (
                        <tr key={row._id}>
                            <td className="py-2 px-4 border-b">{count++}.</td>
                            <td className="py-2 px-4 border-b">{row.username}</td>
                            <td className="py-2 px-4 border-b">{row.email}</td>
                            <td className="py-2 px-4 border-b">{row.con_number}</td>
                            <td>
                            
                            <button onClick={async () => {
                                try {
                                    const response = await axios.delete('http://localhost:3002/User/' + row._id,  {
                                      headers: {
                                          'Authorization': `Bearer ${user.token}`
                                        }
                                    });
                        
                                    if (response.status === 200) {
                            
                                        dispatch({ type: "DELETE_WORKOUT", payload: response.data})
                              
                                    }
                        
                                } catch (error) {
                                    console.log(error)
                                }
                            }} class=" text-red-700 font-semibold hover:text-white py-1 px-2 rounded-lg border border-red-500 hover:border-transparent  hover:bg-red-500">
                                Delete
                            </button>
                            </td>
                            {/* Add more columns as needed */}
                        </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            }

            {  activeTab === 'addAdmin' && 
                <div className='min-h-h100 ml-24 mb-10 w-2/3'>
                    
                    <form  onSubmit={handleSubmit}  className="border-2 m-15 p-8 mx-32 mt-7 mb-7">

                    <div class="mt-6 flex items-center justify-end gap-x-6">
                        <button onClick={() => handleTabClick('loadAdmin')} class="text-lg text-red-700  font-semibold leading-6 absolute"><GiCancel /></button>
                    </div>

                        <div class="space-y-12">
                            <div class="border-b border-gray-900/10 pb-12">
                                <h2 class="text-base font-semibold leading-7 text-gray-900">New Admin</h2>
                            

                                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">

                                        <div class="sm:col-span-4">
                                        <label class="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                                        <div class="mt-2">
                                            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">                       
                                            <input 
                                                type="text" 
                                                name="name"  
                                                class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
                                                placeholder="full name"
                                                onChange={(e) => setName(e.target.value)}>

                                            </input>
                                            </div>
                                        </div>
                                        </div>

                                        <div class="sm:col-span-4">
                                        <label class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                        <div class="mt-2">
                                            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">                       
                                            <input 
                                                type="text" 
                                                name="email"  
                                                class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
                                                placeholder="email"
                                                onChange={(e) => setEmail(e.target.value)}>
                                            </input>
                                            </div>
                                        </div>
                                        </div>

                                        <div class="sm:col-span-4">
                                        <label class="block text-sm font-medium leading-6 text-gray-900">Con Number</label>
                                        <div class="mt-2">
                                            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">                       
                                            <input 
                                                type="text" 
                                                name="cnumber"  
                                                class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
                                                placeholder="con number"
                                                onChange={(e) => setCnumber(e.target.value)}>
                                            </input>
                                            </div>
                                        </div>
                                        </div>

                                        <div class="sm:col-span-4">
                                        <label class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                        <div class="mt-2">
                                            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">                       
                                            <input 
                                                type="password" 
                                                name="password"  
                                                class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
                                                placeholder="password"
                                                onChange={(e) => setPassword(e.target.value)}>
                                            </input>
                                            </div>
                                        </div>
                                        </div>

                                </div>
                                    
                                    
                            </div>
                        </div>

                                <div class="mt-6 flex items-center justify-end gap-x-6">
                                        <button type='submit'  class="rounded-md bg-[#333333] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#333333]">Save</button>
                                </div>
                    </form>
                
            </div>
            }
        </div>
    </div>
  )
}

export default A_LoadallAdmin
