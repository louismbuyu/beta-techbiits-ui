import React, {Component} from 'react';
import './MediaList.scss';
import {Button, Col, Divider, Input, Modal, Radio, Row, Select} from "antd";
import defaultImage from '../../assets/images/default_profile_image.png';
import MediaItem from "../mediaItem/MediaItem";

const Search = Input.Search;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class MediaList extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: 1,
            visible: false
        };
    }

    addAction = () => {
        console.log("addAction");
    };

    handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    handleBlur = () => {
        console.log('blur');
    };

    handleFocus = () => {
        console.log('focus');
    };

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

    previewSelection = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    render() {
        return (
            <div className="MediaList">
                <div className="mediaHeader">
                    <div className="title">
                        Select the Media Networks you would like to add to your list
                    </div>
                    <Divider className="filtersDivider">Filters</Divider>
                    <div className="filters">
                        <Row gutter={16} >
                            <Col xs={{span: 24}} md={{span: 8}}>
                                <div className="search">
                                    <div className="label">
                                        Search
                                    </div>
                                    <Search
                                        style={{ width: '100%' }}
                                        placeholder="input search text"
                                        onSearch={value => console.log(value)}
                                        enterButton
                                    />
                                </div>
                            </Col>
                            <Col xs={{span: 12}} md={{span: 8}}>
                                <div className="language">
                                    <div className="label">
                                        Language
                                    </div>
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Select a person"
                                        optionFilterProp="children"
                                        onChange={this.handleChange}
                                        onFocus={this.handleFocus}
                                        onBlur={this.handleBlur}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="tom">Tom</Option>
                                    </Select>
                                </div>
                            </Col>
                            <Col xs={{span: 12}} md={{span: 8}}>
                                <div className="country">
                                    <div className="label">
                                        Country
                                    </div>
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Select a person"
                                        optionFilterProp="children"
                                        onChange={this.handleChange}
                                        onFocus={this.handleFocus}
                                        onBlur={this.handleBlur}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="tom">Tom</Option>
                                    </Select>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Divider className="filtersDivider">Sort</Divider>
                    <div className="filters">
                        <Row>
                            <Col xs={{span:24}} style={{textAlign: 'center'}}>
                                <RadioGroup onChange={this.onChange} value={this.state.value}>
                                    <Radio value={1}>Title</Radio>
                                    <Radio value={2}>Language</Radio>
                                    <Radio value={3}>Country</Radio>
                                    <Radio value={4}>Subscribers</Radio>
                                </RadioGroup>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="columnsContainer">
                    <div className="columns">
                        <Row>
                            <Col xs={{ span: 24}} sm={{span: 9}} md={{span: 7}} lg={{ span: 7}} >
                                Name
                            </Col>
                            <Col xs={{ span: 24}} sm={{span: 12}} md={{span: 13}} lg={{ span: 13}}>
                                <Col xs={{ span: 8}} sm={{span: 24}} md={{span: 8}} lg={{ span: 8}}>
                                    Language
                                </Col>
                                <Col xs={{ span: 8}} sm={{span: 24}} md={{span: 8}} lg={{ span: 8}}>
                                    Country
                                </Col>
                                <Col xs={{ span: 8}} sm={{span: 24}} md={{span: 8}} lg={{ span: 8}}>
                                    Subscribers
                                </Col>
                            </Col>
                            <Col xs={{ span: 24}} sm={{span: 3}} md={{span: 4}} lg={{ span: 4}}>

                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="mediaBody">
                    <div className="networks">
                        {
                            this.props.mediaNetworks.map(()=> {
                                return (<MediaItem/>);
                            })
                        }
                    </div>
                </div>
                <div className="selectedMediaCompanies">
                    <Row type="flex" align="middle">
                        <Col span={12}>
                            <div className="confirmAmountContainer">
                                <div className="confirmAmount">
                                    <span className="networkAmount">10</span> networks added
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="confirmBtnContainer">
                                <Button className="confirmBtn" type="primary" htmlType="button" onClick={this.previewSelection}>PREVIEW</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Modal
                    title="Basic Modal"
                    centered
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className="modalContent">
                        <div className="selectedNetwork">
                            <div className="image">
                                <img className="image" src={defaultImage} alt=""/>
                            </div>
                            <div className="title">
                                TechCrunch
                            </div>
                            <Button className="remove" htmlType="button" type="danger" ghost shape="circle" icon="minus"/>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default MediaList;