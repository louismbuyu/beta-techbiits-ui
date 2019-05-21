import React, {useEffect, useState} from 'react';
import './ArticleCard.scss';
import moment from "moment";
import heart_filled from "../../../assets/icons/heart_filled.png";
import heart_unfilled from "../../../assets/icons/heart_unfilled.png";
import eye_filled from "../../../assets/icons/eye_filled.png";
import eye_unfilled from "../../../assets/icons/eye_unfilled.png";
import {Icon, Skeleton} from "antd";

function ArticleCard(props) {

    const [loadingImage, setLoadingImage] = useState(true);

    const { article } = props;
    const timeStamp = article ? moment(article.timeStamp).format("DD MMM YYYY"): "--";
    let parentCategory = null;

    if (article && article.parentCategories && article.parentCategories.length > 0){
        console.log(article.parentCategories)
        parentCategory = article.parentCategories[0].displayName;
    }

    let category = null;

    if (article && article.categories && article.categories.length > 0){
        category = article.categories[0].displayName;
    }
    const listOfViews = [];
    const listOfLikes = [];
    const likeAction = () => {
        //this.props.likeArticle(article._id)
    };

    const viewAction = () => {
        //this.props.viewArticle(article._id)
    };

    useEffect( () => {
        if (article && article.imageUrl){
            testImage(article.imageUrl);
        }
    }, []);

    function testImage(URL) {
        let tester=new Image();
        tester.onload=imageFound;
        tester.onerror=imageNotFound;
        tester.src=URL;
    }

    const imageFound = () => {
        setLoadingImage(false)
    };

    const imageNotFound = () => {
        //console.log('That image was not found.');
    };

    return (
        <div className="ArticleCard">
            <img className="providerImage" src={article && article.provider.profileImageUrl} alt="providerImage"/>
            <div className="header">
                <div className="providerDisplayName">{article && article.provider.displayName}</div>
                <div className="timeStamp">{timeStamp}</div>
            </div>
            <a className="articleTitle" href={article ? article.url: ""} target="_blank" onClick={viewAction}>
                {article && article.title}
            </a>
            <Skeleton className="articleImage" active loading={loadingImage} size="large" shape="circle">
                <img className="articleImage" src={article.imageUrl} alt="articleimage"/>
            </Skeleton>
            <div className="actions">
                <div className="views actionItem">
                    {
                        /*listOfViews.includes(article._id) ?
                            <img src={eye_filled} alt="clickIcon" width="24px" height="24px"/>
                            :
                            <Icon className="defaultIcon2" type="eye" theme="" />
                    */}
                    {
                        /*article.viewsCount > 0 &&
                        <div className="actionValue">
                            {article.viewsCount}
                        </div>
                    */}
                </div>
                <div className="likes actionItem" onClick={likeAction}>
                    {
                        /*listOfLikes.includes(article._id) ?
                            <img className="clickable" src={heart_filled} alt="upIcon" width="24px" height="24px"/>
                            :
                            <Icon className="defaultIconLikes2" type="heart" theme="" />
                    */}
                    {
                        /*article.likesCount > 0 &&
                            <div className="actionValue">
                                {article.likesCount}
                            </div>
                    */}
                </div>
            </div>
        </div>
    );
}

//<img src={eye_unfilled} alt="clickIcon" width="24px" height="24px"/>
//<img className="clickable" onClick={likeAction} src={heart_unfilled} alt="upIcon" width="24px" height="24px"/>

export default ArticleCard;