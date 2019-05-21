import React, {Component} from 'react';
import './ProductPillarProperty.scss'

class ProductPillarProperty extends Component {
    render() {
        const { property } = this.props;
        return (
            <div className="ProductPillarProperty">
                <div className="productPillarPropertyHeader">
                    <span className="productPillarPropertyTitle">
                        {property.title}
                    </span>
                </div>
                <div className="productPillarPropertyBody">
                    {property.summary}
                </div>
            </div>
        );
    }
}

export default ProductPillarProperty;