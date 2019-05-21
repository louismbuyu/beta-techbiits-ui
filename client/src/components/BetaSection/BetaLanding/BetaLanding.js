import React, {useState} from 'react';
import './BetaLanding.scss';
import LoginComponent from "../LoginComponent/LoginComponent";

function BetaLanding(props) {

    const [authType, setAuthType] = useState(true);

    const toggleAuthType = () => {
        console.log(authType);
        setAuthType(!authType);
        console.log(authType);
    };

    return (
        <div className="BetaLanding">
            <div className="left">
                <div className="welcomeContainer">
                    <div className="welcome">
                        Welcome to <div>TechB<span className="lefti">i</span><span className="righti">i</span>ts.</div>
                    </div>
                    <div className="slogan">
                        <div>
                            EVERY.
                        </div>
                        <div>
                            THING.
                        </div>
                        <div>
                            TECH...
                        </div>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="loginContainer">
                    <div className="header">
                        TechB<span className="headerLeftI">i</span><span className="headerRightI">i</span>ts
                    </div>
                    <div className="body">
                        <LoginComponent authType={authType}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BetaLanding;