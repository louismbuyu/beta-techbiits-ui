import React, {Component} from 'react';
import './ProductPillarItem.scss';
import ProductPillarProperty from "../productpillarproperty/ProductPillarProperty";
import Post from "../Post/Post";

class ProductPillarItem extends Component {
    render() {

        const {pillarItem} = this.props;
        return (
            <div className="ProductPillarItem">
                <div className="productPillarItemHeader">
                    <span className="productPillarNumberContainer"><span className="productPillarNumber">{pillarItem.position}</span></span><span className="productPillarTitle">{pillarItem.title}</span>
                </div>
                <div className="productPillarItemBody">
                    <div className="pillarSummary">
                        {pillarItem.summary}
                    </div>
                    {
                        pillarItem.properties.map((v,i) => {
                            return (<ProductPillarProperty key={i} property={v}/>)
                        })
                    }
                </div>
                <div className="productPillarItemFooter">
                    {
                        pillarItem.videos.map((v,i) => {
                            return (<Post key={i} video={v} item={{thumbnail: "https://i.ytimg.com/an_webp/3Csb8Ad7PTI/mqdefault_6s.webp?du=3000&sqp=CNL8oeEF&rs=AOn4CLATkrNqVUpZkmrB-M5SO4TwBK75YQ"}}/>)
                        })
                    }
                </div>
            </div>
        );
    }
}

export default ProductPillarItem;