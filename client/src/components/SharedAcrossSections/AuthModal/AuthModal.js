import React, {Component} from 'react';
import {Button, Modal} from "antd";
import google_icon from '../../../assets/images/google_icon.png';
import twitter_icon from '../../../assets/images/twitter_icon.jpg';
import facebook_icon from '../../../assets/images/facebook_icon.png';
import github_icon from '../../../assets/images/github_icon.png';
import './AuthModal.scss';
import { useStore, useActions } from 'easy-peasy';
import {Link} from "react-router-dom";

function AuthModal() {
    const { isAuthModalOpen, authModalType} = useStore(state => state.auth);
    const { setAuthModalType, toggleAuthModal } = useActions(actions => actions.auth);
    return (
        <div className="AuthModal">
            <Modal
                title=""
                visible={isAuthModalOpen}
                footer={null}
                onCancel={() => toggleAuthModal()}
                align="center">
                <div className="model_content">
                    <h1>{authModalType}</h1>
                    <div className="info">
                        Everything Tech. In one place.
                    </div>
                    <div className="google_btn_container">
                        <a href="http://localhost:5000/auth/google">
                            <Button htmlType="btn">
                                <div className="google_btn_content">
                                    <img className="signup_img" src={google_icon} alt="google_icon" width="16px" height="16px"/>
                                    {authModalType} with Google
                                </div>
                            </Button>
                        </a>
                    </div>
                    {/*<div className="github_btn_container">
                        <Link to="/auth/github">
                            <Button htmlType="btn">
                                <div className="google_btn_content">
                                    <img className="signup_img" src={github_icon} alt="github_icon" width="16px" height="16px"/>
                                    {authModalType} with Github
                                </div>
                            </Button>
                        </Link>
                    </div>
                    <div className="twitter_btn_container">
                        <Link to="/auth/twitter">
                            <Button htmlType="btn">
                                <div className="twitter_btn_content">
                                    <img className="signup_img" src={twitter_icon} alt="twitter_icon" width="16px" height="16px"/>
                                    {authModalType} with Twitter
                                </div>
                            </Button>
                        </Link>
                    </div>
                    <div className="facebook_btn_container">
                        <Link to="/auth/facebook">
                            <Button htmlType="btn">
                                <div className="facebook_btn_content">
                                    <img className="signup_img" src={facebook_icon} alt="facebook_icon" width="16px" height="16px"/>
                                    {authModalType} with Facebook
                                </div>
                            </Button>
                        </Link>
                    </div>*/}
                    {
                        authModalType === "Sign up" ?
                            <div>
                                <div className="signin">
                                    Already have an account?{" "}
                                    <a onClick={() => setAuthModalType("Login")} ghost>
                                        Login
                                    </a>
                                </div>
                                <div className="policy">
                                    Click “Sign up” above to accept TechZeit’s <a href="">Terms of Service</a> & <a href="">Privacy Policy</a>.
                                </div>
                            </div>:
                            <div>
                                <div className="signin">
                                    Already have an account?{" "}
                                    <a onClick={() => setAuthModalType("Sign up")} ghost>
                                        Sign up
                                    </a>
                                </div>
                            </div>
                    }
                </div>
            </Modal>
        </div>
    )
}

export default AuthModal;