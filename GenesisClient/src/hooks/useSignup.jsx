import  { useState } from "react";
import  axios from 'axios';
import { useAuthContext } from "./useAuthContext";
import { json } from "react-router-dom";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();


    const signup = async (username, email, birthday, number, address, password, role) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:3002/UserLS/signup', {
                username: username,
                email: email,
                birthday: birthday,
                con_number: number,
                address: address,
                password: password,
                role: role,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response);        
            // Check if response status is 200 (OK)
            if (response.status === 200) {
                const user = response.data; // Get user data from response
                alert("Signup successful!");
                // save the user to local storage
                localStorage.setItem('user', JSON.stringify(user));
          
                // update the auth context
                dispatch({type: 'LOGIN', payload: user});
            }

        } catch (error) {
            setIsLoading(false)
            console.log(json.error)
        } 
    }

    return { signup, isLoading, error }
}