import React, {useRef, useContext, useState} from 'react'
import { useNavigate, useLocation, Link} from 'react-router-dom';
import UserContext from '../context/UserContext';
import ErrorDisplay from './ErrorDisplay';



const UserSignIn = () => {
    const {actions} = useContext(UserContext)
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)

    // State
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);
  
    // Event Handlers
    const handleSubmit = async (event) => {
      event.preventDefault();
      let from = '/'
      if (location.state)
        from = location.state.from;

      const credentials = {
        emailAddress: emailAddress.current.value,
        password: password.current.value
      }
      try{ 
        const user = await actions.signIn(credentials)
        if(user){
          navigate(from);
        }else {
          setErrors(["Sign-in was unsuccessful"])
        }
      } catch (error){
        // console.log(error);
        navigate("/error");
      }
    }
  
    const handleCancel = (event) => {
      event.preventDefault();
      navigate("/");
  
    }

  return (
    <div className="htmlForm--centered" >
                <h2>Sign In</h2>
                <ErrorDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} defaultValue=""/>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" ref={password} defaultValue=""/>
                    <button className="button" type="submit">Sign In</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p> 
                
            </div>
  )
}

export default UserSignIn