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
    <div>
        <div className="min-h-h100 ml-24 mb-10 w-2/3 mt-5">
            <Link to='/a_dashbord/a_StudentAtendencePag'>
                <button className="rounded-md bg-[#333333] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#333333]">
                    Back
                </button>
            </Link>
            <div>
                <div className='flex justify-between'>
                    <div className="border-2 m-15 p-8 rounded-lg mt-10">
                        <h1 className='bg-slate-400 text-lg font-bold pl-4 rounded-md'>Student Details</h1>

                        <div className='flex pt-4'>
                            <h3 className=''>Student Name  </h3>
                            <a className='ml-14'>: {studentData.username}</a>
                        </div>
                        <div className='flex pt-4'>
                            <h3 className='mr-2'>Registration number </h3>
                            <a>: {studentData.stu_number}</a>
                        </div>
                        <div className='flex pt-4'>
                            <h3 className='mr-14'>Student Email  </h3>
                            <a>: {studentData.email}</a>
                        </div>
                        <div className='flex pt-4'>
                            <h3 className='mr-12'>Student Phone  </h3>
                            <a>: {studentData.con_number}</a>
                        </div>
                        <div className='flex pt-4'>
                            <h3 className='mr-9'>Student Address  </h3>
                            <a>: {studentData.address}</a>
                        </div>
                        <div className='flex pt-4'>
                            <h3 className='mr-10'>Student Course  </h3>
                            <a>: {studentData.stu_course}</a>
                        </div>
                    </div>

                    <div>
                        <form onSubmit={handleSubmitPayment} className="border-2 m-15 mt-10 p-8 mx-32 rounded-lg">
                            <div class="sm:col-span-4">
                                <label class="block text-sm font-medium leading-6 text-gray-900">Payment Date</label>
                                <div class="mt-2">
                                    <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">                       
                                    <input 
                                        type="date" 
                                        name="name"  
                                        class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
                                        placeholder="date"
                                        onChange={(e) => setpDate(e.target.value)}>
                                    </input>
                                    </div>
                                </div>
                            </div>

                            <div class="sm:col-span-4">
                                <label class="block text-sm font-medium leading-6 text-gray-900">Payment Amount</label>
                                <div class="mt-2">
                                    <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">                       
                                    <input 
                                        type="number" 
                                        name="payment"  
                                        class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
                                        placeholder="Payment amount"
                                        onChange={(e) => setpAmount(e.target.value)}>
                                    </input>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type='submit' className="rounded-md bg-[#333333] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#333333]">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className='mt-16'>
                <button
                    className={`mr-2 px-4 py-2 focus:outline-none ${activeTab === 'Atendence' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => handleTabClickAtendence('Atendence')}>
                    Atendence
                </button>

                <button
                    className={`mr-2 px-4 py-2 focus:outline-none ${activeTab === 'Payments' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => handleTabClickPayments('Payments')}>
                    Payments
                </button>
            </div>

            <div>
                {activeTab === 'Atendence' && 
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">No.</th>
                                    <th className="py-2 px-4 border-b">Attend Date</th>
                                    <th className="py-2 px-4 border-b">Attend Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendenceDate && attendenceDate.map((attend) => (
                                    <tr key={attend._id}>
                                        <td className="py-2 px-4 border-b">{count++}.</td>
                                        <td className="py-2 px-4 border-b">{attend.attend_date}</td>
                                        <td className="py-2 px-4 border-b">{attend.attend_time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }

                {activeTab === 'Payments' &&
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">No.</th>
                                    <th className="py-2 px-4 border-b">Payment Date</th>
                                    <th className="py-2 px-4 border-b">Payment Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentData && paymentData.map((payment) => (
                                    <tr key={payment._id}>
                                        <td className="py-2 px-4 border-b">{count++}.</td>
                                        <td className="py-2 px-4 border-b">{payment.payment_date}</td>
                                        <td className="py-2 px-4 border-b">{payment.course_fees}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default A_StudentPayment
