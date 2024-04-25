import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useWorkoutsContext } from '../../../hooks/useWorkoutContext';
import { useAuthContext } from '../../../hooks/useAuthContext';

function S_ViewModule() {

    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext()

    const [moduleID, setModuleID] = useState()
    const [activeTab, setActiveTab] = useState('Notes');

    useEffect(() => {
        const id = localStorage.getItem("moduleID")
        setModuleID(id)
    })

    const getAnouncement = async () => {
        try {
          
          const response = await axios.get(`http://localhost:3002/Anouncement/students/module/${moduleID}`,  {
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

    const handleTabClickNote = () => {
        setActiveTab('Note');
    }

    const handleTabClickAnouncement = () => {
        setActiveTab('Announcements');
        getAnouncement()
    }

    const handleBackButton = () => {
        localStorage.removeItem("moduleID")
    }
  return (
    <div className='min-h-96'>
        <div className='mt-16'>

        <div className="bg-gray-300 p-3 my-2 flex">
            <button 
                className='text-gray-700 font-semibold hover:text-white py-1 px-2 border border-gray-500 hover:border-transparent mr-3 hover:bg-gray-500 rounded-lg'
                onClick={handleBackButton}><Link to='/s_dashbord/s_accessCourcesPage'>Back</Link></button>
            <h1 className="font-semibold text-2xl ml-20">{activeTab}</h1>
        </div>

        <div className="flex justify-end">
            <button
            className={`mr-2 px-4 py-2 focus:outline-none ${activeTab === 'tab2' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={handleTabClickNote}
            >
                Notes
            </button>

            <button
            className={`mr-2 px-4 py-2 focus:outline-none ${activeTab === 'tab1' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={handleTabClickAnouncement}
            >
            Announcements
            </button>
            
        </div>

        {activeTab === 'Notes' && 
            <div>
                <h1 className="text-2xl font-semibold mb-4">Notes</h1>
            </div>
        }

        {activeTab === 'Announcements' && 
            <div className='mt-10'>
                <div class="grid grid-cols-1 divide-y">
                    {workouts && workouts.map((row) => (
                        <div key={row._id} className='bg-gray-100 p-4 rounded-sm'>
                          <div className='p-3 text-xs'>:- {row.author_name}</div>
                          <div className='p-3'>{row.massage}</div>
                        </div>
                          
                        
                      ))
                    }
                </div>
            </div>
        }
        </div>
    </div>
   
  )
}

export default S_ViewModule
