import React, {useState, useContext, useEffect} from 'react';
import UserContext from '../context/UserContext';
import Markdown from 'react-markdown';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../utils/apiHelper';


const CourseDetail = () => {
    const {authUser} = useContext(UserContext)
    const navigate = useNavigate();
    const {id} = useParams()

    const [courses, setCourses] = useState([]);
    const [setErrors] = useState([]);
    const [isLoaded, setisLoaded] = useState(false);

    //fetches courses and set to the initialized courses state
    useEffect(() =>{
        const fetchCourses =  async() => { 
            try {
            const response = await api(`/courses/${id}`, "GET")
            if (response.status === 200){
            const json = await response.json()
             setCourses(json);
             setisLoaded(true)
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
    },[id, navigate, setErrors])

    //removes the course information for an authorized user
    const handleDelete = async (e)=>{
        e.preventDefault();
        try {
        const response = await api(`/courses/${id}`, "DELETE", null, authUser)
        if (response.status === 204){
          console.log(`${id} was successfully deleted!`)
          navigate('/')
        }
        }catch (error){
          navigate("/error")
          }
        } 
        
//cancels and returns to courses page
const handleCancel = (e)=>{
    e.preventDefault();
    navigate("/")

};
if(isLoaded){
  return (
    <main>
    <div className="actions--bar">
        <div className="wrap">
        {  authUser && authUser.id === courses.userId ? (
           <> 
           <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
           <button className="button" onClick={handleDelete}>Delete Course</button>
           </>
        )
       
        :
        (<> 
          </>)
            }
            <button className="button button-secondary" onClick={handleCancel}>Return to List</button>
        
        </div>
    </div>
    
    <div className="wrap">
        <h2>Course Detail</h2>
        <form>
            <div className="main--flex">
                <div>
                    <h3 className="course--detail--title">Course</h3>
                
                    <h4 className="course--name">{courses.title}</h4>
                    <p>By {authUser?.firstName.charAt(0).toUpperCase()+authUser?.firstName.slice(1)} {authUser?.lastName.charAt(0).toUpperCase()+authUser?.lastName.slice(1)}</p>
                    <Markdown>{courses.description}</Markdown> 
                </div>
                <div>
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>{courses.estimatedTime}</p>

                    <h3 className="course--detail--title">Materials Needed</h3>
                    <ul className="course--detail--list">
                      <Markdown>{courses.materialsNeeded}</Markdown> 
                    </ul>
                </div>
                
            </div>
            
        </form>
    </div>
</main>
  )
 }};

export default CourseDetail