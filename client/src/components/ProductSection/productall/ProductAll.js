import React, {Component} from 'react';
import './ProductAll.scss';
import ProductPillars from "../productpillars/ProductPillars";
import axios from "axios";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
};

const mapDispatchToProps = dispatch => ({
    getProductSkeleton: () => {
        axios.post('/api/products/skeleton',{idName: "smartphones"})
            .then(res => {
                console.log("Response: ");
                console.log(res.data);
            }).catch((error) => {
                console.log(error);
        })
    }
});

class ProductAll extends Component {

    render() {
        return (
            <div className="ProductAll">
                <ProductPillars category={this.props.category}/>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductAll);