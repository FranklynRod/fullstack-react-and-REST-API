import React, {useRef, useContext, useState} from 'react'
import UserContext from '../context/UserContext';
import { useNavigate, useLocation , Link} from 'react-router-dom';


const UserSignIn = () => {
   // State
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    const actions = useContext(UserContext)
    const navigate = useNavigate;
    const location = useLocation();
    console.log(location)
  
    // Event Handlers
    const handleSubmit = async (event) => {
      event.preventDefault();
      let from = '/authenticated'
      if (location.state)
        from = location.state.from;

      const credentials = {
        emailAddress: emailAddress.current.value,
        password: password.current.value
      }
      try{ 
        const user = await actions.signin(credentials)
        if(user){
          navigate(from);
        }else {
          setErrors(["Sign-in was unsuccessful"])
        }
      } catch (errors){
        // console.log(error);
        navigate("/error");
      }
    }
  
    const handleCancel = (event) => {
      event.preventDefault();
      navigate("/");
  
    }

  return (
    <div className="form--centered" >
                <h2>Sign In</h2>
                
                <form onClick={handleSubmit}>
                    <label for="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value="" ref={emailAddress}/>
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" value="" ref={password}/>
                    <button className="button" type="submit">Sign In</button><button className="button button-secondary" onclick={handleCancel}>Cancel</button>
                </form>
                
                <p>Don't have a user account? Click here to <Link><a to="/signup">sign up</a></Link>!</p> 
                
            </div>
  )
}

export default UserSignIn