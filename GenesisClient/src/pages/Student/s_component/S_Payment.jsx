import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useWorkoutsContext } from '../../../hooks/useWorkoutContext';

function S_Payment() {

  const { user } = useAuthContext()
  const { workouts, dispatch } = useWorkoutsContext();
  const [email, setEmail] = useState('');
  const [file, setFile] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  // Function to handle file selection
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

  // Form submit handler
  const submitImage = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('student_id', user._id) // Adding name to from user
      formData.append('name', user.name); // Adding name to form user
      formData.append('email', user.email); // Adding email to form user
      formData.append('file', file); // Adding payment slip to form data

      console.log(email, file);

      try {
        await axios.post('http://localhost:3002/Payment/upload', formData, {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${user.token}`
          },
        });
        alert('File uploaded successfully');

        
      } catch (error) {
        console.error('Error uploading file: ', error);
      }
  };

  return (
    <div className='App min-h-screen'>
      <div className='pdf flex justify-center m-16 pt-5 text-lg'>Upload Your Payment Slip</div>
      <form className='formStyle' onSubmit={submitImage}>
        {/* Email input */}
        <div className='col-span-full flex justify-center mb-6'>
          <label htmlFor='cover-email' className='block text-sm font-medium leading-6 text-gray-900'>
            Student email :
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            className='resize title form-control p-1 ml-4 border-2 border-gray-300 rounded-lg'
            placeholder='email'
          />
        </div>

        {/* File upload input */}
        <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 mx-80'>
          <div className='text-center'>
            {/* File upload */}
            <div className='mt-4 flex text-sm leading-6 text-gray-600'>
              <label
                htmlFor='file-upload'
                className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
              >
                <span>Upload a file</span>
                <input
                  onChange={handleFileChange}
                  id='file-upload'
                  name='file-upload'
                  type='file'
                  className='form-control sr-only'
                  accept='image/jpeg, image/png'
                  required
                />
              </label>
              <p className='pl-1'>or drag and drop</p>
            </div>

            {/* Preview image */}
            {previewImage && <img src={previewImage} alt='Preview' className='mt-4 h-40 mx-auto' />}

            <p className='text-xs leading-5 text-gray-600'>pdf, doc up to 10MB</p>
          </div>
        </div>

        {/* Submit button */}
        <div className='col-span-full flex justify-center mb-6'>
          <button type='submit' className='btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8'>
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}

export default S_Payment;
