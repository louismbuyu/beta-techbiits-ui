import React from 'react';
import './Test.scss';
import mkbhd from '../../assets/images/mkbhd.jpg';
import {Icon, Tag} from "antd";

function Test(props) {

    const text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet assumenda autem consequuntur eos fugit ipsam lib";
    return (
        <div className="Test">
            <div className="card">
                <div className="header">
                    <img className="image" src={mkbhd} alt="mkbhdimage"/>
                    <div className="title">
                        MacKenzie Bezos giving ex-husband Jeff 75 percent of Amazon stock, voting control
                    </div>
                </div>
                <div className="category">
                    <Tag color="red">Trending</Tag>
                    <Tag color="red">Startup</Tag>
                </div>
                <div className="bit">
                    {text}
                </div>
                <div className="bit">
                    {text}
                </div>
                <div className="bit">
                    {text}
                </div>
                <div className="bit">
                    {text}
                </div>
                <div className="author">
                    <img className="profileImage" src={mkbhd}  alt="other"/>
                    <div className="profileName">
                        Louis M
                    </div>
                </div>
                <div className="customDivider"/>
                <div className="footer">
                    <div className="left">
                        <Icon className="icon" type="heart" />
                        <Icon className="icon" type="message" />
                    </div>
                    <div className="right">
                        <Icon className="icon" type="star" />
                    </div>
                </div>
                <div className="likes">
                    5000 likes
                </div>
            </div>
        </div>
    );
}

export default Test;