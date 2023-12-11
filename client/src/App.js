
import Header from './component/Header';
import Courses from './component/Courses';
import CourseDetail from './component/CourseDetail';
import CreateCourse from './component/CreateCourse';
import UpdateCourse from './component/UpdateCourse';
import UserSignIn from './component/UserSignIn';
import { Routes, Route } from 'react-router-dom';
import ErrorDisplay from './component/ErrorDisplay';
import PrivateRoute from './component/PrivateRoute';
import "./styles/reset.css"
import './styles/global.css';

function App() {
  
  
  return (
    <div >
      <Header/>
      <Routes>
        
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail/>}/>
        <Route path="/signin" element={<UserSignIn />} />
    
{/* 
       
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signout" element={<UserSignOut  />} /> */}

          <Route path="/courses/create" element={<CreateCourse/>} />
          <Route path="/courses/:id/update" element={<UpdateCourse />}/>
        {/* <Route element={<PrivateRoute />}>   
          <Route path="/courses/create" element={<CreateCourse/>} />
          <Route path="/courses/:id/update" element={<UpdateCourse />}/>
        </Route> */}

        {/* <Route path="*" element={<PhotoNotFound />} /> */}
        <Route path="/error" element={<ErrorDisplay />} />
      </Routes>

    </div>
  );
}

export default App;
