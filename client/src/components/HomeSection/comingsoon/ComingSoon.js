import React, {Component} from 'react';
import './ComingSoon.scss';
import iphone_mock from '../../../assets/images/iphone_mock.png';
import appstorelogo from '../../../assets/images/appstorelogo.png';
import android_mock from '../../../assets/images/pixel3_mock.png';
import playstorelogo from '../../../assets/images/playstorelogo.png';
import {Col, Row} from "antd";

class ComingSoon extends Component {
    render() {
        return (
            <div className="ComingSoon">
                <Row gutter={32}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                        <div className="test4">
                            <img src={iphone_mock} alt="iphone_mock" width="100px"/>
                            <div className="test3">
                                <div>
                                    Coming Soon
                                </div>
                                <div>
                                    To the
                                </div>
                                <div>
                                    App Store
                                </div>
                                <img src={appstorelogo} alt="appstorelogo" width="140px"/>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                        <div className="test2">
                            <img src={android_mock} alt="iphone_mock" width="100px" height="205px"/>
                            <div className="test3">
                                <div>
                                    Coming Soon
                                </div>
                                <div>
                                    To the
                                </div>
                                <div>
                                    Play Store
                                </div>
                                <img src={playstorelogo} alt="playstorelogo" width="140px"/>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ComingSoon;