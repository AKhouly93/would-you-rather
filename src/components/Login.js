import { connect } from "react-redux";
import '../login.css'
import { setAuthedUser } from '../actions/actionCreators'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
function Login (props){
const navigate = useNavigate();
const  { pathname }   = useLocation();
const [from, setFrom] = useState(null);
useEffect(()=>{
setFrom(pathname);
navigate('/login');
},[]);
  const users = props.users;
  const handleSetAuthedUser=(e, uid)=>{
      const { dispatch } = props;
      dispatch(setAuthedUser(uid))
      if (from === '/login') {
        navigate('/');
      } else {
        navigate(from);
      }
  }
    return (
        <div className="login-page">
            <div className="login-area">
            <h1>Would You Rather...</h1>
            <h3>Login</h3>
            <p>Click user picture to login.</p>
            <div className="users">
                {props.userIds.map((uid)=>(
                                    <div key={uid} className="login-card" onClick={(e) => handleSetAuthedUser(e,uid)}>
                                    <img src={users[uid].avatarURL} alt={`${users[uid].name}'s avatar`}></img>
                                    <div className="login-name">
                                        {users[uid].name}
                                    </div>
                                </div>
                ))}

            </div>
            
            </div>
        </div>
    );
}
function mapStateToProps(state){
    return {
      userIds: Object.keys(state.users),
      users: state.users
    }
}
export default connect(mapStateToProps)(Login);
   