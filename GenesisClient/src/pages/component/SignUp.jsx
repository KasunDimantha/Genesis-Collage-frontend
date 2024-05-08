import React, { useState } from "react";
import  { useSignup } from "../../hooks/useSignup";
import FormInput from "./formInput";

function SignUp() {

  const [role, setRole] = useState("Admin");
  const { signup, isLoading,  error } = useSignup()
  

 

  const [values, setValues] = useState({
    username: '',
    email: '',
    birthday: '',
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
      placeholder:"UserName",
      errorMessage: " Username should be 3-25 characters and Can use underscore, dash, and spaces ",
      label:"UserName",
      pattern: "([a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*){5,25}",
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
      name:"number",
      type:"number",
      placeholder:"Phone Number",
      errorMessage: "It isn't a valid phone number",
      label:"Phone Number",
      pattern: "/^\d{1,10}$/",
      required: true
    },
    {
      id:5,
      name:"address",
      type:"text",
      placeholder:"Address",
      label:"Address"
    },
    {
      id:6,
      name:"password",
      type:"password",
      placeholder:"Password",
      errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character! ",
      label:"Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true
    },
    {
      id:7,
      name:"confirmPassword",
      type:"password",
      placeholder:"Confirm Password",
      errorMessage: "Passwords don't match! ",
      label:"Confirm Password",
      pattern: values.password,
      required: true
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responce = await signup(
        values.username, 
        values.email,
        values.birthday,
        values.number,
        values.address,
        values.password,
        role)


    } catch (error) {
      console.log(error);
    }
    
    
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  



  return (
    <div>
      <div className='flex justify-center items-center min-h-screen mt-16 mb-10'>
        <form onSubmit={handleSubmit}
              className="bg-[#36cbe9] pt-4 pb-4 pl-20 pr-20 rounded-md">
            <h1 className="bg-[#4d014d] text-center font-bold text-white rounded-lg pt-2 pb-2">Register</h1>
            {inputs.map((input) => (
              <FormInput 
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange} />
            ))}


            <button className="w-max h-9 pl-5 pr-5 text-white rounded-lg font-bold cursor-pointer mt-4 mb-6 bg-[#941594]">Submit</button>
        </form>
        
      </div>
      
    </div>
      
  );
}

export default SignUp
