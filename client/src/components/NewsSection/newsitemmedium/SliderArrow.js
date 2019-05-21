import React from 'react';
import {Button} from "antd";

export default ({className, to, onClick}) => (
    <Button className={className} style={{ background: "gray", color: "white" }} type="primary" shape="circle" icon={to} onClick={onClick}/>
)