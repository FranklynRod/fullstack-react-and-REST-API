
import Header from './component/Header'
import Courses from './component/Courses';
import { Routes, Route } from 'react-router-dom';
import "./styles/reset.css"
import './styles/global.css';
import ErrorDisplay from './component/ErrorDisplay';






function App() {
  
  
  return (
    <div >
      <Header/>
      <Courses/>
      <Routes>
        <Route path="/error" element={<ErrorDisplay />} />
        <Route path="/" element={<Courses />} />
        {/* <Route path="/courses/create" element={<CreateCourses/>} />
        <Route path="/courses/:id" element={<CoursesDetail/>}/>
        <Route path="/courses/:id/update" element={<UpdateCourse />}/>

        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signout" element={<UserSignOut  />} />
        <Route path="*" element={<PhotoNotFound />} /> */}
      </Routes>


      
    </div>
  );
}

export default App;
