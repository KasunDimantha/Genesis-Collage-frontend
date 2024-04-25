import poto1 from "./s_img/hand.jpg";
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useWorkoutsContext } from '../../../hooks/useWorkoutContext';
import { useAuthContext } from '../../../hooks/useAuthContext';

function S_LoadModule() {

    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext()
  

    useEffect(async () => {
        const getSemesterId = localStorage.getItem('semesterid')

        const response = await axios.get(`http://localhost:3002/Module/semester/${getSemesterId}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        
    })

    const handleLocalStorage = () => {
        localStorage.removeItem('semesterid')
    }
  return (
    <div>
        <div className='h-100'>
            <img src={poto1} alt="poto1" className="h-h100 w-w100% " />
        </div>
        <div  className=" justify-around absolute top-36 left-64 w-2/3">
            <h1>kasun</h1>
            <Link to='/s_dashbord/s_entrolledCouecesPage'><button onClick={handleLocalStorage}>Back</button></Link>
        
        </div>
    </div>
  )
}

export default S_LoadModule
