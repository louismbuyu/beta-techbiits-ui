import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
import { useStore, useActions } from 'easy-peasy';

function LoginComponent(props) {

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                if (props.authType){
                    console.log("LOGIN");
                    axios.post('/auth/betaverify', {'username':values.username,'password':values.password}).then(response => {
                        console.log(response);
                    }).catch(error => {
                        console.log(error);
                    })
                }else {
                    console.log("SIGNUP");
                    axios.post('', {}).then(response => {
                        console.log(response);
                    }).catch(error => {
                        console.log(error);
                    })
                }
            }
        });
    };

    const compareToFirstPassword = (rule, value, callback) => {
        const form = props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    const { getFieldDecorator } = props.form;

    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username or email!' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username or Email" />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
            </Form.Item>
            {
                !props.authType &&
                <Form.Item>
                    {getFieldDecorator('repassword', {
                        rules: [{ required: true, message: 'Please re-enter your Password!' },
                            {
                                validator: compareToFirstPassword,
                            }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Re-enter Password" />
                    )}
                </Form.Item>
            }
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    {
                        props.authType ? <span>Log in</span>:
                            <span>Sign up</span>
                    }
                </Button>
            </Form.Item>
        </Form>
    );
}

//export default LoginComponent;

                    /*
class LoginComponent extends React.Component {

    constructor(props){
        super(props);
    }

    const { currentUser } = useStore(state => state.auth);
    const { menu, auth } = useActions(actions => actions);

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.props.authType){
                    console.log("LOGIN");
                    console.log('Password: ', values.password);
                    console.log('Re-password: ', values.repassword);
                    console.log('Username: ', values.username);
                    axios.post('/auth/betaverify', {'username':values.username,'password':values.password}).then(response => {
                        console.log(response);

                    }).catch(error => {
                        console.log(error);
                    })
                }else {
                    console.log("SIGNUP");
                    console.log('Password: ', values.password);
                    console.log('Re-password: ', values.repassword);
                    console.log('Username: ', values.username);
                    axios.post('', {}).then(response => {
                        console.log(response);
                    }).catch(error => {
                        console.log(error);
                    })
                }
            }
        });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username or email!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username or Email" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                {
                    !this.props.authType &&
                    <Form.Item>
                        {getFieldDecorator('repassword', {
                            rules: [{ required: true, message: 'Please re-enter your Password!' },
                                {
                                    validator: this.compareToFirstPassword,
                                }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Re-enter Password" />
                        )}
                    </Form.Item>
                }
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        {
                            this.props.authType ? <span>Log in</span>:
                                <span>Sign up</span>
                        }
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
*/

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginComponent);

export default WrappedNormalLoginForm;