import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import axios from 'axios';

import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import HomePageNotAuthenticated from './components/HomePageNotAuthenticated';
import HomePageAuthenticated from './components/HomePageAuthenticated';
import LogoutUser from './components/LogoutUser';
import UserProfile from './components/UserProfile';


function App() {
  const userToken = localStorage.getItem("user_token");
  const userName = localStorage.getItem("user_name");
  const userId = localStorage.getItem("user_id");
  // const [followUser, setFollowUser] = useState();
  const followUser = async(requestedUserId, followUserId)=>{
    await axios.get(`http://127.0.0.1/api/add_follower?requested_user_id=${requestedUserId}&follow_user_id=${followUserId}`
    ).then(response => {
      if (response.data) {
        alert(response.data.message);
      }
    })
    .catch(error => {
      console.log(error.response.data);
    });
  }

  return (
    <div className="App">
      {!userToken && <Router>
        <Routes>
          <Route path='/register' element={<RegisterUser/>} />
          <Route path='/login' element={<LoginUser />} />
          <Route path='/' element={<HomePageNotAuthenticated />} />
        </Routes>
      </Router>}
      {userToken && <Router>
        <Routes>
          <Route path='/logout' element={<LogoutUser userName={userName} userToken={userToken}/>} />
          <Route path='/' element={<HomePageAuthenticated userName={userName} userToken={userToken} userId={userId} followUser={followUser} />} />
          <Route path='/profile' element={<UserProfile userName={userName} userToken={userToken} userId={userId}/>} />
        </Routes>
        </Router>}
    </div>
  );
}

export default App;
