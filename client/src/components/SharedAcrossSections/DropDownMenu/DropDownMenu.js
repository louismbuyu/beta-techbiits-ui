import {Menu} from "antd";
import {Link} from "react-router-dom";
import React from "react";

const dropDownMenu = () => (
    <Menu>
        <Menu.Item>
            {" "}
            <Link to="/profile">
                Profile
            </Link>
            {" "}
        </Menu.Item>
        <Menu.Item>
            {" "}
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">Settings</a>
            {" "}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
            {" "}
            <Link to="http://localhost:5000/auth/logout" >
                Logout
            </Link>
            {" "}
        </Menu.Item>
    </Menu>
);

export default dropDownMenu;