import React, {Component} from 'react';
import {Button, Table, Tag} from "antd";
import './MediaList2.scss';

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
}, {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
        <span>
      {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
              color = 'volcano';
          }
          return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
      })}
    </span>
    ),
}, {
    title: '',
    key: 'action',
    render: (text, record) => (
        <span>
            <Button htmlType="button" type="primary" icon="plus">ADD</Button>
    </span>
    ),
}];

const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
}];

class MediaList2 extends Component {



    render() {
        return (
            <div className="MediaList2">
                <Table className="mediaTable" columns={columns} dataSource={data} pagination={false} sortDirections={0}/>
            </div>
        );
    }
}

export default MediaList2;