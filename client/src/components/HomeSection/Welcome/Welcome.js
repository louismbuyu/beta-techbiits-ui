import React from 'react';
import redImage from '../../../assets/images/redimage.jpg';
import blueImage from '../../../assets/images/bluevr.png';
import './Welcome.scss';
import {Button} from "antd";
import {useActions} from "easy-peasy";

function Welcome(props) {
    const { auth } = useActions(actions => actions);

    const signUpAction = () => {
        auth.setAuthModalType("Sign up");
        auth.toggleAuthModal();
    };

    return (
        <div className="Welcome">
            <div className="welcomeContainer">
                <div className="welcomeTitle">
                    Welcome to <span className="">TechB<span className="logoBlue">i</span><span className="logoRed">i</span>ts</span>
                </div>
                <div className="welcomeDescription">
                    We aggregate tech information so that, you don't have to.
                </div>
                {/*<div onClick={signUpAction} className="signupBtn" htmlType="button">Sign up</div>*/}
            </div>
            <div className="blueContainer">
                <img className="blueImage" src={blueImage} alt="blueImage"/>
            </div>
            <div className="redContainer">
                <img className="redImage" src={redImage} alt="redImage"/>
            </div>
        </div>
    );
}

export default Welcome;