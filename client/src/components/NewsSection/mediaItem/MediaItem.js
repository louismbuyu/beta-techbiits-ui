import React, {Component} from 'react';
import './MediaItem.scss';
import defaultImage from "../../assets/images/default_profile_image.png";
import {Button, Col, Row} from "antd";

class MediaItem extends Component {
    render() {
        return (
            <div className="MediaItem">
                <Row type="flex" justify="center" align="middle">
                    <Col xs={{ span: 24}} sm={{span: 9}} md={{span: 7}} lg={{ span: 7}}>
                        <div className="Name">
                            <img className="image" src={defaultImage} alt=""/>
                            <div className="content">
                                <div className="title">
                                    TechCrunch
                                </div>
                                <div className="description">
                                    techcrunch.com
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={{ span: 24}} sm={{span: 11}} md={{span: 13}} lg={{ span: 13}}>
                        <Col xs={{ span: 8}} sm={{span: 24}} md={{span: 8}} lg={{ span: 8}} className="">
                            English
                        </Col>
                        <Col xs={{ span: 8}} sm={{span: 24}} md={{span: 8}} lg={{ span: 8}} className="">
                            United States
                        </Col>
                        <Col xs={{ span: 8}} sm={{span: 24}} md={{span: 8}} lg={{ span: 8}} className="">
                            100 000
                        </Col>
                    </Col>
                    <Col xs={{ span: 24}} sm={{span: 4}} md={{span: 4}} lg={{ span: 4}} className="">
                        <div className="actions">
                            <Button type="primary" htmlType="button" icon="plus" onClick={this.addAction}>ADD</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MediaItem;