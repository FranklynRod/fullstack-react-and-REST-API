import React, {useEffect, useRef, useState, useContext} from 'react';
import ErrorDisplay from './ErrorDisplay';
import UserContext from '../context/UserContext';
import { useNavigate, useParams} from 'react-router-dom';
import { api } from '../utils/apiHelper';

const UpdateCourse = () => {
    const {authUser} = useContext(UserContext);
    const navigate = useNavigate();
    const {id} = useParams();

   // State
   const title = useRef(null);
   const description = useRef(null);
   const estimatedTime = useRef(null);
   const materialsNeeded= useRef(null);
   const authUserId = authUser;
   const [courses, setCourses] = useState();
   const [errors, setErrors] = useState([]);

   useEffect(() =>{
    const fetchCourses =  async() => { 
        try {
        const response = await api(`/courses/${id}`, "GET")
        if (response.status === 200){
        const json = await response.json()
         setCourses(json);
        } else if (response.status === 400){
          const data = await response.json();
          setErrors(data.errors);
        } else{
          throw new Error();
        }
    }catch (error){
      navigate("/error")
      }}
   fetchCourses(); 
},[id, authUserId.id, navigate])


   //Event handlers
   const handleSubmit = async (e)=>{
       e.preventDefault();
       
       const currCourse = {
           title: title.current.value,
           description: description.current.value,
           estimatedTime: estimatedTime.current.value,
           materialsNeeded: materialsNeeded.current.value,
           userId: authUserId.id
         };

         try {
           const response = await api(`/courses/${id}`, "PUT", currCourse, authUserId)
           if (response.status === 204){
            const data = await response.json();
            // setCourse(data);
            console.log(title)
             console.log(`${courses.title} is successfully updated!`)
            navigate("/");
           } else if (response.status === 400){
             const data = await response.json();
             setErrors(data.errors);
           } else{
             throw new Error();
            
           }
       } catch (error){
         console.log(error)
         navigate("/error")
         }
       } 
    const handleCancel = (e)=>{
        e.preventDefault();
        navigate("/")
    } 
  return (
    <div className="wrap">
    <h2>Update Course</h2>
    <ErrorDisplay errors={errors} />
    <form onSubmit={handleSubmit}>
        <div className="main--flex">
            <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input id="courseTitle" name="courseTitle" type="text" ref={title} defaultValue={courses.title}/>

                <p>By {authUser.firstName.charAt(0).toUpperCase()+authUser.firstName.slice(1)} {authUser.lastName.charAt(0).toUpperCase()+authUser.lastName.slice(1)}</p>

                <label htmlFor="courseDescription">Course Description</label>
                <textarea id="courseDescription" name="courseDescription" ref={description} defaultValue={courses.description}></textarea>
            </div>
            <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime} defaultValue={courses.estimatedTime}/>

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded} defaultValue={courses.materialsNeeded}></textarea>
            </div>
        </div>
        <button className="button" type="submit">Update Course</button>
        <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
    </form>
</div>
  )
}

export default UpdateCourse