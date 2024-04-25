import React, { useEffect, useState } from "react";
import axios from "axios";

function Courses() {
    
  
  const [activeTab, setActiveTab] = useState("course");


  useEffect(() => {
    axios.get('http://localhost:3002/Course/allcourse')
    .then(result => setData(result.data))
    .catch(error => console.log(error))
  }, [])

  const handleMoreClick = (btn) => {
    setActiveTab(btn);
  };

  return (
    <div>
      <div className="min-h-screen bg-[#c781e3]">
        
        { activeTab === 'course' &&
            <div className="jobContainer pl-10 pt-12   gap-10">
            {data.map((course) => {
                return (
                   
                    
                    <div className=" py-10 ">
                        <div
                            key={course.id}
                            className=" group group/item singleJob w-[250px] p-[15px] rounded-[10px] shadow-lg shadow-greyIsh-400/700 bg-[#81b4e3] hover:shadow-lg hover:bg-[#3260b5e5] "
                        >
                            <p className="text-md font-bold  pt-[20px] border-t-[2px] mt-[20px] group-hover:text-white">
                            {course.cname}
                            </p>

                            <div className="company flex items-center gap-2">
                            <span className="text-[14px] py-[1rem] block  group-hover:text-white">
                                {course.category}
                            </span>
                            </div>

                            <button
                            className=" border-[3px] hover:bg-[#81b4e3] rounded-[10px] block p-[10px] w-full text-[14px] font-semibold bg-white text-textColor
                            group-hover/item:text-textColor group-hover:text-black"
                            onClick={() => handleMoreClick('Detail')}
                            >
                            More Details...
                            </button>
                        </div>

                    </div>
                
                )
            })}
            </div> 
        }
        {
            activeTab === 'Detail' && 
            <div className="pt-32 pl-20">
                <h1>kasun</h1>
                <div className="flex mt-4 pl-10 pb-5">
                  <button 
                    onClick={() => handleMoreClick('course')}
                    className="text-5 border-none cursor-pointer bg-[#125a5ed7] text-white pt-2 pb-2 pl-16 pr-16 rounded-xl">
                    Back To Course
                  </button>
                </div>
            </div>
        }


      </div>
    </div>
  );
}

export default Courses;
