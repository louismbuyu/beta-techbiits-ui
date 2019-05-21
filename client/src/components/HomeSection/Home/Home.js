import React, { useState, useEffect } from 'react';
import ComingSoon from "../comingsoon/ComingSoon";
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel'
import './Home.scss';
import {Button, Col, Row} from "antd";
import WelcomeLogo3 from "../../../components/HomeSection/welcomelogo3/WelcomeLogo3";
import Post from "../../ProductSection/Post/Post";
import Banner from "../Banner/Banner";
import FinanceBanner from "../FinanceBanner/FinanceBanner";
import Welcome from "../Welcome/Welcome";

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsInSlide, setItemsInSlide] = useState(1);
    const [responsive, setResponsive] = useState({
        0: { items: 1 },
        600: { items: 1 },
        900: { items: 2 },
        1024: { items: 2 }});
    const [newsItems, setNewsItems] = useState([]);

    async function fetchNews(){
        const result = await axios.post('/api/posts',{page:1, count:6});
        if (result.data.success === true){
            console.log(result.data.articles);
            const formattedArticles = result.data.articles.map((article) => {
                return {
                    url: article.url,
                    title: article.title,
                    categories: [{ displayName: article.parentCategories[0].displayName},
                        { displayName: article.categories[0].displayName}],
                    provider: {
                        displayName: article.provider.displayName,
                        profileImageUrl: article.provider.profileImageUrl
                    },
                    listOfViews: [],
                    listOfLikes: [],
                    date: article.timeStamp,
                    likesCount: article.likesCount,
                    viewsCount: article.viewsCount,
                    imageUrl: article.imageUrl
                }
            });
            const items = formattedArticles.map((item,index) => {
                return (<div className="newsItemContainer"><Post item={item} key={index} /></div>);
            });
            setNewsItems(items)
        }
    }

    useEffect( () => {
        fetchNews();
    }, []);

    const handleOnSlideChange = (event) => {
        const { itemsInSlide, item } = event;
        setItemsInSlide(itemsInSlide);
        setCurrentIndex(item);
    };

    const slidePrevPage = () => {
        const newCurrentIndex = currentIndex - itemsInSlide;
        setCurrentIndex(newCurrentIndex);
    };

    const slideNextPage = () => {
        const newCurrentIndex = currentIndex + itemsInSlide;
        setCurrentIndex(newCurrentIndex);
    };

    return (
        <div className="Home">
            <Welcome/>
            <div className="contentMaxWidth">
                <div className="latestNewsContainer">
                    <div className="latestHeader">
                        <div className="latestNewsTitle">
                            News
                        </div>
                        <div className="latestNewsSubtitle">
                            Find the <span className="logoBlue">latest</span> Tech News
                        </div>
                    </div>
                    <div className="latestLeftContainer">
                        <Button onClick={() => slidePrevPage()} className="aliceBtn" shape="circle" icon="left" htmlType="button"/>
                    </div>
                    <div className="latestCenterContainer">
                        <AliceCarousel
                            items={newsItems}
                            slideToIndex={currentIndex}
                            responsive={responsive}
                            infinite={false}
                            dotsDisabled={true}
                            buttonsDisabled={true}
                            onInitialized={handleOnSlideChange}
                            onSlideChanged={handleOnSlideChange}
                            onResized={handleOnSlideChange}
                        />
                    </div>
                    <div className="latestRightContainer">
                        <Button onClick={() => slideNextPage()} className="aliceBtn" shape="circle" icon="right" htmlType="button"/>
                    </div>
                </div>
                {/*<Banner/>
                <FinanceBanner/>*/}
                <ComingSoon/>
            </div>
        </div>
    );
};

export default Home;


/*<div className="latestNewsTitle">
    Latest <span className="logoRed">Tech</span> News
</div>
<div className="latestNewsSubtitle">
    Build your own <span className="logoBlue">News feed</span>
</div>*/

