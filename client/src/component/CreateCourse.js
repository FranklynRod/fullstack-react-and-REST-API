import React, {useRef, useState, useContext} from 'react';
import { useNavigate} from 'react-router-dom';
import UserContext from '../context/UserContext';
import ErrorDisplay from './ErrorDisplay';
import { api } from '../utils/apiHelper';


const CreateCourse = () => {
    const {authUser} = useContext(UserContext)
    const navigate = useNavigate();
    // State
    const title = useRef(null);
    const description = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded= useRef(null);
    const userId = authUser;
    const [errors, setErrors] = useState([]);

    //Event handlers
    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        const course = {
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
            userId: userId.id
          }
          try {
            const response = await api("/courses", "POST", course, userId)
            if (response.status === 201){
              console.log(`${course.title} is successfully created!`)
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
                <h2>Create Course</h2>
                <ErrorDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" ref={title} defaultValue=""/>

                            {/* <p>{authUser.firstName}{authUser.lastName}</p> */}

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" ref={description}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime} defaultValue=""/>

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
     
  )}

  

export default CreateCourse