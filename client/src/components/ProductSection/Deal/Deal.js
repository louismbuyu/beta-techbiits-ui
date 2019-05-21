import React, {Component} from 'react';
import './Deal.scss';
import {Icon} from "antd";

class Deal extends Component {
    render() {
        const { deal } = this.props;
        return (
            <div className="Deal">
                <a className="storeContainer" href={deal ? deal.url: ""} target="_blank" rel="noopener noreferrer">
                    <div className="storeInfoContainer">
                        <div className="storeProviderContainer">
                            <img className="storeImage" src={deal.provider.profileImageUrl} alt="storeImage"/>
                            <div className="storeName">
                                {deal.provider.displayName}
                            </div>
                        </div>
                        <div className='priceContainer'>
                            starting at <span className="storePrice">
                            {deal.country.currencySymbol}
                            {deal.price}
                        </span>
                        </div>
                    </div>
                    <div className="storeArrowContainer">
                        <Icon type="right-circle" />
                    </div>
                </a>
            </div>
        );
    }
}

export default Deal;