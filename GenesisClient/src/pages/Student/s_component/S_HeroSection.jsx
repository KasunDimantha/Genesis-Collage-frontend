import React, {useState, useEffect} from "react";
import Sheroimg from "./s_img/RlL3.png";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useWorkoutsContext } from '../../../hooks/useWorkoutContext';
import { useAuthContext } from '../../../hooks/useAuthContext';

function S_HeroSection(props) {

  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext()

  const [activeTab, setActiveTab] = useState(false);
  const [courseID, setCourseID] = useState();


  const getData= async () => {
    try {
        const response = await axios.get(`http://localhost:3002/Student/${user._id}`,  {
        headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        console.log(response.data[0].course.course_entroll)

          setActiveTab(response.data[0].course.course_entroll)

          localStorage.setItem("courseID", response.data[0].course.course_id)
    
    } catch (error) {
        console.error(error);
    }
}

console.log(activeTab)

useEffect(() => {
    getData();
}, [dispatch, user])


  return (
    <div>
      <img src={Sheroimg} alt="heroimg" className="h-h100 w-w100%" />
      


      <div className=" -mt-top bottom-20 h-96 w-w100%">
        <div>
          {activeTab == false && 
            <div className="grid grid-cols-2 gap-12 ml-12 mr-12  mt-20 mb-4 ">
              <Link to="/s_dashbord/s_editProfile"><div className="border-solid border-2 border-[#7d8896] pt-2 pb-2 pl-3 pr-3 rounded-lg bg-[#dce0e6] cursor-pointer">View Student Profile</div></Link>

              <Link to="/s_dashbord/s_paymentPage"><div className="border-solid border-2 border-[#7d8896] pt-2 pb-2 pl-3 pr-3 rounded-lg bg-[#dce0e6] cursor-pointer">Payment</div></Link>
            </div>

          }

          {activeTab == true && 
          <div className="grid grid-cols-2 gap-12 ml-12 mr-12  mt-20 mb-4 ">

            <Link to="/s_dashbord/s_editProfile"><div className="border-solid border-2 border-[#7d8896] pt-2 pb-2 pl-3 pr-3 rounded-lg bg-[#dce0e6] cursor-pointer">View Student Profile</div></Link>

            <Link to="/s_dashbord/s_paymentPage"><div className="border-solid border-2 border-[#7d8896] pt-2 pb-2 pl-3 pr-3 rounded-lg bg-[#dce0e6] cursor-pointer">Payment</div></Link>
            
            <Link to='/s_dashbord/s_entrolledCouecesPage'><div className="border-solid border-2 border-[#7d8896] pt-2 pb-2 pl-3 pr-3 rounded-lg bg-[#dce0e6] cursor-pointer">Entrolling Cources</div></Link>
            
            <Link to='/s_dashbord/s_accessCourcesPage'><div className="border-solid border-2 border-[#7d8896] pt-2 pb-2 pl-3 pr-3 rounded-lg bg-[#dce0e6] cursor-pointer"> Module Teams</div></Link>
            
            <Link to='/s_dashbord/s_assingmentPage'><div className="border-solid border-2 border-[#7d8896] pt-2 pb-2 pl-3 pr-3 rounded-lg bg-[#dce0e6] cursor-pointer">Assignment, Quiz and Task</div></Link>
            
            <Link to='/s_dashbord/s_personalResultPage'><div className="border-solid border-2 border-[#7d8896] pt-2 pb-2 pl-3 pr-3 rounded-lg bg-[#dce0e6] cursor-pointer">Personal Result</div></Link>
            
            <Link to='/s_dashbord/s_announcementsPage'><div className="border-solid border-2 border-[#7d8896] pt-2 pb-2 pl-3 pr-3 rounded-lg bg-[#dce0e6] cursor-pointer">Announcements, Discussion boards and Massaging</div></Link>
            
          </div>

          }
        
        </div>
      </div>
    </div>
  );
}

export default S_HeroSection;
