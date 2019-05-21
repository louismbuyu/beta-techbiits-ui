import React, {useEffect, useState} from 'react';
import FinanceChart from "../FinanceChart/FinanceChart";
import CoinList from "../CoinList/CoinList";
import './Crypto.scss';
import {Col, Row} from "antd";
import NewsItemLarge from "../../../components/NewsSection/newsitemlarge/NewsItemLarge";
import axios from "axios";
import ArticleCard from "../../NewsSection/ArticleCard/ArticleCard";

const Crypto = (props) => {

    const [articles, setArticles] = useState([]);
    const [coins, setCoins] = useState([]);
    const [coinsPerformances, setCoinsPerformances] = useState([]);

    async function fetchNews(){

        const result = await axios.post('http://localhost:5000/api/posts/getposts',{page:1, count:10, category: "finance", subcategory: "crypto"});
        if (result.data.success === true){
            if (result.data.articles){
                setArticles(result.data.articles)
            }
        }
    }

    async function fetchCoins(){
        const result = await axios.get('http://localhost:5000/api/coins/coins');
        if (result.data.success === true){
            if (result.data.coins){
                setCoins(result.data.coins);
            }
        }
    }

    useEffect( () => {
        fetchNews();
        fetchCoins();
    }, []);

    return (
        <div className="Crypto">
            <Row>
                <Col className="chartComponent" xs={24} sm={24} md={24} lg={24} xl={24} >
                    <FinanceChart coins={coins}/>
                </Col>
                <Col className="cryptoListComponent" xs={0} sm={0} md={0} lg={0} xl={0} >
                    <CoinList coinsPerformances={coinsPerformances}/>
                </Col>
                <Col className="cryptoNewsComponent" xs={24} sm={24} md={24} lg={24} xl={24} >
                    <div className="cryptoTitle">
                        Top Crypto News
                    </div>
                    { articles.map((article,index) => {
                        return (<ArticleCard key={index} article={article}/>)
                        })
                    }
                </Col>
            </Row>
        </div>
    );
};

export default Crypto;