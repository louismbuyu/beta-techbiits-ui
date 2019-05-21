import React, {Component} from 'react';
import './Product.scss';
import SpecItem from "../specitem/SpecItem";
import Post from "../Post/Post";
import AliceCarousel from 'react-alice-carousel'
import axios from "axios";
import {Button, Col, Row, Spin, Tabs} from "antd";
import Deal from "../Deal/Deal";

const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            currentIndex: 0,
            videosCurrentIndex: 0,
            dealsCurrentIndex: 0,
            itemsInSlide: 1,
            product: null,
            videos: [],
            videosItemsInSlide: 1,
            dealsItemsInSlide: 1,
            responsive: {
                0: {items: 1},
                600: {items: 2},
                900: {items: 3},
                1024: {items: 4}
            },
            videosResponsive: {
                0: {items: 1},
                600: {items: 2},
                900: {items: 3}
            },
            galleryItems: [],
            galleryItems2: [],
            videoItems: [],
            deals: [],
        };
    }

    componentWillMount() {
        const {category, item} = this.props.match.params;
        axios.post('/api/products/', {idName: item})
            .then(res => {
                if (res.data.success === true) {
                    res.data.product.specs = res.data.specs;
                    this.setState({
                        loading: false,
                        product: res.data.product,
                        videos: res.data.finalVideos,
                        deals: this.deals(res.data.deals),
                        videoItems: this.posts(res.data.topVideos),
                        galleryItems: this.galleryItems(res.data.product.specs),
                    });
                }
            }).catch((error) => {
            console.log("ERROR: ", error);
            //console.log(error);
        });
    }

    galleryItems = (specs) => {
        return specs.map((item, index) => {
            return (
                <SpecItem key={index} title={item.title} data={item.summary}/>
            )
        });
    };

    posts = (videos) => {
        return videos.map((i) =>
            <Post item={i} key={i.id}/>
        )
    };

    deals = (deals) => {
        return deals.map((i) =>
            <Deal deal={i} key={i.id}/>
        )
    };

    slidePrevPage = () => {
        const currentIndex = this.state.currentIndex - this.state.itemsInSlide;
        this.setState({currentIndex})
    };

    slideVideosPrevPage = () => {
        const videosCurrentIndex = this.state.videosCurrentIndex - this.state.videosItemsInSlide;
        this.setState({videosCurrentIndex})
    };

    slideNextPage = () => {
        const currentIndex = this.state.currentIndex + this.state.itemsInSlide;
        this.setState({currentIndex});
    };

    slideVideosNextPage = () => {
        const videosCurrentIndex = this.state.videosCurrentIndex + this.state.videosItemsInSlide;
        this.setState({videosCurrentIndex})
    };

    slideDealsPrevPage = () => {
        const dealsCurrentIndex = this.state.dealsCurrentIndex - this.state.dealsItemsInSlide;
        this.setState({dealsCurrentIndex})
    };

    slideDealsNextPage = () => {
        const dealsCurrentIndex = this.state.dealsCurrentIndex + this.state.dealsItemsInSlide;
        this.setState({dealsCurrentIndex})
    };

    handleOnSlideChange = (event) => {
        const {itemsInSlide, item} = event;
        this.setState({itemsInSlide, currentIndex: item})
    };

    handleOnSlideVideosChange = (event) => {
        const {itemsInSlide, item} = event;
        this.setState({videosItemsInSlide: itemsInSlide, videosCurrentIndex: item})
    };

    handleOnSlideDealsChange = (event) => {
        const {itemsInSlide, item} = event;
        this.setState({dealsItemsInSlide: itemsInSlide, dealsCurrentIndex: item})
    };

    render() {
        const {
            currentIndex, videosCurrentIndex, dealsCurrentIndex, galleryItems, videoItems,
            responsive, videosResponsive, product, videos, deals
        } = this.state;
        return (
            <Spin className="spinning" size="large" spinning={this.state.loading}>
                {
                    !this.state.product ?
                        <div></div>
                        :
                        <div className="Product">
                            <picture className="product_container">
                                <source media="(min-width: 1000px)"
                                        srcSet={product.image.displayLarge}/>
                                <source media="(min-width: 640px)"
                                        srcSet={product.image.displayMedium}/>
                                <source media="(min-width: 0px)"
                                        srcSet={product.image.displaySmall}/>
                                <img className="product_image" src={product.image.displayLarge} alt="appleImage"
                                     width="100%"/>
                            </picture>
                            <div className="contentMaxWidth">
                                <div className="product_header">
                                    <div className="title_container">
                                        <img src={product.provider.profileImageUrl} className="brand_image"
                                             alt="brand_image"/>
                                        <div className="product_name_info">
                                            <div className="product_title">
                                                {product.title}
                                            </div>
                                            <div className="product_brand_title">
                                                {product.provider.displayName}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="someStuff">
                                <Tabs defaultActiveKey="1" onChange={callback}>
                                    <TabPane tab="Home" key="1">
                                        <div className="info_container">
                                            <div className="contentMaxWidth">
                                                <Row type="flex" justify="center" align="middle" className="specs_container">
                                                    <Col span={24}>
                                                        <div className="specs_header">
                                                            Specs Summary
                                                        </div>
                                                    </Col>
                                                    <Col span={2} className="specs_left_container">
                                                        <Button onClick={this.slidePrevPage} className="aliceBtn" shape="circle"
                                                                icon="caret-left" htmlType="button"/>
                                                    </Col>
                                                    <Col span={20} className="specs_center_container">
                                                        <AliceCarousel
                                                            items={galleryItems}
                                                            slideToIndex={currentIndex}
                                                            responsive={responsive}
                                                            infinite={false}
                                                            dotsDisabled={true}
                                                            buttonsDisabled={true}
                                                            onInitialized={this.handleOnSlideChange}
                                                            onSlideChanged={this.handleOnSlideChange}
                                                            onResized={this.handleOnSlideChange}
                                                        />
                                                    </Col>
                                                    <Col span={2} className="specs_right_container">
                                                        <Button onClick={this.slideNextPage} className="aliceBtn" shape="circle"
                                                                icon="caret-right" htmlType="button"/>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <div className="info_container">
                                            <div className="contentMaxWidth">
                                                <Row type="flex" justify="center" align="middle" className="video_container">
                                                    <Col span={24}>
                                                        <div className="videos_header">
                                                            Deals
                                                        </div>
                                                    </Col>
                                                    <Col span={2} className="specs_left_container">
                                                        <Button onClick={this.slideDealsPrevPage} className="aliceBtn" shape="circle"
                                                                icon="caret-left" htmlType="button"/>
                                                    </Col>
                                                    <Col span={20} className="videos_center_container">
                                                        <AliceCarousel
                                                            items={deals}
                                                            slideToIndex={dealsCurrentIndex}
                                                            responsive={videosResponsive}
                                                            infinite={false}
                                                            dotsDisabled={true}
                                                            buttonsDisabled={true}
                                                            onInitialized={this.handleOnSlideDealsChange}
                                                            onSlideChanged={this.handleOnSlideDealsChange}
                                                            onResized={this.handleOnSlideDealsChange}
                                                        />
                                                    </Col>
                                                    <Col span={2} className="specs_right_container">
                                                        <Button onClick={this.slideDealsNextPage} className="aliceBtn" shape="circle"
                                                                icon="caret-right" htmlType="button"/>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <div className="info_container">
                                            <div className="contentMaxWidth">
                                                <Row type="flex" justify="center" align="middle" className="video_container">
                                                    <Col span={24}>
                                                        <div className="videos_header">
                                                            Videos Shortlist
                                                        </div>
                                                    </Col>
                                                    <Col span={2} className="specs_left_container">
                                                        <Button onClick={this.slideVideosPrevPage} className="aliceBtn" shape="circle"
                                                                icon="caret-left" htmlType="button"/>
                                                    </Col>
                                                    <Col span={20} className="videos_center_container">
                                                        <AliceCarousel
                                                            items={videoItems}
                                                            slideToIndex={videosCurrentIndex}
                                                            responsive={videosResponsive}
                                                            infinite={false}
                                                            dotsDisabled={true}
                                                            buttonsDisabled={true}
                                                            onInitialized={this.handleOnSlideVideosChange}
                                                            onSlideChanged={this.handleOnSlideVideosChange}
                                                            onResized={this.handleOnSlideVideosChange}
                                                        />
                                                    </Col>
                                                    <Col span={2} className="specs_right_container">
                                                        <Button onClick={this.slideVideosNextPage} className="aliceBtn" shape="circle"
                                                                icon="caret-right" htmlType="button"/>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="Specs" key="2">
                                        <div className="grayBackground">
                                            <div className="contentMaxWidth">
                                                <Row>
                                                    <Col xs={{span: 20, offset: 3}}
                                                         sm={{span: 20, offset: 3}}
                                                         md={{span: 20, offset: 3}}
                                                         lg={{span: 20, offset: 3}}
                                                         xl={{span: 20, offset: 3}}>
                                                        {
                                                            product.specs.map((item, index) => {
                                                                return (<Col xs={{span: 24}}
                                                                             sm={{span: 24}}
                                                                             md={{span: 12}}
                                                                             lg={{span: 8}}
                                                                             xl={{span: 8}}>
                                                                    <div className="specGridItem">
                                                                        <div className="specGridTitle">
                                                                            {item.title}
                                                                        </div>
                                                                        <div className="specGridBody">
                                                                            {
                                                                                item.summary.map((infoItem, infoIndex) => {
                                                                                    return (<div
                                                                                        className="specGridLine">{infoItem}</div>)
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </Col>);
                                                            })
                                                        }
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="Videos" key="3">
                                        <div className="grayBackground">
                                            <div className="contentMaxWidth">
                                                <Row>
                                                    <Col xs={{span: 20, offset: 3}}
                                                         sm={{span: 20, offset: 3}}
                                                         md={{span: 20, offset: 3}}
                                                         lg={{span: 20, offset: 3}}
                                                         xl={{span: 20, offset: 3}}>
                                                        <div className="videosContainer">
                                                            {
                                                                videos.map((item, index) => {
                                                                    return (<Col xs={{span: 24}}
                                                                                 sm={{span: 24}}
                                                                                 md={{span: 12}}
                                                                                 lg={{span: 8}}
                                                                                 xl={{span: 8}}>
                                                                        <Post item={item} key={index}/>
                                                                    </Col>);
                                                                })
                                                            }
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </TabPane>
                                </Tabs>
                            </div>
                        </div>
                }
            </Spin>
        );
    }
}

export default Product;
