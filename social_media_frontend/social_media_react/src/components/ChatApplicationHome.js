import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import NavbarForAuthenticated from './NavbarForAuthenticated'
import defaultProfileImage from './images/default_pr_img.webp'

export default function ChatApplicationHome(props) {
    const [searchData, setSearchData] = useState(null)
    const [messagesData, setMessagesData] = useState(null)
    const [acticeChatUserName, setActiceChatUserName] = useState(null)
    const [acticeChatUserId, setActiceChatUserId] = useState(null)
    const searchUsersForChat = async () => {
        const searchText = document.getElementsByClassName("search_text");
        if (searchText) {
            await axios.get(`http://127.0.0.1/api/search_user?requested_user_id=${props.userId}&chat=True`
            ).then(response => {
                setSearchData(response.data.user_profiles)
            })
            .catch(error => {
                console.log(error.response.error_message);
            });
        } else {
            alert("Please enter some text to search")
        }
    }

    useEffect(() => {
        searchUsersForChat();
    }, [])

    const getMessages = async(e)=>{
        const userId = e.currentTarget.getAttribute("userid");
        setActiceChatUserId(userId);
        setActiceChatUserName(e.currentTarget.getAttribute("username"));
        await axios.get(`http://127.0.0.1/api/get_messages?user_id=${userId}&requested_user_id=${props.userId}`
        ).then(response => {
            if (response.data) {
                setMessagesData(response.data.messages);
            }
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status == 400) {
                    alert(error.response.error_message);
                }
            }
        });
    }

    return (
        <div className="custom-background" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', minHeight: '700px' }}>
            <NavbarForAuthenticated userName={props.userName} userToken={props.userToken} />
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-6 col-lg-5 col-xl-5 mb-4 mb-md-0">
                        <Link className="text-light" to="/chat_search" style={{ textDecoration: "none" }}>
                            <i className="fas fa-search text-light"></i>
                            &nbsp; Search
                        </Link>
                        <div className="card mask-custom my-4">
                            <div className="card-body">
                                <ul className="list-unstyled mb-0 overflow-auto" style={{ minHeight: "400px", maxHeight: "470px" }}>
                                    {searchData && searchData.map((element) => {
                                        return element.is_following == true && element.is_conversation && <li className="p-2 border-bottom search_user" style={{ borderBottom: "1px solid rgba(255,255,255,.3) !important" }} key={element.id} userid={element.id} username={element.username} role='button' onClick={getMessages}>
                                            <div className="d-flex justify-content-between link-light">
                                                {/* <a href="#!" className="d-flex justify-content-between link-light"> */}
                                                <div className="d-flex flex-row">
                                                    <img src={element.profile_image ? element.profile_image : defaultProfileImage} alt="avatar"
                                                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" height="60" />
                                                    <div className="pt-2">
                                                        <h5 className="fw-bold mb-0">{element.username}</h5>
                                                        <p className="small text-white">{element.last_message_detail ? element.last_message_detail.content : "No conversation yet .."}</p>
                                                    </div>
                                                </div>
                                                <div className="pt-2">
                                                    <p className="small text-white mb-1">{element.last_message_detail ? props.getTimeDifference(element.last_message_detail.created_at) : ""}</p>
                                                    <span className="badge bg-success float-end">{element.last_message_detail ? element.last_message_detail.unseen_message_count : ""}</span>
                                                </div>
                                                {/* </a> */}
                                            </div>
                                        </li>
                                    })
                                    }
                                </ul>

                            </div>
                        </div>
                    </div>

                    {/* personal chat section */}
                    <div className="card col-md-6 col-lg-7 col-xl-7 custom-background text-light">
                        
                        {/* card header */}

                        <div className="card-header msg_head my-2" style={{borderBottom: "1px solid white"}}>
                            <div className="d-flex bd-highlight">
                                <div className="img_cont">
                                    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" width="60" height="60" />
                                    <span className="online_icon"></span>
                                </div>
                                <div className="user_info">
                                    <span className='mx-3'>Chat with Khalid</span>
                                    <p className='text-success'>Online</p>
                                </div>
                                {/* <div className="video_cam mx-5">
                                    <span><i className="fas fa-video"></i></span>
                                    <span><i className="fas fa-phone mx-4"></i></span>
                                </div> */}
                            </div>
                        </div>

                        {/* message section */}

                        <ul className="list-unstyled text-white overflow-auto my-3" style={{ maxHeight: "380px", minHeight: "380px" }}>
                            <li className="d-flex justify-content-between mb-4">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" alt="avatar"
                                    className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="30" height="30" />
                                <div className="card mask-custom">
                                    {/* <div className="card-header d-flex justify-content-between p-3"
                                        style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}>
                                        <p className="fw-bold mb-0 text-light">Brad Pitt</p>
                                        <p className="text-light small mb-0"><i className="far fa-clock"></i> 12 mins ago</p>
                                    </div> */}
                                    <div className="card-body">
                                        <p className="mb-0" style={{textAlign: "justify", color:"#e1be3f"}}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                            labore et dolore magna aliqua.
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                            labore et dolore magna aliqua.
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                            labore et dolore magna aliqua.
                                        </p>
                                        <p className="text-light small mb-0 text-end"><i className="far fa-clock"></i> 13 mins ago</p>
                                    </div>
                                </div>
                            </li>
                            <li className="d-flex justify-content-between mb-4">
                                <div className="card mask-custom w-100">
                                    {/* <div className="card-header d-flex justify-content-between p-3  text-light"
                                        style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}>
                                        <p className="fw-bold mb-0">Lara Croft</p>
                                        <p className="text-light small mb-0"><i className="far fa-clock"></i> 13 mins ago</p>
                                    </div> */}
                                    <div className="card-body">
                                        <p className="mb-0" style={{textAlign: "justify", color:"#9be7fd"}}>
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                            laudantium.
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                            laudantium.
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                            laudantium.
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                            laudantium.
                                        </p>
                                        <p className="small mb-0 text-end text-light"><i className="far fa-clock"></i> 13 mins ago</p>
                                    </div>
                                </div>
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp" alt="avatar"
                                    className="rounded-circle d-flex align-self-center ms-1 shadow-1-strong" width="30" height="30"/>
                            </li>
                        </ul>

                        {/* card footer */}

                        <div className="card-footer">
                            <div className="input-group">
                                <div className="input-group-append">
                                    <span className="input-group-text attach_btn" style={{ padding: "28px 11px 31px 11px"}}><i className="fas fa-paperclip fa-xl"></i></span>
                                </div>
                                <textarea name="" className="form-control type_msg" rows="2" placeholder="Type your message..."></textarea>
                                <div className="input-group-append">
                                    <span className="input-group-text send_btn" style={{ padding: "28px 11px 31px 11px"}}><i className="fas fa-location-arrow fa-xl"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
