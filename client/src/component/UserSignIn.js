import React from 'react'

const UserSignIn = () => {
    // const {actions} = useContext(UserContext)
    // const navigate = useNavigate;
    // const location = useLocation();
    // console.log(location)
  
    // // State
    // const username = useRef(null);
    // const password = useRef(null);
    // const [errors, setErrors] = useState([]);
  
    // // Event Handlers
    // const handleSubmit = async (event) => {
    //   event.preventDefault();
    //   let from = '/authenticated'
    //   if (location.state)
    //     from = location.state.from;
    //   const credentials = {
    //     username: username.current.value,
    //     password: password.current.value
    //   }
    //   try{ 
    //     const user = await actions.signin(credentials)
    //     if(user){
    //       navigate(from);
    //     }else {
    //       setErrors(["Sign-in was unsucessful"])
    //     }
    //   } catch (error){
    //     console.log(error);
    //     navigate("/error");
    //   }
    // }
  
    // const handleCancel = (event) => {
    //   event.preventDefault();
    //   navigate("/");
  
    // }

  return (
    <div className="form--centered">
                <h2>Sign In</h2>
                
                <form>
                    <label for="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value=""/>
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" value=""/>
                    <button className="button" type="submit">Sign In</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <a href="sign-up.html">sign up</a>!</p>
                
            </div>
  )
}

export default UserSignIn