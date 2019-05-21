import React, {Component} from 'react';
import './AddContent.scss';
import {Button} from "antd";

class AddContent extends Component {

    addContentAction = () => {
        this.props.addContentAction();
    };

    render() {
        return (
            <div className="AddContent">
                <div className="title">
                    Personalize your feed
                </div>
                <div className="description">
                    Keep up with the topics, sources and trends that matter to you. All in one place.
                </div>
                <div className="actions">
                    <Button type="primary" className="addContentBtn" onClick={this.addContentAction} >ADD CONTENT</Button>
                </div>
            </div>
        );
    }
}

export default AddContent;