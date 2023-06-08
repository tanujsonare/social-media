import React, { useState, useEffect } from 'react'
import axios from 'axios';

import NavbarForAuthenticated from './NavbarForAuthenticated'
import backgroundImage from './images/social_media_back.jpg'
import { getCookie } from '../CsrfToken';


export default function HomePageAuthenticated(props) {
  const [getTweet, setGetTweet] = useState([]);

  const getAllTweet = async () => {
    await axios.get(`http://127.0.0.1/api/get_tweet?user_id=` + props.userId
    ).then(response => {
      if (response.data) {
        setGetTweet(response.data.tweets);
      }
    })
    .catch(error => {
      console.log(error.response.data);
    });
  }

  useEffect(() => {
    getAllTweet();
  }, [])

  const addNewTweet = async(e)=>{
    e.preventDefault();
    const formData = document.getElementById("addTweetForm");
    const data = {};
    for (let i = 0; i < formData.length-1; i++) {
      data[formData[i].id] = formData[i].value;
    }
    data["user"] = props.userId

    const headers = {
        'X-CSRFToken': getCookie("csrftoken")
    };

    await axios.post('http://127.0.0.1/api/add_tweet',
        data,
        { headers }
    ).then(response => {
        console.log(response.data);
        let form = document.getElementById("addTweetForm");
        form.reset();
        getAllTweet();
    })
    .catch(error => {
        alert(error.response.data.error);
    });
  }


  return (
    <div className="" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', minHeight: '700px' }}>
      <NavbarForAuthenticated userName={props.userName} userToken={props.userToken} />
      <div className='mx-4 my-4 d-flex'>
        <div className='mr-auto p-2 w-50'>
          {getTweet.map((element) => {
            return <div className="card w-50 mb-3 my-4 mx-4">
              <h6 className="card-title d-flex jsutify-content-start mx-3 my-2">{props.userName}</h6>
              {/* <img className="card-img-top my-4" src={backgroundImage} style={{ display: "block", marginLeft: "auto", marginRight: "auto", width: "40%", height: "100px" }} alt="Card image cap" /> */}
              <div className="card-body">
                <p className="card-text">{element.content}</p>
                <p className="card-text"><small className="text-muted">{element.created_at} ago</small></p>
              </div>
            </div>
          })}
        </div>
        <div className="card p-2 my-4 w-50 h-50">
          <h5 className="card-header">New Tweet</h5>
          <div className="card-body">
            <form id="addTweetForm" onSubmit={addNewTweet}>
              <div className="form-group mx-4">
                <label className="my-2 d-flex" htmlFor="tweetContent">Tweet Content*</label>
                <textarea className="form-control" id="content" rows="10" placeholder="Please write your tweet content here."></textarea>
              </div>
              <div className='my-4 mx-4 flex-row d-flex justify-content-center'>
                <button type="submit" className="btn btn-dark">Tweet</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
