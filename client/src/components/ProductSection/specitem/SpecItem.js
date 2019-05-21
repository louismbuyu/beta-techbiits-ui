import React, {Component} from 'react';
import './SpecItem.scss';

class SpecItem extends Component {
    render() {
        return (
            <div className="SpecItem">
                <div className="spec_title">
                    {this.props.title}
                </div>
                <div className="spec_body">
                    <ul className="spec_list">
                        {
                            this.props.data.map( (item,index) => (
                                <li key={index} >{item}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default SpecItem;