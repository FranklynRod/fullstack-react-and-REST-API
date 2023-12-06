
// import Header from './component/Header'
import './App.css';

fetch('http://localhost:5000/api/courses')
.then(console.log(courses))




function App() {
  return (
    <div >
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/create" element={<CreateCourses/>} />
        <Route path="/courses/:id" element={<CoursesDetail/>}/>
        <Route path="/courses/:id/update" element={<UpdateCourse />}/>

        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signout" element={<UserSignOut  />} />
        <Route path="*" element={<PhotoNotFound />} />
      </Routes>


      
    </div>
  );
}

export default App;
