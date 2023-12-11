import React, {useState, useContext, useEffect} from 'react';
import UserContext from '../context/UserContext';
import Markdown from 'react-markdown';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../utils/apiHelper';


const CourseDetail = () => {
    const [courses, setCourses] = useState({})
    const [errors, setErrors] = useState({})

    const authUser = useContext(UserContext)
    const navigate = useNavigate();
    const {id} = useParams()

    //FETCH COURSES DATA AND SAVE TO COURSES STATE
    useEffect(() =>{

        const fetchCourses =  async() => { 
            try {
            const response = await api("/api/courses, 'GET")
            if (response.status === 200){
             setCourses(response.json());
            } else if (response.status === 400){
              const data = await response.json();
              setErrors(data.errors);
            } else{
              throw new Error();
            }
        }catch (error){
          setErrors(['Error. Try again'])
          navigate("/error")
          }}
       fetchCourses(); 
    })
  
    const handleDelete = async (e)=>{
        e.preventDefault();
        try {
        const response = await api(`/api/courses/${id}`, "DELETE", null,{})
        .then(res => navigate('/'))
        }catch (error){
          navigate("/error")
          }
        } 

const handleCancel = (e)=>{
    e.preventDefault();
    navigate("/")

}
  return (
    <main>
    <div className="actions--bar">
        <div className="wrap">
        {authUser && authUser === id ?
        <> 
        <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
        <a><button className="button" onClick={handleDelete}>Delete Course</button></a>
        </>
        :
        <> 
        </>
            
            }
            <a><button className="button button-secondary" onClick={handleCancel}>Return to List</button></a>
        
        </div>
    </div>
    
    <div className="wrap">
        <h2>Course Detail</h2>
        <form>
            <div className="main--flex">
                <div>
                    <h3 className="course--detail--title">Course</h3>
                
                    <h4 className="course--name">{courses.title}</h4>
                    <p>`by ${courses.firstName}${courses.lastName}`</p>
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
 }

export default CourseDetail