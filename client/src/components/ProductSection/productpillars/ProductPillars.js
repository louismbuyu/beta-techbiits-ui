import React, {Component} from 'react';
import './ProductPillars.scss';
import ProductPillarItem from "../productpillaritem/ProductPillarItem";
import axios from "axios";

class ProductPillars extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            pillars: []
        };
    }

    componentWillMount() {
        console.log("ProductAll");
        //this.props.getProductSkeleton();
        axios.post('/api/products/skeleton',{idName: "smartphones"})
            .then(res => {
                console.log("Response: ");
                this.setState({
                    title: res.data.skeleton.title,
                    pillars: res.data.skeleton.pillars
                });
                console.log(res.data);
            }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <div className="ProductPillars">
                <div className="header">
                    <span className="productAmount">{this.state.pillars && this.state.pillars.length}</span> Pillars of a great <span className="productName">{this.state.title}</span>
                </div>
                <div className="body">
                    {
                        this.state.pillars && this.state.pillars.map((v,i) => {
                            return (<ProductPillarItem key={i} pillarItem={v} />);
                            })
                    }
                </div>
            </div>
        );
    }
}

export default ProductPillars;