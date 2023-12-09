import React, {useRef, useState, useContext} from 'react';
import { useNavigate} from 'react-router-dom';
import UserContext from '../context/UserContext';
import ErrorDisplay from './ErrorDisplay';
import { api } from '../utils/apiHelper';


const CreateCourse = () => {
    const navigate = useNavigate;
    const {authUser} = useContext(UserContext)
    // State
    const title = useRef(null);
    const courseDescription = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded= useRef(null);
    const [errors, setErrors] = useState([]);

    //Event handlers
    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        const user = {
            title: title.current.value,
            courseDescription: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value
          }
          try {
            const response = await api("/api/courses, 'POST", user, authUser)
            if (response.status === 201){
             navigate("/");
      
            } else if (response.status === 400){
              const data = await response.json();
              console.log(data)
              setErrors(data.errors);
            } else{
              throw new Error();
            }
        }catch (error){
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
                <form onclick={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label for="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value="" ref={title}/>

                            <p>{authUser.firstName}{authUser.lastName}</p>

                            <label for="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" ref={courseDescription}></textarea>
                        </div>
                        <div>
                            <label for="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value=""ref={estimatedTime}/>

                            <label for="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button><button className="button button-secondary" onclick={handleCancel}>Cancel</button>
                </form>
            </div>
     
  )}

  

export default CreateCourse