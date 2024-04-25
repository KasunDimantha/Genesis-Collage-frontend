import  { useState } from "react";
import  axios from 'axios';
import { useAuthContext } from "./useAuthContext";
import { json } from "react-router-dom";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();


    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:3002/UserLS/login', {
                email: email,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
            // Check if response status is 200 (OK)
            if (response.status === 200) {
                const user = response.data; // Get user data from response

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

    return { login, isLoading, error }
}