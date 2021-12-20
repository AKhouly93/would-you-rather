import { connect } from 'react-redux';
import '../App.css';
import { NavLink } from "react-router-dom";
import { setAuthedUser } from '../actions/actionCreators';
function Nav (props)
{
    const { dispatch } = props;
    const { name, avatarURL } = props.authedUser;
    return (
        <nav>
        <label className ="logo">Would You Rather</label>
        <div>
            <ul className="nav-items">
                <li>
                    <NavLink   className="nav-item"  to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink className="nav-item"    to="/add"  >New Question</NavLink>
                </li>
                <li>
                    <NavLink className="nav-item"    to="/leaderboard"  >Leader Board</NavLink>
                </li>
            </ul>
        </div>
        <div className = "nav-user">
            <img className="nav-avatar" src={avatarURL} alt={`${name}'s avatar`}></img>
            <span>Hello, {name}</span>
            <NavLink to="/login">
            <button className="logout-btn"
            onClick={()=> {dispatch(setAuthedUser(null))}}
            >Log out</button>
            </NavLink>
        </div>
    </nav> 
    );
}

function mapStateToProps(state){
    return {
      authedUser: state.users[state.authedUser],
    }
}
export default connect(mapStateToProps)(Nav);
