import React, {useRef, useContext, useState} from 'react'
import UserContext from '../context/UserContext';
import { useNavigate, useLocation , Link} from 'react-router-dom';

const UserSignUp = () => {
  const actions = useContext(UserContext)
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
      const response = await api("/users, 'POST", user)
      if (response.status === 201){
       console.log(`${user.username} is successfully signed up and autenticated!`)
       await actions.signIn(user);
       navigate("/authenticated");

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
    <div className="form--centered">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <label for="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" value=""/>
                    <label for="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" value=""/>
                    <label for="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value=""/>
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" value=""/>
                    <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                </form>
                <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
            </div>
  )
}

export default UserSignUp