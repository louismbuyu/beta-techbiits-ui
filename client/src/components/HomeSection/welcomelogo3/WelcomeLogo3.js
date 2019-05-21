import React, {Component} from 'react';
import './WelcomeLogo3.scss';
import {Button, Col, Row} from "antd";

class WelcomeLogo3 extends Component {
    render() {
        return (
            <div className="WelcomeLogo3">
                <Row>
                    <Col span={12} >
                        <div className="left">
                            <div className="container_left">
                                <div className="title">
                                    Discover <span className="">everything</span> about <span className="">tech</span> on one platform.
                                </div>
                                <div className="description">
                                    We aggregate tech information so that, you don't have to.
                                    News, Smart phones, Cryto Currencies and much more.
                                </div>
                                <div className="actions">
                                    <Button className="signupBtn" type="primary" htmlType="button">Sign up</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={12} >
                        <div className="right">
                            <div className="container_right">
                                <div className="slogan">
                                    EVERY.
                                </div>
                                <div className="slogan">
                                    THING.
                                </div>
                                <div className="slogan">
                                    <span className="red">TECH.</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default WelcomeLogo3;