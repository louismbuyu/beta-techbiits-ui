import React, {Component} from 'react';
import moment from 'moment';
import './NewsItemCard.scss';
import {Tag} from "antd";
import convertCategories from '../../../data/convertCategory';
import convertSubcategories from '../../../data/convertSubcategory';
import heart_filled from "../../../assets/icons/heart_filled.png";
import heart_unfilled from "../../../assets/icons/heart_unfilled.png";
import eye_filled from "../../../assets/icons/eye_filled.png";
import eye_unfilled from "../../../assets/icons/eye_unfilled.png";
import {ADD_ID_TO_LIST_OF_VIEWS, CHANGE_LIST_OF_LIKES} from "../../../actions";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        listOfLikes: state.listOfLikes,
        listOfViews: state.listOfViews
    };
};

const mapDispatchToProps = dispatch => ({

    likeArticle: (id) => {
        dispatch({type: CHANGE_LIST_OF_LIKES, id: id})
    },
    viewArticle: (id) => {
        dispatch({type: ADD_ID_TO_LIST_OF_VIEWS, id: id})
    }
});

class NewsItemCard extends Component {


    render() {
        const { article } = this.props;
        const timeStamp = article ? moment(article.timeStamp).format("DD MMM YYYY"): "--";
        const listOfViews = [];
        const listOfLikes = [];

        const likeAction = () => {
            this.props.likeArticle(article._id)
        };

        const viewAction = () => {
            this.props.viewArticle(article._id)
        };

        return (
            <div className="NewsItemLarge">
                <div className="article_actions">
                    <div className="article_likes">
                        {
                            listOfLikes.includes(article._id) ?
                                <img className="clickable" onClick={likeAction} src={heart_filled} alt="upIcon" width="24px" height="24px"/>
                                :
                                <img className="clickable" onClick={likeAction} src={heart_unfilled} alt="upIcon" width="24px" height="24px"/>
                        }
                        <div className="article_likes_value">
                            {article.likesCount}
                        </div>
                    </div>
                    <div className="article_views">
                        {
                            listOfViews.includes(article._id) ?
                                <img src={eye_filled} alt="clickIcon" width="24px" height="24px"/>
                                :
                                <img src={eye_unfilled} alt="clickIcon" width="24px" height="24px"/>
                        }
                        <div className="article_clicks_value">
                            {article.viewsCount}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="article_tags">
                        <Tag color="geekblue">{convertCategories[article.mainCategory]}</Tag>
                        <Tag color="blue">{convertSubcategories[article.mainSubcategory]}</Tag>
                    </div>
                    <a onClick={viewAction} href={article ? article.url: ""} target="_blank">
                        <div className="article_content">
                            <div className="article_image_container">
                                <img className="article_image" src={article ? article.imageUrl : ""} alt="" />
                            </div>
                            <div className="article_info">
                                <div className="article_title">
                                    {article && article.title}
                                </div>
                                <div className="article_source_info">
                                    <div className="article_timestamp">
                                        {timeStamp}
                                    </div>
                                    <div className="article_provider">
                                        <img className="article_provider_image" src={article && article.providerImageUrl} alt="wired_logo"/>
                                        <div className="article_provider_display">
                                            {article && article.providerDisplayName}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default NewsItemCard;