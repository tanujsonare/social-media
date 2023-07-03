import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';

import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import HomePageNotAuthenticated from './components/HomePageNotAuthenticated';
import HomePageAuthenticated from './components/HomePageAuthenticated';
import LogoutUser from './components/LogoutUser';
import UserProfile from './components/UserProfile';
import TweetDetail from './components/TweetDetail';
import { getCookie } from './CsrfToken';
import SearchBar from './components/SearchBar';


function App() {
  const userToken = localStorage.getItem("user_token");
  const userName = localStorage.getItem("user_name");
  const userId = localStorage.getItem("user_id");
  const [userProfileData, setUserProfileData] = useState()

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
  
  const getUserProfile = async(userid)=>{
    await axios.get(`http://127.0.0.1/api/get_user_profile?user_id=${userid}&requested_user_id=${userId}`
    ).then(response => {
      if (response.data) {
        setUserProfileData(response.data.user_profile)
      }
    })
    .catch(error => {
      console.log(error.response.data);
    });
  }

  const removeLike = async(e)=>{
    const tweetId = e.target.getAttribute("tweetid");
    await axios.get(`http://127.0.0.1/api/remove_like?requested_user_id=${userId}&tweet_id=${tweetId}`
    ).then(response => {
      if (response.data) {
        console.log(response.data.message);
      }
    })
    .catch(error => {
      console.log(error.response.data);
    });
  }
  
  const deleteTweet = async(e)=>{
    const tweetId = e.target.getAttribute("tweetid");
    let data = new FormData();
    data.append("tweet_id", tweetId)
    data.append("user_id", userId)
    
    const headers = {
      'X-CSRFToken': getCookie("csrftoken")
    };

    await axios.delete(`http://127.0.0.1/api/delete_tweet`,
      { data,
      headers}
    ).then(response => {
      if (response.data) {
        console.log(response.data.message);
      }
    })
    .catch(error => {
      console.log(error.response.data);
    });
  }

  const unFollowUser = async(unfollowUserId)=>{
    await axios.get(`http://127.0.0.1/api/unfollow_user?requested_user_id=${userId}&unfollow_user_id=${unfollowUserId}`
    ).then(response => {
      if (response.data) {
        alert(response.data.message);
      }
    })
    .catch(error => {
      console.log(error.response.data);
    });
  }
  
  const removeFollower = async(followerUserId)=>{
    await axios.get(`http://127.0.0.1/api/remove_follower?requested_user_id=${userId}&follower_user_id=${followerUserId}`
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
          <Route path='/' element={<HomePageAuthenticated userName={userName} userToken={userToken} userId={userId} followUser={followUser} removeLike={removeLike} deleteTweet={deleteTweet} unFollowUser={unFollowUser} />} />
          <Route path='/profile' element={<UserProfile userName={userName} userToken={userToken} userId={userId} getUserProfile={getUserProfile} userProfileData={userProfileData} followUser={followUser} unFollowUser={unFollowUser} removeFollower={removeFollower} />} />
          <Route path='/tweet_detail' element={<TweetDetail userName={userName} userToken={userToken} userId={userId} removeLike={removeLike} deleteTweet={deleteTweet} followUser={followUser} unFollowUser={unFollowUser} />} />
          <Route path='/search' element={<SearchBar userName={userName} userToken={userToken} userId={userId} followUser={followUser} unFollowUser={unFollowUser}/>} />
        </Routes>
        </Router>}
    </div>
  );
}

export default App;
