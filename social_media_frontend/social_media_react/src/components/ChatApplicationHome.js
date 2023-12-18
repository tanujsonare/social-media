import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import NavbarForAuthenticated from './NavbarForAuthenticated'
import defaultProfileImage from './images/default_pr_img.webp'
import { getCookie } from '../CsrfToken'

export default function ChatApplicationHome(props) {
    var messageIdsToSeenPromises = [];
    var messageIdsToSeen = [];
    const [searchData, setSearchData] = useState(null)
    const [messagesData, setMessagesData] = useState(null)
    const [acticeChatUserName, setActiceChatUserName] = useState(null)
    const [acticeChatUserId, setActiceChatUserId] = useState(null)
    const [acticeChatUserProfileImage, setActiceChatUserProfileImage] = useState(null)
    var ws_client;
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

    const getMessages = async (userid, username, userimage) => {
        setActiceChatUserId(userid);
        setActiceChatUserName(username);
        setActiceChatUserProfileImage(userimage);
        await axios.get(`http://127.0.0.1/api/get_messages?user_id=${userid}&requested_user_id=${props.userId}`
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

    const getChat = async (e) =>{
        const userId = e.currentTarget.getAttribute("userid");
        const userName = e.currentTarget.getAttribute("username");
        const userImage = e.currentTarget.getAttribute("profile_image");
        window.history.pushState({}, '', '/chat');
        await getMessages(userId, userName, userImage);
        await Promise.all(messageIdsToSeenPromises).then((response) => {
            if (messageIdsToSeenPromises.length > 0){
                callMessageSeenApi(messageIdsToSeenPromises);
            }
        })
        ws_client = new WebSocket(
            'ws://' +
            window.location.host +
            '/ws/chat/' +
            props.userName + 
            userName +
            "_chat"
        );
        // await ws_client;
        ws_client.onmessage = (e) =>{
            const data = JSON.parse(e.data);
            console.log(data);
        }
    }

    const callMessageSeenApi = async(messageIdsToSeen) =>{
        await axios.get(`http://127.0.0.1/api/message_seen?message_ids=${messageIdsToSeen}`
        ).then(response => {
            if (response.data) {
                console.log(response.data);
            }
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status == 400) {
                    console.log(error.response.error_message);
                }
            }
        });
    } 

    useEffect(() => {
        if (window.location.href.includes("userid") && window.location.href.includes("username")) {
            const userIdNameAndImage = window.location.href.split("userid=")[1].split("&username=");
            const userId = userIdNameAndImage[0];
            const userNameAndImage = userIdNameAndImage[1].split("&profile_image=");
            const userName = userNameAndImage[0];
            const userImage = userNameAndImage[1];
            if (userId, userName){
                getMessages(userId, userName, userImage);   
            }  
        }
    }, [])

    const addNewMessage = async()=>{
        var data = new FormData();
        let messageText = document.getElementsByClassName("message_content")[0].value;
        if (messageText != null && messageText != undefined && messageText != ""){
            data.append("receiver_user", acticeChatUserId);
            data.append("sender_user", props.userId);
            data.append("content", messageText);
            const headers = {
                'X-CSRFToken': getCookie("csrftoken")
            };
            await axios.post('http://127.0.0.1/api/add_new_message',
                data,
                { headers }
            ).then(response => {
                getMessages(acticeChatUserId, acticeChatUserName, acticeChatUserProfileImage);
                document.getElementsByClassName("message_content")[0].value = "";
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status == 400) {
                        alert(error.response.error_message);
                    }
                }
            });
        }else{
            alert("Please write some content to send message.")
        }
    }

    return (
        <div className="custom-background" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%', minHeight: '700px' }}>
            <NavbarForAuthenticated userName={props.userName} userToken={props.userToken} />
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-6 col-lg-5 col-xl-5 mb-4 mb-md-0">
                        <div className="card mask-custom my-4">
                        <Link className="text-light my-3" to="/chat_search" style={{ textDecoration: "none" }}>
                            <i className="fas fa-search text-light"></i>
                            &nbsp; Search
                        </Link>
                            <div className="card-body" >
                                <ul className="list-unstyled mb-0 overflow-auto" style={{ minHeight: "400px", maxHeight: "470px" }}>
                                    {searchData && searchData.map((element) => {
                                        return element.is_following == true && element.is_conversation && <li className="p-2 border-bottom search_user" style={{ borderBottom: "1px solid rgba(255,255,255,.3) !important" }} key={element.id} userid={element.id} username={element.username} profile_image={element.profile_image} role='button' onClick={getChat}>
                                            <div className="d-flex justify-content-between link-light">
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
                                            </div>
                                        </li>
                                    })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* personal chat section */}
                    {searchData && <div className="card col-md-6 col-lg-7 col-xl-7 custom-background text-light chat_box rounded-5">

                        {/* card header */}

                        {acticeChatUserId && acticeChatUserName && <div className="card-header msg_head my-2" style={{ borderBottom: "1px solid white" }}>
                            <div className="d-flex bd-highlight">
                                <div className="img_cont">
                                    <img src={acticeChatUserProfileImage !== null  && acticeChatUserProfileImage != "" ? acticeChatUserProfileImage : defaultProfileImage} className="rounded-circle user_img" width="60" height="60" />
                                    <span className="online_icon"></span>
                                </div>
                                <div className="user_info">
                                    <span className='mx-3'>{acticeChatUserName ? acticeChatUserName : ""}</span>
                                    <p className='text-success'>Online</p>
                                </div>
                            </div>
                        </div>}
                        {!acticeChatUserId && !acticeChatUserName &&
                            <h1 className='text-light my-5'>Select any user or search user to start chat</h1>
                        }
                        {/* message section */}

                        <ul className="list-unstyled text-white overflow-auto my-3" style={{ maxHeight: "380px", minHeight: "380px" }}>
                            {messagesData &&  messagesData.map((element) => {
                                messageIdsToSeenPromises.push(element.sender_user !== Number(props.userId) && !element.is_seen ? element.id : null)
                                return element.sender_user === Number(props.userId) ? 

                                /* sender user */
                                (<li className="d-flex justify-content-end mb-4" key={element.id}>
                                    <div className="card mask-custom w-50 mx-2">
                                        <div className="card-body">
                                            <p className="mb-0" style={{ textAlign: "justify", color: "#e1be3f" }}>{element.content}</p>
                                            <p className="text-light small mb-0 text-end"><i className="far fa-clock"></i>&nbsp; {element.created_at ? props.getTimeDifference(element.created_at) : ""}</p>
                                        </div>
                                    </div>
                                    <img src={props.profileImage ? props.profileImage : defaultProfileImage} alt="avatar"
                                        className="rounded-circle d-flex align-self-center me-1 shadow-1-strong" width="30" height="30" />
                                </li>)
                                : 
                                /* receiver user */
                                (
                                <li className="d-flex justify-content-start mb-4" key={element.id}>
                                    <img src={acticeChatUserProfileImage ? acticeChatUserProfileImage : defaultProfileImage } alt="avatar"
                                        className="rounded-circle align-self-center ms-1 shadow-1-strong" width="30" height="30" />
                                    <div className="card mask-custom w-50 mx-2">
                                        <div className="card-body">
                                            <p className="mb-0" style={{ textAlign: "justify", color: "#9be7fd" }}>{element.content}</p>
                                            <p className="small mb-0 text-end text-light"><i className="far fa-clock"></i>&nbsp; {element.created_at ? props.getTimeDifference(element.created_at) : ""}</p>
                                        </div>
                                    </div>
                                </li>)
                            })
                            }
                        </ul>

                        {/* card footer */}

                        {acticeChatUserId && acticeChatUserName && <div className="card-footer">
                            <div className="input-group">
                                    <div className="input-group-append">
                                        <span className="input-group-text attach_btn media_content" style={{ padding: "28px 11px 31px 11px" }}><i className="fas fa-paperclip fa-xl"></i></span>
                                    </div>
                                    <textarea name="" className="form-control message_content" rows="2" placeholder="Type your message..."></textarea>
                                    <div className="input-group-append">
                                        <span className="input-group-text send_btn" type="submit" style={{ padding: "28px 11px 31px 11px" }} onClick={addNewMessage}><i className="fas fa-location-arrow fa-xl"></i></span>
                                    </div>
                            </div>
                        </div>}
                    </div>}
                </div>
            </div>
        </div>
    )
}
