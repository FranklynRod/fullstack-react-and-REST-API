import React, {useRef, useContext, useState} from 'react'
import UserContext from '../context/UserContext';
import { useNavigate,  Link} from 'react-router-dom';
import ErrorDisplay from './ErrorDisplay';
import { api } from '../utils/apiHelper';

const UserSignUp = () => {
  const {actions} = useContext(UserContext)
  const navigate = useNavigate();
  // State
  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  // event handlers
  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: emailAddress.current.value,
      password: password.current.value
    }
   
    try {
      const response = await api("/users", 'POST', user)
      if (response.status === 201){
       console.log(`${user.emailAddress} is successfully signed up and authenticated!`)
       console.log(actions.signIn(user))
       await actions.signIn(user);
       navigate("/");

      } else if (response.status === 400){
        const data = await response.json();
        setErrors(data.errors);
      } else{
        throw new Error()
      }
  }catch (error){
    console.log(error);
    navigate("/error")
    }
  } 
  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/")
  }
  return (
    <div className="htmlForm--centered">
                <h2>Sign Up</h2>
                 <ErrorDisplay errors={errors} />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" ref={firstName} defaultValue="" />
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" ref={lastName} defaultValue="" />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} defaultValue="" />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" ref={password} defaultValue=""/>
                    <button className="button" type="submit">Sign Up</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
  )
}

export default UserSignUp