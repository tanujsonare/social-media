import React, {useState, useEffect} from 'react'
import axios from 'axios';

import NavbarForAuthenticated from './NavbarForAuthenticated'
import backgroundImage from './images/social_media_back.jpg'


export default function HomePageAuthenticated(props) {
  const [getTweet, setGetTweet] = useState([]);

  const getAllTweet = async()=>{
    await axios.get(`http://127.0.0.1/api/get_tweet?user_id=` + props.userId
    ).then(response => {
      if (response.data){
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


  return (
    <div style={{backgroundImage:`url(${backgroundImage})`,backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', maxHeigth:"100%"}}>
        <NavbarForAuthenticated userName={props.userName} userToken={props.userToken}/>
        <div className='mx-4 my-4'>
          {getTweet.map((element)=>{
          return <div className="card w-50 mb-3 my-4 mx-4">
              {/* <img className="card-img-top my-4" src={backgroundImage} style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "40%", height: "100px"}} alt="Card image cap" /> */}
              <div className="card-body">
                <h6 className="card-title">{props.userName}</h6>
                <p className="card-text">{element.content}</p>
                <p className="card-text"><small className="text-muted">{element.created_at} ago</small></p>
              </div>
            </div>
          })}
        </div>
    </div>
  )
}
