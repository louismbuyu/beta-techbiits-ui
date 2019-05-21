import React from 'react';
import './Post.scss';
import eye_filled from "../../../assets/icons/eye_filled.png";
import eye_unfilled from "../../../assets/icons/eye_unfilled.png";
import {Tag} from "antd";
import heart_filled from "../../../assets/icons/heart_filled.png";
import heart_unfilled from "../../../assets/icons/heart_unfilled.png";
import moment from 'moment';
import {useActions, useStore} from "easy-peasy";

function Post({item}){

    const { currentUser } = useStore(state => state.auth);
    const { auth } = useActions(actions => actions);

    const likeAction = (currentUser) => {
        if (currentUser){
            console.log("user is authenticated: SEND USER VIEW");
        }else{
            console.log("user is NOT-authenticated: SEND ANONYMOUS VIEW");
            auth.setAuthModalType("Sign up");
            auth.toggleAuthModal();
        }
    };

    const viewAction = () => {

    };

    let { url, title, categories, provider, listOfViews, listOfLikes, imageUrl } = item;
    const timeStamp = item ? moment(item.date).format("DD MMM YYYY"): "--";
    let video = true;
    if (imageUrl){
        video = false;
    }

    if (!listOfLikes || listOfLikes === undefined){
        listOfLikes = []
    }

    if (!listOfViews || listOfViews === undefined){
        listOfViews = []
    }

    return (
        <div className="Post">
            <div className="mainContainer">
                <div className="postHeaderContainer">
                    {
                        video ? <iframe scrolling="no" align="middle" height="100%" className="postIframe" src={url}>
                            </iframe>:
                            <a onClick={() => viewAction(currentUser)} href={url} target="_blank" rel="noopener noreferrer">
                                <img className="postImage" src={imageUrl} alt="imgae"/>
                            </a>
                    }
                </div>
                <div className="postBodyContainer">
                    <a onClick={() => viewAction(currentUser)} href={url} target="_blank" rel="noopener noreferrer">
                        <div className="titleContainer">
                            <div className="title">
                                {title}
                            </div>
                        </div>
                        <div className="providerContainer">
                            <div className="providerImageContainer">
                                <img src={provider.profileImageUrl} className="providerImage" alt="providerImage"/>
                            </div>
                            <div className="article_provider_display">
                                {provider.displayName} &bull;{" "}
                                <span className="article_timestamp">
                                    {timeStamp}
                                </span>
                            </div>
                        </div>
                        <div className="tagsContainer">
                            {
                                categories && categories.map( (v,i) => {
                                    return (<Tag color="geekblue" key={i}>{v.displayName}</Tag>)
                                })
                            }
                        </div>
                    </a>
                </div>
                <div className="article_actions">
                    <div className="article_likes">
                        {
                            /*listOfLikes.length > 0 ?
                                listOfLikes.includes('10') &&
                                <img className="clickable" onClick={() => likeAction()} src={heart_filled} alt="upIcon" width="24px" height="24px"/>
                                :<img className="clickable" onClick={() => likeAction()} src={heart_unfilled} alt="upIcon" width="24px" height="24px"/>
                        */}
                        <div className="article_likes_value">
                            {/*listOfLikes.length*/}
                        </div>
                    </div>
                    <div className="article_views">
                        {
                            listOfViews.length > 0 ?
                                listOfViews.includes('1') ?
                                    (<img src={eye_filled} alt="clickIcon" width="24px" height="24px"/>)
                                    :
                                    (<img src={eye_unfilled} alt="clickIcon" width="24px" height="24px"/>)
                                :
                                <div></div>
                        }
                        <div className="article_clicks_value">
                            {listOfViews.length > 0 ? listOfViews.length : (<div className="newItem">new</div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;