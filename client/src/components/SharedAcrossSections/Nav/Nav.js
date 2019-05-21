import React from 'react';
import './Nav.scss';
import menu_icon from '../../../assets/icons/menu_icon.svg';
import techzeit_logo from '../../../assets/images/techzeit_logo.png';
import scoop from '../../../assets/images/scoop.png';
import mkbhd from '../../../assets/images/mkbhd.jpg';
import {Button, Dropdown} from "antd";
import { useStore, useActions } from 'easy-peasy';
import DropDownMenu from '../DropDownMenu/DropDownMenu';

function Nav() {
    const { currentUser } = useStore(state => state.auth);
    const { menu, auth } = useActions(actions => actions);

    const loginAction = () => {
        auth.setAuthModalType("Login");
        auth.toggleAuthModal();
    };

    const signUpAction = () => {
        auth.setAuthModalType("Sign up");
        auth.toggleAuthModal();
    };

    const renderTopRightContent = (currentUser) => {
        if (currentUser){
            return (<div className="rightItems">
                <Dropdown className="profileContainer" overlay={DropDownMenu} placement="bottomRight" trigger={['click']}>
                    <img className="profileImage" src={mkbhd} alt="mkbhd" width="40px" height="40px"/>
                </Dropdown>
            </div>);
        }else {
            return (<div className="rightItems">
                <div onClick={loginAction} className="logInBtn" >Log In</div>
                <div onClick={signUpAction} className="signUpBtn" >Sign up</div>
            </div>);
        }
    };

    return (
        <div className="Nav">
            <div className="leftItems">
                <div onClick={menu.toggleMenu} className="toggleSidebar">
                    <img src={menu_icon} alt="menu_icon" height="26px" width="26px"/>
                </div>
                <div className="separator">
                </div>
                <div className="logo">
                    TechB<span className="leftI">i</span><span className="rightI">i</span>ts
                </div>
            </div>
            {
                //renderTopRightContent(currentUser)
            }
        </div>
    )
}

export default Nav;

/*<img src={scoop} alt="techzeit_logo" height="24px" width="36px"/>*/