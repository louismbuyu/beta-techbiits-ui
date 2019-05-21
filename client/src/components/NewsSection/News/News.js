import React, {useState, useEffect} from 'react';
import './News.scss';
import axios from "axios";
import convertParentCategories from '../../../data/convertCategory';
import convertCategories from '../../../data/convertSubcategory';
import ArticleCard from "../ArticleCard/ArticleCard";
import {Icon} from "antd";

function News(props) {

    console.log("WOOHOO: ",props.match.params.category);
    console.log("WOOHOO: ",props.match.params.subcategory);
    //const { category, subcategory } = props.match.params;
    const [articles, setArticles] = useState([]);

    async function fetchNews(category,subcategory){
        const result = await axios.post('/api/posts/',{page:1, count:20, category, subcategory});
        if (result.data.success === true){
            console.log(result);
            setArticles(result.data.articles)
        }
    }

    useEffect( () => {
        fetchNews(props.match.params.category,props.match.params.subcategory);
    }, []);

    return (
        <div className="News">
            <div className="sectionHeader">
                <div className="parentCategory">{convertParentCategories[props.match.params.category]}</div>
                <Icon className="categoryRightArrow" type="right" />
                <div className="category">{convertCategories[props.match.params.subcategory]}</div>
            </div>
            <div className="sectionBody">
                { articles.map((article,index) => {
                    return (<ArticleCard key={index} article={article}/>)
                })
                }
            </div>
        </div>
    );
}

/*

*/

export default News;