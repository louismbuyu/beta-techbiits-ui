import React, {Component} from 'react';
import './EditProfile.scss';
import {Alert, Button, Col, Dropdown, Form, Icon, Input, Menu, Row, Spin} from "antd";
import axios from "axios";
import {GET_ARTICLES} from "../../actions";
import {connect} from "react-redux";
import defaultImage from "../../assets/images/default_profile_image.png";

const { TextArea } = Input;

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
};

const mapDispatchToProps = dispatch => ({

});

class EditProfile extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedFile: this.props.currentUser ? this.props.currentUser.profileImageUrl: defaultImage,
            selectedFileData: null,
            username: '',
            displayName: '',
            loading: false,
            usernameState: 'success',
            usernameHelp: null,
            bio: null,
            showAlert: 'none',
            alertType: '',
            alertMessage: ''
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            selectedFile: nextProps.currentUser ? nextProps.currentUser.profileImageUrl: defaultImage,
            selectedFileData: null
        });
    }

    fileSelectedHandler = event => {
        console.log("Files: ",event.target.files);
        this.setState({
            selectedFile: URL.createObjectURL(event.target.files[0]),
            selectedFileData: event.target.files[0]
        })
    };

    handleFileUpload = () => {
        this.toggle(true);
        const fd = new FormData();

        if (this.state.selectedFileData) {
            fd.append('avatar', this.state.selectedFileData, this.state.selectedFileData.name);
        }

        if (this.state.username) {
            fd.append('username', this.state.username);
        }

        if (this.state.displayName) {
            fd.append('displayName', this.state.displayName);
        }

        if (this.state.bio) {
            fd.append('bio', this.state.bio);
        }

        fd.append('email',this.props.currentUser.email);

        axios.post('/api/profile/add', fd, {
            onUploadProgress: progressEvent => {
                console.log("Progress: ", Math.round((progressEvent.loaded / progressEvent.total) * 100) + ' %');
            }
        }).then(res => {
            this.toggle(false);
            console.log("res: ",res);
            if (res.data.success){
                this.setState({
                    ...this.state,
                    alertType: 'success',
                    alertMessage: 'Your profile has been successfully updated!!',
                    showAlert: ''
                })
            }else{
                this.setState({
                    ...this.state,
                    alertType: 'error',
                    alertMessage: 'Oops an error has occurred: '+res.message,
                    showAlert: ''
                })
            }
        }).catch((error) => {
            this.setState({
                ...this.state,
                alertType: 'error',
                alertMessage: 'Oops an error has occurred: '+error,
                showAlert: ''
            });
            this.toggle(false);
        })
    };

    menu = () => {
        return (
            <Menu>
                <Menu.Item key="0">
                    <input style={{display: 'none'}}
                           type="file"
                           name="avatar"
                           onChange={this.fileSelectedHandler}
                           ref={fileInput => this.fileInput = fileInput}
                           accept=".jpeg,.png"
                    />
                    <div onClick={() => this.fileInput.click()} >Upload New Photo</div>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="1">
                    Remove Current Photo
                </Menu.Item>
            </Menu>
        );
    };

    onDisplayNameChanged = (value) => {
        this.setState({
            ...this.state,
            displayName: value.target.value
        })
    };

    onBioChanged = (value) => {
        this.setState({
            ...this.state,
            bio: value.target.value
        })
    };

    onUsernameChanged = (value) => {
        this.setState({
            ...this.state,
            username: value.target.value
        })
    };

    saveProfileChanges = () => {
        let noErrorFound = true;
        if (this.state.selectedFileData){
            //Check if image is too large
            if (this.state.selectedFileData.size > 10000){
                //errorFound = false;
                //message.error("Profile Image is larger than 2mb!")
            }
        }

        if (!this.state.username){
            //noErrorFound = false;
            //message.error("Please provide a Username");
        }

        if (!this.state.displayName){
            //noErrorFound = false;
            //message.error("Please provide a Display Name");
        }

        if (noErrorFound){
            this.handleFileUpload();
        }
    };

    toggle = (value) => {
        this.setState({ loading: value });
    };

    formItemLayout = () => {
        return {labelCol: {
            xs: { span: 24 },
            sm: { span: 5 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 12 },
        }
        }
    };

    checkUsernameAvailability = () => {
        this.updateUsernameInfo('validating',null);
        console.log("username: ",this.state.username);
        axios.post('/api/profile/checkusername',{username: this.state.username})
            .then((res) => {
                if (res.data.success){
                    if (res.data.userExists){
                        this.updateUsernameInfo('error','Username is taken!');
                    }else{
                        this.updateUsernameInfo('success',null);
                    }
                }else{
                    //Error
                    this.updateUsernameInfo('error','Oops an error has occurred!');
                }
            })
            .catch((error) => {
                console.log("Error: ",error);
                this.updateUsernameInfo('error','Oops an error has occurred!');
            });
    };

    updateUsernameInfo = (state,message) => {
        this.setState({
            ...this.state,
            usernameState: state,
            usernameHelp: message
        });
    };

    render() {
        const { currentUser } = this.props;
        return (
            <div className="EditProfile">
                <Row>
                    <Col span={12} offset={6}>
                        <Spin spinning={this.state.loading}>
                            <Alert
                                message={this.state.alertMessage}
                                type={this.state.alertType}
                                closable
                                style={{display: this.state.showAlert, marginBottom: '8px'}}
                            />
                            <div className="parentContent">
                                <div className="photoContainer">
                                    <img className="profileImage" src={this.state.selectedFile} alt="mkbhd" width="140px" height="140px"/>
                                    <div className="changeProfileImageBtn">
                                        <Dropdown overlay={this.menu} trigger={['click']}>
                                            <a className="ant-dropdown-link" href="#">
                                                Change image <Icon type="down" />
                                            </a>
                                        </Dropdown>
                                    </div>
                                </div>
                                <Form>

                                    <Form.Item
                                        {...this.formItemLayout}
                                        label="Email"
                                        hasFeedback
                                        required={true}
                                        validateStatus="success"
                                    >
                                        <Input disabled={true} value={currentUser && currentUser.email} id="email" />
                                    </Form.Item>

                                    <div className="usernameContainer">
                                        <Form.Item
                                            {...this.formItemLayout}
                                            label="Username"
                                            required={true}
                                            hasFeedback
                                            validateStatus={this.state.usernameState}
                                            help={this.state.usernameHelp}
                                            className="usernameFormItem"
                                        >
                                            {
                                                currentUser && (<Input onChange={this.onUsernameChanged} defaultValue={currentUser.username} id="username" />)
                                            }
                                        </Form.Item>
                                        <Button className="checkButton" type="primary" htmlType="button"onClick={this.checkUsernameAvailability} >check</Button>
                                    </div>

                                    <Form.Item
                                        {...this.formItemLayout}
                                        label="Display Name"
                                        required={true}
                                    >
                                        {
                                            currentUser && (<Input onChange={this.onDisplayNameChanged} defaultValue={currentUser && currentUser.displayName} id="displayName" />)
                                        }
                                    </Form.Item>

                                    <Form.Item
                                        {...this.formItemLayout}
                                        label="Bio"
                                    >
                                        {
                                            currentUser && (<TextArea id="bio"
                                                                      onChange={this.onBioChanged}
                                                                      placeholder="Tell users about yourself..."
                                                                      defaultValue={currentUser && currentUser.bio}
                                                                      autosize />)
                                        }
                                    </Form.Item>
                                </Form>
                                <div className="footer">
                                    <Button className="saveButton" onClick={this.saveProfileChanges} type="primary" htmlType="button" icon="save">Save</Button>
                                    <Button className="cancelButton" htmlType="button">Cancel</Button>
                                </div>
                            </div>
                        </Spin>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditProfile);

/*
<div className="custom-title ">Username</div>
<div className="custom-input">
    <Input placeholder="Username" onChange={this.onUsernameChanged} defaultValue={currentUser && currentUser.username} />
</div>
<div className="custom-title ">Email</div>
<div className="custom-input">
    <Input disabled={true} placeholder="Email" value={currentUser && currentUser.email} />
</div>
<div className="custom-title ">Name</div>
<div className="custom-input">
    <Input required={true} onChange={this.onNameChanged} placeholder="Name" defaultValue={currentUser && (currentUser.firstName + " " + currentUser.lastName)} />
</div>
<div className="custom-title ">Bio</div>
<TextArea placeholder="Autosize height based on content lines"
          defaultValue={currentUser && currentUser.bio}
          autosize />*/