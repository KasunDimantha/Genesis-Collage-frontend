import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useWorkoutsContext } from '../../../hooks/useWorkoutContext';
import { useAuthContext } from '../../../hooks/useAuthContext';
import axios from 'axios';

function A_StudentPayment() {

    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext()

    const [studentId, setStudentId] = useState('');
    const [studentData, setStudentData] = useState([]);

    useEffect( () => {
        const Sid = localStorage.getItem('studentid');
        
        if(Sid){
            setStudentId(Sid);
        }

        getData();
        getAtendenceData();

        
    },[studentId])

    const getData = async () => {

        try {
            const response = await axios.get(`http://localhost:3002/User/${studentId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            setStudentData(response.data[0])

        } catch (error) {
            console.log(error)
        }
    }

    const [pDate, setpDate] = useState('');
    const [pAmount, setpAmount] = useState('');

    const handleSubmitPayment = async (e) => {
        e.preventDefault();
        postPayment();
    }

    const postPayment = async () => {

        try {
            const responce = await axios.post('http://localhost:3002/Payment/add', {
                studentId, 
                student_name: studentData.username, 
                student_email: studentData.email,
                stu_number: studentData.stu_number, 
                pDate, 
                pAmount
            }, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                  },
            })


            if (responce.status === 200) {
                alert('Payment Added successfully');
                setpDate(null);
                setpAmount(null);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [activeTab, setActiveTab] = useState('Atendence');
    const [paymentData, setPaymentData] = useState([]);
    const [attendenceDate, setAttendenceDate] = useState([]);
    let count = 1;
    // tab pane handle click
    const handleTabClickAtendence = (tab) => {
      setActiveTab(tab);
      getAtendenceData();
    };

    const handleTabClickPayments = (tab) => {
        setActiveTab(tab);
        getPaymentData();
    }

    const getAtendenceData = async () => {
        try {
            const response = await axios.get(`http://localhost:3002/Atendence/getAll${studentId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            console.log(response.data);
            setAttendenceDate(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    const getPaymentData = async () => {
        
        try {
            const response = await axios.get(`http://localhost:3002/Payment/all${studentId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            console.log(response.data);
            setPaymentData(response.data)

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8">
    <div className="mt-5">
        <Link to="/a_dashbord/a_StudentAtendencePag">
            <button className="rounded-md bg-[#333333] text-sm font-semibold text-white px-3 py-2 shadow-sm hover:bg-[#333333] focus:outline-none focus:ring focus:ring-[#333333]">
                Back
            </button>
        </Link>
    </div>

    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="bg-gray-700 text-white text-lg font-semibold py-2 px-4 rounded-md mb-4">Student Details</h1>
            <div className="space-y-4">
                <div className="flex items-center">
                    <h3 className="w-1/3">Student Name:</h3>
                    <p className="">{studentData.username}</p>
                </div>
                <div className="flex items-center">
                    <h3 className="w-1/3">Registration Number:</h3>
                    <p>{studentData.stu_number}</p>
                </div>
                <div className="flex items-center">
                    <h3 className="w-1/3">Student Email:</h3>
                    <p>{studentData.email}</p>
                </div>
                <div className="flex items-center">
                    <h3 className="w-1/3">Student Phone:</h3>
                    <p>{studentData.con_number}</p>
                </div>
                <div className="flex items-center">
                    <h3 className="w-1/3">Student Address:</h3>
                    <p>{studentData.address}</p>
                </div>
                <div className="flex items-center">
                    <h3 className="w-1/3">Student Course:</h3>
                    <p>{studentData.stu_course}</p>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmitPayment}>
                <label className="block text-sm font-medium text-gray-900">Payment Date</label>
                <input
                    type="date"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-400 focus:outline-none sm:text-sm mt-2 py-1"
                    placeholder="Date"
                    onChange={(e) => setpDate(e.target.value)}
                />

                <label className="block mt-4 text-sm font-medium text-gray-900">Payment Amount</label>
                <input
                    type="number"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-400 focus:outline-none sm:text-sm mt-2 py-1"
                    placeholder="Payment Amount"
                    onChange={(e) => setpAmount(e.target.value)}
                />

                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        className="rounded-md bg-[#333333] text-sm font-semibold text-white px-3 py-2 shadow-sm hover:bg-[#333333] focus:outline-none focus:ring focus:ring-[#333333]"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>

    <div className="mt-10">
        <div className="flex justify-end">
            <button
                className={`px-4 py-2 focus:outline-none ${activeTab === 'Atendence' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} mr-3 `}
                onClick={() => handleTabClickAtendence('Atendence')}
            >
                Attendance
            </button>
            <button
                className={`px-4 py-2 focus:outline-none ${activeTab === 'Payments' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} `}
                onClick={() => handleTabClickPayments('Payments')}
            >
                Payments
            </button>
        </div>

        {activeTab === 'Atendence' && (
            <div className="mt-6">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border-b text-left">No.</th>
                            <th className="py-2 px-4 border-b text-left">Attend Date</th>
                            <th className="py-2 px-4 border-b text-left">Attend Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendenceDate.map((attend, index) => (
                            <tr key={attend._id} className="border-b">
                                <td className="py-2 px-4 ">{index + 1}.</td>
                                <td className="py-2 px-4 ">{attend.attend_date}</td>
                                <td className="py-2 px-4 ">{attend.attend_time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}

        {activeTab === 'Payments' && (
            <div className="mt-6">
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b text-left">No.</th>
                        <th className="py-2 px-4 border-b text-left">Payment Date</th>
                        <th className="py-2 px-4 border-b text-left">Payment Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentData.map((payment, index) => (
                        <tr key={payment._id} className="border-b">
                            <td className="py-2 px-4">{index + 1}.</td>
                            <td className="py-2 px-4">{payment.payment_date}</td>
                            <td className="py-2 px-4">Rs {payment.course_fees}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        )}
    </div>
</div>

  )
}

export default A_StudentPayment
