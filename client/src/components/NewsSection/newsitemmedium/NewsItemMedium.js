import React, {Component} from 'react';
import Slider from "react-slick";
import NewsItem from "../newsitem/NewsItem";
import './NewsItemMedium.scss'
import {Button} from "antd";
import random from '../../assets/icons/heart_filled.png';
import SliderArrow from "./SliderArrow";


function SampleNextArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className="slick-arrow"
            style={{...style, display: 'block'}}
            onClick={onClick}
        >
            <img src={random} alt="arrow_left" width="20px"/>
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className="slick-arrow"
             style={{ ...style, display: "block", background: "white" }}
             onClick={onClick}>
            <Button type="primary" shape="circle" icon="right" />
        </div>
);
}

class NewsItemMedium extends Component {

            constructor(props){
                super(props);
                this.next = this.next.bind(this);
            }

    next() {
        this.slider.slickNext();
    }

    render() {
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5,
            initialSlide: 0,
            prevArrow: <SliderArrow to="left" />,
            nextArrow: <SliderArrow to="right" />,
            responsive: [
                {
                    breakpoint: 1600,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: false,
                        dots: false,
                    }
                },
                {
                    breakpoint: 1050,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2,
                    }
                },
                {
                    breakpoint: 750,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        };
        return (
            <div className="NewsItemMedium">
                <Slider ref={c => (this.slider = c)} {...settings}>
                    {
                        this.props.articles ? this.props.articles.map((article,index) => (
                            <NewsItem key={index} article={article}/>
                        )): <div></div>
                    }
                </Slider>
            </div>
        );
    }
}

export default NewsItemMedium;