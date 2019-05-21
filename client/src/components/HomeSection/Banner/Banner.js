import React from 'react';
import './Banner.scss';
import imagea from '../../../assets/images/image1.jpg';
import imageb from '../../../assets/images/image2.jpg';
import imagec from '../../../assets/images/image7.jpg';
import imaged from '../../../assets/images/image3.jpg';
import imagee from '../../../assets/images/image8.jpg';

function Banner(props) {
    return (
        <div className="Banner">
            <div className="container">
                <div className="text1">
                    Compare smartphones.
                </div>
                <div className="text2">
                    Products
                </div>
                <div className="text3">
                    Find the best deals.
                </div>
                <div className="imagea">
                    <img className="imga" src={imageb} alt="imagea"/>
                </div>
                <div className="imageb">
                    <img className="imgb" src={imagec} alt="imageb"/>
                </div>
                <div className="imagec">
                    <img className="imgc" src={imagea} alt="imagec"/>
                </div>
                <div className="imaged">
                    <img className="imgd" src={imaged} alt="imaged"/>
                </div>
                <div className="imagee">
                    <img className="imge" src={imagee} alt="imagee"/>
                </div>
            </div>
        </div>
    );
}

export default Banner;