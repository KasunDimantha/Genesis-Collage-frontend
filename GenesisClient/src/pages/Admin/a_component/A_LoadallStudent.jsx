import React, {Component,useState, useEffect, useCallback, useRef } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import A_Admin_Navbar from './A_Admin_Navbar'
import { useWorkoutsContext } from '../../../hooks/useWorkoutContext';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { GiCancel } from "react-icons/gi";
import FormInput from '../../component/formInput';
import QRCode from 'qrcode';
import Webcam from "react-webcam";
import jsPDF from "jspdf";


function A_LoadallStudent() {

    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext()
    const student = "Student";
    let count = 1;

    
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


    const [activeTab, setActiveTab] = useState('loadStudent');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [con_number, setCnumber] = useState('');
    const [role, setRole] = useState("Student");

    const [file, setFile] = useState('');
    const [previewImage, setPreviewImage] = useState('');
  // tab pane handle click
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    

    const [values, setValues] = useState({
        username: '',
        email: '',
        birthday: '',
        studentid: '',
        course: '',
        number:'',
        address: '',
        password: '',
        confirmPassword: ''
      })
    
      const inputs = [
        {
          id:1,
          name:"username",
          type:"text",
          placeholder:"User Name",
          errorMessage: " Username should be 3-16 characters and shouldn't include any special character! ",
          label:"User Name",
          pattern: "^[A-Za-z0-9]{3,16}$",
          required: true
        },
        {
          id:2,
          name:"email",
          type:"text",
          placeholder:"Email",
          errorMessage: "It should be a valid email address! ",
          label:"Email",
          required: true
        },
        {
          id:3,
          name:"birthday",
          type:"date",
          placeholder:"Birthday",
          label:"Birthday"
        },
        {
          id:4,
          name:"studentid",
          type:"text",
          placeholder:"Student Id",
          label:"Student Id"
        },
        {
            id:5,
            name:"course",
            type:"text",
            placeholder:"Student course",
            label:"Student Course"
          },
        {
          id:6,
          name:"number",
          type:"number",
          placeholder:"Phone Number",
          errorMessage: "It isn't a valid phone number",
          label:"Phone Number",
          pattern: "/^\d{1,10}$/",
          required: true
        },
        {
          id:7,
          name:"address",
          type:"text",
          placeholder:"Address",
          label:"Address"
        },
        {
          id:8,
          name:"password",
          type:"password",
          placeholder:"Password",
          errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character! ",
          label:"Password",
          pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
          required: true
        },
        {
          id:9,
          name:"confirmPassword",
          type:"password",
          placeholder:"Confirm Password",
          errorMessage: "Passwords don't match! ",
          label:"Confirm Password",
          pattern: values.password,
          required: true
        }
      ]

      const clickGenerateQrCode = async () => {
        const response = await QRCode.toDataURL(values.email)
        setImageUrl(response)

        generatePdf(response);
      }

      const generatePdf = (qrCodeURL) => {
        var doc = new jsPDF("landscape", "mm", "a4");

        const imageWidth = 80; // Adjust image width as needed
        const imageHeight = 80; // Adjust image height as needed
        const imageX = 20; // X coordinate for the image
        const imageY = 20; // Y coordinate for the image

        doc.addImage(qrCodeURL, "JPEG", imageX, imageY, imageWidth, imageHeight);

        const textX = 30; // X coordinate for the text
        const textY = 100; // Y coordinate for the text
        const fontSize = 12; // Adjust font size as needed
        doc.setFontSize(fontSize);
        doc.text(values.username, textX, textY);
        doc.text(values.email, textX, textY + 10);
        doc.save(`${values.email}.pdf`);

      };
    
      const handleSubmitStudent = async (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('username', values.username)
        formData.append('email', values.email)
        formData.append('birthday', values.birthday)
        formData.append('studentid', values.studentid)
        formData.append('course', values.course)
        formData.append('number', values.number)
        formData.append('address', values.address)
        formData.append('password', values.password)
        formData.append('file', imgSrc)
        formData.append('student', student)
        formData.append('qrcode', imageUrl)
              

        console.log(imgSrc)

        try {
            const response = await axios.post('http://localhost:3002/User/newuser', formData,
            {
                headers: {
                  // 'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${user.token}`
                },
              })

              alert('Student uploaded successfully');

        } catch (error) {
            console.log(error)
        }
 
      }
    
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };

      const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    
        // Read the selected file and set it as the preview image
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      };


      /// QR code generate

      const [imageUrl, setImageUrl] = useState('');

      const generateQrCode = async () => {

        try {
            const response = await QRCode.toDataURL(values.email)
            console.log("kasun = " + response)
            setImageUrl(response)
        } catch (error) {
            console.log(error)
        }
         
    }


    // Take a poto using webcam

    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [mirrored, setMirrored] = useState(false);

    // create a capture function
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);

        console.log(imageSrc)
    }, [webcamRef]);

    const retake = () => {
        setImgSrc(null);
    }

  // search username results
  const [query, setQuery] = useState('');



  return (
    <div>
      <div className=" min-h-screen flex flex-col md:flex-row">

            <A_Admin_Navbar/>

            {  activeTab === 'loadStudent' && 
            <div className="min-h-h100 ml-0 md:ml-24 mb-10 w-full md:w-10/12">

                <div className="bg-gray-300 p-3 mt-6 ">
                    <h1 className="font-semibold text-xl text-center">All Student</h1>
                </div>

                {/* Add button to link addStudent page */}
                <div className="m-3 pr-16 flex justify-end ">
                    <input type="text" 
                            placeholder='Search....' 
                            className='mr-20 pl-3'
                            onChange={(e) => setQuery(e.target.value)}  />
                    <button onClick={() => handleTabClick('addStudent')} className=" text-[#333333] font-semibold hover:text-white py-2 px-4 rounded-lg border border-[#333333] hover:border-transparent mr-3 hover:bg-[#333333]">
                        Add New Student
                    </button>
                    
                </div>

             {/* add table to load All students*/}
                <table className="min-w-full bg-white border border-gray-300 mt-6">
                    <thead>
                        <tr>
                        <th className=" border-b">No.</th>
                            <th className=" border-b text-center">Name</th>
                            <th className=" border-b text-center">Email</th>
                            <th className=" border-b text-center">Con Number</th>
                            <th className=" border-b text-center">Action</th>
                    
                    
                        {/* Add more header columns as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {workouts && workouts.filter(row => row.username.toLowerCase().includes(query)).map((row) => (
                        <tr key={row._id} >
                            <td className="border-b text-center">{count++}.</td>
                            <td className="border-b text-center">{row.username}</td>
                            <td className="border-b  text-center ">{row.email}</td>
                            <td className=" border-b  text-center">{row.con_number}</td>
                            <td className=' border-b  text-center'>
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
                              }}  className=" text-red-700 font-semibold hover:text-white py-1 px-2 rounded-lg border border-red-500 hover:border-transparent  hover:bg-red-500">
                                  Delete
                              </button>
                            </td>
                            
                        </tr>
                        ))}
                    </tbody>
                </table>
                

            </div>
            }

            { activeTab === 'addStudent' &&
                <div className='flex'>
                    <div className='flex justify-center items-center min-h-screen mt-16 mb-10 ml-36'>
                    
                    <form onSubmit={handleSubmitStudent}
                          className="bg-[#36cbe9] pt-4 pb-4 pl-20 pr-20 rounded-md">
    
                        <div className=" flex items-center justify-end gap-x-6 ">
                            <button onClick={() => handleTabClick('loadStudent')} class="text-lg text-red-700 font-semibold leading-6 absolute"><GiCancel /></button>
                        </div>
                        <br />
    
                        <h1 className="bg-[#4d014d] text-center font-bold text-white rounded-lg pt-2 pb-2">Register</h1>
                        {inputs.map((input) => (
                          <FormInput 
                            key={input.id}
                            {...input}
                            value={values[input.name]}
                            onChange={onChange} />
                        ))}
                        {imgSrc ? (
                           <h3>Picture selected</h3>
                        ) : <h3>Take a poto</h3> }
                        
                        <button onClick={clickGenerateQrCode} className="w-max h-9 pl-5 pr-5 text-white rounded-lg font-bold cursor-pointer mt-4 mb-6 bg-[#941594]">Submit</button>
                    </form>
                    
                    </div>
                        
                    <div className='mt-16 ml-10'>
                        

                        {/* Take a poto using webcam */}
                        <div>
                          <div className="container">
                          {imgSrc ? (
                              <img src={imgSrc} alt="webcam" />
                          ) : (
                              <Webcam className=" w-96 rounded-xl" 
                                      ref={webcamRef} 
                                      mirrored={mirrored}
                                      screenshotFormat="image/jpeg"
                                      screenshotQuality={0.8}
                                      />
                          )}

                          <div className="controls">
                              <div>
                                  <input type="checkbox"
                                          checked={mirrored}
                                          onChange={(e) => setMirrored(e.target.checked)}
                                  />
                                  <label>Mirror</label>
                              </div>
                              </div>

                              <div className="btn-container">
                                  {imgSrc ? (
                                      <button className='w-60 text-lg  p-3 border-none bg-[#663399] text-white rounded-md font-bold cursor-pointer' onClick={retake}>Retake</button>
                                  ) : (
                                      <button className=' text-lg w-60  p-3 border-none bg-[#663399] text-white rounded-md font-bold cursor-pointer' onClick={capture}>Capture photo</button>
                                  )}
                                  
                              </div>
                              
                          </div>
                        </div>

                        {/* Qr code generator */}
                        <div>
                          <h1 className='font-bold'>QR Code Generator</h1>
                      
                          {imageUrl ? (
                            <div>
                                <a href={imageUrl} download>
                                    <img src={imageUrl} alt="img"/>
                                </a>
                                <br />
                                <a>click to download image</a>
                            </div>
                          ) : null}
                        </div>
                        
                    </div>
                </div>
                
            }
        </div>
    </div>
  )
}

export default A_LoadallStudent
