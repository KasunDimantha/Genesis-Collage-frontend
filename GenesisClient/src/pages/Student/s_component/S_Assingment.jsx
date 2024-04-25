import React, {useState, useEffect} from 'react'
import poto1 from "./s_img/hand.jpg";
import { useWorkoutsContext } from "../../../hooks/useWorkoutContext";
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useLocation } from 'react-router-dom';

function S_Assingment() {

  const [activeTab, setActiveTab] = useState('Assignment');
  // tab pane handle click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  return (
    <div>
      <div className='h-100'>
        <img src={poto1} alt="poto1" className="h-h100 w-w100% " />

        <div className="container relative -mt-top ml-10   min-h-screen ">

          <div className="bg-gray-300 p-3 my-2">
            <h1 className="font-semibold text-2xl">{activeTab}</h1>
          </div>

          {/* Add tab pane */}
          <div className="flex justify-end">
            <button
              className={`mr-2 px-4 py-2 focus:outline-none ${activeTab === 'Assignment' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => handleTabClick('Assignment')}
            >
              Assignment
            </button>
            <button
              className={`mr-2 px-4 py-2 focus:outline-none ${activeTab === 'Quiz' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => handleTabClick('Quiz')}
            >
              Quiz
            </button>
            <button
              className={`px-4 py-2 focus:outline-none ${activeTab === 'Task' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => handleTabClick('Task')}
            >
              Task
            </button>
          </div>

          {/* Tab pane content */}
          <div className="mt-4">
            {activeTab === 'Assignment' && 
              <div className="bg-gray-100 p-4">
                {/* divide width */}
                <div class="grid grid-cols-1 divide-y">
                  <div className='p-3'>01</div>
                  <div className='p-3'>02</div>
                  <div className='p-3'>03</div>
                </div>
              </div>
            }

            {activeTab === 'Quiz' && 
              <div className="bg-gray-100 p-4">
                Content for Tab 2
              </div>
            }

            {activeTab === 'Task' && 
              <div className="bg-gray-100 p-4">
                Content for
                Tab 3
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default S_Assingment
