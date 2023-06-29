import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

import NavbarForAuthenticated from './NavbarForAuthenticated'
import backgroundImage from './images/social_media_back.jpg'
// import tweetLogo from './images/tweet_log.png'
import defaultProfileImage from './images/default_profile_img.webp'
import { getCookie } from '../CsrfToken';


export default function HomePageAuthenticated(props) {
  const navigate = useNavigate();
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
    var data = new FormData();
    for (let i = 0; i < formData.length-1; i++) {
      if (formData[i].id == "image"){
        if (formData[i].files[0] != null && formData[i].files[0] != undefined){
          const file = formData[i].files[0];
          data.append(formData[i].id, file, file.name);
        }
      }else{
        data.append(formData[i].id, formData[i].value);
      }
    }
    data.append("user", props.userId);

    const headers = {
        'X-CSRFToken': getCookie("csrftoken")
    };
    console.log(data)
    await axios.post('http://127.0.0.1/api/add_tweet',
        data,
        { headers }
    ).then(response => {
        console.log(response.data);
        let form = document.getElementById("addTweetForm");
        form.reset();
        let uploadTextBtn = document.getElementsByClassName("uploaded_image_name")
        uploadTextBtn[0].textContent = "";
        getAllTweet();
    })
    .catch(error => {
        alert(error.response.data.error);
    });
  }

  const addLike = async(e) =>{
    const tweetId = e.target.getAttribute("tweetid")
    await axios.get(`http://127.0.0.1/api/add_like?tweet_id=${tweetId}&user_id=${props.userId}`
    ).then(response => {
      if (response.data) {
        getAllTweet();
      }
    })
    .catch(error => {
      console.log(error.response.data);
    });
  }

  const addFollow = async(e) =>{
    const followUserId = e.target.getAttribute("followuserid");
    const requestedUserId = props.userId;
    await props.followUser(requestedUserId, followUserId);
    await getAllTweet();
  }

  const getDateAndTime = (createdAt)=>{
    let dateAndTime = new Date(createdAt);
    const options = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    if (dateAndTime){
      let CreatedAtDateTime = dateAndTime.toLocaleString('en-In', options).split(',');
      return ("Tweet on " + CreatedAtDateTime);
    }
  }

  const showUserProfile = (e) =>{
    const userId = e.target.getAttribute("userid");
    navigate(`/profile?user_id=${userId}`);
  }

  const checkUploadImage = (e)=>{
    const file = e.target.files[0]
    if (file != null && file!= undefined){
      let uploadTextBtn = document.getElementsByClassName("uploaded_image_name");
      uploadTextBtn[0].textContent = e.target.files[0].name;
    }
  }

  const tweetDetail = (e)=>{
    const tweetId = e.target.getAttribute("tweetid");
    if (tweetId){
      navigate(`/tweet_detail?tweet_id=${tweetId}`);
    }
  }

  const removeTweetLike = async(e)=>{
    await props.removeLike(e);
    await getAllTweet();
  }
  
  const requestDeleteTweet = async(e)=>{
    const confirmed = window.confirm("Are you sure you want to delete this tweet?");
    if (confirmed){
      await props.deleteTweet(e);
      await getAllTweet();
    }
  }

  const unFollow = async (e) => {
    const unfollowUserId = e.target.getAttribute("unfollowuserid");
    await props.unFollowUser(unfollowUserId);
    await getAllTweet();
  }

  return (
    <div className="" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', minHeight: '700px' }}>
      <NavbarForAuthenticated userName={props.userName} userToken={props.userToken} />
      <div className='mx-4 my-4 d-flex'>
        <div className='mr-auto p-2 w-50'>
          {getTweet.map((element) => {
            return <div className="card mb-3 my-4 mx-4" key={element.id} style={{minWidth:"400px"}}>
              <div className='card-header d-flex justify-content-start'>
                <img src={element.user_profile_image ? element.user_profile_image : defaultProfileImage} className="rounded-circle my-2" width="30" height="30" onClick={showUserProfile} userid={element.user} role='button'/>
                <h6 className="my-2 p-2" role="button" onClick={showUserProfile} userid={element.user}>{element.user_name}</h6>
                {element.user != props.userId && !element.is_following && <button className='btn btn-dark mx-auto btn-sm my-2 rounded-5 me-0' onClick={addFollow} followuserid={element.user}> Follow <i className="fa-solid fa-circle-plus" style={{color: "#fff",}} followuserid={element.user}></i></button>}
                {element.user != props.userId && element.is_following && <button className='btn btn-secondary mx-auto btn-sm my-2 rounded-5 me-0' onClick={unFollow} unfollowuserid={element.user}> Unfollow </button>}
              </div>
              <div className="card-body">
                <div id="tweet_content" tweetid={element.id} onClick={tweetDetail} role='button'>
                  {element.image && <img className="card-i-mg-top" tweetid={element.id} src={element.image} style={{ display: "block", marginLeft: "auto", marginRight: "auto", width: "100%", height: "250px" }} alt="Card image cap" />}
                  {element.content && element.content.length > 60 ? <p className="card-text my-3" tweetid={element.id} style={{textAlign: "justify"}}>{element.content.slice(0, 60) + "...."}<a className="mx-2" style={{color:"#4c72b9"}} tweetid={element.id} onClick={tweetDetail} role='button'>read more</a></p> : <p className="card-text my-3" tweetid={element.id} style={{textAlign: "justify"}}>{element.content}</p>}
                  <p className="card-text" tweetid={element.id}><small className="text-muted" tweetid={element.id}>{getDateAndTime(element.created_at)}</small></p>
                </div>
                <div className='card-footer d-flex jsutify-content-start'>
                  {!element.is_liked && <span className='text-dark'><i className="fa-sharp fa-regular fa-heart fa-beat fa-lg" tweetid={element.id} style={{ color: "#595959"}} onClick={addLike} role="button"></i> {element.likes} likes </span>}
                  {element.is_liked && <span className='text-dark'><i className="fa-sharp fa-solid fa-heart fa-lg" tweetid={element.id} style={{color: "#e85e5e"}} onClick={removeTweetLike} role='button'></i> {element.likes} likes </span>}
                  {props.userId == element.user && <i className="fa-solid fa-pen mx-3" tweetid={element.id} style={{ color: "#696363"}}></i>}
                  {props.userId == element.user && <i className="fa-solid fa-trash mx-3" tweetid={element.id} style={{ color: "#696363"}} onClick={requestDeleteTweet} role='button'></i>}
                  <i className="fa-solid fa-up-right-and-down-left-from-center mx-4 me-0" tweetid={element.id} style={{ color: "#696363"}} onClick={tweetDetail} role='button'></i>
                </div>
              </div>
            </div>
          })}
        </div>
        <div className="card p-2 my-4 w-50 h-50">
          <h5 className="card-header">New Post</h5>
          <div className="card-body">
            <form id="addTweetForm" onSubmit={addNewTweet}>
              <div className="form-group upload_button">
                <label htmlFor="tweetimage" className='my-2 d-flex mx-4'>Upload Image (optional)</label>
                <div className='d-flex justify-content-start'>
                  <div className='d-flex file btn btn-lg file form-control-file col-xl-12 mx-5 font-weight-bold'>
                    Choose file
                    <input type="file" className="upload_tweet_image" onChange={checkUploadImage} id="image" accept="image/*" />
                  </div>
                  <label htmlFor="tweetimage" className='ms-0 my-2 uploaded_image_name'></label>
                </div>  
              </div>
              <div className="form-group mx-4 my-4">
                <label className="my-3 d-flex" htmlFor="tweetContent">Post Content*</label>
                <textarea className="form-control" id="content" rows="10" placeholder="Please write your tweet content here."></textarea>
              </div>
              <div className='my-4 mx-4 flex-row d-flex justify-content-center'>
                <button type="submit" className="btn btn-dark">Post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}