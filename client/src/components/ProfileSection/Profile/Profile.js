import React, {Component} from 'react';
import './Profile.scss';
import {Button, Col, Row, Tabs} from "antd";
import defaultImage from '../../assets/images/default_profile_image.png';
import NewsItemLarge from "../NewsSection/News/News";
import axios from "axios";
import {GET_ARTICLES} from "../../actions";
import {connect} from "react-redux";
import {NavLink} from "react-navi";

const mapStateToProps = state => {
    return {
        getArticles : state.getArticles,
        currentUser: state.currentUser
    }
};

const mapDispatchToProps = dispatch => ({
    getAllArticles: ({page,count,mainCategory, mainSubcategory}) => {
        axios.post('/api/userarticles/',{page:page, count:count,mainCategory:mainCategory, mainSubcategory:mainSubcategory})
            .then(res => {
                if (res.data.success === true){
                    console.log(res.data.articles);
                    dispatch({type: GET_ARTICLES, articles: res.data.articles});
                }
            }).catch((error) => {
            //console.log(error);
        })
    }
});

class Profile extends Component {

    componentWillMount() {
        //this.props.getAllArticles({page:1,count:2,mainCategory:this.props.category,mainSubcategory:this.props.subcategory});
    }

    callback = (key) => {
        console.log(key);
    };

    render() {
        const { currentUser } = this.props;
        console.log("Profile: ",currentUser);
        return (
            <div className="Profile">
                <Row>
                    <Col span={18} offset={3} className="parentContent">
                        <div className="profileContainer">
                            <div className="profileInfo">
                                <div className="profileTitleContainer">
                                    <div className="profileName">
                                        {currentUser ? currentUser.displayName: "--"}
                                    </div>
                                    <NavLink href="/profile/edit/">
                                        <Button type="primary" className="editProfileBtn" size="small" htmlType="btn" ghost >Edit profile</Button>
                                    </NavLink>
                                </div>
                                <div className="profileBioContainer">
                                    <div className="bio">
                                        {currentUser && currentUser.bio}
                                    </div>
                                </div>
                            </div>
                            <div className="profileImageContainer">
                                <img className="profileImage" src={currentUser ? currentUser.profileImageUrl: defaultImage} alt="profileImage" width="80px" height="80px"/>
                            </div>
                        </div>
                        <div className="">
                            <Tabs defaultActiveKey="1" onChange={this.callback}>
                                <Tabs.TabPane tab="Liked" key="1">
                                    {
                                        currentUser && currentUser.reactions && currentUser.reactions.map((reaction,index) => (
                                            <NewsItemLarge key={index} article={reaction.article}/>
                                        ))
                                    }
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Viewed" key="2">Content of Tab Pane 2</Tabs.TabPane>
                            </Tabs>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);