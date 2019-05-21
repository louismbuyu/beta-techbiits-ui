import React, {Component} from 'react';
import './PhotoItem.scss';
import {Modal} from "antd";

class PhotoItem extends Component {

    constructor(props){
        super(props);
    }

    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        const image = this.props.photoItem && this.props.photoItem.imageUrl;
        const providerImage = this.props.photoItem && this.props.photoItem.providerImageUrl;
        return (
            <div className="PhotoItem">
                <div onClick={() => {this.showModal()}}>
                    <div className="photo_image_container">
                        <img className="photo_image" src={image} alt="testImage1" width="100%"/>
                    </div>
                </div>
                <img className="photo_provider_image" src={providerImage} alt="mkbhd" width="30px" height="30px"/>
                <div className="photo_provider_name">
                    {this.props.photoItem && this.props.photoItem.providerName}
                </div>
                <Modal
                    title={<span><img className="photo_provider_image" src={providerImage} alt="mkbhd" width="30px" height="30px"/><span> MKBHD</span></span>}
                    visible={this.state.visible}
                    footer={<span>source: {this.props.photoItem && this.props.photoItem.sourceUrl}</span>}
                    onCancel={this.handleCancel}>
                    <img className="photo_image" src={image} alt="testImage1" width="100%"/>
                </Modal>
            </div>
        );
    }
}

export default PhotoItem;