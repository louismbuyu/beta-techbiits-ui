import React from 'react';
import './CoinList.scss';
import {Divider, Icon} from "antd";

const CoinList = () => {

    const coinItem = () => {
        return (<div>
            <div className="customDivider"/>
            <div className="coinListItem">
                <div className="coinTitle">
                    <img className="coinImage" src={"https://i.ibb.co/rFs5NSC/bitcoin.jpg"} alt="coinImage"/>
                    <div className="coinName">
                        Bitcoin
                    </div>
                </div>
                <div className="coinValue">
                    $4000
                </div>
                <div className="coinMovement">
                    <span>+4.12%</span>
                    <Icon type="arrow-up" />
                </div>
            </div>
        </div>)
    };

    return (
        <div className="CoinList">
            <div className="coinListContainer">
                <div className="coinListHeader">
                    <div className="coinListTitle">
                        Coins
                    </div>
                    <div className="coinListTimestamp">
                        Last update: 01-03-2019 15:45
                    </div>
                </div>
                <div className="customDivider"/>
                <div className="coinListBody">
                    {
                        [1,1,1,1,1,1,1,1].map((v,index) => {
                            return coinItem()
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default CoinList;