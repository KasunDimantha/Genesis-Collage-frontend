import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { QrReader } from 'react-qr-reader';
import { useWorkoutsContext } from '../../../hooks/useWorkoutContext';
import { useAuthContext } from '../../../hooks/useAuthContext';
import Modal from './Model';
import A_Admin_Navbar from './A_Admin_Navbar';

function A_ScaneStudent() {

    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext()
    
    const [scanResultWebCam, setScanResultWebCam] =  useState(null);
    const [scanResultFile, setScanResultFile] =  useState(null);
    const [studentData, setStudentData] = useState([]);

    const attendDate = new Date().toISOString().slice(0, 10);
    const attendTime = new Date().toLocaleTimeString().slice(0, 5);

    const handleErrorWebCam = (error) => {
        console.log(error)
    }

    const handleScanWebCam = (result) => {
        if (result) {
            setScanResultWebCam(result.text)
            //getScaneData()
        }
    }

    useEffect(() => {
        if (scanResultWebCam) {
            getScaneData() 
            getPaymentData()
        }
        
    }, [scanResultWebCam])

    const getScaneData = async () => {
        const response = await axios.get(`http://localhost:3002/User/email${scanResultWebCam}`,{
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        
        setScanResultFile(response.data[0])

        console.log(response.data[0].filename)
        

    }

    const getPaymentData = async () => {
        try {
            const response1 = await axios.get(`http://localhost:3002/Payment/email${scanResultWebCam}`,{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            setStudentData(response1.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    

  return (
    <div className='min-h-100 flex'>
        <A_Admin_Navbar/>
        <div className='flex justify-center gap-36 mt-10 mb-10'>
            
            <div className='ml-16 min-h-h100 mb-10'>
                <h3 className='font-bold mt-6 mb-6'>Qr Code Scan by Web Cam</h3>
                <QrReader
                    delay={500}
                    style={{width: '100%'}}
                    onError={handleErrorWebCam}
                    onResult={handleScanWebCam}
                    constraints={ {facingMode: 'environment'} }
                    videoConstraints={{ aspectRatio: 1 }}
                    className='w-96 rounded-md bg-slate-400 pl-7 pr-7'
                />
                <div className='mt-8'>
                    <h3 className='font-bold '>Scanned By WebCam Code: </h3>
                    <h3>{scanResultWebCam ? scanResultWebCam : "No QR code scanned"}</h3>
                </div>
                
            </div>

            {scanResultFile ?     
            <div className='mt-6'>
                <img src={scanResultFile.filename} alt="profile" className='w-48 h-48 rounded-full'/>
                <h1 className='mt-5'>Student name           : {scanResultFile.username}</h1>
                <h1 className='mt-5'>Student email          : {scanResultFile.email}</h1>
                <h1 className='mt-5'>Student phone          : {scanResultFile.con_number}</h1>
                <h1 className='mt-5'>Student address        : {scanResultFile.address}</h1>
                <h1 className='mt-5'>Last Payment  Date: {studentData.payment_date}</h1>
                <button 
                    onClick={async () => {
                            try {
                                const response = await axios.post('http://localhost:3002/Atendence/add', {
                                    student_id : scanResultFile._id,
                                    student_name : scanResultFile.username,
                                    student_email : scanResultFile.email,
                                    stu_number : scanResultFile.stu_number,
                                    attend_date : attendDate,
                                    attend_time : attendTime
                                },{
                                    headers: {
                                        'Authorization': `Bearer ${user.token}`
                                    }
                                })
                    
                                if(response.status === 200){
                                    alert("Attendence Marked Successfully")
                                }
                            } catch (error) {
                                console.log(error)
                            }
                        }   
                    }
                    className="rounded-md mt-9 bg-[#333333] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#333333]"
                    >Mark attendence
                </button>
            </div>
            : null}
        </div>
    
    </div>
  )
}

export default A_ScaneStudent
