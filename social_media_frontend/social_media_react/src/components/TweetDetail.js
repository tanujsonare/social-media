import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import NavbarForAuthenticated from './NavbarForAuthenticated'
import backgroundImage from './images/social_media_back.jpg'
import defaultProfileImage from './images/default_profile_img.webp'

export default function TweetDetail(props) {
    const [tweetDetail, setTweetDetail] = useState([])
    const navigate = useNavigate();

    var tweetId;
    if (window.location.href.includes("tweet_id=")){
        tweetId = window.location.href.split("tweet_id=")[1];
    }

    const getTweetDetail = async () => {
        await axios.get(`http://127.0.0.1/api/get_tweet?user_id=${props.userId}&tweet_id=${tweetId}`
        ).then(response => {
          if (response.data) {
            setTweetDetail(response.data.tweet);
          }
        })
        .catch(error => {
          console.log(error.response.data);
        });
    }

    useEffect(() => {
        getTweetDetail();
    }, [tweetId]);

    const addLike = async(e) =>{
        const tweetId = e.target.getAttribute("tweetid")
        await axios.get(`http://127.0.0.1/api/add_like?tweet_id=${tweetId}&user_id=${props.userId}`
        ).then(response => {
          if (response.data) {
            getTweetDetail();
          }
        })
        .catch(error => {
          console.log(error.response.data);
        });
    }

    const showUserProfile = (e) =>{
        const userId = e.target.getAttribute("userid");
        navigate(`/profile?user_id=${userId}`);
    }

    const addFollow = async(e) =>{
        const followUserId = e.target.getAttribute("followuserid");
        const requestedUserId = props.userId;
        await props.followUser(requestedUserId, followUserId);
        await getTweetDetail();
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

    const removeTweetLike = async(e)=>{
        await props.removeLike(e);
        await getTweetDetail();
    }
    
    const requestDeleteTweet = async(e)=>{
        const confirmed = window.confirm("Are you sure you want to delete this tweet?");
        if (confirmed){
            await props.deleteTweet(e);
            navigate("/");
        }
    }

    const unFollow = async (e) => {
        const unfollowUserId = e.target.getAttribute("unfollowuserid");
        await props.unFollowUser(unfollowUserId);
        await getTweetDetail();
    }

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', minHeight: '700px', paddingBottom:"20px" }}>
            <NavbarForAuthenticated userName={props.userName} userToken={props.userToken} />
            <div className='d-flex justify-content-center my-3 text-light'>
                {tweetDetail && <div className="card w-50 my-4 mx-4" key={tweetDetail.id} style={{minWidth:"60%"}}>
                    <div className='card-header d-flex justify-content-start'>
                        <img src={tweetDetail.user_profile_image ? tweetDetail.user_profile_image : defaultProfileImage} className="rounded-circle my-2" width="30" height="30" onClick={showUserProfile} userid={tweetDetail.user} role='button' />
                        <h6 className="my-2 p-2" role="button" onClick={showUserProfile} userid={tweetDetail.user}>{tweetDetail.user_name}</h6>
                        {tweetDetail.user != props.userId && !tweetDetail.is_following && <button className='btn btn-dark mx-auto btn-sm my-2 rounded-5 me-0' onClick={addFollow} followuserid={tweetDetail.user}> Follow <i className="fa-solid fa-circle-plus" style={{ color: "#fff", }} followuserid={tweetDetail.user}></i></button>}
                        {tweetDetail.user != props.userId && tweetDetail.is_following && <button className='btn btn-secondary mx-auto btn-sm my-2 rounded-5 me-0' onClick={unFollow} unfollowuserid={tweetDetail.user}> unfollow </button>}
                    </div>
                    <div className="card-body">
                        {tweetDetail.image && <img className="card-i-mg-top" src={tweetDetail.image} style={{ display: "block", marginLeft: "auto", marginRight: "auto", width: "70%", height: "280px" }} alt="Card image cap" />}
                        <p className="card-text my-3" style={{ textAlign: "justify" }}>{tweetDetail.content}</p>
                        <p className="card-text"><small className="text-muted">{getDateAndTime(tweetDetail.created_at)}</small></p>
                        <div className='card-footer d-flex justify-content-between'>
                            {!tweetDetail.is_liked && <span className='text-dark'><i className="fa-sharp fa-regular fa-heart fa-beat fa-lg" tweetid={tweetDetail.id} style={{ color: "#595959" }} onClick={addLike} role="button"></i> {tweetDetail.likes} likes </span>}
                            {tweetDetail.is_liked && <span className='text-dark'><i className="fa-sharp fa-solid fa-heart fa-lg " tweetid={tweetDetail.id} style={{ color: "#e85e5e" }} onClick={removeTweetLike} role='button'></i> {tweetDetail.likes} likes </span>}
                            {props.userId == tweetDetail.user && <i className="fa-solid fa-pen" tweetid={tweetDetail.id} style={{ color: "#696363" }}></i>}
                            {props.userId == tweetDetail.user && <i className="fa-solid fa-trash me-0" tweetid={tweetDetail.id} style={{ color: "#696363" }} onClick={requestDeleteTweet} role='button'></i>}
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}
