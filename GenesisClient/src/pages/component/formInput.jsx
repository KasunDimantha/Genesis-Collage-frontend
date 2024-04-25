import { useState } from "react";
import "./formInput.css";

const formInput = (props) => {

    const [focused, setForcused] = useState(false);
    const { label, errorMessage, onChange, id, ...inputProps } = props;

    const handleFocus = () => {
        setForcused(true);
    }

    return (
        <div className='flex flex-col w-72'>
            <label>{label}</label>
            <input className="p-2 mt-2 mb-2 rounded-md border-solid border-2 border-gray-300"
                 {...inputProps} 
                    onChange={onChange}  
                    onBlur={handleFocus} 
                    onFocus={() =>
                        inputProps.name === "confirmPassword" && setForcused(true)
                    }
                    focused={focused.toString()}/>
            <span>{errorMessage}</span>
        </div>
    )
}

export default formInput;