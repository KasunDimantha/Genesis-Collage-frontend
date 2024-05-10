import './App.css'
import React from "react";
import { BrowserRouter as Router,Route,Routes, Navigate } from 'react-router-dom'
import Home_Page from './pages/Home_Page';
import SignIn_Page from './pages/SignIn_Page';
import SignUp_Page from './pages/SignUp_Page';
import Admin_dashbord from './pages/Admin/Admin_dashbord';
import Courses_Page from './pages/Courses_Page';
import { useAuthContext } from './hooks/useAuthContext';
import A_LoadallAdminPage from './pages/Admin/A_LoadallAdminPage';
import A_LoadallStudentPage from './pages/Admin/A_LoadallStudentPage';
import A_ScaneStudentPage from './pages/Admin/A_ScaneStudentPage';
import A_StudentAtendencePage from './pages/Admin/A_StudentAtendencePage';
import A_StudentPaymentPage from './pages/Admin/A_StudentPaymentPage';



function App() {

  const { user } = useAuthContext();

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/"  element={<Home_Page/>}/>
          {/*<Route exact path='/signUpPage' element={<SignUp_Page/>}/>*/}
          <Route exact path="/signInPage"   element={!user ? <SignIn_Page/> : 
                                                    user.role === "Admin" ? <Navigate to="/a_dashbord"/> :
                                                    user.role === "Student" ? <Navigate to="/s_dashbord"/> :
                                                    <Navigate to="/t_dashbord"/>} />
          <Route exact path="/signUpPage"   element={!user ? <SignUp_Page/> : <Navigate to="/signInPage"/>} />  
          <Route exact path="/coursesPage"  element={<Courses_Page/>} />
          <Route exact path="/a_dashbord"   element={user ? <Admin_dashbord/> : <Navigate to="/signInPage"/>}/>
          <Route exact path='/a_dashbord/a_loadalladminPage'     element={<A_LoadallAdminPage/>}/>
          <Route exact path='/a_dashbord/a_loadallstudentPage'   element={<A_LoadallStudentPage/>}/>
          <Route exact path='/a_dashbord/a_ScaneStudentPage'   element={<A_ScaneStudentPage/>}/>
          <Route exact path='/a_dashbord/a_StudentAtendencePag' element={<A_StudentAtendencePage/>}/>
          <Route exact path="/s_dashbord/a_StudentPaymentPage"   element={<A_StudentPaymentPage/>} />
          
        </Routes>
      </Router>
    </>
  )
}

export default App
